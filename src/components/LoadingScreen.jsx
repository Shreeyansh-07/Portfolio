import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const logs = [
  "> npm run build:shreeyansh-core",
  "✔ Found 12 custom microservices modules",
  "ℹ [Webpack] Compiling AST parse trees...",
  "ℹ [Spring Boot] Initializing Security Filter Chains...",
  "ℹ [JWT] Generating encryption signatures (RSA-256)...",
  "ℹ [Docker] Syncing container images (Node, MongoDB, Redis)...",
  "ℹ [AI-Module] Allocating tensor GPU memory buffers...",
  "ℹ [AI-Module] Hydrating neural weight vectors...",
  "ℹ [Vector-DB] Initializing cosine similarity search index...",
  "✔ Compiled successfully (Ready to launch viewport)"
]

export default function LoadingScreen() {
  const [visibleLogs, setVisibleLogs] = useState([])

  useEffect(() => {
    // Reset state explicitly on mount
    setVisibleLogs([{ id: 0, text: logs[0] }])
    let currentIndex = 0

    const logInterval = setInterval(() => {
      currentIndex++
      if (currentIndex < logs.length) {
        setVisibleLogs((current) => [...current, { id: currentIndex, text: logs[currentIndex] }].slice(-4)) // show last 4 logs
      } else {
        clearInterval(logInterval)
      }
    }, 200)

    return () => clearInterval(logInterval)
  }, [])

  // Outer cube transformation coordinates
  const outerCubeFaces = [
    { transform: "rotateY(0deg) translateZ(60px)", label: "</>" },
    { transform: "rotateY(90deg) translateZ(60px)", label: "React" },
    { transform: "rotateY(180deg) translateZ(60px)", label: "Java" },
    { transform: "rotateY(-90deg) translateZ(60px)", label: "Docker" },
    { transform: "rotateX(90deg) translateZ(60px)", label: "AI" },
    { transform: "rotateX(-90deg) translateZ(60px)", label: "MongoDB" }
  ]

  // Inner cube transformation coordinates (smaller, spins opposite way)
  const innerCubeFaces = [
    { transform: "rotateY(0deg) translateZ(30px)", label: "1" },
    { transform: "rotateY(90deg) translateZ(30px)", label: "0" },
    { transform: "rotateY(180deg) translateZ(30px)", label: "1" },
    { transform: "rotateY(-90deg) translateZ(30px)", label: "0" },
    { transform: "rotateX(90deg) translateZ(30px)", label: "{" },
    { transform: "rotateX(-90deg) translateZ(30px)", label: "}" }
  ]

  return (
    <div className="fixed inset-0 z-50 bg-[#0C0C0C] flex flex-col items-center justify-center font-mono select-none overflow-hidden text-[#D7E2EA]">
      {/* Background Matrix/Code Scanning Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Radial overlay glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(118,33,176,0.12)_0%,rgba(12,12,12,0.95)_70%)] pointer-events-none" />

      {/* Floating abstract code characters fading down in background */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-between px-10 pointer-events-none opacity-[0.06] text-xs">
        {Array.from({ length: 12 }).map((_, colIdx) => (
          <div
            key={colIdx}
            className="flex flex-col gap-2 animate-[pulse_3s_infinite_ease-in-out]"
            style={{ animationDelay: `${colIdx * 0.25}s` }}
          >
            {["import { useState }", "const api = '/'", "const db = mongo", "docker-compose.yml", "gradlew build", "mvn clean install", "tf.tensor2d()", "npm run start", "const ai = true"][colIdx % 9]}
          </div>
        ))}
      </div>

      {/* Header title */}
      <div className="text-center mb-10 z-10">
        <h2 className="text-[#D7E2EA] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase opacity-85 mb-1">
          System Initialization
        </h2>
        <span className="text-[10px] text-[#B600A8] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 animate-pulse">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
          Dev Core Loading
        </span>
      </div>

      {/* 3D Holographic Nested Compiler Core */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-12" style={{ perspective: "1200px" }}>
        
        {/* Glowing surrounding laser orbit rings */}
        <div className="absolute w-56 h-56 border border-cyan-500/10 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none" />
        <div className="absolute w-48 h-48 border border-[#B600A8]/15 border-dashed rounded-full animate-[spin_6s_linear_infinite_reverse] pointer-events-none" />

        {/* Dynamic developer code ring orbiting the core */}
        <div className="absolute w-[280px] h-[280px] border-t border-[#7621B0]/20 rounded-full animate-[spin_18s_linear_infinite] flex items-center justify-center text-[8px] text-cyan-400/30 uppercase tracking-[0.3em] pointer-events-none">
          <span className="absolute -top-1">{"const developer = 'shreeyansh'"}</span>
          <span className="absolute -bottom-1">await compile_workspace()</span>
        </div>

        {/* Outer 3D Holographic Cube */}
        <motion.div
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 180] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          {outerCubeFaces.map((face, index) => (
            <div
              key={`outer-${index}`}
              style={{ ...face, position: "absolute" }}
              className="w-32 h-32 border border-[#B600A8]/30 bg-[#120017]/25 backdrop-blur-[2px] shadow-[0_0_20px_rgba(181,1,167,0.15)] rounded-md flex flex-col items-center justify-center gap-1.5 transition-all duration-300"
            >
              {/* Corner tech marks */}
              <div className="absolute top-1 left-1.5 text-[6px] text-pink-500/35">SYS</div>
              <div className="absolute bottom-1 right-1.5 text-[6px] text-pink-500/35">0x{index * 12}</div>
              
              <span className="text-[11px] text-cyan-400/90 font-bold uppercase tracking-wider">
                {face.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Inner 3D Holographic Cube - spinning opposite direction */}
        <motion.div
          style={{ transformStyle: "preserve-3d", position: "absolute" }}
          animate={{ rotateX: [360, 0], rotateY: [0, -360], rotateZ: [180, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 flex items-center justify-center"
        >
          {innerCubeFaces.map((face, index) => (
            <div
              key={`inner-${index}`}
              style={{ ...face, position: "absolute" }}
              className="w-16 h-16 border border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.2)] rounded-sm flex items-center justify-center"
            >
              <span className="text-[10px] text-pink-400 font-bold">
                {face.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Cyberpunk progress line */}
      <div className="w-72 h-1 bg-[#15041a] rounded-full overflow-hidden mb-8 relative border border-white/5 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-[#7621B0] to-[#B600A8]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
        {/* Glow indicator */}
        <div className="absolute top-0 right-0 bottom-0 w-3 bg-white blur-[2px] animate-pulse" />
      </div>

      {/* Scrolling Compiler logs terminal */}
      <div className="w-80 sm:w-96 h-28 bg-black/60 border border-[#D7E2EA]/10 rounded-lg p-3 overflow-hidden flex flex-col justify-end gap-1 shadow-2xl backdrop-blur-md">
        <div className="text-[10px] text-[#D7E2EA]/30 border-b border-[#D7E2EA]/10 pb-1.5 mb-1.5 flex justify-between font-mono">
          <span>TERMINAL STACK</span>
          <span>BAUD_RATE 115200</span>
        </div>
        <div className="flex-1 flex flex-col justify-end gap-1">
          <AnimatePresence initial={false}>
            {visibleLogs.map((log) => (
              <motion.p
                key={log.id}
                initial={{ opacity: 0, x: -10, y: 5 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className={`text-[10px] sm:text-xs leading-none font-mono tracking-wide ${
                  log.text.startsWith("✔")
                    ? "text-emerald-400 font-bold"
                    : log.text.startsWith(">")
                    ? "text-cyan-400"
                    : log.text.startsWith("ℹ")
                    ? "text-[#D7E2EA]/75"
                    : "text-amber-400"
                }`}
              >
                {log.text}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
