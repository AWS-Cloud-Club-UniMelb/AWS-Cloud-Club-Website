"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ── Orbit config ──────────────────────────────────────────────────────── */
type OrbitItem = { icon: string; label: string; delay: number };

const innerRing: OrbitItem[] = [
  { icon: "Lambda.png", label: "Lambda", delay: 0 },
  { icon: "EC2.png", label: "EC2", delay: 4 },
  { icon: "Fargate.png", label: "Fargate", delay: 8 },
  { icon: "EventBridge.png", label: "EventBridge", delay: 12 },
  { icon: "Route 53.png", label: "Route 53", delay: 16 },
  { icon: "Elastic Kubernetes Service.png", label: "EKS", delay: 20 },
];

const outerRing: OrbitItem[] = [
  { icon: "API Gateway.png", label: "API Gateway", delay: 0 },
  { icon: "Elastic Container Service.png", label: "ECS", delay: 4 },
  { icon: "Elastic Load Balancing.png", label: "ELB", delay: 8 },
  { icon: "Kinesis.png", label: "Kinesis", delay: 12 },
  { icon: "Redshift.png", label: "Redshift", delay: 16 },
  { icon: "Rekognition.png", label: "Rekognition", delay: 20 },
  { icon: "CodeDeploy.png", label: "CodeDeploy", delay: 24 },
  { icon: "SageMaker Ground Truth.png", label: "SageMaker", delay: 28 },
];

const ring3: OrbitItem[] = [
  { icon: "Aurora.png", label: "Aurora", delay: 0 },
  { icon: "Glue.png", label: "Glue", delay: 3 },
  { icon: "CodeGuru.png", label: "CodeGuru", delay: 6 },
  { icon: "OpenSearch Service.png", label: "OpenSearch", delay: 9 },
  { icon: "Transit Gateway.png", label: "Transit GW", delay: 12 },
  { icon: "Elastic Beanstalk.png", label: "Beanstalk", delay: 15 },
  { icon: "MQ.png", label: "MQ", delay: 18 },
  { icon: "HealthLake.png", label: "HealthLake", delay: 21 },
  { icon: "FSx.png", label: "FSx", delay: 24 },
  { icon: "Cost Explorer.png", label: "Cost Explorer", delay: 27 },
];

const ring4: OrbitItem[] = [
  { icon: "EC2 Auto Scaling.png", label: "Auto Scaling", delay: 0 },
  { icon: "EC2 Image Builder.png", label: "Image Builder", delay: 3 },
  { icon: "Billing Conductor.png", label: "Billing", delay: 6 },
  { icon: "Chime.png", label: "Chime", delay: 9 },
  { icon: "Open 3D Engine.png", label: "O3DE", delay: 12 },
  { icon: "Outposts servers.png", label: "Outposts", delay: 15 },
  { icon: "Quantum Ledger Database.png", label: "QLDB", delay: 18 },
];

/* ── Scene constants ───────────────────────────────────────────────────── */
const RING_TILT_DEG = 200;
const CAMERA_Z = 7.2; // farther back to fit 4 rings
const INNER_RADIUS = 1.3;
const OUTER_RADIUS = 1.6;
const RING3_RADIUS = 1.95;
const RING4_RADIUS = 2.3;
const INNER_DURATION = 28; // seconds per orbit
const OUTER_DURATION = 42;
const RING3_DURATION = 55;
const RING4_DURATION = 68;
const INNER_BADGE = 0.36; // sprite world-unit size (height)
const OUTER_BADGE = 0.28;
const RING3_BADGE = 0.24;
const RING4_BADGE = 0.22;
const ICON_CORNER_R = 32; // canvas-pixel radius for rounded icon corners

/* ── Three.js scene: earth + tilted Saturn-style sprite ring ───────────── */
function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const size = container.clientWidth || 820;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.y = -1.2;
    camera.position.z = CAMERA_Z;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 600ms ease";
    container.appendChild(renderer.domElement);

    /* Earth — NASA Blue Marble texture, lavender-tinted */
    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load("/earth-day.jpg", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
    });

    const earthGeometry = new THREE.SphereGeometry(1, 96, 96);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      color: new THREE.Color(0xc9b8ff),
      shininess: 12,
      specular: new THREE.Color(0x6b3fd4),
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.rotation.x = 0.28;
    scene.add(earth);

    /* Atmosphere — back-side fresnel halo */
    const atmGeometry = new THREE.SphereGeometry(1.16, 96, 96);
    const atmMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: { uColor: { value: new THREE.Color(0x8b5cf6) } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 uColor;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
          gl_FragColor = vec4(uColor, 1.0) * intensity;
        }
      `,
    });
    const atmosphere = new THREE.Mesh(atmGeometry, atmMaterial);
    scene.add(atmosphere);

    /* Lights */
    const ambient = new THREE.AmbientLight(0x4a2d9c, 0.55);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 2, 4);
    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 1.1);
    rimLight.position.set(-4, -1, -3);
    scene.add(ambient, keyLight, rimLight);

    /* Tilted Saturn-ring container — everything in here depth-sorts with the globe */
    const ringGroup = new THREE.Group();
    ringGroup.rotation.x = THREE.MathUtils.degToRad(RING_TILT_DEG);
    scene.add(ringGroup);

    /* Decorative ring-path ellipses — circles in ring-local XZ, get tilted with the group */
    const makeRingLine = (radius: number, opacity: number) => {
      const pts: THREE.Vector3[] = [];
      const segments = 160;
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        pts.push(
          new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius),
        );
      }
      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity,
      });
      return new THREE.Line(geom, mat);
    };
    const innerRingLine = makeRingLine(INNER_RADIUS, 0.22);
    const outerRingLine = makeRingLine(OUTER_RADIUS, 0.16);
    const ring3Line = makeRingLine(RING3_RADIUS, 0.12);
    const ring4Line = makeRingLine(RING4_RADIUS, 0.09);
    ringGroup.add(innerRingLine, outerRingLine, ring3Line, ring4Line);

    /* ── Badge sprites (icon + label rendered onto a single canvas texture) ── */
    type Satellite = {
      sprite: THREE.Sprite;
      mat: THREE.SpriteMaterial;
      tex: THREE.CanvasTexture;
      img: HTMLImageElement;
      radius: number;
      omega: number;
      phase: number;
    };
    const satellites: Satellite[] = [];

    const makeBadge = (
      item: OrbitItem,
      radius: number,
      duration: number,
      worldHeight: number,
    ): Satellite => {
      const CW = 256;
      const CH = 320;
      const canvas = document.createElement("canvas");
      canvas.width = CW;
      canvas.height = CH;
      const ctx = canvas.getContext("2d")!;

      const img = new Image();
      img.src = `/aws-icons/${item.icon}`;

      const drawRoundedImage = (
        cx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        x: number,
        y: number,
        w: number,
        h: number,
        r: number,
      ) => {
        cx.save();
        cx.beginPath();
        cx.moveTo(x + r, y);
        cx.lineTo(x + w - r, y);
        cx.quadraticCurveTo(x + w, y, x + w, y + r);
        cx.lineTo(x + w, y + h - r);
        cx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        cx.lineTo(x + r, y + h);
        cx.quadraticCurveTo(x, y + h, x, y + h - r);
        cx.lineTo(x, y + r);
        cx.quadraticCurveTo(x, y, x + r, y);
        cx.closePath();
        cx.clip();
        cx.drawImage(image, x, y, w, h);
        cx.restore();
      };

      const redraw = () => {
        ctx.clearRect(0, 0, CW, CH);
        if (img.complete && img.naturalWidth > 0) {
          const s = 200;
          drawRoundedImage(ctx, img, (CW - s) / 2, 30, s, s, ICON_CORNER_R);
        }
        ctx.font = "700 26px Menlo, Monaco, Consolas, monospace";
        ctx.fillStyle = "rgba(169, 156, 192, 0.95)";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.shadowColor = "rgba(10, 10, 15, 0.9)";
        ctx.shadowBlur = 6;
        ctx.fillText(item.label, CW / 2, 252);
        ctx.shadowBlur = 0;
        tex.needsUpdate = true;
      };

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      redraw();
      img.onload = redraw;

      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthTest: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      const aspect = CW / CH;
      sprite.scale.set(worldHeight * aspect, worldHeight, 1);
      ringGroup.add(sprite);

      const omega = (2 * Math.PI) / duration;
      const phase = (item.delay / duration) * Math.PI * 2;
      return { sprite, mat, tex, img, radius, omega, phase };
    };

    innerRing.forEach((item, i) => {
      const s = makeBadge(item, INNER_RADIUS, INNER_DURATION, INNER_BADGE);
      s.phase += (i / innerRing.length) * Math.PI * 2;
      satellites.push(s);
    });
    outerRing.forEach((item, i) => {
      const s = makeBadge(item, OUTER_RADIUS, OUTER_DURATION, OUTER_BADGE);
      s.phase += (i / outerRing.length) * Math.PI * 2;
      satellites.push(s);
    });
    ring3.forEach((item, i) => {
      const s = makeBadge(item, RING3_RADIUS, RING3_DURATION, RING3_BADGE);
      s.phase += (i / ring3.length) * Math.PI * 2;
      satellites.push(s);
    });
    ring4.forEach((item, i) => {
      const s = makeBadge(item, RING4_RADIUS, RING4_DURATION, RING4_BADGE);
      s.phase += (i / ring4.length) * Math.PI * 2;
      satellites.push(s);
    });

    /* Animation loop */
    let frameId = 0;
    const start = performance.now();
    const animate = () => {
      const t = (performance.now() - start) / 1000;
      earth.rotation.y = t * 0.13;

      for (const s of satellites) {
        const a = t * s.omega + s.phase;
        s.sprite.position.set(
          Math.cos(a) * s.radius,
          0,
          Math.sin(a) * s.radius,
        );
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    requestAnimationFrame(() => {
      renderer.domElement.style.opacity = "1";
    });

    /* Responsive */
    const onResize = () => {
      const w = container.clientWidth || size;
      renderer.setSize(w, w);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      earthGeometry.dispose();
      earthMaterial.dispose();
      atmGeometry.dispose();
      atmMaterial.dispose();
      earthTexture.dispose();
      for (const line of [innerRingLine, outerRingLine, ring3Line, ring4Line]) {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      }
      for (const s of satellites) {
        s.mat.dispose();
        s.tex.dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: 1,
      }}
    />
  );
}

/* ── Typewriter title ─────────────────────────────────────────────────── */
const LINE1 = "Build the future";
const LINE2 = "on the cloud";
const TYPE_SPEED = 60;
const START_DELAY = 800;
const LINE_PAUSE = 500; // pause between lines

function TypewriterTitle() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [cursorLine, setCursorLine] = useState<1 | 2>(1);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
    };

    let t = START_DELAY;

    // Type line 1
    for (let i = 1; i <= LINE1.length; i++) {
      const delay = t;
      schedule(() => setLine1(LINE1.slice(0, i)), delay);
      t += TYPE_SPEED;
    }

    // Pause between lines
    t += LINE_PAUSE;
    schedule(() => setCursorLine(2), t);

    // Type line 2
    for (let i = 1; i <= LINE2.length; i++) {
      const delay = t;
      schedule(() => setLine2(LINE2.slice(0, i)), delay);
      t += TYPE_SPEED;
    }

    // Hide cursor after done
    schedule(() => setShowCursor(false), t + 2000);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const cursor = (
    <span
      className="inline-block w-[3px] ml-1 align-middle"
      style={{
        height: "1em",
        background: "#8B5CF6",
        opacity: showCursor ? 1 : 0,
        animation: showCursor ? "blink-cursor 0.6s step-end infinite" : "none",
      }}
    />
  );

  return (
    <h2
      className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter pointer-events-none text-center"
      style={{
        color: "#F0ECFF",
        textShadow:
          "0 2px 20px rgba(10,10,15,0.8), 0 0 40px rgba(139,92,246,0.3)",
      }}
    >
      <span>
        {line1}
        {cursorLine === 1 && cursor}
      </span>
      <br />
      <span>
        {line2}
        {cursorLine === 2 && cursor}
      </span>
    </h2>
  );
}

/* ── Main ──────────────────────────────────────────────────────────────── */
export default function HeroVisual() {
  return (
    <div
      className="relative w-full max-w-[1400px] flex items-center justify-center select-none overflow-hidden"
      style={{ height: "70vw", marginTop: "-20vw" }}
    >
      {/* Soft pulse around the globe — stays flat on screen, behind the scene */}
      <div
        className="absolute rounded-full animate-pulse-ring pointer-events-none"
        style={{
          width: 560,
          height: 560,
          border: "1px solid rgba(107,63,212,0.18)",
        }}
      />

      {/* Unified Three.js scene — globe + tilted Saturn-ring with sprite icons that share the depth buffer */}
      <div className="absolute inset-0 z-10">
        <HeroScene />
      </div>

      {/* Typewriter title — centred over the globe */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <TypewriterTitle />
      </div>
    </div>
  );
}
