import { useRef, Suspense, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Center } from "@react-three/drei"

// Workaround for Three.js texture blob decoding issues in some browser environments.
// By disabling window.createImageBitmap, we force Three.js to use the standard, fully compatible
// HTML Image element loading pathway, resolving "Couldn't load texture blob" errors.
if (typeof window !== "undefined" && window.createImageBitmap) {
  window.createImageBitmap = undefined
}

function Model({ progressRef }) {
  const modelRef = useRef()
  // Load the user's GLB model from public folder
  const { scene } = useGLTF("/Hitem3d-1782459059671.glb")
  const smoothedScroll = useRef(0)

  const lastOpacity = useRef(-1)

  // Configure materials for transparency and depth writing once on mount
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const materials = Array.isArray(child.material) ? child.material : [child.material]
        materials.forEach((mat) => {
          if (mat) {
            mat.transparent = true
            mat.depthWrite = true
          }
        })
      }
    })
  }, [scene])

  // Define keyframe points for positions, rotations, scales, and opacities.
  // The progress goes from 0.0 (Recognitions starts entering viewport) to 1.0 (Contact section bottom reached)
  const keyframes = [
    {
      progress: 0.0, // Start of wrapper (entering screen)
      position: [2.5, 0.5, -2],
      rotation: [0, 0, 0],
      scale: 0.8,
      opacity: 0
    },
    {
      progress: 0.15, // Recognitions content (empty space is on the right)
      position: [2.0, 0, 0.5],
      rotation: [0.1, 0.4, 0.1],
      scale: 1.4,
      opacity: 1
    },
    {
      progress: 0.4, // Tech Stack starts (empty space is on the right)
      position: [2.2, 0.8, 0.5],
      rotation: [0.1, 0.2, 0.1],
      scale: 1.1,
      opacity: 1
    },
    {
      progress: 0.65, // Tech Stack stays on the right side
      position: [2.2, -0.8, 0.5],
      rotation: [0.4, 3.14, 0.4],
      scale: 1.5,
      opacity: 1
    },
    {
      progress: 0.8, // Why Choose Me (empty space is on the left)
      position: [-2.0, 0, 0.5],
      rotation: [-0.1, 4.0, -0.1],
      scale: 1.4,
      opacity: 1
    },
    {
      progress: 0.9, // Start of Contact section (stay left)
      position: [-2.0, -0.8, 0.5],
      rotation: [0.0, 5.0, 0.0],
      scale: 1.5,
      opacity: 1
    },
    {
      progress: 1.0, // Contact / Footer section (centered spotlight under text)
      position: [0, 0.1, 0.8],
      rotation: [0.2, 6.28, 0.2],
      scale: 2.0,
      opacity: 1
    }
  ]

  // Cubic Ease In Out function for smooth transitions between keyframes
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  // Get interpolated values based on current scroll progress
  const getInterpolatedValues = (p) => {
    const progress = Math.max(0, Math.min(1, p))

    // Find the current keyframe interval
    let startIndex = 0
    for (let i = 0; i < keyframes.length - 1; i++) {
      if (progress >= keyframes[i].progress && progress <= keyframes[i + 1].progress) {
        startIndex = i
        break
      }
    }

    const start = keyframes[startIndex]
    const end = keyframes[startIndex + 1]

    // Local interpolation factor
    const range = end.progress - start.progress
    const localT = range === 0 ? 0 : (progress - start.progress) / range
    const easedT = easeInOutCubic(localT)

    // Interpolate position
    const position = [
      start.position[0] + (end.position[0] - start.position[0]) * easedT,
      start.position[1] + (end.position[1] - start.position[1]) * easedT,
      start.position[2] + (end.position[2] - start.position[2]) * easedT
    ]

    // Interpolate rotation
    const rotation = [
      start.rotation[0] + (end.rotation[0] - start.rotation[0]) * easedT,
      start.rotation[1] + (end.rotation[1] - start.rotation[1]) * easedT,
      start.rotation[2] + (end.rotation[2] - start.rotation[2]) * easedT
    ]

    // Interpolate scale
    const scale = start.scale + (end.scale - start.scale) * easedT

    // Interpolate opacity
    const opacity = start.opacity + (end.opacity - start.opacity) * easedT

    return { position, rotation, scale, opacity }
  }

  useFrame((state) => {
    if (!modelRef.current) return

    // Get current raw scroll progress from progressRef
    const rawScroll = progressRef.current

    // Smooth scroll interpolation (lerp) for momentum / damping
    smoothedScroll.current += (rawScroll - smoothedScroll.current) * 0.05

    const { position, rotation, scale, opacity } = getInterpolatedValues(smoothedScroll.current)

    // Apply floating (subtle sinusoidal vertical/horizontal oscillations) and majestic rotation
    const time = state.clock.getElapsedTime()
    const floatY = Math.sin(time * 1.5) * 0.08
    const floatX = Math.cos(time * 1.0) * 0.05
    const majesticRotationY = time * 0.1

    // Update coordinates smoothly using lerp
    modelRef.current.position.x += (position[0] + floatX - modelRef.current.position.x) * 0.08
    modelRef.current.position.y += (position[1] + floatY - modelRef.current.position.y) * 0.08
    modelRef.current.position.z += (position[2] - modelRef.current.position.z) * 0.08

    modelRef.current.scale.x += (scale - modelRef.current.scale.x) * 0.08
    modelRef.current.scale.y += (scale - modelRef.current.scale.y) * 0.08
    modelRef.current.scale.z += (scale - modelRef.current.scale.z) * 0.08

    modelRef.current.rotation.x += (rotation[0] - modelRef.current.rotation.x) * 0.08
    modelRef.current.rotation.y += (rotation[1] + majesticRotationY - modelRef.current.rotation.y) * 0.08
    modelRef.current.rotation.z += (rotation[2] - modelRef.current.rotation.z) * 0.08

    // Dynamically update transparency, opacity, and visibility of all child mesh materials only on change
    if (opacity !== lastOpacity.current) {
      lastOpacity.current = opacity
      scene.traverse((child) => {
        if (child.isMesh) {
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach((mat) => {
            if (mat) {
              mat.opacity = opacity
              mat.visible = opacity > 0 // skip GPU draw calls when invisible
            }
          })
        }
      })
    }
  })

  return (
    <group ref={modelRef}>
      <primitive object={scene} />
    </group>
  )
}

export default function Scroll3DScene() {
  const [isVisible, setIsVisible] = useState(false)
  const progressRef = useRef(0)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("interactive-3d-container")
      if (!element) return

      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // starts when top of container reaches bottom of viewport,
      // ends when bottom of container reaches bottom of viewport.
      const start = rect.top - viewportHeight
      const totalRange = rect.height - viewportHeight
      
      let progress = -start / totalRange
      progress = Math.max(0, Math.min(1, progress))

      // Is visible when the container is in the viewport
      const visible = rect.top < viewportHeight && rect.bottom > 0
      
      progressRef.current = progress
      
      if (visible !== isVisibleRef.current) {
        isVisibleRef.current = visible
        setIsVisible(visible)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Keep Canvas mounted to prevent stutters, but toggle CSS visibility to save GPU resources
  const visibilityStyle = isVisible ? "visible" : "hidden"

  return (
    <div 
      style={{ zIndex: 10, visibility: visibilityStyle }}
      className="fixed inset-0 w-full h-full pointer-events-none hidden md:block"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          precision: "mediump"
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} />
        <directionalLight position={[-10, 5, -5]} intensity={0.6} />
        <pointLight position={[0, -5, 5]} intensity={1.0} color="#06b6d4" />
        <pointLight position={[5, 5, -5]} intensity={1.2} color="#B600A8" />
        
        <Suspense fallback={null}>
          <Center>
            <Model progressRef={progressRef} />
          </Center>
        </Suspense>
      </Canvas>
    </div>
  )
}

// Programmatic background preloading function
export function preload3DModel() {
  if (typeof window !== "undefined") {
    useGLTF.preload("/Hitem3d-1782459059671.glb")
  }
}
