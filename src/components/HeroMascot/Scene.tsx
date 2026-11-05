import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasDiv.current) return;

    // Track if this effect instance is still active (guards against StrictMode double-invoke)
    let mounted = true;

    const el = canvasDiv.current;
    const rect = el.getBoundingClientRect();
    const fallbackWidth = el.offsetWidth || 400;
    const fallbackHeight = el.offsetHeight || 400;
    const container = {
      width: rect.width > 0 ? rect.width : fallbackWidth,
      height: rect.height > 0 ? rect.height : fallbackHeight,
    };
    const aspect = container.width / container.height;

    // === Scene Setup ===
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    el.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(16, aspect, 0.1, 1000);
    camera.position.set(0, 11.5, 26);
    camera.zoom = 1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: any | null = null;
    let mixer: THREE.AnimationMixer | undefined;
    let animationFrameId: number;

    const clock = new THREE.Clock();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 10, 0);
    controls.update();

    const light = setLighting(scene);
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter()
      .then((gltf) => {
        // Abort if this effect was cleaned up
        if (!mounted) return;
        if (gltf) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          const character = gltf.scene;

          scene.add(character);
          headBone = character.getObjectByName("spine.006") || null;
          screenLight = character.getObjectByName("screenlight") || null;

          setTimeout(() => {
            if (!mounted) return;
            light.turnOnLights();
            animations.startIntro();
          }, 500);

          window.addEventListener("resize", onResize);

          function onResize() {
            handleResize(renderer, camera, canvasDiv, character);
          }
        }
      })
      .catch((err) => {
        console.error("[HeroMascot] Failed to load 3D character:", err);
      });

    // === Mouse / Touch Handlers ===
    let mouse = { x: 0, y: 0 },
      interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    let debounce: number | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    // === Animation Loop ===
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        if (screenLight) {
          light.setPointLight(screenLight);
        }
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // === Cleanup ===
    return () => {
      mounted = false;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(debounce);

      scene.clear();
      controls.dispose();
      renderer.dispose();

      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", () =>
        handleResize(renderer, camera, canvasDiv, new THREE.Object3D())
      );
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      if (el && el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative" ref={canvasDiv}>
      <div className="absolute inset-0 z-10 rounded-full" ref={hoverDivRef}></div>
    </div>
  );
};

export default Scene;
