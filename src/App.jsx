import { useEffect, useRef, useState } from "react"
import LoadingScreen from "./components/LoadingScreen"

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const ease = value => value * value * (3 - 2 * value)
const words = ["starlight", "gravity", "orbit", "infinity"]

const aboutItems = [
  {
    n: "01",
    kicker: "Who I am",
    lead: "I am a Computer Engineering student and Full Stack Developer focused on building scalable, secure, and intelligent software.",
    body: "My interests span backend engineering, AI systems, cloud technologies, and modern web development. I enjoy transforming ambitious ideas into products that solve meaningful real-world problems.",
  },
  {
    n: "02",
    kicker: "What I've built",
    lead: "Over the past few years, I've built AI-powered platforms, secure web applications, and distributed backend systems while continuously improving my problem-solving skills through competitive programming and hackathons.",
  },
  {
    n: "03",
    kicker: "Off the clock",
    lead: "Outside of coding, I enjoy learning new technologies, participating in hackathons, and exploring scalable software architecture.",
  },
]

const highlights = [
  { value: 6, suffix: "+", label: "Hackathon + paper presentation wins" },
  { value: 150, suffix: "+", label: "LeetCode problems solved" },
  { value: 10, suffix: "+", label: "Major projects built" },
  { value: 3, suffix: "+", label: "Years of programming experience" },
  { value: 100, suffix: "%", label: "Passion for learning" },
]

const services = [
  {
    n: "01",
    cat: "SY-03.1",
    title: "Full Stack Development",
    desc: "Designing modern web applications using React, Node.js, Spring Boot, Express, and MongoDB with clean architecture and responsive user experiences.",
    colors: ["#6a5634", "#2a2117", "#d9a85f"],
    icon: "code",
  },
  {
    n: "02",
    cat: "SY-03.2",
    title: "Cloud & System Design",
    desc: "Architecting secure databases, Dockerized deployments, CI/CD pipelines, and scalable cloud infrastructure for production-ready applications.",
    colors: ["#3c3f80", "#17183a", "#7d8ae0"],
    icon: "cloud",
  },
  {
    n: "03",
    cat: "SY-03.3",
    title: "Frontend Engineering",
    desc: "Building responsive, visually engaging, and accessible web applications with modern UI technologies, smooth interactions, and optimized performance.",
    colors: ["#723430", "#2b1214", "#e07a62"],
    icon: "screen",
  },
  {
    n: "04",
    cat: "SY-03.4",
    title: "AI Application",
    desc: "Building AI-powered assistants, computer vision solutions, intelligent automation systems, and LLM integrations using Python, OpenCV, and modern AI APIs.",
    colors: ["#255953", "#0e2524", "#6fc9b4"],
    icon: "spark",
  },
]

const projects = [
  {
    title: "AI Wearable Pendant",
    short: ["AI WEARABLE", "PENDANT"],
    type: "Smart personal assistant",
    year: "2025",
    stack: ["Python", "OpenCV", "LLMs", "Audio processing"],
    color: "#f0c27a",
    ink: "#1a1612",
    ring: "ESP32-C3 · INMP441",
    quotes: [["Recognition", "Appreciation post on LinkedIn"], ["Highlight", "Meeting notes by voice"]],
    description: "A pendant built on an ESP32-C3 and an INMP441 microphone. It captures conversations, writes summaries, pulls out meeting notes and triggers automations by voice.",
    images: ["/pendant_product.png", "/pendant_usage.png", "/pendant_app.png"],
    link: "https://www.linkedin.com/posts/sripriyagn7_just-hired-an-intern-who-we-couldnt-say-activity-7398667806042574848-ciXF",
    linkLabel: "Appreciation post",
    tags: ["Capture", "Summarize", "Automate", "By voice"],
  },
  {
    title: "GovGenie AI Portal",
    short: ["GOV", "GENIE"],
    type: "AI government platform",
    year: "2026",
    stack: ["React · Node.js", "MongoDB", "Python · OpenCV", "Socket.io · Docker"],
    color: "#1d2357",
    ink: "#d4e157",
    ring: "OPENCV · SOCKET.IO",
    quotes: [["Highlight", "Aadhaar face verification"], ["Highlight", "Real-time agent chat"]],
    description: "A secure full-stack platform connecting citizens with verified agents using AI-powered verification, OCR, real-time communication, and intelligent document processing.",
    images: ["/govgenie_secure.png", "/govgenie_auth.png", "/govgenie_dashboard.png"],
    tags: ["Verify", "Communicate", "Process", "Secure"],
  },
  {
    title: "OpinionTrade",
    short: ["OPINION", "TRADE"],
    type: "Incentivized polling",
    year: "2025",
    stack: ["React · Node.js", "Express", "MongoDB", "REST API"],
    color: "#a8452c",
    ink: "#fbf3e6",
    ring: "REGISTERED COPYRIGHT",
    quotes: [["Recognition", "Registered copyright"], ["Highlight", "Live on the web"]],
    description: "A secure polling platform featuring authentication, voting systems, analytics, and scalable backend architecture, with rewards that make every opinion count.",
    images: ["/opiniontrade_polls.png", "/opiniontrade_coupons.png", "/opiniontrade_trading.png"],
    link: "https://opiniontrade.onrender.com/",
    linkLabel: "Live website",
    tags: ["Poll", "Vote", "Earn", "Analyse"],
  },
  {
    title: "3D Ball Trajectory",
    short: ["3D BALL", "TRAJECTORY"],
    type: "AI sports analytics",
    year: "2026",
    stack: ["Python · OpenCV", "YOLOv8 · LSTM", "PyTorch", "NumPy · SciPy"],
    color: "#1a2744",
    ink: "#e8f4f8",
    ring: "BE-3 MAJOR PROJECT",
    quotes: [["Highlight", "Monocular 3D reconstruction"], ["Recognition", "BE Major Project 2026-27"]],
    description: "A monocular computer vision system reconstructing the 3D trajectory of a cricket ball from a single camera using YOLOv8 detection, LSTM temporal tracking, physics-constrained optimization, and stump-based geometric calibration — enabling LBW analysis without Hawk-Eye infrastructure.",
    images: [],
    tags: ["Detect", "Track", "Reconstruct", "Analyse"],
  },
]

function ArrowIcon({ direction = "up-right" }) {
  const paths = {
    "up-right": "M7 17 17 7M8 7h9v9",
    right: "M5 12h14M13 6l6 6-6 6",
    up: "M12 19V5M6 11l6-6 6 6",
    left: "M19 12H5m6 6-6-6 6-6",
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[direction]} /></svg>
}

function ServiceIcon({ type }) {
  const paths = {
    code: "M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16",
    cloud: "M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 9.5 4.25 4.25 0 0 0 7 18Z",
    screen: "M3 5h18v11H3zM8 20h8M12 16v4",
    spark: "M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z",
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[type]} /></svg>
}

function Spaceship({ className = "" }) {
  return <g className={className}>
    <path className="ship-flame" d="M-25 0-39-6-34 0-39 6Z" fill="#f0c27a" />
    <path d="M-12-9-20-17-9-17 1-9ZM-12 9-20 17-9 17 1 9Z" fill="#17171b" stroke="#ecebe6" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M-17-9H9C20-9 27-4 31 0 27 4 20 9 9 9H-17C-20 9-22 6-22 3V-3C-22-6-20-9-17-9Z" fill="#17171b" stroke="#ecebe6" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M-5-9V9" stroke="rgba(236,235,230,.35)" />
    <circle cx="16" r="3.5" fill="#f0c27a" />
  </g>
}

// ─── Turntable Canvas (V3-matching: dawn sunrise intro + 3D stars) ─────────────
function TurntableCanvas({ progress = 0, dark = false, playing = true, onToggle, className = "", introActive = false }) {
  const canvasRef = useRef(null)
  const values = useRef({ progress, dark, playing, onToggle, introActive })
  values.current = { progress, dark, playing, onToggle, introActive }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    // 3D starfield (matching V3)
    const stars = Array.from({ length: 240 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.25 + .25,
      phase: Math.random() * Math.PI * 2, depth: Math.random() * .8 + .2,
    }))
    let raf
    let spin = 0
    let theme = values.current.dark ? 0 : 1
    let warp = 0
    let last = 0
    // Intro state
    let introT0 = null
    let introMix = 0   // 0=night, 1=day
    let deckAlpha = 0  // turntable deck fade-in
    let starAlpha = 0  // stars fade-in
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mix = (a, b, t) => a.map((value, index) => Math.round(value + (b[index] - value) * t))
    const sm = v => v * v * (3 - 2 * v)
    const cl = v => Math.max(0, Math.min(1, v))
    const rounded = (x, y, w, h, r) => {
      ctx.beginPath()
      ctx.roundRect(x, y, w, h, r)
    }

    // Draw dawn/sunrise glow matching V3's drawDawn
    const drawDawn = (w, h, p) => {
      const b = Math.sin(Math.PI * p)
      if (b < 0.01) return
      const cx = w * 0.5, cy = h * (1.2 - 0.5 * p), r = Math.max(w, h) * (0.55 + 0.45 * p)
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      g.addColorStop(0, `rgba(255,214,150,${0.78 * b})`)
      g.addColorStop(0.35, `rgba(244,150,96,${0.4 * b})`)
      g.addColorStop(0.7, `rgba(122,84,150,${0.16 * b})`)
      g.addColorStop(1, "rgba(122,84,150,0)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
      // Horizon line
      const hy = h * (1 - 0.1 * p)
      const lg = ctx.createLinearGradient(0, 0, w, 0)
      lg.addColorStop(0, "rgba(255,226,180,0)")
      lg.addColorStop(0.5, `rgba(255,226,180,${0.9 * b})`)
      lg.addColorStop(1, "rgba(255,226,180,0)")
      ctx.fillStyle = lg
      ctx.fillRect(0, hy, w, 1.2)
    }

    const drawRecord = (cx, cy, radius, scale, light, alpha = 1) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.shadowColor = `rgba(0,0,0,${.5 - light * .2})`
      ctx.shadowBlur = 28
      ctx.shadowOffsetY = 16
      ctx.fillStyle = "#121114"
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowColor = "transparent"
      const step = Math.max(2, 2.2 * scale)
      for (let r = radius * .36; r < radius * .99; r += step) {
        ctx.strokeStyle = `rgba(255,255,255,${.035 + .02 * Math.sin(r) ** 2})`
        ctx.lineWidth = Math.min(2, .8 + scale * .04)
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.stroke()
      }
      const sheen = ctx.createConicGradient?.(spin, cx, cy)
      if (sheen) {
        sheen.addColorStop(0, "rgba(255,255,255,0)")
        sheen.addColorStop(.08, "rgba(255,255,255,.14)")
        sheen.addColorStop(.17, "rgba(255,255,255,0)")
        sheen.addColorStop(.55, "rgba(255,255,255,.09)")
        sheen.addColorStop(.68, "rgba(255,255,255,0)")
        sheen.addColorStop(1, "rgba(255,255,255,0)")
        ctx.fillStyle = sheen
        ctx.beginPath()
        ctx.arc(cx, cy, radius * .98, 0, Math.PI * 2)
        ctx.arc(cx, cy, radius * .35, 0, Math.PI * 2, true)
        ctx.fill()
      }
      const label = radius * .34
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(spin)
      ctx.fillStyle = light > .45 ? "#c47028" : "#f0c27a"
      ctx.beginPath()
      ctx.arc(0, 0, label, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "rgba(18,17,20,.88)"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.font = `italic ${Math.max(10, label * .34)}px 'Instrument Serif', serif`
      ctx.fillText("S/Y", 0, label * .3)
      ctx.font = `500 ${Math.max(6, label * .105)}px 'IBM Plex Mono', monospace`
      const text = "SHREEYANSH · SIDE A · 33⅓ RPM · "
      for (let i = 0; i < text.length; i++) {
        ctx.save()
        ctx.rotate(i / text.length * Math.PI * 2)
        ctx.fillText(text[i], 0, -label * .78)
        ctx.restore()
      }
      ctx.fillRect(-label * .43, -label * .05, label * .86, 1)
      ctx.restore()
      ctx.fillStyle = "#c8c6c0"
      ctx.beginPath()
      ctx.arc(cx, cy, Math.max(2.5, radius * .024), 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const draw = time => {
      raf = requestAnimationFrame(draw)
      if (time - last < 1000 / 60) return
      last = time
      const rect = canvas.getBoundingClientRect()
      if (rect.bottom < -50 || rect.top > innerHeight + 50 || !rect.width || !rect.height) return
      const dpr = Math.min(devicePixelRatio || 1, 2)
      const w = rect.width
      const h = rect.height
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const current = values.current
      const isIntro = current.introActive

      // ── Intro animation step ──
      if (isIntro) {
        if (introT0 === null) introT0 = time
        const e = (time - introT0) / 1000
        const io = v => v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2
        starAlpha = io(cl(e / 1.0))
        deckAlpha = io(cl((e - 0.3) / 0.8))
        // Sunrise: starts at 1.2s, peaks around 2.9s
        introMix = io(cl((e - 1.2) / 1.7))
        theme += (introMix - theme) * 0.08
      } else {
        // After intro: smoothly target actual dark prop
        introT0 = null
        starAlpha = 1
        deckAlpha = 1
        theme += ((current.dark ? 0 : 1) - theme) * .045
      }

      const p = current.progress
      const zoom = ease(clamp((p - .07) / .84))
      const bg = mix([3, 3, 4], [243, 238, 228], theme)
      const ink = mix([236, 235, 230], [31, 28, 24], theme)

      ctx.fillStyle = `rgb(${bg})`
      ctx.fillRect(0, 0, w, h)

      // Dawn sunrise overlay during intro
      if (isIntro && introMix > 0) {
        drawDawn(w, h, introMix)
      }

      warp *= .96
      // Stars with intro fade-in alpha
      const sA = isIntro ? starAlpha : 1
      for (const star of stars) {
        const alpha = (.25 + .55 * Math.sin(time * .0015 + star.phase) ** 2) * (1 - zoom * .65) * sA
        const drift = reduce ? 0 : (time * .000004 * star.depth + warp * .02) % 1
        const x = ((star.x + drift) % 1) * w
        const y = star.y * h
        ctx.fillStyle = `rgba(${ink},${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, star.r * (1 + warp * 3), 0, Math.PI * 2)
        ctx.fill()
      }

      const wide = w > 860
      const size = wide ? Math.min(w * .36, h * .64) : Math.min(w * .72, h * .32)
      const boxH = size * .78
      const x = wide ? w * .72 - size / 2 : (w - size) / 2
      const y = wide ? h * .5 - boxH / 2 : h * .11
      const radius = size * .33
      const rx = x + size * .4
      const ry = y + boxH / 2
      const px = x + size * .86
      const py = y + size * .13

      // Plinth: fade with intro deckAlpha
      const plinthAlpha = (isIntro ? deckAlpha : 1) * (1 - clamp(p / .09))
      if (plinthAlpha > .01) {
        ctx.save()
        ctx.globalAlpha = plinthAlpha
        // Slight slide-in during intro
        if (isIntro) ctx.translate(0, (1 - deckAlpha) * 24)
        ctx.shadowColor = "rgba(0,0,0,.35)"
        ctx.shadowBlur = size * .08
        ctx.shadowOffsetY = size * .03
        rounded(x, y, size, boxH, size * .035)
        ctx.fillStyle = theme > .5 ? "#e9e3d7" : "#18171b"
        ctx.fill()
        ctx.shadowColor = "transparent"
        ctx.strokeStyle = theme > .5 ? "#cdc5b6" : "#3c3a40"
        ctx.stroke()
        ctx.fillStyle = theme > .5 ? "#c4c0b8" : "#46444a"
        ctx.beginPath()
        ctx.arc(rx, ry, radius * 1.07, 0, Math.PI * 2)
        ctx.fill()
        for (let i = 0; i < 72; i++) {
          const a = i / 72 * Math.PI * 2 + spin
          ctx.fillStyle = "rgba(255,255,255,.35)"
          ctx.fillRect(rx + Math.cos(a) * radius * 1.035 - 1, ry + Math.sin(a) * radius * 1.035 - 1, 2, 2)
        }
        ctx.fillStyle = current.playing ? "#f0c27a" : `rgba(${ink},.25)`
        ctx.beginPath()
        ctx.arc(x + size * .06, y + boxH - size * .06, size * .009 + 1.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(${ink},.48)`
        ctx.font = `${Math.max(8, size * .022)}px 'IBM Plex Mono', monospace`
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(current.playing ? "33 RPM · PLAYING" : "33 RPM · STOPPED", x + size * .09, y + boxH - size * .06)
        const target = current.playing ? Math.atan2(ry - radius * .62 - py, rx + radius * .52 - px) : Math.PI / 2 - .05
        const armLength = Math.hypot(rx + radius * .52 - px, ry - radius * .62 - py)
        const ex = px + Math.cos(target) * armLength
        const ey = py + Math.sin(target) * armLength
        ctx.fillStyle = theme > .5 ? "#c4c0b8" : "#46444a"
        ctx.beginPath()
        ctx.arc(px, py, size * .055, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = theme > .5 ? "#f6f4ee" : "#8c8a90"
        ctx.lineWidth = Math.max(2.5, size * .012)
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(px - Math.cos(target) * size * .09, py - Math.sin(target) * size * .09)
        ctx.lineTo(ex, ey)
        ctx.stroke()
        ctx.save()
        ctx.translate(ex, ey)
        ctx.rotate(target + .5)
        ctx.fillRect(-size * .012, -size * .02, size * .07, size * .04)
        ctx.restore()
        ctx.restore()
      }

      if (!reduce && current.playing) spin += .022

      const endScale = Math.hypot(w, h) / Math.max(1, radius * .5)
      const scale = Math.pow(endScale, zoom)
      const cx = rx + (w / 2 - rx) * zoom
      const cy = ry + (h / 2 - ry) * zoom
      // Record fade-in during intro
      const recordAlpha = (isIntro ? Math.max(deckAlpha, 0.1) : 1) * (1 - clamp((p - .94) / .06))
      drawRecord(cx, cy, radius * scale, scale, theme, recordAlpha)

      if (p > .78) {
        ctx.fillStyle = `rgba(11,11,13,${clamp((p - .78) / .2)})`
        ctx.fillRect(0, 0, w, h)
      }
    }
    const pointer = event => {
      if (event.target.closest("a,button,input,textarea")) return
      const current = values.current
      if (current.progress > .02) return
      const rect = canvas.getBoundingClientRect()
      const wide = rect.width > 860
      const size = wide ? Math.min(rect.width * .36, rect.height * .64) : Math.min(rect.width * .72, rect.height * .32)
      const boxH = size * .78
      const x = wide ? rect.width * .72 - size / 2 : (rect.width - size) / 2
      const y = wide ? rect.height * .5 - boxH / 2 : rect.height * .11
      const lx = event.clientX - rect.left
      const ly = event.clientY - rect.top
      if (lx > x && lx < x + size && ly > y && ly < y + boxH) current.onToggle?.()
      else warp = 1
    }
    canvas.addEventListener("pointerdown", pointer)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener("pointerdown", pointer)
    }
  }, [])

  return <canvas ref={canvasRef} className={`turntable-canvas ${className}`} aria-hidden="true" />
}

function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    let ticking = false
    const update = () => {
      setScrollY(window.scrollY)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  return scrollY
}

function progressFor(ref, scrollY) {
  if (!ref.current) return 0
  const top = ref.current.getBoundingClientRect().top + scrollY
  return clamp((scrollY - top) / Math.max(1, ref.current.offsetHeight - innerHeight))
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: .18 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function CountUp({ value, suffix, active }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = now => {
      const p = clamp((now - start) / 1200)
      setCount(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, value])
  return <>{count}{suffix}</>
}

const STOP_NAMES = ["01 Who I am", "02 What I've built", "03 Off the clock"]

function FlightPath({ trackRef, stageRef, h2Ref, stopsRef }) {
  // SVG / DOM refs
  const layerRef   = useRef(null)
  const shipRef    = useRef(null)
  const calloutRef = useRef(null)
  const ghostARef  = useRef(null)
  const glowARef   = useRef(null)
  const coreARef   = useRef(null)
  const baseARef   = useRef(null) // hidden sampling path A
  const ghostBRef  = useRef(null)
  const glowBRef   = useRef(null)
  const coreBRef   = useRef(null)
  const baseBRef   = useRef(null) // hidden sampling path B
  const svgBRef    = useRef(null)

  // Mutable state (no re-renders needed)
  const dataRef = useRef({ A: null, B: null, anchor: 0, shipAng: 0, needLayout: true })

  // ── helpers ──────────────────────────────────────────────────────────────
  function samplePath(pathEl, d, step) {
    pathEl.setAttribute("d", d)
    const L = pathEl.getTotalLength()
    const n = Math.max(2, Math.ceil(L / step))
    const pts = []
    for (let i = 0; i <= n; i++) {
      const s = (i / n) * L
      const p = pathEl.getPointAtLength(s)
      pts.push({ x: p.x, y: p.y, s })
    }
    return { pts, L, n }
  }

  function wavePath(base, L) {
    const n = base.length - 1
    const out = []
    for (let i = 0; i <= n; i++) {
      const p = base[i]
      const a = base[Math.max(0, i - 1)]
      const b = base[Math.min(n, i + 1)]
      const dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy) || 1
      const nx = -dy / l, ny = dx / l
      const env = Math.max(0, Math.min(1, p.s / 140, (L - p.s) / 140))
      const amp = (1.2 + 6 * (0.5 + 0.5 * Math.sin(p.s * 0.009))) * env
      const off = amp * Math.sin(p.s * 2 * Math.PI / 64)
      out.push({ x: p.x + nx * off, y: p.y + ny * off })
    }
    return out
  }

  function dOf(pts) {
    return "M" + pts.map(p => p.x.toFixed(1) + " " + p.y.toFixed(1)).join(" L")
  }

  function atPath(P, fi) {
    const i = Math.max(0, Math.min(P.n, Math.floor(fi)))
    const j = Math.min(P.n, i + 1)
    const f = fi - i
    const a = P.pts[i], b = P.pts[j]
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, i }
  }

  function angAt(P, i) {
    const a = P.base[Math.max(0, i - 3)]
    const b = P.base[Math.min(P.n, i + 3)]
    return Math.atan2(b.y - a.y, b.x - a.x)
  }

  function layout() {
    const d = dataRef.current
    const stage = stageRef.current
    const h2    = h2Ref.current
    const stops = stopsRef.current
    const svgB  = svgBRef.current
    const baseA = baseARef.current
    const baseB = baseBRef.current
    if (!stage || !h2 || !stops || !svgB || !baseA || !baseB) return

    const vw = stage.clientWidth, vh = stage.clientHeight
    if (!vw || !vh) return
    d.needLayout = false

    const anchor = vh * 0.6
    d.anchor = anchor

    // Path A: swoop in, trace under h2 "About me", loop, descend to anchor
    const sr = stage.getBoundingClientRect()
    const r  = h2.getBoundingClientRect()
    const hL = r.left - sr.left
    const hR = r.right - sr.left
    const wy = r.bottom - sr.top + 10
    const xB = vw / 2
    const mid  = Math.max(wy + 40, (wy + anchor) / 2)
    const loop = Math.max(24, Math.min(160, vw - hR - 16))
    const dA =
      `M-90 ${vh * 0.08} C${vw * 0.12} ${vh * 0.02}, ${hL - 170} ${wy - 140}, ${hL - 30} ${wy}` +
      ` L${hR + 30} ${wy}` +
      ` C${hR + 30 + loop} ${wy}, ${hR + 30 + loop} ${mid}, ${hR + 10} ${mid}` +
      ` C${hR + 10 - (hR - xB) * 0.6} ${mid}, ${xB} ${mid + (anchor - mid) * 0.3}, ${xB} ${anchor}`

    const SA = samplePath(baseA, dA, 4)
    const waveA = wavePath(SA.pts, SA.L)
    const wdA = dOf(waveA)
    ghostARef.current?.setAttribute("d", dA)
    glowARef.current?.setAttribute("d", wdA)
    coreARef.current?.setAttribute("d", wdA)

    // compute h2-reveal fractions per point
    let mx = 0
    const rev = SA.pts.map(p => (mx = Math.max(mx, Math.max(0, Math.min(1, (p.x - hL) / Math.max(1, hR - hL))))))
    d.A = { base: SA.pts, pts: waveA, n: SA.n, rev }

    // Path B: anchor → each data-stop card → park at right edge
    const off  = vh - anchor
    const prR  = stops.getBoundingClientRect()
    const stopEls = Array.from(stops.querySelectorAll("[data-stop]")).map(el => {
      const b = el.getBoundingClientRect()
      return { x: b.left + b.width / 2 - prR.left, y: b.top + b.height / 2 - prR.top + off }
    })
    let dB = `M${xB} 0`, px = xB, py = 0
    for (const sp of stopEls) {
      const my = (py + sp.y) / 2
      dB += ` C${px} ${my}, ${sp.x} ${my}, ${sp.x} ${sp.y}`
      px = sp.x; py = sp.y
    }
    const ex = stops.querySelector("[data-exit]")
    const exitY = ex ? Math.max(py + 160, ex.getBoundingClientRect().top - prR.top + off - 70) : py + 360
    const parkX = vw - Math.max(56, Math.min(90, vw * 0.05))
    dB += ` C${px} ${py + (exitY - py) * 0.55}, ${px + (parkX - px) * 0.45} ${exitY - 50}, ${parkX} ${exitY}`

    svgB.style.top    = -off + "px"
    svgB.style.height = (stops.offsetHeight + off) + "px"

    const SB = samplePath(baseB, dB, 4)
    const waveB = wavePath(SB.pts, SB.L)
    const wdB = dOf(waveB)
    ghostBRef.current?.setAttribute("d", dB)
    glowBRef.current?.setAttribute("d", wdB)
    coreBRef.current?.setAttribute("d", wdB)
    d.B = { base: SB.pts, pts: waveB, n: SB.n, stops: stopEls, off }
  }

  useEffect(() => {
    const d = dataRef.current
    let raf

    function frame() {
      raf = requestAnimationFrame(frame)

      if (d.needLayout) layout()
      const A = d.A, B = d.B
      const layer   = layerRef.current
      const stage   = stageRef.current
      const h2El    = h2Ref.current
      const stopsEl = stopsRef.current
      const trackEl = trackRef.current
      const ship    = shipRef.current
      const co      = calloutRef.current
      if (!A || !B || !layer || !stage || !h2El || !stopsEl || !trackEl || !ship || !co) return

      const cl = v => Math.max(0, Math.min(1, v))
      const vh = window.innerHeight
      const layerR = layer.getBoundingClientRect()
      const trackR = trackEl.getBoundingClientRect()

      // pA: 0 → 1 as the sticky about-intro scrolls through its 225vh track
      const pA = cl(-trackR.top / Math.max(1, trackEl.offsetHeight - vh))

      let sx, sy, ang, call, fracA, fracB = 0, active = -1

      if (pA < 1) {
        // Phase A — ship travels path A, writing the h2 title
        const fi  = pA * A.n
        const p   = atPath(A, fi)
        const stR = stage.getBoundingClientRect()
        sx  = p.x + stR.left - layerR.left
        sy  = p.y + stR.top  - layerR.top
        ang = angAt(A, p.i)
        fracA = pA
        const rv = A.rev[p.i]
        h2El.style.clipPath = `inset(-30% ${((1 - rv) * 100).toFixed(2)}% -40% -4%)`
        const subEl = h2El.nextElementSibling
        if (subEl) subEl.style.opacity = String(cl((rv - 0.85) / 0.15))
        call = rv < 0.999 ? "SY-1 · Writing the title" : "SY-1 · Plotting the course"
      } else {
        // Phase B — ship travels path B through each about-stop card
        fracA = 1
        h2El.style.clipPath = "none"
        const subEl = h2El.nextElementSibling
        if (subEl) subEl.style.opacity = "1"
        const svgB  = svgBRef.current
        if (!svgB) return
        const bR = svgB.getBoundingClientRect()
        const ty = d.anchor - bR.top   // y within svgB that corresponds to the viewport anchor row
        let lo = 0, hi = B.n
        while (lo < hi) { const md = (lo + hi) >> 1; if (B.base[md].y < ty) lo = md + 1; else hi = md }
        let fi = lo
        if (lo > 0 && lo <= B.n) {
          const a = B.base[lo - 1], b = B.base[lo]
          fi = lo - 1 + cl((ty - a.y) / Math.max(0.001, b.y - a.y))
        }
        fi = Math.max(0, Math.min(B.n, fi))
        const p  = atPath(B, fi)
        const by = B.base[Math.min(B.n, Math.round(fi))].y
        sx  = p.x + bR.left - layerR.left
        sy  = p.y + bR.top  - layerR.top
        ang = angAt(B, p.i)
        fracB = fi / B.n
        B.stops.forEach((s, k) => { if (by >= s.y - 3) active = k })
        const next = active + 1
        call = next < STOP_NAMES.length
          ? "Next stop · " + STOP_NAMES[next]
          : (fracB > 0.995 ? "SY-1 · Parked · see you at Contact" : "SY-1 · Heading to the edge")
      }

      // dash offsets
      const dash = v => String((1000 * (1 - v)).toFixed(1))
      glowARef.current?.setAttribute("stroke-dashoffset", dash(fracA))
      coreARef.current?.setAttribute("stroke-dashoffset", dash(fracA))
      glowBRef.current?.setAttribute("stroke-dashoffset", dash(fracB))
      coreBRef.current?.setAttribute("stroke-dashoffset", dash(fracB))

      // smooth ship angle (inertia)
      let da = ang - d.shipAng
      while (da > Math.PI)  da -= 2 * Math.PI
      while (da < -Math.PI) da += 2 * Math.PI
      d.shipAng += da * 0.2

      // visibility check
      const visible =
        layerR.bottom > 0 && layerR.top < window.innerHeight &&
        sx > -60 && sx < (stage.clientWidth + 60) &&
        sy > -40 && sy < window.innerHeight + 40

      ship.setAttribute("transform", `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) rotate(${(d.shipAng * 180 / Math.PI).toFixed(1)})`)
      ship.style.opacity = visible ? "1" : "0"

      // callout position
      const cw  = co.offsetWidth || 200
      const vw2 = stage.clientWidth
      const cxp = Math.max(12, Math.min(vw2 - cw - 12, sx + 30))
      const cyp = Math.max(12, sy - 48)
      co.style.transform = `translate(${cxp.toFixed(1)}px, ${cyp.toFixed(1)}px)`
      co.style.opacity   = visible && sx > 20 ? "1" : "0"
      co.textContent     = call || ""
    }

    // Trigger layout rebuild on resize
    const ro = new ResizeObserver(() => { d.needLayout = true })
    if (stageRef.current) ro.observe(stageRef.current)
    if (stopsRef.current) ro.observe(stopsRef.current)

    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={layerRef} className="flight-layer" aria-hidden="true">
      {/* Phase A SVG — absolutely fills the sticky about-intro stage */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
        <path ref={baseARef}  style={{ display: "none" }} />
        <path ref={ghostARef} className="flight-ghost" />
        <path ref={glowARef}  className="flight-glow"  pathLength="1000" strokeDashoffset="1000" />
        <path ref={coreARef}  className="flight-core"  pathLength="1000" strokeDashoffset="1000" />
        <g ref={shipRef} className="flight-ship"><Spaceship /></g>
      </svg>
      {/* Phase B SVG — absolutely positioned relative to .about-stops, extends upward by `off` px */}
      <svg ref={svgBRef} style={{ position: "absolute", left: 0, width: "100%", overflow: "visible", top: 0, pointerEvents: "none" }}>
        <path ref={baseBRef}  style={{ display: "none" }} />
        <path ref={ghostBRef} className="flight-ghost" />
        <path ref={glowBRef}  className="flight-glow"  pathLength="1000" strokeDashoffset="1000" />
        <path ref={coreBRef}  className="flight-core"  pathLength="1000" strokeDashoffset="1000" />
      </svg>
      {/* Callout bubble — absolutely positioned to follow ship */}
      <div ref={calloutRef} className="flight-callout" style={{ position: "fixed", top: 0, left: 0, opacity: 0 }}><i /></div>
    </div>
  )
}

function ProjectDisc({ project, index, activeFloat, visible, onOpen, onSelect, onDragStart, onDragMove, onDragEnd }) {
  const distance = index - activeFloat
  const opacity = visible * clamp(1 - Math.max(0, Math.abs(distance) - 1.8) / .8)
  const ringId = `project-ring-${index}`
  return <button
    type="button"
    className={`project-disc ${Math.abs(distance) < .5 ? "is-active" : ""}`}
    aria-label={`${Math.abs(distance) < .5 ? "Open" : "Select"} ${project.title}`}
    onClick={event => {
      if (event.currentTarget.dataset.dragged === "true") {
        event.preventDefault()
        event.currentTarget.dataset.dragged = "false"
        return
      }
      if (Math.abs(distance) < .5) onOpen()
      else onSelect()
    }}
    onPointerDown={event => onDragStart(event, index)}
    onPointerMove={onDragMove}
    onPointerUp={onDragEnd}
    onPointerCancel={onDragEnd}
    style={{
      "--disc-color": project.color,
      "--disc-ink": project.ink,
      "--dx": `${distance * 28}vw`,
      "--dxm": `${distance * 65}vw`,
      "--dy": `${Math.abs(distance) * 7}vh`,
      "--disc-scale": Math.max(.55, 1 - Math.abs(distance) * .13),
      "--disc-rotate": `${-6 + distance * -3}deg`,
      opacity,
      pointerEvents: opacity > .2 ? "auto" : "none",
      zIndex: 20 - index,
    }}
  >
    <span className="disc-face">
      <svg className="disc-art" viewBox="0 0 400 400" aria-hidden="true">
        <defs><path id={ringId} d="M200 200m-176 0a176 176 0 1 1 352 0a176 176 0 1 1-352 0" /></defs>
        <text className="disc-ring-text" fontFamily="IBM Plex Mono" fontSize="9.5" letterSpacing="3.2" fill={project.ink} opacity=".65">
          <textPath href={`#${ringId}`}>SHREEYANSH SINGH · TRACK 04.{index + 1} · {project.title.toUpperCase()} · {project.ring} · </textPath>
        </text>
        {index === 0 && <>
          <text x="200" y="112" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="15" letterSpacing="5" fill={project.ink}>AI WEARABLE</text>
          <path d="M35 202h13l8-9 9 21 10-37 10 48 11-63 10 75 11-89 11 105 11-119 11 133 11-145 11 157 11-133 11 119 11-105 11 89 11-75 11 63 11-48 11 37 11-21 11 9h16" fill="none" stroke={project.ink} strokeWidth="2.6" strokeLinejoin="round" />
          <text x="200" y="322" textAnchor="middle" fontFamily="Anton" fontSize="82" fill={project.ink}>PENDANT</text>
          <text x="200" y="356" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" letterSpacing="4" fill={project.ink}>S/Y · 04.1</text>
        </>}
        {index === 1 && <>
          <g transform="rotate(-10 200 200)"><text x="54" y="176" fontFamily="Anton" fontSize="128" fill={project.ink}>GOV</text><text x="38" y="318" fontFamily="Anton" fontSize="128" fill={project.ink}>GENIE</text></g>
          <text x="200" y="360" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" letterSpacing="4" fill={project.ink}>AI PORTAL · 04.2</text>
        </>}
        {index === 2 && <>
          <text x="200" y="150" textAnchor="middle" fontFamily="Anton" fontSize="70" letterSpacing="2" fill={project.ink}>OPINION</text>
          <path d="M66 262 112 244 152 256 196 214 240 226 292 180 330 188" fill="none" stroke={project.ink} strokeWidth="4" />
          <path d="m330 176 22 10-20 14" fill={project.ink} />
          <text x="200" y="334" textAnchor="middle" fontFamily="Anton" fontSize="104" fill={project.ink}>TRADE</text>
        </>}
        {index === 3 && <>
          <text x="200" y="104" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="5" fill={project.ink} opacity=".8">BE-3</text>
          <text x="200" y="142" textAnchor="middle" fontFamily="Anton" fontSize="52" letterSpacing="1" fill={project.ink}>3D BALL</text>
          <path d="M80 190 Q200 150 320 190 Q200 230 80 190Z" fill={project.ink} opacity=".18"/>
          <circle cx="200" cy="200" r="38" fill="none" stroke={project.ink} strokeWidth="1.8" opacity=".5"/>
          <circle cx="200" cy="200" r="22" fill="none" stroke={project.ink} strokeWidth="1.2" opacity=".4"/>
          <path d="M162 200 Q180 170 200 200 Q220 230 238 200" fill="none" stroke={project.ink} strokeWidth="2.4" strokeLinecap="round"/>
          <path d="M236 194 l6 6 -8 2" fill={project.ink}/>
          <text x="200" y="284" textAnchor="middle" fontFamily="Anton" fontSize="42" letterSpacing="1" fill={project.ink}>TRAJECTORY</text>
          <text x="200" y="316" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9.5" letterSpacing="4" fill={project.ink} opacity=".7">LSTM · YOLO · MONOCULAR</text>
          <text x="200" y="356" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="3" fill={project.ink} opacity=".55">VCET 2026-27 · 04.4</text>
        </>}
      </svg>
      <span className="disc-sheen" />
      <span className="disc-rim" />
      <span className="disc-hub" />
    </span>
    <svg className="disc-scribble" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 5C77 3 97 21 96 49S76 96 48 95 4 76 5 48 26 5 53 6 93 26 91 53 69 94 43 91 8 68 10 42 34 9 60 12" fill="none" stroke="currentColor" strokeWidth=".45" pathLength="1" /></svg>
  </button>
}

function ProjectDetail({ index, onClose, onNext }) {
  const project = projects[index]
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = event => {
      if (event.key === "Escape") closeRef.current()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [])
  return <div className="project-detail" role="dialog" aria-modal="true" aria-label={project.title}>
    <header className="detail-nav"><button type="button" onClick={onClose}><ArrowIcon direction="left" /> All projects</button><span><i>/</i>S/Y</span><button type="button" className="detail-close" onClick={onClose} aria-label="Close project">×</button></header>
    <main className="detail-main">
      <div className="detail-index">0{index + 1} / 0{projects.length}</div>
      <div className="detail-title-row"><h1>{project.title}</h1><p>Built by <strong>Shreeyansh Singh</strong><span>Type</span>{project.type}</p></div>
      <div className="detail-meta"><div><span>Year</span><strong>{project.year}</strong></div><div><span>Type</span><strong>{project.type}</strong></div><div><span>Built with</span><strong>{project.stack.join(" · ")}</strong></div></div>
      <section className="detail-visual">
        <span className="cross cross-a">+</span><span className="cross cross-b">+</span><span className="cross cross-c">+</span><span className="cross cross-d">+</span>
        {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="detail-link">{project.linkLabel}<ArrowIcon /></a>}
        {project.images.length ? <div className="detail-screens">{project.images.map((image, imageIndex) => <img key={image} src={image} alt={`${project.title} preview ${imageIndex + 1}`} />)}</div> : <div className="detail-coming"><span>SY-0{index + 1}</span><strong>Coming soon</strong></div>}
      </section>
      <section className="detail-story"><div>{(project.tags || ["Build", "Ship", "Iterate", "Learn"]).map(t => <span key={t}>{t}</span>)}</div><p>{project.description}</p></section>
      <button type="button" className="detail-next" onClick={onNext}><span>Next project · Keep scrolling</span><strong>{projects[(index + 1) % projects.length].title}</strong><ArrowIcon direction="right" /></button>
    </main>
  </div>
}

export default function App() {
  const scrollY = useScrollPosition()
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const showcaseRef = useRef(null)
  const contactRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [intro, setIntro] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [time, setTime] = useState("")
  const [navHover, setNavHover] = useState(false)
  const [detailIndex, setDetailIndex] = useState(null)
  const [formStatus, setFormStatus] = useState("Lands in his inbox via your mail app.")
  const dragRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  // Refs for V3-style staggered reveal (Web Animations API)
  const refNav = useRef(null)
  const refStatus = useRef(null)
  const refJp = useRef(null)
  const refEyebrow = useRef(null)
  const refH1 = useRef(null)
  const refCta = useRef(null)
  const refFoot = useRef(null)

  // Refs for V3-exact FlightPath (rocket animation in About section)
  const aboutTrackRef = useRef(null)  // the .about-intro-track div (225vh scroll container)
  const aboutStageRef = useRef(null)  // the sticky .about-intro div
  const aboutH2Ref    = useRef(null)  // the h2 "About me"
  const aboutStopsRef = useRef(null)  // the .about-stops container

  const heroProgress = progressFor(heroRef, scrollY)
  const aboutProgress = progressFor(aboutRef, scrollY)
  const showcaseProgress = progressFor(showcaseRef, scrollY)
  const contactProgress = progressFor(contactRef, scrollY)
  const highlightOut = ease(clamp((showcaseProgress - .1) / .08))
  const serviceIn = ease(clamp((showcaseProgress - .18) / .08))
  const serviceOut = ease(clamp((showcaseProgress - .4) / .08))
  const projectIn = ease(clamp((showcaseProgress - .44) / .08))
  const projectProgress = clamp((showcaseProgress - .5) / .44)
  const activeFloat = projectProgress * (projects.length - 1)
  const activeIndex = Math.round(activeFloat)
  const activeProject = projects[activeIndex]
  const night = ease(clamp((showcaseProgress - .95) / .05))

  // Handle loading screen completion
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 4500) // Match LoadingScreen completion time

    return () => clearTimeout(loadingTimer)
  }, [])

  // ── V3-style intro: staggered Web Animations API reveal ──────────────────────
  useEffect(() => {
    if (isLoading) return // Don't start intro animations until loading is done

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const k = 1 // intro speed factor (1 = normal)

    // Items to animate in with their delay times (seconds), matching V3's reveal()
    const items = [
      [refNav.current,      0.15, ""],
      [refStatus.current,   0.25, ""],
      [refJp.current,       0.30, "translateY(-50%) "],
      [refEyebrow.current,  0.35, ""],
    ]

    // H1 words - each word gets a slight stagger
    const h1El = refH1.current
    if (h1El) {
      const wordEls = h1El.querySelectorAll(".hero-word")
      wordEls.forEach((w, i) => items.push([w, 2.45 + i * 0.08, ""]))
    }

    items.push([refCta.current,  1.0,  ""])
    items.push([refFoot.current, 1.15, ""])

    const anims = []
    for (const [el, at, base] of items) {
      if (!el || !el.animate) continue
      if (reduce) {
        // No animation, just show immediately
        el.style.opacity = "1"
        continue
      }
      const a = el.animate(
        [
          { opacity: 0, transform: base + "translateY(18px)", filter: "blur(8px)" },
          { opacity: 1, transform: base + "translateY(0px)",  filter: "blur(0px)"  },
        ],
        {
          duration: 1000 * Math.sqrt(k),
          delay: at * 1000 * k,
          easing: "cubic-bezier(.2,.7,.2,1)",
          fill: "both",
        }
      )
      a.onfinish = () => { try { a.cancel() } catch (e) {} }
      anims.push(a)
    }

    // Auto-end intro at ~2s (after loading screen completes)
    const timer = setTimeout(() => {
      setIntro(false)
      anims.forEach(a => { try { a.finish() } catch (e) {} })
    }, 2000)

    const skip = () => {
      clearTimeout(timer)
      setIntro(false)
      anims.forEach(a => { try { a.finish() } catch (e) {} })
    }
    window.addEventListener("wheel", skip, { passive: true, once: true })
    window.addEventListener("touchstart", skip, { passive: true, once: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("wheel", skip)
      window.removeEventListener("touchstart", skip)
      anims.forEach(a => { try { a.cancel() } catch (e) {} })
    }
  }, [isLoading])

  useEffect(() => {
    const timer = setInterval(() => setWordIndex(index => (index + 1) % words.length), 2800)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    update()
    const timer = setInterval(update, 30000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (ref, progress = 0) => {
    if (!ref.current) return
    const top = ref.current.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (ref.current.offsetHeight - innerHeight) * progress, behavior: "smooth" })
  }

  const goProject = index => {
    if (!showcaseRef.current) return
    const top = showcaseRef.current.getBoundingClientRect().top + window.scrollY
    const progress = .5 + index / (projects.length - 1) * .44
    window.scrollTo({ top: top + (showcaseRef.current.offsetHeight - innerHeight) * progress, behavior: "smooth" })
  }

  const activeNav = scrollY >= (contactRef.current?.getBoundingClientRect().top + scrollY || Infinity) - innerHeight * .4
    ? "contact"
    : showcaseProgress >= .44 ? "projects" : showcaseProgress >= .12 ? "services" : aboutProgress > 0 || scrollY > innerHeight * 2 ? "about" : "home"
  const collapsed = scrollY > innerHeight * .35 && !navHover

  const sendSignal = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") || "").trim()
    const email = String(data.get("email") || "").trim()
    const message = String(data.get("message") || "").trim()
    if (!email || !message) {
      setFormStatus("Add your email and a message first.")
      return
    }
    setFormStatus("Signal sent. Opening your mail app…")
    const subject = encodeURIComponent(`Signal from ${name || "your portfolio"}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:shreeyanshsingh07@gmail.com?subject=${subject}&body=${body}`
  }

  const onDragStart = (event, index) => {
    if (showcaseProgress < .44) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { x: event.clientX, scroll: window.scrollY, moved: false, index }
  }
  const onDragMove = event => {
    if (!dragRef.current) return
    const distance = event.clientX - dragRef.current.x
    if (Math.abs(distance) > 5) dragRef.current.moved = true
    if (dragRef.current.moved) window.scrollTo(0, dragRef.current.scroll - distance * 14)
  }
  const onDragEnd = event => {
    if (dragRef.current?.moved) {
      event.preventDefault()
      event.stopPropagation()
    }
    dragRef.current = null
  }

  return <>
    {isLoading && <LoadingScreen />}
    <div className="portfolio-shell">
    <header ref={refNav} className={`floating-nav ${collapsed ? "is-collapsed" : ""}`} style={{ opacity: 0 }}>
      <button type="button" className="nav-logo" onClick={() => goTo(heroRef)}><span>/</span>Shreeyansh</button>
      <div className="nav-actions" onMouseEnter={() => setNavHover(true)} onMouseLeave={() => setNavHover(false)}>
        <nav className="nav-pill" aria-label="Sections">
          {["home", "about", "services", "projects", "contact"].map(item => <button key={item} type="button" data-active={activeNav === item} onClick={() => {
            if (item === "home") goTo(heroRef)
            if (item === "about") goTo(aboutRef, .62)
            if (item === "services") goTo(showcaseRef, .28)
            if (item === "projects") goTo(showcaseRef, .58)
            if (item === "contact") goTo(contactRef, .75)
          }}>{item}</button>)}
        </nav>
        <button type="button" className="play-button" aria-label={playing ? "Pause the record" : "Play the record"} onClick={() => setPlaying(value => !value)}><span className={playing ? "is-spinning" : ""} /></button>
        <button type="button" className="talk-button" onClick={() => goTo(contactRef, .75)}><span><ArrowIcon /></span><em>Let's talk</em></button>
      </div>
    </header>

    <main>
      <div ref={heroRef} className="hero-track">
        <section className={`hero ${intro ? "is-night" : ""}`} aria-label="Introduction">
          <TurntableCanvas progress={heroProgress} dark={intro || heroProgress > .82} playing={playing} onToggle={() => setPlaying(value => !value)} introActive={intro} />
          <div ref={refJp} className="hero-japanese" style={{ opacity: 0 }}>星を見上げて、何でも作れる</div>
          <div className="hero-copy" style={{ opacity: 1 - clamp(heroProgress / .2), transform: `translateY(${heroProgress * 80}px)` }}>
            <p ref={refEyebrow} className="eyebrow hero-eyebrow" style={{ opacity: 0 }}><span />Designer &amp; Developer — Portfolio 2026</p>
            <h1 ref={refH1}>
              {/* Split into animatable words for staggered reveal */}
              <span className="hero-word" style={{ opacity: 0 }}>I make things </span>
              <span className="hero-word" style={{ opacity: 0 }}>that feel like </span>
              <em key={wordIndex} className="hero-word" style={{ opacity: 0 }}>{words[wordIndex]}</em>
            </h1>
            <div ref={refCta} className="hero-bottom" style={{ opacity: 0 }}><p>Interfaces, motion and code, built with the patience of someone who spends too many nights looking up.</p><button type="button" className="outline-cta" onClick={() => goTo(showcaseRef, .58)}>See the work <ArrowIcon direction="right" /></button></div>
          </div>
          <div ref={refStatus} className="hero-status" style={{ opacity: 0 }}><span><i />Available for work</span><span>Sky over Mumbai · {time}</span></div>
          <footer ref={refFoot} className="hero-footer" style={{ opacity: 0 }}><span>RA 05h 35m 17s · Dec −05° 23′</span><span className="hero-hint">Tap the turntable · Click the sky to warp</span><span className="scroll-cue"><i />Scroll</span></footer>
        </section>
      </div>

      <section className="about-section">
        <div ref={el => { aboutRef.current = el; aboutTrackRef.current = el }} className="about-intro-track">
          <div ref={aboutStageRef} className="about-intro">
            <FlightPath trackRef={aboutTrackRef} stageRef={aboutStageRef} h2Ref={aboutH2Ref} stopsRef={aboutStopsRef} />
            <div className="about-heading"><p className="eyebrow"><span />Side A · Track 01</p><h2 ref={aboutH2Ref}>About <em>me</em></h2><p className="about-subtitle">The person behind the record. Keep scrolling and the ship will show you around.</p></div>
          </div>
        </div>
        <div ref={aboutStopsRef} className="about-stops">
          {aboutItems.map((item, index) => <Reveal key={item.n} className={`about-stop ${index % 2 ? "reverse" : ""}`}>
            <article data-stop={item.n}><p className="stop-kicker"><span>{item.n}</span> · {item.kicker}</p><p className="stop-lead">{item.lead}</p>{item.body && <p className="stop-body">{item.body}</p>}</article>
            <div className="stop-number"><span>{item.n}</span><i /><p>Stop {item.n} · {item.kicker}</p></div>
          </Reveal>)}
          <div data-exit style={{ height: 1, pointerEvents: "none" }} />
        </div>
      </section>

      <section ref={showcaseRef} className="showcase-track">
        <div className={`showcase-stage ${dragRef.current ? "is-dragging" : ""}`}>
          <div className="showcase-light" style={{ opacity: serviceIn * (1 - night) }} />
          <div className="transition-record" style={{ opacity: clamp((showcaseProgress - .07) / .03) * (1 - serviceIn), transform: `translate(-50%,-50%) scale(${8 - highlightOut * 7})` }}><span>S/Y</span></div>
          <div className="highlights-panel" style={{ opacity: 1 - highlightOut, pointerEvents: highlightOut > .8 ? "none" : "auto", transform: `translateY(${-highlightOut * 60}px)` }}>
            <div className="section-heading light-heading"><p className="eyebrow"><span />Side A · Track 02<span /></p><h2>High<em>lights</em></h2></div>
            <div className="highlights-grid">{highlights.map(item => <article key={item.label}><strong><CountUp value={item.value} suffix={item.suffix} active={showcaseProgress < .18} /></strong><span>{item.label}</span></article>)}</div>
          </div>

          <div className="services-decor" style={{ opacity: serviceIn * (1 - serviceOut) }} aria-hidden="true">
            <span className="moon" /><span className="spark spark-a">✦</span><span className="spark spark-b">✦</span><span className="spark spark-c">✦</span><span className="spark spark-d">✦</span>
            <div className="clouds back" /><div className="clouds front" />
            <svg className="telescope" viewBox="0 0 220 200"><path d="M0 200C40 150 90 132 130 134s70 26 90 66Z" fill="#cdb7c6" /><g stroke="#5b4a5e" strokeWidth="3.2" strokeLinecap="round" fill="none"><path d="m120 92-24 50m24-50 26 50m-26-50 1 54" /></g><g transform="rotate(-28 120 88)"><rect x="66" y="80" width="86" height="15" rx="4" fill="#5b4a5e" /><rect x="56" y="77" width="16" height="21" rx="3" fill="#5b4a5e" /><rect x="150" y="83" width="12" height="9" rx="2" fill="#5b4a5e" /></g></svg>
          </div>
          <div className="services-panel" style={{ opacity: serviceIn * (1 - serviceOut), pointerEvents: serviceIn > .8 && serviceOut < .5 ? "auto" : "none" }}>
            <div className="section-heading"><p className="eyebrow"><span />Side A · Track 03<span /></p><h2>Ser<em>vices</em></h2></div>
            <div className="services-grid">{services.map((service, index) => <article key={service.n} className="service-card" style={{ "--c1": service.colors[0], "--c2": service.colors[1], "--planet": service.colors[2], transform: `translateY(${(1 - serviceIn) * 90 + serviceOut * 80 + index * (1 - serviceIn) * 12}px) rotate(${-90 * (1 - serviceIn)}deg)` }}><div className="service-card-inner"><span className="service-stars" /><span className="service-planet" /><div className="service-meta"><span>{service.cat}</span><span>Side A</span></div><span className="service-number">{service.n}</span><h3>{service.title}</h3><p>{service.desc}</p><ServiceIcon type={service.icon} /></div></article>)}</div>
          </div>

          <div className="projects-panel" style={{ opacity: projectIn * (1 - night), pointerEvents: projectIn > .5 && night < .5 ? "auto" : "none" }}>
            <div className="projects-kicker"><p className="eyebrow"><span />Side A · Track 04 · Projects<span /></p></div>
            <div className="project-info" key={`info-${activeIndex}`}><h3>{activeProject.title}</h3><div><span>Type</span><strong>{activeProject.type}</strong></div><div><span>Year</span><strong>{activeProject.year}</strong></div><div><span>Built with</span><strong>{activeProject.stack.map(item => <span key={item}>{item}</span>)}</strong></div></div>
            <div className="project-count"><strong>0{activeIndex + 1} / 0{projects.length}</strong><span>Scroll or drag</span></div>
            <div className="disc-stage">{projects.map((project, index) => <ProjectDisc key={project.title} project={project} index={index} activeFloat={activeFloat} visible={projectIn} onOpen={() => setDetailIndex(index)} onSelect={() => goProject(index)} onDragStart={onDragStart} onDragMove={onDragMove} onDragEnd={onDragEnd} />)}</div>
            <div className="project-quotes" key={`quotes-${activeIndex}`}>{activeProject.quotes.map(([source, text]) => <div key={source + text}><span>★★★★★</span><small>{source}</small><strong>{text}</strong></div>)}</div>
          </div>
          <div className="night-wave" style={{ transform: `translateY(${100 - night * 110}%)` }}><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 70C180 20 300 110 480 58S790 22 960 65s310-30 480-5V120H0Z" fill="#030304" /></svg><div /></div>
        </div>
      </section>

      <section ref={contactRef} className="contact-section">
        <div className="contact-intro-track">
          <div className="contact-intro">
            <TurntableCanvas progress={0} dark playing={playing} onToggle={() => setPlaying(value => !value)} />
            <div className="contact-heading" style={{ opacity: clamp((contactProgress - .15) / .35), transform: `translateY(${(1 - clamp((contactProgress - .15) / .35)) * 24}px)` }}><div className="contact-track-label"><span>Side B · Start a conversation</span><span>05</span></div><div><h2>Let's make<span><em>Side B</em> together.</span></h2><p>An idea, a product, a role, or a hackathon team that needs one more builder. <strong>I'd like to hear it.</strong></p></div></div>
          </div>
        </div>
        <div className="contact-content">
          <div className="email-row"><a href="mailto:shreeyanshsingh07@gmail.com">shreeyanshsingh07@gmail.com</a><a href="mailto:shreeyanshsingh07@gmail.com" aria-label="Email Shreeyansh"><ArrowIcon /></a></div>
          <div className="contact-grid">
            <form className="signal-form" onSubmit={sendSignal}><div className="form-heading"><div><span>Transmission · SY-1</span><h3>Send a <em>signal</em></h3></div><svg viewBox="0 0 120 130" aria-hidden="true"><ellipse cx="60" cy="124" rx="40" ry="5" fill="rgba(240,194,122,.12)" stroke="rgba(240,194,122,.4)" /><g transform="translate(60 92) rotate(-90)"><Spaceship /></g></svg></div><div className="form-row"><label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" /></label><label>Email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label></div><label>Message<textarea name="message" rows="4" placeholder="What should we build?" required /></label><div className="form-submit"><p aria-live="polite">{formStatus}</p><button type="submit">Send signal <ArrowIcon direction="right" /></button></div></form>
            <div className="contact-details"><div><span>Based in</span><strong>Mumbai, IN</strong></div><div><span>Status</span><strong className="available"><i />Available for work</strong></div><div><span>LinkedIn</span><a href="https://www.linkedin.com/in/shreeyansh-singh-858ab633b" target="_blank" rel="noreferrer">shreeyansh-singh ↗</a></div><div><span>GitHub</span><a href="https://github.com/Shreeyansh-07" target="_blank" rel="noreferrer">Shreeyansh-07 ↗</a></div><div><span>Resume</span><a href="/Shreeyansh Singh Resume .pdf" download>Download PDF ↗</a></div><p>星を見上げて、何でも作れる</p></div>
          </div>
          <footer className="site-footer"><span className="footer-mark"><i>/</i>S/Y</span><a href="mailto:shreeyanshsingh07@gmail.com">shreeyanshsingh07@gmail.com</a><span>© 2026 Shreeyansh Singh · Side A + B</span><button type="button" onClick={() => goTo(heroRef)}>Back to top · rewind <ArrowIcon direction="up" /></button></footer>
        </div>
      </section>
    </main>
    {detailIndex !== null && <ProjectDetail index={detailIndex} onClose={() => setDetailIndex(null)} onNext={() => setDetailIndex(index => (index + 1) % projects.length)} />}
  </div>
  </>
}
