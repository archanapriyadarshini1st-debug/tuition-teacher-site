/**
 * DESIGN REMINDER — The Learning Brief / Three.js learning solar system
 * This is an unmistakable, editorial solar system: a warm learning sun, orbital paths,
 * and distinct planets. It visualises subjects circling a shared understanding, rather
 * than reading as a generic field of floating decorative nodes.
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
  sky: 0xb5ddf5,
  paper: 0xfcfaf5,
  forest: 0x143b20,
};

type OrbitingPlanet = {
  orbit: THREE.Group;
  mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
  speed: number;
  pulse: number;
};

export default function LearningConstellation({ reduceMotion }: LearningConstellationProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduceMotion || !window.WebGLRenderingContext) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.05, 8.7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setClearColor(COLORS.forest, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.className = "learning-constellation-canvas learning-solar-system-canvas";
    host.appendChild(renderer.domElement);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const world = new THREE.Group();
    world.rotation.set(-0.12, -0.2, 0.02);
    scene.add(world);

    const ambient = new THREE.AmbientLight(COLORS.paper, 1.28);
    const sunLight = new THREE.PointLight(COLORS.lime, 23, 13);
    sunLight.position.set(0, 0.2, 3.6);
    const coralLight = new THREE.PointLight(COLORS.coral, 10, 10);
    coralLight.position.set(2.8, -1.8, 2.8);
    scene.add(ambient, sunLight, coralLight);

    const solarSystem = new THREE.Group();
    world.add(solarSystem);

    const sunGeometry = new THREE.IcosahedronGeometry(0.68, 4);
    geometries.push(sunGeometry);
    const sunMaterial = new THREE.MeshStandardMaterial({ color: COLORS.lime, emissive: COLORS.lime, emissiveIntensity: 0.72, roughness: 0.38, metalness: 0.02, flatShading: true });
    materials.push(sunMaterial);
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    solarSystem.add(sun);

    const glowGeometry = new THREE.SphereGeometry(1, 32, 32);
    geometries.push(glowGeometry);
    const glowMaterial = new THREE.MeshBasicMaterial({ color: COLORS.lime, transparent: true, opacity: 0.105, depthWrite: false, blending: THREE.AdditiveBlending });
    materials.push(glowMaterial);
    const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    sunGlow.scale.setScalar(1.65);
    solarSystem.add(sunGlow);

    const coronaGeometry = new THREE.TorusGeometry(0.96, 0.012, 4, 96);
    geometries.push(coronaGeometry);
    const coronaMaterial = new THREE.MeshBasicMaterial({ color: COLORS.paper, transparent: true, opacity: 0.62, depthWrite: false });
    materials.push(coronaMaterial);
    const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
    corona.rotation.set(0.34, 0.11, 0.18);
    solarSystem.add(corona);

    const orbitRadii = [1.42, 2.12, 2.92];
    const orbitTilts = [0.58, -0.3, 0.21];
    orbitRadii.forEach((radius, index) => {
      const geometry = new THREE.TorusGeometry(radius, 0.012, 4, 128);
      const material = new THREE.MeshBasicMaterial({ color: index === 1 ? COLORS.lilac : COLORS.paper, transparent: true, opacity: index === 1 ? 0.38 : 0.28, depthWrite: false });
      geometries.push(geometry);
      materials.push(material);
      const orbit = new THREE.Mesh(geometry, material);
      orbit.rotation.set(orbitTilts[index], index === 1 ? 0.24 : -0.12, index === 1 ? -0.48 : 0.16);
      solarSystem.add(orbit);
    });

    const createPlanet = (radius: number, angle: number, size: number, color: number, speed: number, tilt: number, ringed = false): OrbitingPlanet => {
      const orbit = new THREE.Group();
      orbit.rotation.set(tilt, 0, angle);
      solarSystem.add(orbit);

      const planetGeometry = new THREE.IcosahedronGeometry(size, 3);
      const planetMaterial = new THREE.MeshStandardMaterial({ color, roughness: 0.43, metalness: 0.08, flatShading: true });
      geometries.push(planetGeometry);
      materials.push(planetMaterial);
      const mesh = new THREE.Mesh(planetGeometry, planetMaterial);
      mesh.position.set(radius, 0, 0);
      orbit.add(mesh);

      if (ringed) {
        const ringGeometry = new THREE.TorusGeometry(size * 1.58, size * 0.052, 4, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: COLORS.paper, transparent: true, opacity: 0.82, depthWrite: false });
        geometries.push(ringGeometry);
        materials.push(ringMaterial);
        const rings = new THREE.Mesh(ringGeometry, ringMaterial);
        rings.rotation.set(1.15, 0.12, -0.18);
        mesh.add(rings);
      }

      return { orbit, mesh, speed, pulse: angle };
    };

    const planets = [
      createPlanet(1.42, 0.84, 0.22, COLORS.coral, 0.72, 0.58),
      createPlanet(2.12, 3.06, 0.33, COLORS.sky, -0.42, -0.3),
      createPlanet(2.92, 4.8, 0.39, COLORS.lilac, 0.25, 0.21, true),
    ];

    const isCompact = window.matchMedia("(max-width: 760px)").matches;
    const starCount = isCompact ? 54 : 106;
    const starPositions = new Float32Array(starCount * 3);
    for (let index = 0; index < starCount; index += 1) {
      const radius = 3.7 + Math.random() * 2.9;
      const angle = Math.random() * Math.PI * 2;
      starPositions[index * 3] = Math.cos(angle) * radius;
      starPositions[index * 3 + 1] = Math.sin(angle) * radius * 0.68;
      starPositions[index * 3 + 2] = -1.6 + Math.random() * 1.1;
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    geometries.push(starsGeometry);
    const starsMaterial = new THREE.PointsMaterial({ color: COLORS.paper, size: isCompact ? 0.022 : 0.03, transparent: true, opacity: 0.5, depthWrite: false });
    materials.push(starsMaterial);
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    world.add(stars);

    const pointerTarget = new THREE.Vector2();
    const pointer = new THREE.Vector2();
    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerTarget.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerTarget.y = -((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    host.addEventListener("pointermove", onPointerMove, { passive: true });

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      camera.aspect = Math.max(width / Math.max(height, 1), 0.1);
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isCompact ? 1.25 : 1.65));
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
      pointer.lerp(pointerTarget, 0.045);
      world.rotation.y = THREE.MathUtils.lerp(world.rotation.y, -0.2 + pointer.x * 0.18, 0.04);
      world.rotation.x = THREE.MathUtils.lerp(world.rotation.x, -0.12 + pointer.y * 0.1, 0.04);
      sun.rotation.y = elapsed * 0.5;
      sun.rotation.x = elapsed * 0.22;
      sunGlow.scale.setScalar(1.62 + Math.sin(elapsed * 1.55) * 0.07);
      corona.rotation.z = 0.18 + elapsed * 0.11;
      stars.rotation.z = elapsed * 0.012;
      planets.forEach(({ orbit, mesh, speed, pulse }) => {
        orbit.rotation.z += 0.0042 * speed;
        mesh.rotation.x = elapsed * 0.65 * speed;
        mesh.rotation.y = elapsed * 0.9 * speed;
        mesh.scale.setScalar(1 + Math.sin(elapsed * 1.3 + pulse) * 0.025);
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
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reduceMotion]);

  return <div className="learning-constellation" ref={hostRef} aria-hidden="true" />;
}
