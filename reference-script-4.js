
class Component extends DCLogic {
  state = { wi: 0, dark: false, time: '', call: 'SY-1 · Writing the title', counts: [0, 0, 0, 0, 0], pj: 0, cStatusText: 'Lands in his inbox via your mail app.' };
  words = ['starlight', 'gravity', 'orbit', 'infinity'];
  canvas = React.createRef(); hero = React.createRef(); knob = React.createRef();
  rNav = React.createRef(); rJp = React.createRef(); rEye = React.createRef(); rH1 = React.createRef();
  rCta = React.createRef(); rStat = React.createRef(); rFoot = React.createRef();
  scroller = React.createRef(); track = React.createRef(); space = React.createRef();
  shipLayer = React.createRef(); ship = React.createRef(); callout = React.createRef();
  headTrack = React.createRef(); headStage = React.createRef(); headline = React.createRef(); sub = React.createRef();
  baseA = React.createRef(); ghostA = React.createRef(); glowA = React.createRef(); coreA = React.createRef();
  proj = React.createRef(); svgB = React.createRef(); hlRow = React.createRef();
  svTrack = React.createRef(); svStage = React.createRef(); svCanvas = React.createRef(); svHead = React.createRef(); svCover = React.createRef(); svHl = React.createRef(); svDeco = React.createRef(); svClouds = React.createRef(); svNight = React.createRef();
  pjTop = React.createRef(); pjInfo = React.createRef(); pjSide = React.createRef(); pjQuotes = React.createRef();
  pjA = 0; pjOn = false; drag = null; pjLo = 0; pjHi = 0;
  cTrack = React.createRef(); cCanvas = React.createRef(); cHead = React.createRef(); cShip = React.createRef();
  cName = React.createRef(); cMail = React.createRef(); cMsg = React.createRef(); cStatus = React.createRef();
  rewinding = false; recLabel = null; navDisc = React.createRef(); navGroup = React.createRef(); navHover = false; _col = null; userPaused = false; _navOn = ''; _discAnim = null;
  baseB = React.createRef(); ghostB = React.createRef(); glowB = React.createRef(); coreB = React.createRef();
  mouse = { x: 0, y: 0 }; warp = 0; mix = 1;
  spin = 0; spinV = 0; playing = false; armA = null;
  starA = 1; deckA = 1; rings = []; anims = []; intro = null; timer = null;
  zoom = 0; A = null; B = null; needLayout = true; shipAng = 0; _exitE = -1;
  themes = {
    dark: { bg: '#030304', ink: '#ecebe6', mute: '#8a8983', soft: '#b9b8b2', line: 'rgba(236,235,230,.22)', acc: 'oklch(0.82 0.13 75)' },
    light: { bg: '#f3eee4', ink: '#1f1c18', mute: '#857d70', soft: '#5a5348', line: 'rgba(31,28,24,.18)', acc: 'oklch(0.62 0.14 55)' }
  };
  aboutData = [
    { n: '01', dir: 'row', kicker: 'Who I am', bodyDisplay: 'block',
      lead: 'I am a Computer Engineering student and Full Stack Developer focused on building scalable, secure, and intelligent software.',
      body: 'My interests span backend engineering, AI systems, cloud technologies, and modern web development. I enjoy transforming ambitious ideas into products that solve meaningful real-world problems.' },
    { n: '02', dir: 'row-reverse', kicker: "What I've built", bodyDisplay: 'none', body: '',
      lead: "Over the past few years, I've built AI-powered platforms, secure web applications, and distributed backend systems while continuously improving my problem-solving skills through competitive programming and hackathons." },
    { n: '03', dir: 'row', kicker: 'Off the clock', bodyDisplay: 'none', body: '',
      lead: 'Outside of coding, I enjoy learning new technologies, participating in hackathons, and exploring scalable software architecture.' }
  ];
  highlightData = [
    { v: 6, suf: '+', label: 'Hackathon + paper presentation wins' },
    { v: 150, suf: '+', label: 'LeetCode problems solved' },
    { v: 10, suf: '+', label: 'Major projects built' },
    { v: 3, suf: '+', label: 'Years of programming experience' },
    { v: 100, suf: '%', label: 'Passion for learning' }
  ];
  stopNames = ['01 Who I am', "02 What I've built", '03 Off the clock'];
  hlStart = [null, null, null, null, null];
  pjData = [
    { title: 'AI Wearable Pendant', type: 'Smart personal assistant', year: '[YEAR]', stack: ['Python', 'OpenCV', 'LLMs', 'Audio processing'],
      q: [{ src: 'Recognition', t: 'Appreciation post on LinkedIn' }, { src: 'Highlight', t: 'Meeting notes by voice' }] },
    { title: 'GovGenie AI Portal', type: 'AI government platform', year: '[YEAR]', stack: ['React · Node.js', 'MongoDB', 'Python · OpenCV', 'Socket.io · Docker'],
      q: [{ src: 'Highlight', t: 'Aadhaar face verification' }, { src: 'Highlight', t: 'Real-time agent chat' }] },
    { title: 'OpinionTrade', type: 'Incentivized polling', year: '[YEAR]', stack: ['React · Node.js', 'Express', 'MongoDB', 'REST API'],
      q: [{ src: 'Recognition', t: 'Registered copyright' }, { src: 'Highlight', t: 'Live on the web' }] },
    { title: 'Project Four', type: '[PROJECT TYPE]', year: '[YEAR]', stack: ['[STACK]'],
      q: [{ src: '[SOURCE]', t: '[HIGHLIGHT]' }, { src: '[SOURCE]', t: '[HIGHLIGHT]' }] },
    { title: 'Project Five', type: '[PROJECT TYPE]', year: '[YEAR]', stack: ['[STACK]'],
      q: [{ src: '[SOURCE]', t: '[HIGHLIGHT]' }, { src: '[SOURCE]', t: '[HIGHLIGHT]' }] }
  ];
  scrib = (() => {   // a hand-drawn loop, a little more than one turn
    const pts = [];
    for (let k = 0; k <= 96; k++) {
      const a = -2.2 + (k / 96) * Math.PI * 2 * 1.18;
      const r = 44 + 2.6 * Math.sin(a * 3 + 0.8) + 1.6 * Math.sin(a * 7) + (k / 96) * 3.5;
      pts.push((50 + Math.cos(a) * r * 1.02).toFixed(2) + ' ' + (50 + Math.sin(a) * r * 0.97).toFixed(2));
    }
    return 'M' + pts.join(' L');
  })();
  pjDetailsEl() {
    const H = React.createElement, P = this.pjData[this.state.pj];
    const lab = { fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#6e675c', paddingTop: 2 };
    const row = (l, v) => H('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 16, borderTop: '1px solid rgba(31,28,24,.55)', padding: '6px 0 8px' } },
      H('span', { style: lab }, l),
      H('span', { style: { textAlign: 'right', fontSize: 13, lineHeight: 1.45, color: '#1f1c18' } }, Array.isArray(v) ? v.map((x, i) => H('span', { key: i, style: { display: 'block' } }, x)) : v));
    return H('div', { key: 'pj' + this.state.pj, style: { animation: 'pjIn .7s cubic-bezier(.2,.7,.2,1) both' } },
      H('h3', { style: { margin: '0 0 14px', fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: 'clamp(30px,3vw,46px)', lineHeight: 0.95, letterSpacing: '-.01em', textTransform: 'uppercase', color: '#1f1c18' } }, P.title),
      row('Type', P.type), row('Year', P.year), row('Built with', P.stack));
  }
  pjQuotesEl() {
    const H = React.createElement, P = this.pjData[this.state.pj];
    return H('div', { key: 'q' + this.state.pj, className: 'pjq', style: { display: 'flex', justifyContent: 'center', gap: 'clamp(48px,10vw,170px)', flexWrap: 'wrap' } },
      P.q.map((q, i) => H('div', { key: i, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center', maxWidth: 300, animation: `pjIn .7s cubic-bezier(.2,.7,.2,1) ${0.08 + i * 0.08}s both` } },
        H('span', { 'aria-hidden': 'true', style: { color: '#1f1c18', fontSize: 13, letterSpacing: '.12em' } }, '★★★★★'),
        H('span', { style: { fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#6e675c' } }, q.src),
        H('span', { style: { fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(22px,2vw,30px)', lineHeight: 1, textTransform: 'uppercase', color: '#1f1c18' } }, q.t))));
  }
  serviceData = [
    { n: '01', cat: 'SY-03.1', title: 'Full Stack Development', c1: '#6a5634', c2: '#2a2117', p1: '#d9a85f', glow: 'rgba(240,194,122,.85)', icon: 'M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16',
      desc: 'Designing modern web applications using React, Node.js, Spring Boot, Express, and MongoDB with clean architecture and responsive user experiences.' },
    { n: '02', cat: 'SY-03.2', title: 'Cloud & System Design', c1: '#3c3f80', c2: '#17183a', p1: '#7d8ae0', glow: 'rgba(150,165,255,.85)', icon: 'M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 9.5 4.25 4.25 0 0 0 7 18Z',
      desc: 'Architecting secure databases, Dockerized deployments, CI/CD pipelines, and scalable cloud infrastructure for production-ready applications.' },
    { n: '03', cat: 'SY-03.3', title: 'Frontend Engineering', c1: '#723430', c2: '#2b1214', p1: '#e07a62', glow: 'rgba(255,140,110,.85)', icon: 'M3 5h18v11H3zM8 20h8M12 16v4',
      desc: 'Building responsive, visually engaging, and accessible web applications with modern UI technologies, smooth interactions, and optimized performance.' },
    { n: '04', cat: 'SY-03.4', title: 'AI Application', c1: '#255953', c2: '#0e2524', p1: '#6fc9b4', glow: 'rgba(127,224,200,.8)', icon: 'M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z',
      desc: 'Building AI-powered assistants, computer vision solutions, intelligent automation systems, and LLM integrations using Python, OpenCV, and modern AI APIs.' }
  ];

  componentDidMount() {
    const p = this.props || {};
    const finalDark = (p.theme ?? 'Day') === 'Night';
    this._theme = p.theme; this._density = p.density; this._intro = p.intro; this._len = p.introLength;
    const mode = p.intro ?? 'Every load';
    let play = mode !== 'Off';
    if (play && mode === 'Once per session') {
      try { if (sessionStorage.getItem('sy-intro')) play = false; else sessionStorage.setItem('sy-intro', '1'); } catch (e) {}
    }
    let reduce = false;
    try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    const tick = () => this.setState({ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    tick(); this.clock = setInterval(tick, 30000);
    this.onMove = e => { this.mouse.x = e.clientX / innerWidth - 0.5; this.mouse.y = e.clientY / innerHeight - 0.5; };
    this.onWheel = () => this.endIntro();
    this.onScroll = () => { const sc = this.scroller.current; if (sc && sc.scrollTop > 4) this.endIntro(); };
    addEventListener('pointermove', this.onMove); addEventListener('wheel', this.onWheel, { passive: true });
    if (this.scroller.current) this.scroller.current.addEventListener('scroll', this.onScroll, { passive: true });
    try {
      this.ro = new ResizeObserver(() => { this.needLayout = true; });
      [this.scroller.current, this.proj.current, this.headline.current].forEach(el => el && this.ro.observe(el));
    } catch (e) {}
    try { document.fonts && document.fonts.ready.then(() => { this.needLayout = true; }); } catch (e) {}
    this.onPjDown = e => {
      if (!this.pjOn) return;
      const sc = this.scroller.current; this.drag = { x: e.clientX, top: sc.scrollTop };
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
      this.svStage.current.style.cursor = 'grabbing';
    };
    this.onPjMove = e => {
      if (!this.drag) return;
      const sc = this.scroller.current, vh = sc.clientHeight, ux = Math.min(sc.clientWidth, vh * 2.1);
      const k = (0.8 * vh) / (sc.clientWidth < 640 ? 0.6 * sc.clientWidth : 0.27 * ux);                       // scroll px per dragged px (one disc either way)
      sc.scrollTop = Math.max(this.pjLo, Math.min(this.pjHi, this.drag.top - (e.clientX - this.drag.x) * k));
    };
    this.onPjUp = () => { this.drag = null; if (this.svStage.current) this.svStage.current.style.cursor = ''; };
    const stg = this.svStage.current;
    if (stg) { stg.addEventListener('pointerdown', this.onPjDown); stg.addEventListener('pointermove', this.onPjMove); stg.addEventListener('pointerup', this.onPjUp); stg.addEventListener('pointercancel', this.onPjUp); }
    this.setup();

    if (play && !reduce) {
      this.startIntro();
    } else {
      this.mix = finalDark ? 0 : 1;
      this.setState({ dark: finalDark }, () => this.applyTheme());
      if (play) this.reveal(1, true);
      setTimeout(() => { this.playing = true; }, 700);
      this.startWords();
    }

    const loop = t => {
      this.frameN = (this.frameN || 0) + 1; this.frameT = t;
      try { this.draw(t); } catch (e) { console.error('draw', e.message); }
      try { this.scrollFrame(); } catch (e) { console.error('scroll', e.message); }
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }
  componentWillUnmount() {
    clearInterval(this.timer); clearInterval(this.clock); cancelAnimationFrame(this.raf);
    removeEventListener('pointermove', this.onMove); removeEventListener('wheel', this.onWheel);
    if (this.scroller.current) this.scroller.current.removeEventListener('scroll', this.onScroll);
    if (this.ro) this.ro.disconnect();
    const stg = this.svStage.current;
    if (stg) { stg.removeEventListener('pointerdown', this.onPjDown); stg.removeEventListener('pointermove', this.onPjMove); stg.removeEventListener('pointerup', this.onPjUp); stg.removeEventListener('pointercancel', this.onPjUp); }
    this.anims.forEach(a => { try { a.cancel(); } catch (e) {} });
  }
  componentDidUpdate() {
    const p = this.props || {};
    if (this._density !== p.density) { this._density = p.density; this.setup(); }
    if (this._theme !== p.theme) {
      this._theme = p.theme; this.endIntro();
      this.setState({ dark: (p.theme ?? 'Day') === 'Night' });
    }
    if (this._intro !== p.intro || this._len !== p.introLength) {
      this._intro = p.intro; this._len = p.introLength;
      if ((p.intro ?? 'Every load') === 'Off') this.endIntro(); else this.startIntro();
    }
    if (this._applied !== this.state.dark) this.applyTheme();
  }
  applyTheme() {
    this._applied = this.state.dark;
    const el = this.hero.current, th = this.themes[this.state.dark ? 'dark' : 'light'];
    if (el) for (const k in th) el.style.setProperty('--' + k, th[k]);
    if (this.knob.current) this.knob.current.style.transform = this.state.dark ? 'none' : 'translateX(16px)';
  }
  startWords() {
    if (this.timer) return;
    this.timer = setInterval(() => this.setState(s => ({ wi: (s.wi + 1) % this.words.length })), 2800);
  }

  /* ---------- Intro (locked): night, needle drop, sunrise, settle into Day ---------- */
  startIntro() {
    const p = this.props || {};
    const k = Math.max(0.5, (p.introLength ?? 4) / 4);
    const finalDark = (p.theme ?? 'Day') === 'Night';
    this.anims.forEach(a => { try { a.cancel(); } catch (e) {} });
    clearInterval(this.timer); this.timer = null;
    this.intro = { on: true, k, sunrise: !finalDark, t0: null, p: 0 };
    this.starA = 0; this.deckA = 0; this.mix = 0;
    this.playing = false; this.armA = null; this.spinV = 0; this.rings = []; this.warp = 0;
    if (!this.state.dark) this.setState({ dark: true }, () => this.applyTheme()); else this.applyTheme();
    this.reveal(k, false);
  }
  endIntro() {
    const I = this.intro; if (!I || !I.on) return;
    I.on = false; this.starA = 1; this.deckA = 1; this.playing = true;
    if (I.sunrise) { this.mix = 1; if (this.state.dark) this.setState({ dark: false }); }
    this.anims.forEach(a => { try { a.finish(); } catch (e) {} });
    this.startWords();
  }
  reveal(k, soft) {
    const items = [];
    const add = (el, at, base) => { if (el && el.animate) items.push([el, at, base || '']); };
    add(this.rNav.current, 2.15);
    add(this.rStat.current, 2.25);
    add(this.rJp.current, 2.3, 'translateY(-50%) ');
    add(this.rEye.current, 2.35);
    const h1 = this.rH1.current;
    if (h1) h1.querySelectorAll('.w').forEach((w, i) => add(w, 2.45 + i * 0.08));
    add(this.rCta.current, 3.0);
    add(this.rFoot.current, 3.15);
    this.anims = items.map(([el, at, base]) => {
      const a = el.animate(soft
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [{ opacity: 0, transform: base + 'translateY(18px)', filter: 'blur(8px)' }, { opacity: 1, transform: base + 'translateY(0px)', filter: 'blur(0px)' }],
        { duration: soft ? 600 : 1000 * Math.sqrt(k), delay: soft ? 0 : at * 1000 * k, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' });
      a.onfinish = () => { try { a.cancel(); } catch (e) {} };
      return a;
    });
  }
  introStep(t) {
    const I = this.intro; if (!I || !I.on) return;
    if (I.t0 == null) I.t0 = t;
    const e = (t - I.t0) / 1000 / I.k;
    const cl = v => Math.max(0, Math.min(1, v));
    const io = v => v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
    this.starA = io(cl(e / 1.0));
    this.deckA = io(cl((e - 0.3) / 0.8));
    if (e >= 0.75 && !I.needle) { I.needle = true; this.playing = true; }
    if (e >= 1.5 && !I.ring) { I.ring = true; this.pulse(t); }
    if (I.sunrise) {
      I.p = io(cl((e - 1.2) / 1.7));
      this.mix = I.p;
      if (I.p >= 0.45 && !I.flip) { I.flip = true; this.setState({ dark: false }); }
    }
    if (e >= 4.0) this.endIntro();
  }
  pulse(t0) { for (let i = 0; i < 3; i++) this.rings.push({ t0: t0 + i * 260 }); }
  drawDawn(ctx, w, h, p, noLine) {
    const b = Math.sin(Math.PI * p); if (b < 0.01) return;
    const cx = w * 0.5, cy = h * (1.2 - 0.5 * p), r = Math.max(w, h) * (0.55 + 0.45 * p);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, `rgba(255,214,150,${0.78 * b})`);
    g.addColorStop(0.35, `rgba(244,150,96,${0.4 * b})`);
    g.addColorStop(0.7, `rgba(122,84,150,${0.16 * b})`);
    g.addColorStop(1, 'rgba(122,84,150,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    if (noLine) return;
    const hy = h * (1 - 0.1 * p), lg = ctx.createLinearGradient(0, 0, w, 0);
    lg.addColorStop(0, 'rgba(255,226,180,0)'); lg.addColorStop(0.5, `rgba(255,226,180,${0.9 * b})`); lg.addColorStop(1, 'rgba(255,226,180,0)');
    ctx.fillStyle = lg; ctx.fillRect(0, hy, w, 1.2);
  }
  drawRings(ctx, t, acc, g) {
    if (!this.rings.length) return;
    const D = 1600;
    this.rings = this.rings.filter(r => t - r.t0 < D);
    for (const r of this.rings) {
      const a = (t - r.t0) / D; if (a < 0) continue;
      const e = 1 - Math.pow(1 - a, 3);
      ctx.strokeStyle = `rgba(${acc},${0.55 * (1 - a)})`; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(g.rx, g.ry, g.R * (1.08 + e * 1.4), 0, 6.283); ctx.stroke();
    }
  }

  /* ---------- Stars + turntable ---------- */
  setup() {
    const d = this.props.density ?? 1;
    this.stars = Array.from({ length: Math.round(900 * d) }, () => this.newStar(Math.random() * 1000));
    this.shoot = [];
  }
  newStar(z) {
    const h = Math.random();
    return { x: (Math.random() - 0.5) * 2000, y: (Math.random() - 0.5) * 2000, z: z ?? 1000, pz: z ?? 1000, s: Math.random() * 1.2 + 0.3, ph: Math.random() * 6.28, tint: h < 0.12 ? 1 : h < 0.2 ? 2 : 0 };
  }
  lerp(a, b, t) { return a.map((v, i) => Math.round(v + (b[i] - v) * t)); }
  geo(w, h) {
    const wide = w > 860;
    const S = wide ? Math.min(w * 0.36, h * 0.64) : Math.min(w * 0.72, h * 0.32);
    const H = S * 0.78, x = wide ? w * 0.72 - S / 2 : (w - S) / 2, y = wide ? h * 0.5 - H / 2 : h * 0.11;
    const R = S * 0.33;
    return { S, H, x, y, R, rx: x + S * 0.4, ry: y + H / 2, px: x + S * 0.86, py: y + S * 0.13 };
  }
  rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  drawPlinth(ctx, g, m, ink, acc) {
    const { S, H, x, y, R, rx, ry } = g;
    const plinth = this.lerp([24, 23, 27], [234, 228, 216], m), edge = this.lerp([60, 58, 64], [205, 197, 182], m);
    const metal = this.lerp([70, 68, 74], [196, 192, 184], m), metalHi = this.lerp([140, 138, 144], [246, 244, 238], m);
    ctx.save();
    ctx.shadowColor = `rgba(0,0,0,${0.5 - m * 0.32})`; ctx.shadowBlur = S * 0.08; ctx.shadowOffsetY = S * 0.03;
    this.rr(ctx, x, y, S, H, S * 0.035); ctx.fillStyle = `rgb(${plinth})`; ctx.fill();
    ctx.restore();
    this.rr(ctx, x, y, S, H, S * 0.035); ctx.strokeStyle = `rgb(${edge})`; ctx.lineWidth = 1; ctx.stroke();
    this.rr(ctx, x + S * 0.02, y + S * 0.02, S * 0.96, H - S * 0.04, S * 0.025); ctx.strokeStyle = `rgba(${ink},0.08)`; ctx.stroke();
    ctx.fillStyle = `rgb(${metal})`; ctx.beginPath(); ctx.arc(rx, ry, R * 1.07, 0, 6.283); ctx.fill();
    ctx.strokeStyle = `rgba(${metalHi},0.8)`; ctx.lineWidth = 1; ctx.stroke();
    for (let i = 0; i < 72; i++) { const a = i / 72 * 6.283 + this.spin; ctx.fillStyle = `rgba(${metalHi},0.5)`; ctx.fillRect(rx + Math.cos(a) * R * 1.035 - 1, ry + Math.sin(a) * R * 1.035 - 1, 2, 2); }
    ctx.fillStyle = '#121114'; ctx.beginPath(); ctx.arc(rx, ry, R * 0.99, 0, 6.283); ctx.fill();
    const kx = x + S * 0.86, ky = y + H - S * 0.1;
    ctx.strokeStyle = `rgba(${ink},0.35)`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(kx, ky, S * 0.035, 0, 6.283); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(this.playing ? -0.6 : -2.4) * S * 0.03, ky + Math.sin(this.playing ? -0.6 : -2.4) * S * 0.03); ctx.stroke();
    ctx.fillStyle = this.playing ? `rgb(${acc})` : `rgba(${ink},0.2)`; ctx.beginPath(); ctx.arc(x + S * 0.06, y + H - S * 0.06, S * 0.008 + 1.5, 0, 6.283); ctx.fill();
    ctx.fillStyle = `rgba(${ink},0.45)`; ctx.font = `${Math.max(8, S * 0.022)}px "IBM Plex Mono", monospace`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(this.playing ? '33 RPM · PLAYING' : '33 RPM · STOPPED', x + S * 0.09, y + H - S * 0.06);
  }
  drawArm(ctx, t, g, m, onRecord) {
    const { S, R, rx, ry, px, py } = g;
    const metal = this.lerp([70, 68, 74], [196, 192, 184], m), metalHi = this.lerp([140, 138, 144], [246, 244, 238], m);
    const tAng = Math.atan2(ry - R * 0.62 - py, rx + R * 0.52 - px), L = Math.hypot(rx + R * 0.52 - px, ry - R * 0.62 - py) * 1.04;
    const goal = onRecord ? tAng + Math.sin(t * 0.0004) * 0.01 : Math.PI / 2 - 0.05;
    if (this.armA == null) this.armA = Math.PI / 2 - 0.05;
    this.armA += (goal - this.armA) * 0.04;
    const ex = px + Math.cos(this.armA) * L, ey = py + Math.sin(this.armA) * L;
    ctx.fillStyle = `rgb(${metal})`; ctx.beginPath(); ctx.arc(px, py, S * 0.055, 0, 6.283); ctx.fill();
    ctx.strokeStyle = `rgba(${metalHi},0.9)`; ctx.lineWidth = 1; ctx.stroke();
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 4;
    const bx = px - Math.cos(this.armA) * S * 0.09, by = py - Math.sin(this.armA) * S * 0.09;
    ctx.strokeStyle = `rgb(${metalHi})`; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(2.5, S * 0.012);
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.fillStyle = `rgb(${metal})`; ctx.beginPath(); ctx.arc(bx, by, S * 0.026, 0, 6.283); ctx.fill();
    ctx.translate(ex, ey); ctx.rotate(this.armA + 0.5);
    ctx.fillStyle = `rgb(${metalHi})`; ctx.fillRect(-S * 0.012, -S * 0.02, S * 0.07, S * 0.04);
    ctx.restore();
    ctx.fillStyle = `rgb(${metalHi})`; ctx.beginPath(); ctx.arc(px, py, S * 0.02, 0, 6.283); ctx.fill();
  }
  drawRecord(ctx, cx, cy, R, s, acc, lift, w, h) {
    ctx.save();
    if (lift > 0.001) { const l = Math.min(1, lift * 4); ctx.shadowColor = `rgba(0,0,0,${0.55 * l})`; ctx.shadowBlur = 20 + 60 * l; ctx.shadowOffsetY = 10 + 20 * l; }
    ctx.fillStyle = '#121114'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fill();
    ctx.restore();
    const step = 2.2 * s, lw = Math.min(3, 1 + s * 0.06);
    for (let r = R * 0.38, i = 0; r < R * 0.97; r += step, i++) {
      const gap = i % 26 === 0;
      ctx.strokeStyle = `rgba(255,255,255,${gap ? 0.015 : 0.035 + 0.03 * Math.sin(i * 1.3) ** 2})`;
      ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R * 0.995, 0, 6.283); ctx.stroke();
    if (ctx.createConicGradient) {
      const cg = ctx.createConicGradient(-0.9, cx, cy);
      cg.addColorStop(0, 'rgba(255,255,255,0)'); cg.addColorStop(0.06, 'rgba(255,255,255,0.13)'); cg.addColorStop(0.14, 'rgba(255,255,255,0)');
      cg.addColorStop(0.5, 'rgba(255,255,255,0)'); cg.addColorStop(0.56, 'rgba(255,255,255,0.1)'); cg.addColorStop(0.64, 'rgba(255,255,255,0)'); cg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, R * 0.98, 0, 6.283); ctx.arc(cx, cy, R * 0.36, 0, 6.283, true); ctx.fill();
    }
    const lr = R * 0.34;
    if (cx + lr > 0 && cx - lr < w && cy + lr > 0 && cy - lr < h) {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(this.spin);
      ctx.fillStyle = `rgb(${acc})`; ctx.beginPath(); ctx.arc(0, 0, lr, 0, 6.283); ctx.fill();
      ctx.fillStyle = 'rgba(18,17,20,0.85)'; ctx.font = `500 ${Math.max(7, lr * 0.13)}px "IBM Plex Mono", monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const txt = this.recLabel || 'SHREEYANSH · SIDE A · 33⅓ RPM · ';
      for (let i = 0; i < txt.length; i++) { ctx.save(); ctx.rotate(i / txt.length * 6.283); ctx.fillText(txt[i], 0, -lr * 0.78); ctx.restore(); }
      ctx.font = `italic ${lr * 0.34}px "Instrument Serif", serif`; ctx.fillText('S/Y', 0, lr * 0.32);
      ctx.fillRect(-lr * 0.45, -lr * 0.06, lr * 0.9, 1);
      ctx.restore();
      ctx.fillStyle = 'rgb(200,198,192)'; ctx.beginPath(); ctx.arc(cx, cy, Math.max(2.5, R * 0.025), 0, 6.283); ctx.fill();
    }
  }
  draw(t) {
    const c = this.canvas.current, sc = this.scroller.current, tr = this.track.current; if (!c) return;
    if (sc && tr && sc.scrollTop > tr.offsetHeight + 4) return;   // hero is off screen
    const dpr = Math.min(devicePixelRatio || 1, 2), rc = c.getBoundingClientRect(), w = rc.width, h = rc.height;
    if (!w || !h) return;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = w * dpr; c.height = h * dpr; }
    const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.introStep(t);
    const I = this.intro, sunrising = I && I.on && I.sunrise;
    if (!sunrising) this.mix += ((this.state.dark ? 0 : 1) - this.mix) * 0.06;
    const m = this.mix, z = this.zoom;
    const cl = v => Math.max(0, Math.min(1, v));
    const sm = v => v * v * (3 - 2 * v);
    const zz = sm(cl((z - 0.06) / 0.8));                 // record growth 0..1
    const bg = this.lerp([3, 3, 4], [243, 238, 228], m);
    const ink = this.lerp([245, 244, 238], [31, 28, 24], m);
    const tints = [ink, this.lerp([190, 210, 255], [60, 80, 140], m), this.lerp([255, 222, 190], [150, 80, 30], m)];
    const acc = this.lerp([255, 206, 140], [196, 112, 40], m);
    const tw = this.props.twinkle ?? true;
    const warping = this.warp > 0.05 && zz < 0.01, streak = warping || zz > 0.1;
    ctx.fillStyle = `rgba(${bg},${warping ? 0.35 : 1})`; ctx.fillRect(0, 0, w, h);
    if (sunrising) this.drawDawn(ctx, w, h, I.p);
    this.warp *= 0.975;
    const speed = 0.35 + this.warp * 38 + zz * 9, f = Math.max(w, h) * 0.5;
    const vx = w / 2 - this.mouse.x * 60, vy = h / 2 - this.mouse.y * 40;
    const lightBoost = 1 + m * 0.25, sA = this.starA;
    for (const s of this.stars) {
      s.pz = s.z; s.z -= speed;
      if (s.z < 1) { Object.assign(s, this.newStar(1000)); continue; }
      const sx = vx + (s.x / s.z) * f, sy = vy + (s.y / s.z) * f;
      if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) { if (streak) Object.assign(s, this.newStar(1000)); continue; }
      const k = 1 - s.z / 1000;
      const a = Math.min(1, k * 1.4) * (tw ? 0.65 + 0.35 * Math.sin(t * 0.002 * s.s + s.ph) : 1) * (1 - m * 0.2) * sA;
      const r = s.s * (0.4 + k * 1.8) * lightBoost, col = tints[s.tint];
      if (streak) {
        ctx.strokeStyle = `rgba(${col},${a})`; ctx.lineWidth = r;
        ctx.beginPath(); ctx.moveTo(vx + (s.x / s.pz) * f, vy + (s.y / s.pz) * f); ctx.lineTo(sx, sy); ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(${col},${a})`; ctx.beginPath(); ctx.arc(sx, sy, r, 0, 6.283); ctx.fill();
        if (r > 2 && m < 0.5) { ctx.fillStyle = `rgba(${col},${a * 0.12 * (1 - m * 2)})`; ctx.beginPath(); ctx.arc(sx, sy, r * 4, 0, 6.283); ctx.fill(); }
      }
    }
    if (!(I && I.on) && z < 0.02 && Math.random() < 0.005 && this.shoot.length < 2) this.shoot.push({ x: Math.random() * w * 0.8 + w * 0.1, y: Math.random() * h * 0.4, vx: -(4 + Math.random() * 4), vy: 2 + Math.random() * 2, life: 1 });
    this.shoot = this.shoot.filter(p => p.life > 0);
    for (const p of this.shoot) {
      p.x += p.vx; p.y += p.vy; p.life -= 0.014;
      const g = ctx.createLinearGradient(p.x, p.y, p.x - p.vx * 18, p.y - p.vy * 18);
      g.addColorStop(0, `rgba(${ink},${p.life})`); g.addColorStop(1, `rgba(${ink},0)`);
      ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 18, p.y - p.vy * 18); ctx.stroke();
    }

    // Turntable, then the record lifting off and growing until its black covers the screen
    const g = this.geo(w, h), R0 = g.R;
    const plinthA = this.deckA * (1 - sm(cl(z / 0.045)));            // the turntable goes almost at once; the record stays
    const D = Math.hypot(w, h), sEnd = D / (0.5 * R0);
    const s = Math.pow(sEnd, zz);
    const fa = -2.4, ox = Math.cos(fa) * 0.66 * R0, oy = Math.sin(fa) * 0.66 * R0;   // zoom into the grooves, upper-left of the label
    const F0x = g.rx + ox, F0y = g.ry + oy;
    const Fx = F0x + (w / 2 - F0x) * zz, Fy = F0y + (h / 2 - F0y) * zz;
    const cx = Fx - ox * s, cy = Fy - oy * s;
    this.spinV += ((this.rewinding ? -0.14 : this.playing ? 0.034 : 0) - this.spinV) * 0.03;
    this.spin += this.spinV;
    ctx.save();
    ctx.translate(0, (1 - this.deckA) * 24);
    ctx.globalAlpha = plinthA;
    if (plinthA > 0.005) this.drawPlinth(ctx, g, m, ink, acc);
    const onRecord = this.playing && z < 0.02;
    if (zz < 0.01) {
      ctx.globalAlpha = this.deckA; this.drawRecord(ctx, cx, cy, R0 * s, s, acc, 0, w, h);
      ctx.globalAlpha = plinthA; this.drawArm(ctx, t, g, m, onRecord);
    } else {
      ctx.globalAlpha = plinthA; if (plinthA > 0.005) this.drawArm(ctx, t, g, m, onRecord);
      ctx.globalAlpha = this.deckA; this.drawRecord(ctx, cx, cy, R0 * s, s, acc, zz, w, h);
    }
    ctx.restore();
    if (z < 0.05) this.drawRings(ctx, t, acc, g);
    const blackA = cl((z - 0.82) / 0.14);
    if (blackA > 0) {
      // fade to the section's black, but keep the grooves: the same rings continue in the section below
      ctx.fillStyle = `rgba(11,11,13,${blackA})`; ctx.fillRect(0, 0, w, h);
      const R = R0 * s, st = 2.2 * s;
      const nx = Math.max(0, Math.max(-cx, cx - w)), ny = Math.max(0, Math.max(-cy, cy - h)), near = Math.hypot(nx, ny);
      const far = Math.hypot(Math.max(Math.abs(cx), Math.abs(cx - w)), Math.max(Math.abs(cy), Math.abs(cy - h)));
      ctx.strokeStyle = `rgba(236,235,230,${0.055 * blackA})`; ctx.lineWidth = 1.5;
      for (let r = R * 0.38 + Math.max(0, Math.ceil((near - R * 0.38) / st)) * st; r <= far; r += st) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.stroke(); }
    }
  }

  /* ---------- Scroll: hero exit, title writing, the ship's route ---------- */
  heroExit(z) {
    const cl = v => Math.max(0, Math.min(1, v));
    const e = 1 - Math.pow(1 - cl(z / 0.16), 3);
    if (Math.abs(e - this._exitE) < 0.0005) return; this._exitE = e;
    const set = (ref, tf, op) => { const el = ref.current; if (el) { el.style.transform = tf; el.style.opacity = String(op); } };
    set(this.rStat, `translateX(${50 * e}px)`, 1 - e);
    set(this.rJp, `translateY(-50%) translateX(${-50 * e}px)`, 1 - e);
    set(this.rEye, `translateY(${50 * e}px)`, 1 - e);
    set(this.rH1, `translateY(${80 * e}px)`, 1 - e * 1.1);
    set(this.rCta, `translateY(${110 * e}px)`, 1 - e * 1.2);
    set(this.rFoot, `translateY(${40 * e}px)`, 1 - e);
  }
  sample(pathEl, d, step) {
    pathEl.setAttribute('d', d);
    const L = pathEl.getTotalLength(), n = Math.max(2, Math.ceil(L / step)), pts = [];
    for (let i = 0; i <= n; i++) { const s = (i / n) * L, p = pathEl.getPointAtLength(s); pts.push({ x: p.x, y: p.y, s }); }
    return { pts, L, n };
  }
  wave(base, L) {
    const n = base.length - 1, out = [];
    for (let i = 0; i <= n; i++) {
      const p = base[i], a = base[Math.max(0, i - 1)], b = base[Math.min(n, i + 1)];
      const dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
      const env = Math.max(0, Math.min(1, p.s / 140, (L - p.s) / 140));
      const amp = (1.2 + 6 * (0.5 + 0.5 * Math.sin(p.s * 0.009))) * env;
      const off = amp * Math.sin(p.s * 2 * Math.PI / 64);
      out.push({ x: p.x + nx * off, y: p.y + ny * off });
    }
    return out;
  }
  dOf(pts) { return 'M' + pts.map(p => p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' L'); }
  layout() {
    const sc = this.scroller.current, st = this.headStage.current, hl = this.headline.current, pr = this.proj.current, svgB = this.svgB.current;
    if (!sc || !st || !hl || !pr || !svgB || !this.baseA.current || !this.baseB.current) return;
    const vw = sc.clientWidth, vh = sc.clientHeight; if (!vw || !vh) return;
    this.needLayout = false;
    const anchor = vh * 0.6; this.anchor = anchor;
    // grooves in the black section, lined up with the record's final frame
    const hw = vw, hh = Math.max(vh, 700), gg = this.geo(hw, hh), R0 = gg.R, D = Math.hypot(hw, hh), sE = D / (0.5 * R0);
    const gcx = hw / 2 - Math.cos(-2.4) * 0.66 * R0 * sE, gcy = hh / 2 - Math.sin(-2.4) * 0.66 * R0 * sE;
    const gst = 2.2 * sE, gA = (R0 * sE * 0.38) % gst, gc = 'rgba(236,235,230,.055)';
    if (this.space.current) this.space.current.style.backgroundImage =
      `repeating-radial-gradient(circle at ${gcx.toFixed(1)}px ${(gcy - hh).toFixed(1)}px, transparent 0px, transparent ${gA.toFixed(2)}px, ${gc} ${gA.toFixed(2)}px, ${gc} ${(gA + 1.5).toFixed(2)}px, transparent ${(gA + 1.5).toFixed(2)}px, transparent ${gst.toFixed(2)}px)`;
    const xB = vw / 2;

    // Path A: swoop in, write under the title, loop round, settle at the guide point
    const sr = st.getBoundingClientRect(), r = hl.getBoundingClientRect();
    const hL = r.left - sr.left, hR = r.right - sr.left, wy = r.bottom - sr.top + 10;
    const mid = Math.max(wy + 40, (wy + anchor) / 2), loop = Math.max(24, Math.min(160, vw - hR - 16));
    const dA = `M-90 ${vh * 0.08} C${vw * 0.12} ${vh * 0.02}, ${hL - 170} ${wy - 140}, ${hL - 30} ${wy}` +
      ` L${hR + 30} ${wy}` +
      ` C${hR + 30 + loop} ${wy}, ${hR + 30 + loop} ${mid}, ${hR + 10} ${mid}` +
      ` C${hR + 10 - (hR - xB) * 0.6} ${mid}, ${xB} ${mid + (anchor - mid) * 0.3}, ${xB} ${anchor}`;
    const SA = this.sample(this.baseA.current, dA, 4);
    const waveA = this.wave(SA.pts, SA.L), wdA = this.dOf(waveA);
    this.ghostA.current.setAttribute('d', dA);
    this.glowA.current.setAttribute('d', wdA); this.coreA.current.setAttribute('d', wdA);
    let mx = 0; const rev = SA.pts.map(p => (mx = Math.max(mx, Math.max(0, Math.min(1, (p.x - hL) / Math.max(1, hR - hL))))));
    this.A = { base: SA.pts, pts: waveA, n: SA.n, rev };

    // Path B: from the guide point down through every stop
    const off = vh - anchor, prR = pr.getBoundingClientRect();
    const stops = Array.from(pr.querySelectorAll('[data-stop]')).map(el => { const b = el.getBoundingClientRect(); return { x: b.left + b.width / 2 - prR.left, y: b.top + b.height / 2 - prR.top + off }; });
    let dB = `M${xB} 0`, px = xB, py = 0;
    for (const sp of stops) { const my = (py + sp.y) / 2; dB += ` C${px} ${my}, ${sp.x} ${my}, ${sp.x} ${sp.y}`; px = sp.x; py = sp.y; }
    const ex = pr.querySelector('[data-exit]');
    const exitY = ex ? Math.max(py + 160, ex.getBoundingClientRect().top - prR.top + off - 70) : py + 360;
    const parkX = vw - Math.max(56, Math.min(90, vw * 0.05));
    dB += ` C${px} ${py + (exitY - py) * 0.55}, ${px + (parkX - px) * 0.45} ${exitY - 50}, ${parkX} ${exitY}`;
    svgB.style.top = -off + 'px'; svgB.style.height = (pr.offsetHeight + off) + 'px';
    const SB = this.sample(this.baseB.current, dB, 4);
    const waveB = this.wave(SB.pts, SB.L), wdB = this.dOf(waveB);
    this.ghostB.current.setAttribute('d', dB);
    this.glowB.current.setAttribute('d', wdB); this.coreB.current.setAttribute('d', wdB);
    this.B = { base: SB.pts, pts: waveB, n: SB.n, stops, off };
    this.rows = Array.from(pr.querySelectorAll('[data-row]'));
  }
  scrollFrame() {
    const sc = this.scroller.current, tr = this.track.current; if (!sc || !tr) return;
    if (this.needLayout) this.layout();
    const vh = sc.clientHeight, top = sc.scrollTop, cl = v => Math.max(0, Math.min(1, v));
    this.zoom = cl(top / Math.max(1, tr.offsetHeight - vh));
    this.heroExit(this.zoom);
    const A = this.A, B = this.B; if (!A || !B) return;
    const scR = sc.getBoundingClientRect();
    const ht = this.headTrack.current, htR = ht.getBoundingClientRect();
    const pA = cl((scR.top - htR.top) / Math.max(1, ht.offsetHeight - vh));
    const layerR = this.shipLayer.current.getBoundingClientRect();
    const at = (P, fi) => { const i = Math.max(0, Math.min(P.n, Math.floor(fi))), j = Math.min(P.n, i + 1), f = fi - i, a = P.pts[i], b = P.pts[j]; return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, i }; };
    const angAt = (P, i) => { const a = P.base[Math.max(0, i - 3)], b = P.base[Math.min(P.n, i + 3)]; return Math.atan2(b.y - a.y, b.x - a.x); };
    let sx, sy, ang, call, fracA, fracB = 0, active = -1;
    if (pA < 1) {
      const fi = pA * A.n, p = at(A, fi), stR = this.headStage.current.getBoundingClientRect();
      sx = p.x + stR.left - layerR.left; sy = p.y + stR.top - layerR.top; ang = angAt(A, p.i);
      fracA = pA;
      const rv = A.rev[p.i];
      this.headline.current.style.clipPath = `inset(-30% ${((1 - rv) * 100).toFixed(2)}% -40% -4%)`;
      this.sub.current.style.opacity = String(cl((rv - 0.85) / 0.15));
      call = rv < 0.999 ? 'SY-1 · Writing the title' : 'SY-1 · Plotting the course';
    } else {
      fracA = 1;
      this.headline.current.style.clipPath = 'none';
      this.sub.current.style.opacity = '1';
      const bR = this.svgB.current.getBoundingClientRect();
      const ty = scR.top + this.anchor - bR.top;
      let lo = 0, hi = B.n;
      while (lo < hi) { const md = (lo + hi) >> 1; if (B.base[md].y < ty) lo = md + 1; else hi = md; }
      let fi = lo;
      if (lo > 0 && lo <= B.n) { const a = B.base[lo - 1], b = B.base[lo]; fi = lo - 1 + cl((ty - a.y) / Math.max(0.001, b.y - a.y)); }
      fi = Math.max(0, Math.min(B.n, fi));
      const p = at(B, fi), by = B.base[Math.min(B.n, Math.round(fi))].y;
      sx = p.x + bR.left - layerR.left; sy = p.y + bR.top - layerR.top; ang = angAt(B, p.i);
      fracB = fi / B.n;
      B.stops.forEach((s, k) => { if (by >= s.y - 3) active = k; });
      const names = this.stopNames, next = active + 1;
      call = next < names.length ? 'Next stop · ' + names[next] : (fracB > 0.995 ? 'SY-1 · Parked · see you at Contact' : 'SY-1 · Heading to the edge');
    }
    const now = performance.now(), hr = this.hlRow.current;
    const hlOn = !!hr && hr.getBoundingClientRect().top < scR.top + vh * 0.82;
    if (hr) { const v = hlOn ? '1' : '0'; if (hr.getAttribute('data-on') !== v) hr.setAttribute('data-on', v); }
    const counts = this.highlightData.map((h, k) => {
      if (hlOn) { if (this.hlStart[k] == null) this.hlStart[k] = now + k * 90; } else this.hlStart[k] = null;
      if (this.hlStart[k] == null) return 0;
      const e = cl((now - this.hlStart[k]) / 1200);
      return Math.round(h.v * (1 - Math.pow(1 - e, 3)));
    });
    if (counts.some((c, k) => c !== this.state.counts[k])) this.setState({ counts });
    (this.rows || []).forEach((row, k) => { const on = k <= active ? '1' : '0'; if (row.getAttribute('data-on') !== on) row.setAttribute('data-on', on); });
    const dash = v => String((1000 * (1 - v)).toFixed(1));
    this.glowA.current.setAttribute('stroke-dashoffset', dash(fracA)); this.coreA.current.setAttribute('stroke-dashoffset', dash(fracA));
    this.glowB.current.setAttribute('stroke-dashoffset', dash(fracB)); this.coreB.current.setAttribute('stroke-dashoffset', dash(fracB));

    // ship + its callout
    let da = ang - this.shipAng; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
    this.shipAng += da * 0.2;
    const visible = layerR.bottom > 0 && layerR.top < scR.bottom && sx > -60 && sx < sc.clientWidth + 60 && sy > -40 && sy < scR.height + 40;
    const ship = this.ship.current, co = this.callout.current;
    ship.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) rotate(${(this.shipAng * 180 / Math.PI).toFixed(1)})`);
    ship.style.opacity = visible ? '1' : '0';
    const cw = co.offsetWidth || 200, vw = sc.clientWidth;
    const cxp = Math.max(12, Math.min(vw - cw - 12, sx + 30)), cyp = Math.max(12, sy - 48);
    co.style.transform = `translate(${cxp.toFixed(1)}px, ${cyp.toFixed(1)}px)`;
    co.style.opacity = visible && sx > 20 ? '1' : '0';
    if (call && call !== this.state.call) this.setState({ call });
    this.svFrame(scR);
    this.cFrame(performance.now(), scR);
    this.navFrame();
  }

  /* ---------- Services: record shrinks, slides into its sleeve, the sleeve flips into four ---------- */
  pjLay(d, w, h) {   // the A24-style curved row: smaller and lower to the left, bigger and higher to the right
    if (w < 640) {
      const b = Math.min(h * 0.42, w * 0.8);
      return { x: w / 2 + w * (0.6 * d + 0.05 * d * d), y: h * 0.56 - h * (0.1 * d + 0.02 * d * d), size: b * Math.pow(1.25, d), rx: 14, ry: -16, rz: -6 };
    }
    const ux = Math.min(w, h * 2.1);
    return { x: w / 2 + ux * (0.27 * d + 0.04 * d * d), y: h * 0.53 - h * (0.15 * d + 0.03 * d * d), size: h * 0.58 * Math.pow(1.28, d), rx: 16, ry: -20, rz: -6 };
  }
  svFrame(scR) {
    const tr = this.svTrack.current, st = this.svStage.current, c = this.svCanvas.current;
    if (!tr || !st || !c) return;
    const trR = tr.getBoundingClientRect();
    if (trR.top > scR.bottom || trR.bottom < scR.top) { this.pjOn = false; return; }
    const vh = scR.height, cl = v => Math.max(0, Math.min(1, v));
    const sm = v => v * v * (3 - 2 * v), io = v => v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2, eo = v => 1 - Math.pow(1 - v, 3);
    const lerp = (a, b, t) => a + (b - a) * t;
    // p = how many screens we are into this pinned stage (0 … 12)
    const P = Math.max(0, Math.min(11.85, (scR.top - trR.top) / vh)), q = cl(P / 5.4);
    const trackTop = this.scroller.current.scrollTop + (trR.top - scR.top);
    this.pjLo = trackTop + 7.4 * vh; this.pjHi = trackTop + 10.6 * vh;
    const ex = cl((P - 5.8) / 1.6);   // Services → Projects hand-off: sleeves drift out left as the CD row glides in
    const w = st.clientWidth, h = st.clientHeight; if (!w || !h) return;
    const pad = Math.max(20, Math.min(56, w * 0.04)), gap = 24, rowW = Math.min(1328, w - 2 * pad);
    const mob = w < 640, gp = mob ? 12 : gap;
    const S = mob ? Math.min((rowW - gp) / 2, h * 0.3) : Math.max(150, Math.min((rowW - 3 * gap) / 4, h * 0.42)), R = S * 0.46;
    const Sh = mob ? Math.min(S * 1.42, (h * 0.6 - gp) / 2) : S;
    const cy0 = h * 0.58, RCx = w / 2 - S * 0.62, SCx = w / 2 + S * 0.62, outX = w / 2 - S * 1.24;

    // Services (q over p 0–5.4): Highlights over the giant record → record shrinks onto the light page →
    // sleeve in → record turns 90° into it → flip → four sleeves.
    // Projects (p 5.8–11.2): sleeves drift out left while the CD row slides in along its curve →
    // then scroll/drag through the five CDs.
    const dpr = Math.min(devicePixelRatio || 1, 2);
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = w * dpr; c.height = h * dpr; }
    const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#f3eee4'; ctx.fillRect(0, 0, w, h);
    if (q < 0.70) {
      const u = sm(cl(q / 0.44)), D = Math.hypot(w, h), sStart = D / (0.5 * R), s = Math.pow(sStart, 1 - u);
      const fa = -2.4, ox = Math.cos(fa) * 0.66 * R, oy = Math.sin(fa) * 0.66 * R;
      const Fx = w / 2 + (RCx + ox - w / 2) * u, Fy = h / 2 + (cy0 + oy - h / 2) * u;
      const sl = io(cl((q - 0.58) / 0.10));
      const cx = Fx - ox * s + (SCx - RCx) * sl, cy = Fy - oy * s;
      const th = q < 0.58 ? -Math.PI / 2 - 12 * Math.pow(0.58 - q, 1.3) : -Math.PI / 2 + (Math.PI / 2) * sl;
      const keep = this.spin; this.spin = th;
      this.drawRecord(ctx, cx, cy, R * s, s, '240,194,122', u > 0.6 ? (u - 0.6) * 0.6 : 0, w, h);
      this.spin = keep;
    }

    // after the last CD: night rises from the bottom behind a soft, slowly moving sound-wave edge.
    // It is drawn on a layer above the CDs, so they stay on the white page and the wave covers them.
    // hold on the last CD: the wave may only start after you've been on it for a full second
    const lastN = this.pjData.length - 1, nowT = performance.now();
    if (P >= 10.6 && this.pjA > lastN - 0.06) { if (this.lastAt == null) this.lastAt = nowT; } else this.lastAt = null;
    const gate = this.lastAt != null && nowT - this.lastAt > 1000;
    const nsTarget = gate ? cl((P - 11.0) / 0.62) : 0;
    this.nsVal = (this.nsVal || 0) + (nsTarget - (this.nsVal || 0)) * 0.1;
    if (Math.abs(nsTarget - this.nsVal) < 0.001) this.nsVal = nsTarget;
    const ns = sm(this.nsVal);
    this.nightA = ns;
    const nc = this.svNight.current;
    if (nc) {
      if (nc.width !== Math.round(w * dpr) || nc.height !== Math.round(h * dpr)) { nc.width = w * dpr; nc.height = h * dpr; }
      const nx = nc.getContext('2d'); nx.setTransform(dpr, 0, 0, dpr, 0, 0); nx.clearRect(0, 0, w, h);
      if (ns > 0) {
        const tt = this.frameT || 0, A = Math.min(26, h * 0.028);
        const front = h + A * 2 - (h + A * 4) * ns;
        const waveY = x => front + A * 0.6 * Math.sin(x * 0.0062 + tt * 0.0011) + A * 0.4 * Math.sin(x * 0.0147 - tt * 0.0017 + 1.3);
        nx.save();
        nx.beginPath(); nx.moveTo(0, h + 2);
        for (let x = 0; x <= w + 16; x += 16) nx.lineTo(x, waveY(x));
        nx.lineTo(w, h + 2); nx.closePath();
        nx.fillStyle = '#030304'; nx.fill(); nx.clip();
        this.drawStarsLite(nx, w, h, tt, cl((ns - 0.25) / 0.5), st.getBoundingClientRect().top - scR.top);
        nx.restore();
      }
    }
    const hl = this.svHl.current;
    if (hl) { const a = cl((q - 0.10) / 0.12); hl.style.opacity = String(1 - a); hl.style.transform = `translateY(calc(-50% - ${(a * 60).toFixed(1)}px))`; hl.style.visibility = a >= 1 ? 'hidden' : 'visible'; }
    const dc = this.svDeco.current;
    if (dc) {
      const a = cl((q - 0.38) / 0.1) * (1 - cl(ex / 0.45));
      dc.style.opacity = a.toFixed(3); dc.style.visibility = a < 0.002 ? 'hidden' : 'visible';
      if (this.svClouds.current) this.svClouds.current.style.transform = `translateY(${((1 - cl((q - 0.38) / 0.3)) * 40 + ex * 60).toFixed(1)}px)`;
    }
    const hd = this.svHead.current;
    if (hd) { const a = cl((q - 0.40) / 0.06) * (1 - cl(ex / 0.35)); hd.style.opacity = String(a); hd.style.transform = `translateY(${(1 - a) * 24}px)`; }

    const cv = this.svCover.current;
    if (cv) {
      const inT = eo(cl((q - 0.46) / 0.10)), mv = io(cl((q - 0.70) / 0.07)), fl = cl((q - 0.77) / 0.05);
      const x = (w + S) + (SCx - (w + S)) * inT + (w / 2 - SCx) * mv, ry = 90 * fl * fl, on = q > 0.44 && q < 0.82;
      cv.style.width = S + 'px'; cv.style.height = S + 'px';
      cv.style.transform = `translate3d(${(x - S / 2).toFixed(1)}px, ${(cy0 - S / 2).toFixed(1)}px, 0) rotateY(${ry.toFixed(2)}deg)`;
      cv.style.opacity = on ? '1' : '0';
    }
    const rw = mob ? 2 * S + gp : 4 * S + 3 * gap, left = (w - rw) / 2, now = performance.now();
    st.querySelectorAll('.svcard').forEach((el, k) => {
      const t = cl((q - 0.82 - k * 0.022) / 0.10), e = eo(t), f = 1 - Math.pow(1 - cl(t * 1.4), 2);
      const o = sm(cl((ex - k * 0.07) / 0.6));                  // leaves left, first sleeve first
      // always-on idle float once a sleeve has landed: a slow bob and a soft 3D sway, each on its own phase
      const ph = now * 0.0011 + k * 1.7, idle = e * (1 - o);
      const bob = Math.sin(ph) * 7 * idle, swX = Math.sin(ph * 0.8 + 1) * 3.5 * idle, swY = Math.cos(ph * 0.9) * 5 * idle, swZ = Math.sin(ph * 0.6 + 2) * 1.2 * idle;
      const col = mob ? k % 2 : k, row = mob ? (k >> 1) - 0.5 : 0;
      const tx = left + col * (S + gp) + S / 2, ty = cy0 + (mob ? 0.02 * h : 0) + row * (Sh + gp);
      const x = w / 2 + (tx - w / 2) * e - o * w * 0.55, y = cy0 + (ty - cy0) * e + o * S * 0.18 + bob;
      el.style.width = S + 'px'; el.style.height = Sh + 'px';
      el.style.transform = `translate3d(${(x - S / 2).toFixed(1)}px, ${(y - Sh / 2).toFixed(1)}px, 0) rotateY(${(-90 * (1 - f) + swY).toFixed(2)}deg) rotateX(${swX.toFixed(2)}deg) rotateZ(${(-6 * o + swZ).toFixed(2)}deg)`;
      el.style.opacity = t > 0 ? String((1 - o).toFixed(3)) : '0';
    });

    // ---- Projects: CDs ----
    const N = this.pjData.length, B = h * 0.58;
    // the row arrives the same way it moves: sliding along its curve from the top right (A −3.2 → 0), then scrolls through
    const target = P < 7.4 ? -3.2 + 3.2 * sm(ex) : cl((P - 7.4) / (0.8 * (N - 1))) * (N - 1);
    this.pjA += (target - this.pjA) * 0.14; if (Math.abs(target - this.pjA) < 0.0005) this.pjA = target;
    const A = this.pjA;
    const active = Math.max(0, Math.min(N - 1, Math.round(A)));
    if (active !== this.state.pj) this.setState({ pj: active });
    this.pjOn = P > 7.2 && (this.nightA || 0) < 0.3;
    st.querySelectorAll('.pjd').forEach((el, i) => {
      if (el.style.width !== B + 'px') { el.style.width = B + 'px'; el.style.height = B + 'px'; }
      const d = i - A, L = this.pjLay(d, w, h);
      let op = cl((P - 5.85) / 0.25);   // stays on the white page; the night wave covers it
      if (d < -2.4) op *= cl((d + 3.2) / 0.8);
      el.style.opacity = op.toFixed(3); el.style.visibility = op < 0.002 ? 'hidden' : 'visible';
      el.style.transform = `translate3d(${(L.x - B / 2).toFixed(1)}px, ${(L.y - B / 2).toFixed(1)}px, 0) rotateZ(${L.rz}deg) rotateX(${L.rx}deg) rotateY(${L.ry}deg) scale(${(L.size / B).toFixed(4)})`;
      el.style.pointerEvents = this.pjOn && op > 0.5 && d > -2.6 && d < 1.8 ? 'auto' : 'none';
      const art = el.firstElementChild && el.firstElementChild.firstElementChild;
      if (art) art.style.transform = `rotate(${(-d * 32).toFixed(1)}deg)`;
    });
    const ui = cl((P - 6.7) / 0.4) * (1 - cl(((this.nightA || 0) - 0.85) / 0.15));
    [this.pjTop, this.pjInfo, this.pjSide, this.pjQuotes].forEach(r => { if (r.current) r.current.style.opacity = String(ui); });
  }

  /* ---------- floating nav ---------- */
  absTop(el) { const sc = this.scroller.current; return el.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop; }
  navTargets() {
    const sc = this.scroller.current; if (!sc) return null;
    const vh = sc.clientHeight, ht = this.headTrack.current, sv = this.svTrack.current, ct = this.cTrack.current;
    if (!ht || !sv || !ct) return null;
    const htTop = this.absTop(ht), svTop = this.absTop(sv), ctTop = this.absTop(ct);
    return {
      home: 0,
      about: htTop + (ht.offsetHeight - vh) * 0.62,
      services: svTop + 5.3 * vh,
      projects: svTop + 7.4 * vh,
      contact: ctTop + (ct.offsetHeight - vh),
      // where each tab becomes the highlighted one
      edges: [['about', htTop - vh * 0.4], ['services', svTop + 1.6 * vh], ['projects', svTop + 6.0 * vh], ['contact', ctTop - vh * 0.5]]
    };
  }
  scrollToY(y) {
    const sc = this.scroller.current; if (!sc) return;
    this.endIntro();
    const from = sc.scrollTop, dist = Math.abs(y - from), t0 = performance.now(), D = Math.min(2600, 700 + dist / 6);
    const io = v => v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
    const id = (this._navAnim = (this._navAnim || 0) + 1);
    const step = () => {
      if (id !== this._navAnim) return;
      const k = Math.min(1, (performance.now() - t0) / D);
      sc.scrollTop = from + (y - from) * io(k);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  navGo(key) { const T = this.navTargets(); if (T) this.scrollToY(T[key]); }
  navFrame() {
    const sc = this.scroller.current, T = this.navTargets(); if (!sc || !T) return;
    let on = 'home'; for (const [k, y] of T.edges) if (sc.scrollTop >= y) on = k;
    if (on !== this._navOn) {
      this._navOn = on;
      const bar = this.rNav.current;
      if (bar) bar.querySelectorAll('[data-nav]').forEach(b => b.setAttribute('data-on', b.getAttribute('data-nav') === on ? '1' : '0'));
    }
    const col = sc.scrollTop > sc.clientHeight * 0.3 && !this.navHover;
    if (col !== this._col) {
      this._col = col;
      if (this.navGroup.current) this.navGroup.current.setAttribute('data-col', col ? '1' : '0');
      if (this.rNav.current) this.rNav.current.classList.toggle('nvcol', col);
    }
    const spin = this.playing && !this.userPaused, d = this.navDisc.current;
    if (d && spin !== this._discAnim) { this._discAnim = spin; d.style.transformOrigin = '50% 50%'; d.style.animation = spin ? 'svSpin 2.4s linear infinite' : 'none'; }
  }
  drawStarsLite(ctx, w, h, t, alpha, offY) {
    // stars live in viewport space, so two canvases sliding past each other show the same sky (no seam)
    const sc = this.scroller.current, VW = sc ? sc.clientWidth : w, VH = sc ? sc.clientHeight : h, oy = offY || 0;
    if (this._sf !== this.frameN) { this._sf = this.frameN; for (const st of this.stars) { st.pz = st.z; st.z -= 0.35; if (st.z < 1) Object.assign(st, this.newStar(1000)); } }
    if (alpha <= 0) return;
    const f = Math.max(VW, VH) * 0.5, vx = VW / 2 - this.mouse.x * 60, vy = VH / 2 - this.mouse.y * 40;
    for (const st of this.stars) {
      const sx = vx + (st.x / st.z) * f, sy = vy + (st.y / st.z) * f - oy;
      if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue;
      const k = 1 - st.z / 1000, a = Math.min(1, k * 1.4) * (0.65 + 0.35 * Math.sin(t * 0.002 * st.s + st.ph)) * alpha;
      ctx.fillStyle = `rgba(245,244,238,${a})`; ctx.beginPath(); ctx.arc(sx, sy, st.s * (0.4 + k * 1.8), 0, 6.283); ctx.fill();
    }
  }
  /* ---------- Contact: sunset back to night, the record flips to Side B ---------- */
  cFrame(t, scR) {
    const tr = this.cTrack.current, c = this.cCanvas.current; if (!tr || !c) return;
    const trR = tr.getBoundingClientRect();
    if (trR.top > scR.bottom || trR.bottom < scR.top) return;
    const vh = scR.height, cl = v => Math.max(0, Math.min(1, v)), sm = v => v * v * (3 - 2 * v);
    const lead = vh * 0.75, s = cl((scR.top - trR.top + lead) / Math.max(1, tr.offsetHeight - vh + lead));
    const w = c.clientWidth, h = c.clientHeight; if (!w || !h) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = w * dpr; c.height = h * dpr; }
    const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const m = 0;                                                       // already night: the sunset happened on the Projects screen
    const bg = [3, 3, 4], ink = this.lerp([245, 244, 238], [31, 28, 24], m), acc = this.lerp([255, 206, 140], [196, 112, 40], m);
    ctx.fillStyle = `rgb(${bg})`; ctx.fillRect(0, 0, w, h);
    this.drawStarsLite(ctx, w, h, this.frameT, 1, c.getBoundingClientRect().top - scR.top);
    // the turntable returns; the record lifts, flips to Side B, lands; the needle drops
    const g = this.geo(w, h), dA = sm(cl((s - 0.18) / 0.3));
    const fl = sm(cl((s - 0.5) / 0.32)), lift = Math.sin(Math.PI * fl), sx = Math.max(0.03, Math.abs(Math.cos(Math.PI * fl))), sideB = fl >= 0.5;
    const playing = (s > 0.86 && !this.userPaused) || this.rewinding;
    this.spinV += ((this.rewinding ? -0.14 : playing ? 0.034 : 0.004) - this.spinV) * 0.03; this.spin += this.spinV;
    if (dA > 0.001) {
      ctx.save(); ctx.globalAlpha = dA; ctx.translate(0, (1 - dA) * 30);
      this.drawPlinth(ctx, g, m, ink, acc);
      const cx = g.rx, cy = g.ry - lift * g.R * 0.35;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(sx, 1); ctx.translate(-cx, -cy);
      this.recLabel = sideB ? 'SHREEYANSH · SIDE B · LET\'S TALK · ' : null;
      this.drawRecord(ctx, cx, cy, g.R * (1 + lift * 0.06), 1, sideB ? '236,235,230' : `${acc}`, lift, w, h);
      this.recLabel = null;
      ctx.restore();
      this.drawArm(ctx, t, g, m, playing && fl >= 1);
      ctx.restore();
      this.drawRings(ctx, t, '240,194,122', g);
    }
    const hd = this.cHead.current;
    if (hd) { const a = sm(cl((s - 0.42) / 0.3)); hd.style.opacity = String(a); hd.style.transform = `translateY(${((1 - a) * 24).toFixed(1)}px)`; }
  }
  rewind() {
    const sc = this.scroller.current; if (!sc || this.rewinding) return;
    const from = sc.scrollTop, t0 = performance.now(), D = Math.min(3600, 1400 + from / 8);
    this.rewinding = true;
    const io = v => v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
    const step = () => {
      const k = Math.min(1, (performance.now() - t0) / D);
      sc.scrollTop = from * (1 - io(k));
      if (k < 1) requestAnimationFrame(step); else this.rewinding = false;
    };
    requestAnimationFrame(step);
  }
  sendSignal() {
    const name = (this.cName.current && this.cName.current.value || '').trim();
    const mail = (this.cMail.current && this.cMail.current.value || '').trim();
    const msg = (this.cMsg.current && this.cMsg.current.value || '').trim();
    if (!mail || !msg) { this.setState({ cStatusText: 'Add your email and a message first.' }); return; }
    const ship = this.cShip.current;
    if (ship && ship.animate) {
      ship.animate([
        { transform: 'translate(60px, 92px)' },
        { transform: 'translate(60px, 96px)', offset: 0.15 },
        { transform: 'translate(70px, -40px) rotate(8deg)', offset: 0.55 },
        { transform: 'translate(110px, -700px) rotate(14deg)' }
      ], { duration: 1700, easing: 'cubic-bezier(.5,0,.75,.2)', fill: 'forwards' }).onfinish = () => {
        setTimeout(() => ship.animate([{ transform: 'translate(60px, 60px)', opacity: 0 }, { transform: 'translate(60px, 92px)', opacity: 1 }], { duration: 700, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' }), 1600);
      };
    }
    this.setState({ cStatusText: 'Signal sent. Opening your mail app…' });
    const url = 'mailto:shreeyanshsingh07@gmail.com?subject=' + encodeURIComponent('Signal from ' + (name || 'your portfolio')) +
      '&body=' + encodeURIComponent(msg + '\n\n— ' + (name || '') + ' (' + mail + ')');
    setTimeout(() => { try { window.location.href = url; } catch (e) {} }, 900);
  }

  renderVals() {
    const word = this.words[this.state.wi];
    return {
      hero: this.hero, canvas: this.canvas, knob: this.knob,
      rNav: this.rNav, rJp: this.rJp, rEye: this.rEye, rH1: this.rH1, rCta: this.rCta, rStat: this.rStat, rFoot: this.rFoot,
      cTrack: this.cTrack, cCanvas: this.cCanvas, cHead: this.cHead, cShip: this.cShip, cName: this.cName, cMail: this.cMail, cMsg: this.cMsg, cStatus: this.cStatus,
      navDisc: this.navDisc, navGroup: this.navGroup,
      navIn: () => { clearTimeout(this._navT); this.navHover = true; },
      navOut: () => { clearTimeout(this._navT); this._navT = setTimeout(() => { this.navHover = false; }, 500); },
      nav_home: e => { if (e && e.preventDefault) e.preventDefault(); this.navGo('home'); },
      nav_about: () => this.navGo('about'), nav_services: () => this.navGo('services'), nav_projects: () => this.navGo('projects'), nav_contact: () => this.navGo('contact'),
      navPlay: () => { this.endIntro(); this.userPaused = !this.userPaused; this.playing = !this.userPaused; if (this.playing) this.pulse(performance.now()); },
      cStatusText: this.state.cStatusText, cHover: () => this.pulse(performance.now()), sendSignal: () => this.sendSignal(), toTop: () => this.rewind(),
      scroller: this.scroller, track: this.track, space: this.space, shipLayer: this.shipLayer, ship: this.ship, callout: this.callout,
      headTrack: this.headTrack, headStage: this.headStage, headline: this.headline, sub: this.sub,
      baseA: this.baseA, ghostA: this.ghostA, glowA: this.glowA, coreA: this.coreA,
      proj: this.proj, svgB: this.svgB, hlRow: this.hlRow,
      svTrack: this.svTrack, svStage: this.svStage, svCanvas: this.svCanvas, svHead: this.svHead, svCover: this.svCover, svDeco: this.svDeco, svClouds: this.svClouds, svNight: this.svNight, svHl: this.svHl, pjTop: this.pjTop, pjInfo: this.pjInfo, pjSide: this.pjSide, pjQuotes: this.pjQuotes,
      scrib: this.scrib, pjDetails: this.pjDetailsEl(), pjQuoteEls: this.pjQuotesEl(), pjCount: '0' + (this.state.pj + 1) + ' / 0' + this.pjData.length,
      services: this.serviceData, baseB: this.baseB, ghostB: this.ghostB, glowB: this.glowB, coreB: this.coreB,
      about: this.aboutData,
      highlights: this.highlightData.map((h, k) => ({ label: h.label, shown: this.state.counts[k] + h.suf })),
      call: this.state.call,
      themeLabel: this.state.dark ? 'Night' : 'Day',
      city: this.props.city ?? 'Mumbai',
      time: this.state.time,
      word: React.createElement('em', { key: word, style: { fontStyle: 'italic', display: 'inline-block', whiteSpace: 'nowrap', animation: 'wordIn .9s cubic-bezier(.2,.7,.2,1) both' } }, word),
      toggle: () => { this.warp = 0.6; this.setState(s => ({ dark: !s.dark }), () => this.applyTheme()); },
      down: e => {
        if (this.intro && this.intro.on) { this.endIntro(); return; }
        if (this.zoom > 0.02) return;
        if (e.target.closest && e.target.closest('[data-ui]')) return;
        const c = this.canvas.current; if (!c) return;
        const rc = c.getBoundingClientRect(), g = this.geo(rc.width, rc.height);
        const lx = e.clientX - rc.left, ly = e.clientY - rc.top;
        if (lx > g.x && lx < g.x + g.S && ly > g.y && ly < g.y + g.H) { this.playing = !this.playing; if (this.playing) this.pulse(performance.now()); }
        else this.warp = 1;
      }
    };
  }
}
