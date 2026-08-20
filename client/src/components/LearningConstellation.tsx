/**
 * DESIGN REMINDER — The Learning Brief / Three.js constellation
 * A quiet, diagrammatic WebGL field for the dark subject chapter: glowing learning nodes,
 * imperfect orbital arcs, and a paper-like constellation of points. It must feel like a
 * lesson becoming visible, never like a generic tech demo.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";

type LearningConstellationProps = {
  reduceMotion: boolean | null;
};

const COLORS = {
  lime: 0xd8ff53,
  coral: 0xff7047,
  lilac: 0xdcc9ff,
  paper: 0xfcfaf5,
  forest: 0x143b20,
};

export default function LearningConstellation({ reduceMotion }: LearningConstellationProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduceMotion || !window.WebGLRenderingContext) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.18, 8.6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setClearColor(COLORS.forest, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.className = "learning-constellation-canvas";
    host.appendChild(renderer.domElement);

    const world = new THREE.Group();
    world.rotation.set(-0.06, -0.34, 0.04);
    scene.add(world);

    const ambient = new THREE.AmbientLight(COLORS.paper, 1.45);
    const limeLight = new THREE.PointLight(COLORS.lime, 16, 14);
    limeLight.position.set(-3.3, 1.9, 4.4);
    const coralLight = new THREE.PointLight(COLORS.coral, 13, 12);
    coralLight.position.set(3.1, -2, 3.2);
    scene.add(ambient, limeLight, coralLight);

    const orbit = new THREE.Group();
    world.add(orbit);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: COLORS.lime, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false });
    const ringOne = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.017, 6, 96), ringMaterial);
    ringOne.rotation.set(1.13, -0.16, 0.42);
    const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.012, 6, 72), ringMaterial.clone());
    ringTwo.material.color.setHex(COLORS.lilac);
    ringTwo.material.opacity = 0.32;
    ringTwo.rotation.set(0.34, 0.72, -0.7);
    orbit.add(ringOne, ringTwo);

    const nodeGeometry = new THREE.IcosahedronGeometry(0.47, 2);
    const nodeSpecs = [
      { color: COLORS.lime, position: new THREE.Vector3(-2.06, 0.72, 0.2), scale: 1.13, speed: 1.1 },
      { color: COLORS.coral, position: new THREE.Vector3(1.87, -0.72, 0.1), scale: 0.92, speed: -0.86 },
      { color: COLORS.lilac, position: new THREE.Vector3(0.56, 1.55, -0.5), scale: 0.72, speed: 1.28 },
    ];
    const nodes = nodeSpecs.map((spec) => {
      const material = new THREE.MeshStandardMaterial({ color: spec.color, roughness: 0.38, metalness: 0.08, flatShading: true });
      const mesh = new THREE.Mesh(nodeGeometry, material);
      mesh.position.copy(spec.position);
      mesh.scale.setScalar(spec.scale);
      orbit.add(mesh);
      return { mesh, speed: spec.speed, originalY: spec.position.y };
    });

    const linkPoints = [
      new THREE.Vector3(-2.06, 0.72, 0.2),
      new THREE.Vector3(-0.8, 1.38, -0.22),
      new THREE.Vector3(0.56, 1.55, -0.5),
      new THREE.Vector3(1.22, 0.4, -0.08),
      new THREE.Vector3(1.87, -0.72, 0.1),
    ];
    const curve = new THREE.CatmullRomCurve3(linkPoints, false, "catmullrom", 0.3);
    const link = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(90)),
      new THREE.LineBasicMaterial({ color: COLORS.paper, transparent: true, opacity: 0.48 }),
    );
    orbit.add(link);

    const isCompact = window.matchMedia("(max-width: 760px)").matches;
    const particleCount = isCompact ? 68 : 132;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 1.8 + Math.random() * 3.6;
      const angle = Math.random() * Math.PI * 2;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = Math.sin(angle) * radius * 0.65;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 2.7;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: COLORS.paper, size: isCompact ? 0.024 : 0.034, transparent: true, opacity: 0.62, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    world.add(particles);

    const targetPointer = new THREE.Vector2();
    const pointer = new THREE.Vector2();
    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      targetPointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      targetPointer.y = -((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    host.addEventListener("pointermove", onPointerMove, { passive: true });

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, isCompact ? 1.25 : 1.65);
      camera.aspect = Math.max(width / Math.max(height, 1), 0.1);
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const clock = new THREE.Clock();
    let frameId = 0;
    let isVisible = false;
    const renderFrame = () => {
      if (!isVisible) return;
      const elapsed = clock.getElapsedTime();
      pointer.lerp(targetPointer, 0.045);
      world.rotation.y = THREE.MathUtils.lerp(world.rotation.y, -0.34 + pointer.x * 0.19, 0.04);
      world.rotation.x = THREE.MathUtils.lerp(world.rotation.x, -0.06 + pointer.y * 0.11, 0.04);
      orbit.rotation.y = elapsed * 0.18;
      ringOne.rotation.z = 0.42 + elapsed * 0.06;
      ringTwo.rotation.y = 0.72 - elapsed * 0.08;
      particles.rotation.z = elapsed * 0.018;
      nodes.forEach(({ mesh, speed, originalY }, index) => {
        mesh.rotation.x = elapsed * 0.42 * speed;
        mesh.rotation.y = elapsed * 0.61 * speed;
        mesh.position.y = originalY + Math.sin(elapsed * 0.78 + index * 1.7) * 0.12;
      });
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(renderFrame);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          clock.start();
          window.cancelAnimationFrame(frameId);
          frameId = window.requestAnimationFrame(renderFrame);
        } else {
          window.cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(host);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frameId);
      nodeGeometry.dispose();
      ringOne.geometry.dispose();
      ringOne.material.dispose();
      ringTwo.geometry.dispose();
      ringTwo.material.dispose();
      link.geometry.dispose();
      (link.material as THREE.Material).dispose();
      particleGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      nodes.forEach(({ mesh }) => (mesh.material as THREE.Material).dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reduceMotion]);

  return <div className="learning-constellation" ref={hostRef} aria-hidden="true" />;
}
