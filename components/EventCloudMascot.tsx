"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// ─── Brand palette — purple/violet/indigo family only ────────────────────────
const BOUNDARY_STOPS: [number, number, number][] = [
  [0.420, 0.247, 0.831], // #6B3FD4  accent-primary
  [0.545, 0.361, 0.965], // #8B5CF6  accent-secondary
  [0.545, 0.361, 0.965], // hold briefly
  [0.239, 0.122, 0.639], // #3D1FA3  gradient-start
  [0.380, 0.200, 0.780], // mid violet
  [0.102, 0.039, 0.369], // #1A0A5E  gradient-end
  [0.239, 0.122, 0.639], // back through gradient-start
  [0.420, 0.247, 0.831], // loop close
];

const CYCLE_DURATION = 9;
const BLINK_CLIPS = ["Cloud_LeftEyeAction.001", "Cloud_RightEyeAction"];
const WAVE_CLIPS  = ["Cloud_SmileAction.002",   "Cloud_RightPawAction.002"];

function lerpColour(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): THREE.Color {
  return new THREE.Color(
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  );
}

function samplePalette(t: number): THREE.Color {
  const scaled = t * (BOUNDARY_STOPS.length - 1);
  const idx    = Math.floor(scaled);
  const frac   = scaled - idx;
  const a      = BOUNDARY_STOPS[Math.min(idx,     BOUNDARY_STOPS.length - 1)];
  const b      = BOUNDARY_STOPS[Math.min(idx + 1, BOUNDARY_STOPS.length - 1)];
  return lerpColour(a, b, frac);
}

interface EventCloudMascotProps {
  size?: number;
  onWaveDone?: () => void;
}

export default function EventCloudMascot({
  size = 320,
  onWaveDone,
}: EventCloudMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shellRef     = useRef<HTMLDivElement>(null);
  const hasWaved     = useRef(false);
  const mouseTarget  = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const [visible,   setVisible]   = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const onMove = (e: MouseEvent) => {
      const r = shell.getBoundingClientRect();
      const inside =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top  && e.clientY <= r.bottom;
      if (inside) {
        mouseTarget.current.x = ((e.clientX - r.left) / r.width)  * 2 - 1;
        mouseTarget.current.y = ((e.clientY - r.top)  / r.height) * 2 - 1;
      } else {
        mouseTarget.current.x = 0;
        mouseTarget.current.y = 0;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const init = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(45, 1, 0.1, 5000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    // Lower exposure so coloured rims read clearly rather than blowing to white
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // ── Lighting ─────────────────────────────────────────────────────────────
    // Front lights: white-only → preserves white centre
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    const key     = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(20, -200, 500);

    // Rim lights: placed behind & around the model, SHORT distance, HIGH intensity
    // Short distance = colour stays glued to the silhouette edge
    // High intensity = clearly visible purple/violet glow
    //
    // ── TUNING GUIDE (edit these numbers to taste) ──────────────────────────
    //   intensity 16  → strong, clearly visible boundary colour
    //   intensity 8   → subtle
    //   distance  300 → tight band at edge
    //   distance  500 → wider coloured zone, bleeds more toward centre
    const rimL   = new THREE.PointLight(0x6B3FD4, 16, 300);
    rimL.position.set(-220, 80, -160);

    const rimR   = new THREE.PointLight(0x8B5CF6, 16, 300);
    rimR.position.set(220, -80, -150);

    const rimTop = new THREE.PointLight(0x8B5CF6, 14, 280);
    rimTop.position.set(0, 280, -140);

    const rimBot = new THREE.PointLight(0x3D1FA3, 12, 280);
    rimBot.position.set(0, -280, -130);

    scene.add(ambient, key, rimL, rimR, rimTop, rimBot);

    // ── Runtime state
    let mixer:    THREE.AnimationMixer | null = null;
    const actions: Record<string, THREE.AnimationAction> = {};
    let idleTimer  = 0;
    let waveQueued = false;
    let loaded     = false;
    let wavePlaying = false;
    let modelRef:  THREE.Object3D | null = null;
    let colourTimer = 0;
    const bodyMaterials: THREE.MeshStandardMaterial[] = [];

    const playClips = (names: string[]) => {
      for (const name of names) {
        const a = actions[name];
        if (!a) continue;
        a.reset();
        a.clampWhenFinished = true;
        a.setLoop(THREE.LoopOnce, 1);
        a.play();
      }
    };

    const loader = new GLTFLoader();
    loader.load("/cloud_mascot.glb", (gltf) => {
      const model = gltf.scene;
      modelRef    = model;
      scene.add(model);

      // Identify white-ish body materials
      model.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return;
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const m of mats) {
          if (!(m instanceof THREE.MeshStandardMaterial) || m.opacity < 0.5) continue;
          const hsl = { h: 0, s: 0, l: 0 };
          m.color.getHSL(hsl);
          if (hsl.l > 0.55) {
            m.emissive          = new THREE.Color(0x000000);
            m.emissiveIntensity = 0;
            bodyMaterials.push(m);
          }
        }
      });

      // Fallback
      if (bodyMaterials.length === 0) {
        model.traverse((obj) => {
          if (!(obj instanceof THREE.Mesh)) return;
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          for (const m of mats) {
            if (m instanceof THREE.MeshStandardMaterial && m.opacity > 0.5) {
              m.emissive          = new THREE.Color(0x000000);
              m.emissiveIntensity = 0;
              bodyMaterials.push(m);
            }
          }
        });
      }

      const box    = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const bsize  = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(bsize.x, bsize.y, bsize.z);
      camera.position.set(center.x, center.y, center.z + maxDim * 2.0);
      camera.lookAt(center);
      camera.updateProjectionMatrix();

      mixer = new THREE.AnimationMixer(model);
      for (const clip of gltf.animations) {
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce, 1);
        actions[clip.name] = action;
      }

      mixer.addEventListener("finished", (e: { action: THREE.AnimationAction }) => {
        if (!WAVE_CLIPS.includes(e.action.getClip().name)) return;
        const allDone = WAVE_CLIPS.every(
          (n) => actions[n]?.paused || !actions[n]?.isRunning(),
        );
        if (allDone) { wavePlaying = false; idleTimer = 0; onWaveDone?.(); }
      });

      loaded = true;
      if (waveQueued) { wavePlaying = true; playClips(WAVE_CLIPS); waveQueued = false; }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || hasWaved.current) continue;
          hasWaved.current = true;
          setVisible(true);
          setTimeout(() => setIsJumping(true), 200);
          setTimeout(() => {
            setIsJumping(false);
            if (loaded && mixer) { wavePlaying = true; playClips(WAVE_CLIPS); }
            else { waveQueued = true; }
          }, 1900);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(container);

    let frameId = 0;
    const clock = new THREE.Clock();
    const MOUSE_LERP  = 3.5;
    const TILT_AMOUNT = 0.14;
    const FLOAT_AMP   = 5;
    const FLOAT_SPEED = 0.85;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta   = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const k = Math.min(1, MOUSE_LERP * delta);
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * k;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * k;

      if (modelRef) {
        modelRef.rotation.y =  mouseCurrent.current.x * TILT_AMOUNT;
        modelRef.rotation.x = -mouseCurrent.current.y * TILT_AMOUNT * 0.5;
        modelRef.position.y =  Math.sin(elapsed * FLOAT_SPEED) * FLOAT_AMP;
      }

      colourTimer = (colourTimer + delta) % CYCLE_DURATION;
      const col   = samplePalette(colourTimer / CYCLE_DURATION);

      const breathe = 1 + Math.sin(elapsed * 1.2) * 0.22;
      rimL.color.copy(col);   rimL.intensity   = 16 * breathe;
      rimR.color.copy(col);   rimR.intensity   = 16 * breathe;
      rimTop.color.copy(col); rimTop.intensity = 14 * breathe;
      rimBot.color.copy(col); rimBot.intensity = 12 * breathe;

      // ── Emissive intensity — the main dial for boundary colour visibility ──
      // Range guide:
      //   0.10 = barely there, rims do all the work
      //   0.20 = clearly visible tint, white centre intact    ← current
      //   0.35 = strong, centre starts going slightly purple
      //   0.50 = full colour wash, no white-centre effect
      const emissive = 0.22 + Math.sin(elapsed * 0.9) * 0.07;
      for (const mat of bodyMaterials) {
        mat.emissive.copy(col);
        mat.emissiveIntensity = emissive;
      }

      if (mixer) {
        mixer.update(delta);
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
    size === 300 ? "mascot-size-300"
    : size === 500 ? "mascot-size-500"
    : "mascot-size-350";

  return (
    <div
      ref={shellRef}
      className={`mascot-shell ${sizeClass} ${isJumping ? "mascot-jump" : ""}`}
    >
      <div
        ref={containerRef}
        className={`${sizeClass} transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}