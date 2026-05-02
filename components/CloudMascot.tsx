"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const COLOR_BLACK = 0x000000;
const COLOR_WHITE = 0xffffff;

// Clip names from the GLB
const BLINK_CLIPS = ["Cloud_LeftEyeAction.001", "Cloud_RightEyeAction"];
const WAVE_CLIPS = ["Cloud_SmileAction.002", "Cloud_RightPawAction.002"];

export default function CloudMascot({
  size = 350,
  onWaveDone,
}: {
  size?: number;
  onWaveDone?: () => void;
}) {
  const [isJumping, setIsJumping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasWaved = useRef(false);
  const [visible, setVisible] = useState(false);

  const init = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const accent = typeof window === "undefined"
      ? "#8B5CF6"
      : getComputedStyle(document.documentElement).getPropertyValue("--color-accent-secondary").trim() || "#8B5CF6";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 5000);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);
    renderer.setClearColor(COLOR_BLACK, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(accent, 0.6);
    const key = new THREE.DirectionalLight(COLOR_WHITE, 2.0);
    key.position.set(0, -500, 200);
    const fill = new THREE.DirectionalLight(accent, 0.8);
    fill.position.set(0, 500, -200);
    scene.add(ambient, key, fill);

    let mixer: THREE.AnimationMixer | null = null;
    const actions: Record<string, THREE.AnimationAction> = {};
    let idleTimer = 0;
    let waveQueued = false;
    let loaded = false;
    let wavePlaying = false;

    const playClips = (clipNames: string[]) => {
      for (const name of clipNames) {
        const action = actions[name];
        if (!action) continue;
        action.reset();
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce, 1);
        action.play();
      }
    };

    const loader = new GLTFLoader();
    loader.load("/cloud_mascot.glb", (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const bsize = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(bsize.x, bsize.y, bsize.z);

      // Face features (eyes, smile) are on the +Z side of the model.
      camera.position.set(center.x, center.y, center.z + maxDim * 2.0);
      camera.lookAt(center);
      camera.updateProjectionMatrix();

      mixer = new THREE.AnimationMixer(model);

      // Create actions for each clip, all initially stopped
      for (const clip of gltf.animations) {
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce, 1);
        actions[clip.name] = action;
      }

      // When wave clips finish, fire callback and start idle blinks
      mixer.addEventListener(
        "finished",
        (e: { action: THREE.AnimationAction }) => {
          const clipName = e.action.getClip().name;
          if (WAVE_CLIPS.includes(clipName)) {
            // Check if all wave clips are done
            const allDone = WAVE_CLIPS.every(
              (n) => actions[n]?.paused || !actions[n]?.isRunning(),
            );
            if (allDone) {
              wavePlaying = false;
              idleTimer = 0;
              onWaveDone?.();
            }
          }
        },
      );

      loaded = true;

      if (waveQueued) {
        wavePlaying = true;
        playClips(WAVE_CLIPS);
        waveQueued = false;
      }
    });

    // Intersection observer — play wave once when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasWaved.current) {
            hasWaved.current = true;
            setVisible(true); // make it visible first

            // Small delay so opacity transition completes before animation starts
            setTimeout(() => {
              setIsJumping(true);
            }, 200);

            setTimeout(() => {
              setIsJumping(false);
              if (loaded && mixer) {
                wavePlaying = true;
                playClips(WAVE_CLIPS);
              } else {
                waveQueued = true;
              }
            }, 1900);
          }
        }
      },
      { threshold: 0.1 }, // lower threshold
    );
    observer.observe(container);

    // Render loop
    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);

        // Auto-blink when idle (after wave is done)
        if (loaded && hasWaved.current && !wavePlaying) {
          idleTimer += delta;
          if (idleTimer > 3) {
            playClips(BLINK_CLIPS);
            idleTimer = -(Math.random() * 2);
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth || size;
      renderer.setSize(w, w);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size, onWaveDone]);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  const sizeClass =
    size === 300 ? "mascot-size-300" : size === 500 ? "mascot-size-500" : "mascot-size-350";

  return (
    <div
      className={`mascot-shell ${sizeClass} ${isJumping ? "mascot-jump" : ""}`}
    >
      <div
        ref={containerRef}
        className={`${sizeClass} transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
