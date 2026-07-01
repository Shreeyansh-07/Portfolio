import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUpRight, ChevronDown, Sparkles, Bot, X } from "lucide-react"
import { Joyride } from "react-joyride"

// Custom Components
import {
  ContactButton,
  LiveProjectButton,
  FadeIn,
  Magnet,
  AnimatedText
} from "./components/components"
import FoldcraftPage from "./components/FoldcraftPage"
import LoadingScreen from "./components/LoadingScreen"
import Scroll3DScene, { preload3DModel } from "./components/Scroll3DScene"

// Smooth CountUp Animation Component using useInView and requestAnimationFrame
function Counter({ value, suffix = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const target = parseInt(value, 10)
    if (isNaN(target)) {
      setCount(value)
      return
    }

    const duration = 1500 // 1.5s
    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing: easeOutQuad
      const easeProgress = progress * (2 - progress)
      const currentCount = Math.floor(easeProgress * target)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

// Technology and development work-related images
const row1Images = [
  "/tech_code.png",
  "/IT.jpg",
  "/Chip.jpg",
  "/tech_security.png",
  "/tech_containers.png",
]

const row2Images = [
  "/tech_security.png",
  "/tech_containers.png",
  "/tech_code.png",
  "/IT.jpg",
  "/Chip.jpg",
]

const tripledRow1 = [...row1Images, ...row1Images, ...row1Images, ...row1Images]
const tripledRow2 = [...row2Images, ...row2Images, ...row2Images, ...row2Images]

// Accordion Item Component for "People also ask"
function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10 py-4">
      <button 
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left py-2 hover:text-[#B600A8] transition-colors focus:outline-none cursor-pointer"
      >
        <span className="text-sm sm:text-base font-medium text-[#D7E2EA]">{question}</span>
        <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="py-2 text-[#D7E2EA]/70 font-light text-xs sm:text-sm leading-relaxed whitespace-pre-line">
          {answer}
        </div>
      </motion.div>
    </div>
  )
}

// Typewriter effect for Chatbot
function TypewriterText({ text }) {
  const [displayedText, setDisplayedText] = useState("")
  useEffect(() => {
    let i = 0
    setDisplayedText("")
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 15)
    return () => clearInterval(interval)
  }, [text])
  return <span>{displayedText}</span>
}

// Predefined Chatbot Widget Component
function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  
  const qaPairs = [
    {
      q: "What is Shreeyansh's background?",
      a: "Shreeyansh is a Computer Engineering student at VCET, Mumbai, passionate about building intelligent, user-focused web applications and AI systems."
    },
    {
      q: "What are his top skills?",
      a: "His core tech stack includes Java (Spring Boot), JavaScript (React, Node.js, Express), Python, MongoDB, MySQL, Docker, and CI/CD pipelines."
    },
    {
      q: "Any internship experience?",
      a: "Yes! He worked as a Full Stack Intern at ESAMYAK SOFTWARE (Jun–Jul 2025), where he led a team of 10, built secure REST services, and optimized system performance by 35%."
    },
    {
      q: "How can I hire him?",
      a: "You can contact him directly via email at shreeyanshsingh07@gmail.com, connect on LinkedIn, or download his resume from the About section."
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 max-w-[360px] w-[90vw]">
      {isOpen ? (
        <>
          {/* Chat Window */}
          <div className="bg-[#121214]/95 border border-white/10 rounded-3xl shadow-2xl p-5 w-full backdrop-blur-md flex flex-col gap-4 text-left">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7621B0] to-[#B600A8] flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-wide text-sm">Ask about Shreeyansh</h4>
                <p className="text-xs text-[#D7E2EA]/50 font-light">Pick a question below</p>
              </div>
            </div>

            {/* Questions list */}
            <div className="flex flex-col gap-2">
              {qaPairs.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedQuestion(idx)}
                  className={`text-left text-xs p-3 rounded-xl border text-white font-medium transition-all cursor-pointer ${
                    selectedQuestion === idx
                      ? "border-[#B600A8] bg-[#B600A8]/10"
                      : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10"
                  }`}
                >
                  {pair.q}
                </button>
              ))}
            </div>

            {/* Response Area */}
            {selectedQuestion !== null && (
              <div className="bg-cyan-500/5 border border-cyan-500/20 p-3.5 rounded-2xl text-xs sm:text-sm font-light leading-relaxed text-cyan-400">
                <p className="font-bold uppercase tracking-wider text-[10px] text-cyan-400/60 mb-1">Response:</p>
                <TypewriterText text={qaPairs[selectedQuestion].a} />
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              setIsOpen(false)
              setSelectedQuestion(null)
            }}
            className="w-12 h-12 rounded-full bg-white text-black hover:bg-slate-200 shadow-xl flex items-center justify-center transition-all cursor-pointer font-bold focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </>
      ) : (
        /* Floating Action Button (FAB) */
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7621B0] to-[#B600A8] hover:scale-110 active:scale-95 text-white shadow-2xl flex items-center justify-center transition-all animate-bounce relative cursor-pointer"
          style={{ animationDuration: '3s' }}
        >
          <span className="absolute -inset-1 rounded-full bg-[#B600A8]/30 blur-sm -z-10" />
          <Bot className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  )
}

export default function App() {
  const [currentView, setCurrentView] = useState("landing_page")
  const [loading, setLoading] = useState(false)
  const marqueeRef = useRef(null)
  const [marqueeOffset, setMarqueeOffset] = useState(0)

  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [formStatus, setFormStatus] = useState("")

  const [activeAccordionIdx, setActiveAccordionIdx] = useState(null)
  const [runTour, setRunTour] = useState(false)

  const searchSectionRef = useRef(null)

  useEffect(() => {
    if (currentView !== "portfolio") {
      setRunTour(false)
      return
    }

    const timer = setTimeout(() => {
      const element = document.getElementById("resume-download-btn")
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const hasSeen = localStorage.getItem("hasSeenResumeTour")
            if (!hasSeen) {
              setRunTour(true)
              observer.disconnect()
            }
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentView])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error")
      return
    }
    setFormStatus("sending")
    const mailtoLink = `mailto:shreeyanshsingh07@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=Name: ${encodeURIComponent(formData.name)}%0D%0AEmail: ${encodeURIComponent(formData.email)}%0D%0AMessage:%0D%0A${encodeURIComponent(formData.message)}`
    window.location.href = mailtoLink
    setFormStatus("success")
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => {
      setFormStatus("")
    }, 5000)
  }



  const triggerNavigation = (targetView, targetSection = null) => {
    if (targetView === "portfolio") {
      // Start background preloading of the 3D model during the transition screen
      preload3DModel()
    }
    setLoading(true)
    setTimeout(() => {
      setCurrentView(targetView)
      setLoading(false)
      if (targetSection) {
        setTimeout(() => {
          scrollToSection(targetSection)
        }, 100)
      }
    }, 2200)
  }

  // Passive scroll listener for marquee offset calculation
  useEffect(() => {
    if (currentView !== "portfolio") return

    const handleScroll = () => {
      if (!marqueeRef.current) return
      const rect = marqueeRef.current.getBoundingClientRect()
      // get section position relative to page
      const sectionTop = rect.top + window.scrollY
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setMarqueeOffset(offset)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Trigger initial render position
    return () => window.removeEventListener("scroll", handleScroll)
  }, [currentView])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (currentView === "landing_page") {
    return <FoldcraftPage onNavigate={(sec) => triggerNavigation("portfolio", sec)} />
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] font-kanit text-[#D7E2EA] overflow-x-clip selection:bg-[#B600A8]/30 selection:text-white">

      {/* React Joyride Onboarding */}
      {runTour && (
        <Joyride
          steps={[
            {
              target: "#resume-download-btn",
              content: "Click here to download Shreeyansh's resume.",
              placement: "left",
              disableBeacon: true,
              skipBeacon: true,
              disableScrolling: true,
            }
          ]}
          run={runTour}
          continuous={false}
          showSkipButton={true}
          showCloseButton={true}
          locale={{ last: "Got it" }}
          styles={{
            options: {
              arrowColor: "#ffffff",
              backgroundColor: "#ffffff",
              overlayColor: "rgba(0, 0, 0, 0.5)",
              primaryColor: "#2563eb", // blue button
              textColor: "#333333",
              zIndex: 1000,
            }
          }}
          callback={(data) => {
            const { status } = data;
            if (["finished", "skipped"].includes(status)) {
              localStorage.setItem("hasSeenResumeTour", "true");
              setRunTour(false);
            }
          }}
          debug={true}
        />
      )}

      {/* 3D Scroll-Triggered Storytelling Scene */}
      <Scroll3DScene />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden z-20 pb-7 sm:pb-8 md:pb-10">

        {/* Navbar */}
        <FadeIn
          as="nav"
          y={-20}
          delay={0}
          className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 w-full z-30"
        >
          {/* Main evenly spaced navigation links */}
          <div className="flex gap-6 sm:gap-10 md:gap-12 justify-start items-center">
            {["About", "Services", "Projects", "Contact"].map((link) => (
              <button
                key={link}
                onClick={() => {
                  scrollToSection(link.toLowerCase())
                }}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 focus:outline-none"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Dedicated Landing Page Showcase Link */}
          <button
            onClick={() => triggerNavigation("landing_page")}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider border border-white/20 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            Landing Page <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </FadeIn>

        {/* Absolute Centered Portrait inside Magnet */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:translate-y-0 sm:bottom-0 sm:top-auto z-10">
          <FadeIn y={30} delay={0.6} duration={1.1}>
            <Magnet
              padding={150}
              strength={3.5}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
            >
              <div className="relative w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] select-none pointer-events-auto">
                {/* Backlighting glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#7621B0] to-[#B600A8] opacity-35 rounded-full blur-[80px] -z-10 animate-pulse" />
                <img
                  src="/portrait_smiling.png"
                  alt="Shreeyansh Singh Portrait"
                  draggable="false"
                  className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                />
              </div>
            </Magnet>
          </FadeIn>
        </div>

        {/* Hero Heading */}
        <div className="w-full text-center overflow-hidden z-20 mt-6 sm:mt-4 md:-mt-5 select-none pointer-events-none">
          <FadeIn y={40} delay={0.15} duration={0.9} as="div">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[9vw] sm:text-[9.2vw] md:text-[9.5vw] lg:text-[9.8vw]">
              Hi, i&apos;m shreeyansh
            </h1>
          </FadeIn>
        </div>

        {/* Bottom Bar details */}
        <div className="flex justify-between items-end px-6 md:px-10 w-full z-20">
          <FadeIn y={20} delay={0.35} duration={0.8}>
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.7rem,1.4vw,1.25rem)] max-w-[180px] sm:max-w-[240px] md:max-w-[280px] text-left">
              Full Stack Developer crafting scalable web applications, AI-powered products, and secure backend systems
            </p>
          </FadeIn>

          <FadeIn y={20} delay={0.5} duration={0.8}>
            <ContactButton label="Contact Me" onClick={() => scrollToSection("contact")} />
          </FadeIn>
        </div>
      </section>

      {/* 2. MARQUEE SECTION */}
      <section ref={marqueeRef} className="relative bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 w-full overflow-hidden flex flex-col gap-3 z-20">

        {/* Row 1: moves RIGHT on scroll */}
        <div className="flex gap-3 overflow-hidden select-none pointer-events-none w-full">
          <div
            style={{
              transform: `translate3d(${marqueeOffset - 200}px, 0, 0)`,
              willChange: "transform",
            }}
            className="flex gap-3 whitespace-nowrap will-change-transform"
          >
            {tripledRow1.map((url, i) => (
              <img
                key={`r1-${i}`}
                src={url}
                alt={`preview-row1-${i}`}
                loading="lazy"
                className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0 hover:scale-[1.02] transition-all duration-500"
              />
            ))}
          </div>
        </div>

        {/* Row 2: moves LEFT on scroll */}
        <div className="flex gap-3 overflow-hidden select-none pointer-events-none w-full">
          <div
            style={{
              transform: `translate3d(${-(marqueeOffset - 200)}px, 0, 0)`,
              willChange: "transform",
            }}
            className="flex gap-3 whitespace-nowrap will-change-transform"
          >
            {tripledRow2.map((url, i) => (
              <img
                key={`r2-${i}`}
                src={url}
                alt={`preview-row2-${i}`}
                loading="lazy"
                className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0 hover:scale-[1.02] transition-all duration-500"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden select-none">

        {/* Corner 3D Decorative Images */}
        {/* Top Left: Moon Icon */}
        <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 select-none pointer-events-none">
          <FadeIn x={-80} y={0} delay={0.1} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
              alt="Decorative Moon"
              className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
            />
          </FadeIn>
        </div>

        {/* Bottom Left: 3D Object */}
        <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 select-none pointer-events-none">
          <FadeIn x={-80} y={0} delay={0.25} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
              alt="Decorative 3D element"
              className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
            />
          </FadeIn>
        </div>

        {/* Top Right: Lego Icon */}
        <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 select-none pointer-events-none">
          <FadeIn x={80} y={0} delay={0.15} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
              alt="Decorative Lego"
              className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
            />
          </FadeIn>
        </div>

        {/* Bottom Right: 3D Group */}
        <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 select-none pointer-events-none">
          <FadeIn x={80} y={0} delay={0.3} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
              alt="Decorative 3D Group"
              className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
            />
          </FadeIn>
        </div>

        {/* Core Contents */}
        <div className="max-w-[800px] w-full flex flex-col items-center justify-center text-center z-20">

          <FadeIn y={40} delay={0} duration={0.8} className="mb-10 sm:mb-14 md:mb-12">
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,140px)] md:text-[clamp(3.5rem,11vw,160px)]">
              About me
            </h2>
          </FadeIn>

          <div className="mb-16 sm:mb-16 md:mb-20 px-4 flex flex-col gap-6 text-[#D7E2EA]/90 text-center text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-[700px]">
            <AnimatedText
              text="I am a Computer Engineering student and Full Stack Developer focused on building scalable, secure, and intelligent software. My interests span backend engineering, AI systems, cloud technologies, and modern web development. I enjoy transforming ambitious ideas into products that solve meaningful real-world problems."
              className="block"
            />
            <AnimatedText
              text="Over the past few years, I've built AI-powered platforms, secure web applications, and distributed backend systems while continuously improving my problem-solving skills through competitive programming and hackathons."
              className="block"
            />
            <AnimatedText
              text="Outside of coding, I enjoy learning new technologies, participating in hackathons, and exploring scalable software architecture."
              className="block"
            />
          </div>

          <FadeIn y={20} delay={0.4} duration={0.8}>
            <ContactButton label="Contact Me" onClick={() => scrollToSection("contact")} />
          </FadeIn>

        </div>
      </section>

      {/* 3.5 HIGHLIGHTS SECTION */}
      <section className="relative py-20 bg-[#0C0C0C] border-t border-b border-[#D7E2EA]/10 w-full overflow-hidden z-20">
        <div className="max-w-5xl mx-auto px-5 w-full">
          <FadeIn y={30} delay={0} duration={0.8} className="text-center mb-12">
            <h2 className="hero-heading font-black uppercase text-4xl sm:text-5xl tracking-wide">
              Highlights
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 text-center">
            {[
              { val: "6", suf: "+", label: "Hackathon + Paper Presentation Winner" },
              { val: "150", suf: "+", label: "LeetCode Problems Solved" },
              { val: "10", suf: "+", label: "Major Projects Built" },
              { val: "3", suf: "+", label: "Years of Programming Experience" },
              { val: "100", suf: "%", label: "Passion for Learning" }
            ].map((stat, idx) => (
              <FadeIn
                key={idx}
                y={20}
                delay={idx * 0.1}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
              >
                <span className="text-4xl sm:text-5xl font-black text-[#B600A8] mb-2">
                  <Counter value={stat.val} suffix={stat.suf} />
                </span>
                <span className="text-xs sm:text-[13px] font-medium uppercase tracking-wider text-[#D7E2EA]/75 leading-tight">
                  {stat.label}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3.6 QUICK SEARCH SECTION */}
      <section id="quick-search" ref={searchSectionRef} className="relative py-20 bg-[#0C0C0C] border-b border-[#D7E2EA]/10 w-full overflow-hidden z-20">
        <div className="max-w-5xl mx-auto px-5 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left Column: People Also Ask Accordion */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <FadeIn y={30} delay={0} className="w-full bg-[#121214]/60 border border-white/5 p-6 sm:p-8 rounded-3xl backdrop-blur-md text-left select-none">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7621B0] to-[#B600A8] flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">People also ask</h3>
                </div>
                <div className="flex flex-col">
                  <AccordionItem 
                    question="What is Shreeyansh's education and CGPA?" 
                    answer="B.E. in Computer Engineering from Vidyavardhini's College of Engineering and Technology (VCET), Mumbai (Aug 2023 – Present). CGPA: 8.03."
                    isOpen={activeAccordionIdx === 0}
                    onToggle={() => setActiveAccordionIdx(activeAccordionIdx === 0 ? null : 0)}
                  />
                  <AccordionItem 
                    question="Does Shreeyansh have any professional work experience?" 
                    answer="• Full Stack Developer Intern — ESAMYAK SOFTWARE PVT LTD (Jun 2025 – Jul 2025): Engineered robust web applications using Java, Spring Boot, React, and MongoDB, optimizing backend APIs and streamlining data workflows."
                    isOpen={activeAccordionIdx === 1}
                    onToggle={() => setActiveAccordionIdx(activeAccordionIdx === 1 ? null : 1)}
                  />
                  <AccordionItem 
                    question="Which technical skills does Shreeyansh excel at?" 
                    answer="• Languages/Frameworks: Java, Spring Boot, JavaScript, Node.js, React.js, Express.js, Python, C/C++&#10;• Databases: MongoDB, MySQL&#10;• Tools: Git, Docker, GitHub Actions, REST APIs, Socket.io, Cloudinary, ZegoCloud"
                    isOpen={activeAccordionIdx === 2}
                    onToggle={() => setActiveAccordionIdx(activeAccordionIdx === 2 ? null : 2)}
                  />
                  <AccordionItem 
                    question="What are some of Shreeyansh's key projects?" 
                    answer="• AI Wearable Pendant: An AI-powered wearable assistant capturing conversations using ESP32-C3 and INMP441 to passively capture conversations for memory recall and contextual automation.&#10;• GovGenie: An AI-driven secure government portal with Aadhaar-based facial verification (OpenCV), Socket.io real-time chat, and Dockerized microservices.&#10;• OpinionTrade: A copyrighted polling platform built using React, Node.js, Express, and MongoDB."
                    isOpen={activeAccordionIdx === 3}
                    onToggle={() => setActiveAccordionIdx(activeAccordionIdx === 3 ? null : 3)}
                  />
                  <AccordionItem 
                    question="What achievements and hackathons has Shreeyansh won?" 
                    answer="• Winner — HackX 2.0 (2026) SFIT, 1st Prize in FinTech & Digital Economy&#10;• Winner — PixxelHack 1.0 (2025) TCET, National-Level Webathon&#10;• Winner — IDEAVERSE 1.0 (2026) TCET, National-Level AI & ML Ideathon&#10;• Runner-up — COHERENCE (2026) GovTech Financial Intelligence Track&#10;• Winner — VNPS National-Level Project Showcase (2025, 2026)&#10;• Winner — VCET OSCILLATION Technical Competition (2025, 2026)"
                    isOpen={activeAccordionIdx === 4}
                    onToggle={() => setActiveAccordionIdx(activeAccordionIdx === 4 ? null : 4)}
                  />
                  <AccordionItem 
                    question="What extracurricular achievements does Shreeyansh have?" 
                    answer="Shreeyansh was the Sports Captain during school, demonstrating early leadership, and actively participates in hackathons, tech fests, and innovation challenges."
                    isOpen={activeAccordionIdx === 5}
                    onToggle={() => setActiveAccordionIdx(activeAccordionIdx === 5 ? null : 5)}
                  />
                  <AccordionItem 
                    question="Where did Shreeyansh complete his schooling (SSC & HSC)?" 
                    answer="He completed both his SSC (scoring 84.4%) and HSC studies from Holy Family Convent High School and Junior College."
                    isOpen={activeAccordionIdx === 6}
                    onToggle={() => setActiveAccordionIdx(activeAccordionIdx === 6 ? null : 6)}
                  />
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Google Search Style Profile Card */}
            <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-24 w-full">
              <FadeIn x={50} delay={0.15} className="w-full max-w-md">
                <div className="bg-[#171719]/90 border border-white/10 rounded-3xl p-6 shadow-2xl w-full text-left backdrop-blur-md select-none">
                  {/* Avatar Image and Name info */}
                  <div className="flex flex-col items-center text-center pb-6 border-b border-white/10">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#B600A8] mb-4 shadow-[0_0_15px_rgba(182,0,168,0.3)]">
                      <img src="/portrait_smiling.png" alt="Shreeyansh Singh" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide">Shreeyansh Singh</h3>
                    <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mt-1">Full-Stack Developer · AI Solutions</p>
                  </div>
                  
                  {/* Details list */}
                  <div className="py-5 space-y-3.5 border-b border-white/10">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <span className="text-[#D7E2EA]/50 font-light">Education</span>
                      <span className="col-span-2 text-white font-medium">B.E. Computer Engineering, VCET</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <span className="text-[#D7E2EA]/50 font-light">CGPA</span>
                      <span className="col-span-2 text-white font-medium">8.03 / 10</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <span className="text-[#D7E2EA]/50 font-light">Location</span>
                      <span className="col-span-2 text-cyan-400 font-medium">Mumbai, India</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <span className="text-[#D7E2EA]/50 font-light">Experience</span>
                      <span className="col-span-2 text-white font-medium">Full Stack Intern @ Esamyak</span>
                    </div>
                  </div>

                  {/* Skill pills and Links */}
                  <div className="py-5 space-y-4 border-b border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {["Java", "Spring Boot", "React", "Node.js", "Python"].map(skill => (
                        <span key={skill} className="px-3 py-1 rounded-full text-[11px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <a href="https://linkedin.com/in/shreeyansh-singh" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-white/10 hover:border-[#B600A8]/50 hover:bg-[#B600A8]/10 text-white transition-all cursor-pointer">
                        LinkedIn
                      </a>
                      <a href="https://github.com/Shreeyansh-07" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-white/10 hover:border-[#B600A8]/50 hover:bg-[#B600A8]/10 text-white transition-all cursor-pointer">
                        GitHub
                      </a>
                      <a href="mailto:shreeyanshsingh07@gmail.com" className="px-3 py-1.5 rounded-full border border-white/10 hover:border-[#B600A8]/50 hover:bg-[#B600A8]/10 text-white transition-all cursor-pointer">
                        Email
                      </a>
                      <a id="resume-download-btn" href="/Shreeyansh Singh Resume .pdf" download className="px-3 py-1.5 rounded-full border border-[#B600A8] text-white hover:bg-[#B600A8]/20 transition-all font-semibold flex items-center gap-1 cursor-pointer">
                        Resume 📥
                      </a>
                    </div>
                  </div>

                  {/* People also search for */}
                  <div className="pt-4">
                    <span className="text-[11px] font-bold text-[#D7E2EA]/50 uppercase tracking-widest block mb-2.5">People also search for</span>
                    <div className="flex flex-wrap gap-2">
                      {["Education", "Experience", "Projects", "Resume"].map(item => (
                        <button 
                          key={item} 
                          onClick={() => {
                            if (item === "Resume") {
                              const link = document.createElement("a");
                              link.href = "/Shreeyansh Singh Resume .pdf";
                              link.download = "Shreeyansh_Singh_Resume.pdf";
                              link.click();
                            } else if (item === "Projects") {
                              scrollToSection("projects");
                            } else if (item === "Experience") {
                              scrollToSection("quick-search");
                              setActiveAccordionIdx(1);
                            } else {
                              scrollToSection("quick-search");
                              setActiveAccordionIdx(0);
                            }
                          }}
                          className="px-3 py-1 rounded-full text-xs border border-white/15 hover:border-cyan-400/50 hover:text-cyan-400 text-[#D7E2EA] transition-all cursor-pointer"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="relative bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-20">
        <div className="max-w-5xl mx-auto w-full">

          <h2 className="font-black uppercase text-center text-[#0C0C0C] tracking-tight leading-none mb-16 sm:mb-20 md:mb-28 text-[clamp(3rem,12vw,140px)] md:text-[clamp(3.5rem,11vw,160px)]">
            Services
          </h2>

          <div className="flex flex-col border-t border-[#0C0C0C]/15">
            {[
              {
                num: "01",
                name: "Full Stack Development",
                desc: "Designing modern web applications using React, Node.js, Spring Boot, Express, and MongoDB with clean architecture and responsive user experiences."
              },
              {
                num: "02",
                name: "Cloud & System Design",
                desc: "Architecting secure databases, Dockerized deployments, CI/CD pipelines, and scalable cloud infrastructure for production-ready applications."
              },
              {
                num: "03",
                name: "Frontend Engineering",
                desc: "Building responsive, visually engaging, and accessible web applications with modern UI technologies, smooth interactions, and optimized performance."
              },
              {
                num: "04",
                name: "AI Application",
                desc: "Building AI-powered assistants, computer vision solutions, intelligent automation systems, and LLM integrations using Python, OpenCV, and modern AI APIs."
              },
              {
                num: "05",
                name: "Problem Solving",
                desc: "Applying strong data structures, algorithms, and software engineering principles to build efficient and maintainable software solutions."
              }
            ].map((service, index) => (
              <FadeIn
                key={service.num}
                y={30}
                delay={index * 0.1}
                duration={0.8}
                className="flex items-center gap-4 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15"
              >
                {/* Number Left */}
                <span className="font-black leading-none text-[#0C0C0C] w-[60px] sm:w-[120px] md:w-[160px] text-[clamp(3rem,10vw,140px)]">
                  {service.num}
                </span>

                {/* Stacked Details Right */}
                <div className="flex flex-col gap-1.5 sm:gap-2.5 max-w-2xl">
                  <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)]">
                    {service.name}
                  </h3>
                  <p className="font-light leading-relaxed text-[#0C0C0C] opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)]">
                    {service.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section
        id="projects"
        className="relative bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-28 pb-16 z-25"
      >
        <div className="max-w-5xl mx-auto px-5 w-full">

          <div className="text-center mb-10 sm:mb-16">
            <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-[clamp(3rem,12vw,140px)] md:text-[clamp(3.5rem,11vw,160px)]">
              Projects
            </h2>
          </div>

          {/* Sticky Stacking Cards Container */}
          <div className="flex flex-col gap-[10vh]">
            {[
              {
                num: "01",
                name: "AI Wearable Pendant",
                category: "Smart Personal Assistant",
                desc: "An AI-powered wearable assistant capable of capturing conversations, generating summaries, extracting meeting notes, and enabling intelligent voice-triggered automation.",
                col1_img1: "/pendant_product.png",
                col1_img2: "/pendant_usage.png",
                col2_img: "/pendant_app.png",
                buttons: [
                  {
                    label: "Appreciation Post",
                    link: "https://www.linkedin.com/posts/sripriyagn7_just-hired-an-intern-who-we-couldnt-say-activity-7398667806042574848-ciXF?utm_source=share&utm_medium=member_android&rcm=ACoAAFVqEEQBHGpAFTSGXXwK7uu6hMQ9E9wdYzw"
                  }
                ],
                tech: ["Python", "OpenCV", "LLMs", "Audio Processing", "AI Integration"]
              },
              {
                num: "02",
                name: "GovGenie AI Portal",
                category: "AI Government Platform",
                desc: "A secure full-stack platform connecting citizens with verified agents using AI-powered verification, OCR, real-time communication, and intelligent document processing.",
                col1_img1: "/govgenie_secure.png",
                col1_img2: "/govgenie_auth.png",
                col2_img: "/govgenie_dashboard.png",
                buttons: [],
                tech: ["React", "Node.js", "Express", "MongoDB", "Python", "OpenCV", "Socket.io", "Cloudinary"]
              },
              {
                num: "03",
                name: "OpinionTrade",
                category: "Incentivized Polling",
                desc: "A secure polling platform featuring authentication, voting systems, analytics, and scalable backend architecture.",
                col1_img1: "/opiniontrade_polls.png",
                col1_img2: "/opiniontrade_coupons.png",
                col2_img: "/opiniontrade_trading.png",
                buttons: [
                  {
                    label: "Live Website",
                    link: "https://opiniontrade.onrender.com/"
                  },
                  {
                    label: "Copyright certificate",
                    link: "https://www.linkedin.com/posts/shreeyansh-singh-858ab633b_happy-to-share-that-our-project-opiniontrade-activity-7354749746420346881-4qCN?utm_source=share&utm_medium=member_android&rcm=ACoAAFVqEEQBHGpAFTSGXXwK7uu6hMQ9E9wdYzw"
                  }
                ],
                tech: ["React", "Node.js", "Express", "MongoDB", "REST API", "Auth Systems"]
              }
            ].map((project, index) => {
              // Scale factor calculation: targetScale = 1 - (total - 1 - index) * 0.03
              // const targetScale = 1 - (3 - 1 - index) * 0.03
              return (
                <div
                  key={project.num}
                  className="sticky top-24 md:top-32 w-full pt-4 pb-12 select-none"
                  style={{
                    zIndex: 10 + index,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    style={{
                      transformOrigin: "top center",
                      top: `${index * 28}px`,
                    }}
                    className="group relative rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 w-full max-w-5xl shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                  >
                    {/* Top Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#D7E2EA]/15 pb-4 mb-4 gap-4">
                      <div className="flex items-center gap-4">
                        <span className="font-black text-[clamp(2.5rem,6vw,5.5rem)] text-[#D7E2EA]/30 leading-none">
                          {project.num}
                        </span>
                        <div>
                          <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 block mb-1">
                            {project.category}
                          </span>
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-[#D7E2EA]">
                            {project.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {project.buttons.map((btn, btnIdx) => (
                          <LiveProjectButton key={btnIdx} label={btn.label} onClick={() => window.open(btn.link, "_blank")} />
                        ))}
                      </div>
                    </div>

                    {/* Project Description & Tech Stack */}
                    <div className="mb-4 text-[#D7E2EA] text-xs sm:text-sm md:text-base leading-relaxed border-b border-[#D7E2EA]/10 pb-4">
                      <p className="mb-3 text-[#D7E2EA]/85 font-light">{project.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[10px] uppercase font-mono tracking-widest bg-white/5 border border-white/10 px-2.5 py-0.5 rounded text-[#D7E2EA]/70">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Row: 2-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 mt-4">
                      {/* Left Column (40%) */}
                      <div className="md:col-span-4 flex flex-col gap-4">
                        <img
                          src={project.col1_img1}
                          alt={`${project.name} preview 1`}
                          loading="lazy"
                          className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-all duration-500"
                          style={{ height: "clamp(130px, 16vw, 230px)" }}
                        />
                        <img
                          src={project.col1_img2}
                          alt={`${project.name} preview 2`}
                          loading="lazy"
                          className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-all duration-500"
                          style={{ height: "clamp(160px, 22vw, 340px)" }}
                        />
                      </div>

                      {/* Right Column (60%) */}
                      <div className="md:col-span-6">
                        <img
                          src={project.col2_img}
                          alt={`${project.name} preview main`}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-all duration-500"
                          style={{ minHeight: "clamp(300px, 38vw, 590px)" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      <div id="interactive-3d-container" style={{ zIndex: 20, position: "relative" }} className="w-full">
        {/* 5.5 RECOGNITIONS SECTION */}
        <section className="relative bg-transparent text-[#D7E2EA] py-20 w-full overflow-hidden border-t border-[#D7E2EA]/10 z-20">
          <div className="max-w-5xl mx-auto px-5 w-full">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-start">

              {/* Left Column (60%): Written content + Cards */}
              <div className="md:col-span-6 flex flex-col gap-8">
                <div>
                  <h2 className="hero-heading font-black uppercase text-4xl sm:text-5xl tracking-wide">
                    Recognitions
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "HackX 2.0 Champion", subtitle: "1st Place • FinTech & Digital Economy", desc: "Won first prize in a highly competitive national-level hackathon, building Fintech logic under 36 hours." },
                    { title: "PixxelHack Winner", subtitle: "National Level Webathon Champion", desc: "Awarded top ranks for engineering production-ready web platforms on tight deadlines." },
                    { title: "IDEAVERSE Final Winner", subtitle: "AI Innovation Challenge", desc: "Recognized for building next-generation AI platforms solving key enterprise challenges." },
                    { title: "VNPS", subtitle: "1st Rank Winner", desc: "Secured first place in national level system design and development competition." },
                    { title: "Oscillation", subtitle: "1st Rank Winner", desc: "Achieved top spot in technical software development code hackathon." },
                    { title: "LeetCode Practice", subtitle: "150+ LeetCode Solved", desc: "Continuous algorithms and data structures training to build optimal, bug-free applications." }
                  ].map((rec, idx) => (
                    <FadeIn
                      key={idx}
                      y={30}
                      delay={idx * 0.08}
                      className="flex flex-col justify-between p-6 rounded-3xl bg-[#121212]/95 backdrop-blur-md border border-white/10 hover:border-[#B600A8]/30 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#B600A8]/10 to-transparent rounded-bl-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <span className="text-3xl mb-4 block">🏆</span>
                        <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-1 group-hover:text-cyan-400 transition-colors">
                          {rec.title}
                        </h3>
                        <span className="text-xs font-semibold text-cyan-400/90 tracking-wider block mb-3">
                          {rec.subtitle}
                        </span>
                        <p className="text-xs sm:text-sm text-[#D7E2EA]/60 font-light leading-relaxed">
                          {rec.desc}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>

              {/* Right Column (40%): Empty space for the 3D model */}
              <div className="hidden md:block md:col-span-4" />

            </div>
          </div>
        </section>

        {/* 5.6 TECH STACK SECTION */}
        <section id="tech-stack" className="relative bg-transparent text-[#D7E2EA] min-h-[180vh] w-full border-t border-[#D7E2EA]/10 z-20">

          {/* Content Layout - written stuff scrolls past on the left, right side is empty for the model */}
          <div className="relative max-w-5xl mx-auto px-5 w-full pt-20 pb-32 z-20 grid grid-cols-1 md:grid-cols-10 gap-8">

            {/* Left Column: 5 Tech Categories (Text Content) */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="mb-8">
                <h2 className="hero-heading font-black uppercase text-4xl sm:text-5xl tracking-wide">
                  Technologies I Work With
                </h2>
              </div>

              {[
                { category: "Frontend", techs: ["React", "Next.js", "Tailwind", "JavaScript"] },
                { category: "Backend", techs: ["Node.js", "Express", "Spring Boot", "REST API"] },
                { category: "AI", techs: ["Python", "OpenCV", "LLMs", "Computer Vision"] },
                { category: "Databases", techs: ["MongoDB", "MySQL"] },
                { category: "Cloud", techs: ["Docker", "GitHub Actions", "CI/CD"] }
              ].map((cat, idx) => (
                <FadeIn
                  key={idx}
                  y={20}
                  delay={idx * 0.08}
                  className="p-6 rounded-2xl bg-[#121212]/95 backdrop-blur-md border border-white/10 hover:border-cyan-500/20 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
                >
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-4">
                    {cat.category}
                  </h3>
                  <div className="flex flex-col gap-2 font-mono text-xs text-[#D7E2EA]/85">
                    {cat.techs.map((t, tIdx) => (
                      <span key={tIdx} className="tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Right Column: Empty side for the 3D neural core video to travel diagonally */}
            <div className="hidden md:block md:col-span-5" />

          </div>
        </section>

        {/* 5.7 WHY CHOOSE ME SECTION */}
        <section className="relative bg-transparent text-[#D7E2EA] py-20 w-full border-t border-[#D7E2EA]/10 z-20">
          <div className="max-w-5xl mx-auto px-5 w-full">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-start">

              {/* Left Column (40%): Empty space for the 3D model */}
              <div className="hidden md:block md:col-span-4" />

              {/* Right Column (60%): Written content + Cards */}
              <div className="md:col-span-6 flex flex-col gap-8">
                <div>
                  <h2 className="hero-heading font-black uppercase text-4xl sm:text-5xl tracking-wide">
                    Why Choose Me?
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: "🚀", title: "Scalable Development", desc: "Applications built with maintainability, clean coding architecture, and high performance in mind." },
                    { icon: "🤖", title: "AI Expertise", desc: "Practical, hands-on experience integrating advanced AI pipelines into production-ready web systems." },
                    { icon: "🏆", title: "Hackathon Mindset", desc: "Experienced in delivering functional, innovative engineering solutions under tight project deadlines." },
                    { icon: "📈", title: "Continuous Learning", desc: "Always exploring modern cloud architectures, algorithms, and next-generation framework stacks." }
                  ].map((card, idx) => (
                    <FadeIn
                      key={idx}
                      y={30}
                      delay={idx * 0.1}
                      className="p-6 rounded-3xl bg-[#121212]/95 backdrop-blur-md border border-white/10 hover:border-[#B600A8]/30 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.3)] text-left flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-3xl mb-4 block">{card.icon}</span>
                        <h3 className="text-md font-bold text-white uppercase tracking-wider mb-2">
                          {card.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#D7E2EA]/60 font-light leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. CONTACT / FOOTER SECTION */}
        <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-[#D7E2EA]/10 bg-gradient-to-b from-transparent to-[#0C0C0C] z-20">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start mb-16">
              
              {/* Left Column: Info, Social Links */}
              <div className="lg:col-span-6 flex flex-col text-left justify-center h-full">
                <FadeIn y={30} delay={0} duration={0.8} className="mb-6">
                  <h2 className="hero-heading font-black uppercase text-4xl sm:text-5xl md:text-6xl leading-none">
                    Let&apos;s Build Something Great Together
                  </h2>
                </FadeIn>

                <FadeIn y={20} delay={0.15} duration={0.8} className="mb-8">
                  <p className="text-[#D7E2EA]/75 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                    Whether you&apos;re looking to build a modern web application, an AI-powered product, or a scalable backend system, I&apos;d love to discuss your ideas and help turn them into reality.
                  </p>
                </FadeIn>

                {/* Social links */}
                <FadeIn y={20} delay={0.3} duration={0.8} className="flex flex-wrap gap-4 sm:gap-6 mt-4">
                  <a
                    href="https://www.linkedin.com/in/shreeyansh-singh-858ab633b"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border border-[#D7E2EA]/20 rounded-full px-5 py-2.5 backdrop-blur-md bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-medium text-sm sm:text-base cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/Shreeyansh-07"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border border-[#D7E2EA]/20 rounded-full px-5 py-2.5 backdrop-blur-md bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-medium text-sm sm:text-base cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-slate-300" />
                    GitHub
                  </a>
                  <a
                    href="mailto:shreeyanshsingh07@gmail.com"
                    className="flex items-center gap-2 border border-[#D7E2EA]/20 rounded-full px-5 py-2.5 backdrop-blur-md bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-medium text-sm sm:text-base cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-teal-400" />
                    Get In Touch
                  </a>
                </FadeIn>
              </div>

              {/* Right Column: Contact form */}
              <div className="lg:col-span-6 flex justify-center w-full">
                <FadeIn y={30} delay={0.2} className="w-full max-w-lg bg-[#121214]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.5)] text-left select-none">
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mb-6">Send a message</h3>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 block mb-2 font-medium">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl placeholder:text-[#D7E2EA]/30 focus:border-[#B600A8] focus:bg-white/10 focus:outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 block mb-2 font-medium">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl placeholder:text-[#D7E2EA]/30 focus:border-[#B600A8] focus:bg-white/10 focus:outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 block mb-2 font-medium">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about the role..."
                        rows="4"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl placeholder:text-[#D7E2EA]/30 focus:border-[#B600A8] focus:bg-white/10 focus:outline-none transition-all resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer text-center text-sm"
                    >
                      Send via Email
                    </button>

                    {formStatus === "success" && (
                      <p className="text-xs text-green-400 font-medium text-center mt-2 animate-pulse">
                        Success! Opening your email client to send the message.
                      </p>
                    )}
                    {formStatus === "error" && (
                      <p className="text-xs text-red-400 font-medium text-center mt-2 animate-pulse">
                        Please fill in all fields before sending.
                      </p>
                    )}
                  </form>
                </FadeIn>
              </div>

            </div>

            {/* Footer Text */}
            <div className="w-full border-t border-[#D7E2EA]/10 pt-10 text-center">
              <blockquote className="text-[#D7E2EA]/50 italic font-mono text-xs sm:text-sm max-w-lg mx-auto mb-8 text-center">
                &ldquo;Building software that solves problems, scales with growth, and creates impact.&rdquo;
              </blockquote>
              <div className="text-2xl font-bold hero-heading uppercase tracking-widest mb-4 text-center">
                Shreeyansh Singh
              </div>
              <p className="text-[#D7E2EA]/40 text-sm text-center">
                © 2026 Shreeyansh Singh. Engineered with React, Tailwind CSS, & Framer Motion.
              </p>
            </div>

          </div>
        </section>

        {/* Floating Chatbot */}
        <ChatbotWidget />

      </div>
    </div>
  )
}
