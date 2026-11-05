// V3-exact dynamic FlightPath
// Patches to replace function FlightPath in App.jsx
// This file is used by patch_flight.py

const FLIGHT_COMPONENT = `
// ─── V3-exact dynamic FlightPath ────────────────────────────────────────────
// Two phases:
//   Phase A (about-intro sticky panel): ship swoops in, underlines the h2,
//           loops round, descends to anchor point. h2 revealed by ship X pos.
//   Phase B (about-stops): ship travels through each data-stop card, then parks.
function FlightPath({ stageRef, h2Ref, stopsRef }) {
  const svgARef  = useRef(null)   // SVG inside the sticky panel
  const ghostARef = useRef(null)
  const glowARef  = useRef(null)
  const coreARef  = useRef(null)
  const shipRef   = useRef(null)
  const calloutRef = useRef(null)
  const h2ClipRef = useRef(null)  // the actual h2 element
  const shipAngRef = useRef(0)
  const layoutRef  = useRef(null) // cached A/B paths

  // --- helpers matching V3 exactly ---
  function samplePath(pathEl, d, step) {
    pathEl.setAttribute('d', d)
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
    return base.map((p, i) => {
      const a = base[Math.max(0, i - 1)], b = base[Math.min(n, i + 1)]
      const dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy) || 1
      const nx = -dy / l, ny = dx / l
      const env = Math.max(0, Math.min(1, p.s / 140, (L - p.s) / 140))
      const amp = (1.2 + 6 * (0.5 + 0.5 * Math.sin(p.s * 0.009))) * env
      const off = amp * Math.sin(p.s * 2 * Math.PI / 64)
      return { x: p.x + nx * off, y: p.y + ny * off }
    })
  }

  function dOf(pts) {
    return 'M' + pts.map(p => p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' L')
  }

  function atPath(P, fi) {
    const i = Math.max(0, Math.min(P.n, Math.floor(fi)))
    const j = Math.min(P.n, i + 1)
    const f = fi - i
    const a = P.pts[i], b = P.pts[j]
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, i }
  }

  function angAt(P, i) {
    const a = P.base[Math.max(0, i - 3)], b = P.base[Math.min(P.n, i + 3)]
    return Math.atan2(b.y - a.y, b.x - a.x)
  }

  function computeLayout() {
    const stage = stageRef?.current
    const h2    = h2Ref?.current
    const stops = stopsRef?.current
    const svgA  = svgARef.current
    const ghost = ghostARef.current
    if (!stage || !h2 || !stops || !svgA || !ghost) return null

    const vw = window.innerWidth, vh = window.innerHeight
    const anchor = vh * 0.6
    const xB = vw / 2

    // ── Path A: swoop in, underline h2, loop, settle ──
    const sr = stage.getBoundingClientRect()
    const hr = h2.getBoundingClientRect()
    const hL = hr.left - sr.left
    const hR = hr.right - sr.left
    const wy = hr.bottom - sr.top + 10
    const mid  = Math.max(wy + 40, (wy + anchor) / 2)
    const loop = Math.max(24, Math.min(160, vw - hR - 16))

    const dA =
      \`M-90 \${(vh * 0.08).toFixed(1)} \` +
      \`C\${(vw * 0.12).toFixed(1)} \${(vh * 0.02).toFixed(1)}, \` +
      \`\${(hL - 170).toFixed(1)} \${(wy - 140).toFixed(1)}, \` +
      \`\${(hL - 30).toFixed(1)} \${wy.toFixed(1)} \` +
      \`L\${(hR + 30).toFixed(1)} \${wy.toFixed(1)} \` +
      \`C\${(hR + 30 + loop).toFixed(1)} \${wy.toFixed(1)}, \` +
      \`\${(hR + 30 + loop).toFixed(1)} \${mid.toFixed(1)}, \` +
      \`\${(hR + 10).toFixed(1)} \${mid.toFixed(1)} \` +
      \`C\${(hR + 10 - (hR - xB) * 0.6).toFixed(1)} \${mid.toFixed(1)}, \` +
      \`\${xB.toFixed(1)} \${(mid + (anchor - mid) * 0.3).toFixed(1)}, \` +
      \`\${xB.toFixed(1)} \${anchor.toFixed(1)}\`

    // Sample path A into points
    const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    svgA.appendChild(tempPath)
    const SA = samplePath(tempPath, dA, 4)
    svgA.removeChild(tempPath)

    const waveA = wavePath(SA.pts, SA.L)
    const wdA   = dOf(waveA)

    ghost.setAttribute('d', dA)
    if (glowARef.current)  glowARef.current.setAttribute('d', wdA)
    if (coreARef.current)  coreARef.current.setAttribute('d', wdA)

    // Compute reveal fraction for each sampled point (ship X progress under h2)
    let mx = 0
    const rev = SA.pts.map(p => {
      mx = Math.max(mx, Math.max(0, Math.min(1, (p.x - hL) / Math.max(1, hR - hL))))
      return mx
    })
    const A = { base: SA.pts, pts: waveA, n: SA.n, rev }

    // ── Path B: guide point → through each about-stop → park ──
    const off = vh - anchor
    const stopsEl = stops
    const stopsR  = stopsEl.getBoundingClientRect()

    const stopEls = Array.from(stopsEl.querySelectorAll('[data-stop]'))
    const stopPts = stopEls.map(el => {
      const b = el.getBoundingClientRect()
      return { x: b.left + b.width / 2 - stopsR.left, y: b.top + b.height / 2 - stopsR.top + off }
    })

    let dB = \`M\${xB.toFixed(1)} 0\`, px = xB, py = 0
    for (const sp of stopPts) {
      const my = (py + sp.y) / 2
      dB += \` C\${px.toFixed(1)} \${my.toFixed(1)}, \${sp.x.toFixed(1)} \${my.toFixed(1)}, \${sp.x.toFixed(1)} \${sp.y.toFixed(1)}\`
      px = sp.x; py = sp.y
    }
    const exitY   = py + 360
    const parkX   = vw - Math.max(56, Math.min(90, vw * 0.05))
    dB += \` C\${px.toFixed(1)} \${(py + (exitY - py) * 0.55).toFixed(1)}, \` +
          \`\${(px + (parkX - px) * 0.45).toFixed(1)} \${(exitY - 50).toFixed(1)}, \` +
          \`\${parkX.toFixed(1)} \${exitY.toFixed(1)}\`

    const tempPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    svgA.appendChild(tempPath2)
    const SB = samplePath(tempPath2, dB, 4)
    svgA.removeChild(tempPath2)

    const waveB = wavePath(SB.pts, SB.L)
    const B = { base: SB.pts, pts: waveB, n: SB.n, stops: stopPts, off }

    return { A, B, anchor, hL, hR, vw, vh }
  }

  useEffect(() => {
    let raf
    let layout = null
    let needLayout = true

    const ro = new ResizeObserver(() => { needLayout = true })
    const stage = stageRef?.current
    const h2    = h2Ref?.current
    const stops = stopsRef?.current
    if (stage) ro.observe(stage)
    if (h2)    ro.observe(h2)
    if (stops) ro.observe(stops)

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (needLayout) {
        layout = computeLayout()
        needLayout = false
      }
      if (!layout) return

      const { A, B, anchor, hL, hR, vh } = layout
      const ship   = shipRef.current
      const callout = calloutRef.current
      if (!ship || !stageRef?.current || !stopsRef?.current) return

      // ── Phase A: ship travels under h2 during the sticky about-intro panel ──
      const stageEl = stageRef.current
      const stopsEl = stopsRef.current
      const svgEl   = svgARef.current
      if (!stageEl || !stopsEl || !svgEl) return

      const svgR   = svgEl.getBoundingClientRect()
      const stageR = stageEl.getBoundingClientRect()
      const cl = v => Math.max(0, Math.min(1, v))

      // pA = how far scrolled through the sticky about-intro panel
      const introTrackEl = stageEl.closest('.about-intro-track') || stageEl.parentElement?.parentElement
      let pA = 0
      if (introTrackEl) {
        const tr = introTrackEl.getBoundingClientRect()
        pA = cl((window.innerTop - tr.top + 0) / Math.max(1, introTrackEl.offsetHeight - vh))
        // simpler: how far the sticky top is past the track start
        pA = cl(-tr.top / Math.max(1, introTrackEl.offsetHeight - vh))
      }

      let sx, sy, ang, callText
      let fracA = pA, fracB = 0

      if (pA < 1) {
        // Phase A
        const fi = pA * A.n
        const p  = atPath(A, fi)
        sx = p.x + stageR.left - svgR.left
        sy = p.y + stageR.top  - svgR.top
        ang = angAt(A, p.i)

        // h2 clip-path reveal driven by ship X position
        const rv = A.rev[p.i] || 0
        const h2El = h2Ref?.current
        if (h2El) h2El.style.clipPath = \`inset(-30% \${((1 - rv) * 100).toFixed(2)}% -40% -4%)\`

        const sub = stageEl.querySelector('.about-subtitle')
        if (sub) sub.style.opacity = String(cl((rv - 0.85) / 0.15))

        callText = rv < 0.999 ? 'SY-1 · Writing the title' : 'SY-1 · Plotting the course'
      } else {
        // Phase B: ship through the about-stops
        const h2El = h2Ref?.current
        if (h2El) h2El.style.clipPath = 'none'
        const sub = stageEl.querySelector('.about-subtitle')
        if (sub) sub.style.opacity = '1'

        const stopsR = stopsEl.getBoundingClientRect()
        const ty = stageR.top + anchor - stopsR.top
        let lo = 0, hi = B.n
        while (lo < hi) {
          const md = (lo + hi) >> 1
          if (B.base[md].y < ty) lo = md + 1
          else hi = md
        }
        let fi = lo
        if (lo > 0 && lo <= B.n) {
          const a = B.base[lo - 1], b = B.base[lo]
          fi = lo - 1 + cl((ty - a.y) / Math.max(0.001, b.y - a.y))
        }
        fi = Math.max(0, Math.min(B.n, fi))

        const p = atPath(B, fi)
        sx = p.x + stopsR.left - svgR.left
        sy = p.y + stopsR.top  - svgR.top
        ang = angAt(B, p.i)
        fracB = fi / B.n

        const stopNames = ['01 Who I am', "02 What I've built", '03 Off the clock']
        let active = -1
        const byY = B.base[Math.min(B.n, Math.round(fi))].y
        B.stops.forEach((s, k) => { if (byY >= s.y - 3) active = k })
        const next = active + 1
        callText = next < stopNames.length
          ? 'Next stop · ' + stopNames[next]
          : (fracB > 0.995 ? 'SY-1 · Parked · see you at Contact' : 'SY-1 · Heading to the edge')
      }

      // Smooth ship angle (inertia matching V3's 0.2 factor)
      let da = ang - shipAngRef.current
      while (da > Math.PI)  da -= 2 * Math.PI
      while (da < -Math.PI) da += 2 * Math.PI
      shipAngRef.current += da * 0.2

      const vw = window.innerWidth
      const visible =
        svgR.bottom > 0 && svgR.top < window.innerHeight &&
        sx > -60 && sx < vw + 60 && sy > -40 && sy < window.innerHeight + 40

      ship.setAttribute('transform',
        \`translate(\${sx.toFixed(1)} \${sy.toFixed(1)}) rotate(\${(shipAngRef.current * 180 / Math.PI).toFixed(1)})\`)
      ship.style.opacity = visible ? '1' : '0'

      // Callout label
      if (callout) {
        const cw = callout.offsetWidth || 200
        const cxp = Math.max(12, Math.min(vw - cw - 12, sx + 30))
        const cyp = Math.max(12, sy - 48)
        callout.style.transform = \`translate(\${cxp.toFixed(1)}px, \${cyp.toFixed(1)}px)\`
        callout.style.opacity = visible && sx > 20 ? '1' : '0'
        if (callout.textContent !== callText) {
          const i = callout.querySelector('i')
          callout.textContent = ''
          if (i) callout.appendChild(i)
          callout.appendChild(document.createTextNode(callText || ''))
        }
      }

      // Stroke dashoffset for the drawn path
      const dash = v => String((1000 * (1 - v)).toFixed(1))
      if (glowARef.current) glowARef.current.setAttribute('stroke-dashoffset', dash(fracA))
      if (coreARef.current) coreARef.current.setAttribute('stroke-dashoffset', dash(fracA))
    }

    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="flight-layer" aria-hidden="true">
      <svg ref={svgARef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible' }}>
        <path ref={ghostARef} className="flight-ghost" />
        <path ref={glowARef}  className="flight-glow"  pathLength="1000" strokeDashoffset="1000" />
        <path ref={coreARef}  className="flight-core"  pathLength="1000" strokeDashoffset="1000" />
        <g ref={shipRef} className="flight-ship"><Spaceship /></g>
      </svg>
      <div ref={calloutRef} className="flight-callout"><i /></div>
    </div>
  )
}
`

