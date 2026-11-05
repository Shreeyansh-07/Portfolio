import React, { useEffect, useRef, useState, Suspense } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Github, Linkedin, Mail, X, Menu, ArrowDown } from "lucide-react"
import { Magnet } from "./components"

const HeroMascot = React.lazy(() => import("./HeroMascot/Scene"))

/* ─── Fixed Vertical Social Icons (Left Side) ────────────────────────────── */
function SocialIcons() {
  const socials = [
    {
      href: "https://github.com/Shreeyansh-07",
      label: "GitHub",
      icon: <Github className="w-5 h-5" />
    },
    {
      href: "https://www.linkedin.com/in/shreeyansh-singh-858ab633b",
      label: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      href: "mailto:shreeyanshsingh07@gmail.com",
      label: "Email",
      icon: <Mail className="w-5 h-5" />
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.8, duration: 0.8 }}
      className="fixed left-6 lg:left-8 bottom-8 z-[99] hidden md:flex flex-col gap-5 items-center"
    >
      {socials.map(({ href, label, icon }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          whileHover={{ scale: 1.15, color: "#5eead4" }}
          whileTap={{ scale: 0.95 }}
          className="text-[#a0aec0] hover:text-[#5eead4] transition-colors duration-300 cursor-pointer"
        >
          {icon}
        </motion.a>
      ))}
      {/* Vertical line below icons */}
      <div className="w-px h-20 bg-gradient-to-b from-[#5eead4]/50 to-transparent mt-2" />
    </motion.div>
  )
}

/* ─── Scroll-Driven Character Wrapper ──────────────────────────────────────
   Text fades out quickly while 3D character scales up and becomes focal point
*/
function ScrollCharacter({ sectionRef }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  })

  // Character grows and becomes prominent
  const scale = useTransform(smoothProgress, [0, 0.4, 0.8], [1, 1.25, 1.45])
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.85, 1], [1, 1, 1, 0.2])
  const translateY = useTransform(smoothProgress, [0, 0.5, 1], ["0%", "-3%", "-8%"])

  // Text fades out quickly in first 30% of scroll
  const textOpacity = useTransform(smoothProgress, [0, 0.15, 0.3], [1, 0.4, 0])
  const textY = useTransform(smoothProgress, [0, 0.2, 0.35], [0, -25, -50])

  return { scale, opacity, translateY, textOpacity, textY }
}

/* ─── Akash-Style Hero Section ─────────────────────────────────────────────
  Layout:
  • Fixed navbar: name/logo top-left, vertical nav links top-right
  • Large bold typography: "Hello! I'm SHREEYANSH SINGH"
  • 3D character centerpiece with magnetic interaction
  • Role info on the right side
  • Fixed social icons on left side
  • Smooth scroll-driven animations
*/
export default function HeroSection({
  scrollToSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const sectionRef = useRef(null)
  const { scale, opacity, translateY, textOpacity, textY } = ScrollCharacter({ sectionRef })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden z-20"
      style={{
        background: "linear-gradient(180deg, #0a0e17 0%, #0c0c0c 100%)",
        height: "100vh"
      }}
    >
      {/* ── FIXED NAVBAR ── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-[9999] flex justify-between items-start px-6 sm:px-10 md:px-16 lg:px-24 pt-6 sm:pt-7"
        style={{ pointerEvents: "auto" }}
      >
        {/* Left: Name / Logo */}
        <motion.div
          className="flex flex-col gap-0.5"
          whileHover={{ scale: 1.02 }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[#eae5ec] font-bold tracking-[0.18em] uppercase text-xs sm:text-sm hover:text-[#5eead4] transition-colors duration-300 focus:outline-none"
          >
            SHREEYANSH
          </button>
          <span className="text-[#5eead4] text-[9px] sm:text-[10px] tracking-widest font-light opacity-70">
            Full Stack Developer
          </span>
        </motion.div>

        {/* Right: Nav links stacked vertically (Desktop) */}
        <div className="hidden md:flex flex-col items-end gap-2">
          {[
            { label: "About", id: "about" },
            { label: "Services", id: "services" },
            { label: "Projects", id: "projects" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <motion.button
              key={label}
              onClick={() => scrollToSection(id)}
              whileHover={{ x: -5, color: "#5eead4" }}
              className="text-[#a0aec0] text-[11px] sm:text-xs uppercase tracking-[0.14em] hover:text-[#5eead4] transition-all duration-300 focus:outline-none font-light"
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#eae5ec] hover:text-[#5eead4] transition-colors p-1 focus:outline-none z-[10000]"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* ── MAIN HERO CONTENT ── */}
      <div className="relative w-full h-full flex items-center justify-center pt-20">

        {/* Left: Main Heading - fades out quickly on scroll */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute left-6 sm:left-10 md:left-16 lg:left-24 bottom-[15%] sm:bottom-[18%] md:bottom-[20%] z-20 pointer-events-none select-none max-w-[90%] sm:max-w-[50%]"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.8, duration: 1.3, ease: [0.22, 0.1, 0.2, 1] }}
          >
            <h2 className="text-[#9ca3af] text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-[0.06em] mb-2 sm:mb-3">
              Hello! I'm
            </h2>
            <h1
              className="text-[#eae5ec] font-black leading-[0.88] tracking-tight uppercase"
              style={{
                fontSize: "clamp(2.8rem, 8.5vw, 9rem)",
                fontFamily: "'Geist', 'Kanit', sans-serif",
                letterSpacing: "-0.02em"
              }}
            >
              Shreeyansh
              <br />
              Singh
            </h1>
          </motion.div>
        </motion.div>

        {/* Right: Role Info Text - fades out quickly on scroll */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 1.1 }}
          className="absolute right-6 sm:right-10 md:right-16 lg:right-24 bottom-[15%] sm:bottom-[18%] md:bottom-[20%] z-20 text-right pointer-events-none select-none max-w-[85%] sm:max-w-[40%]"
        >
          <p
            className="text-[#9ca3af] font-light leading-relaxed tracking-wide mb-1"
            style={{ fontSize: "clamp(0.7rem, 1.35vw, 1.15rem)" }}
          >
            Full Stack Developer
            <br />
            &amp; AI Systems Builder
          </p>
          <p
            className="text-[#5eead4] font-medium tracking-wide mb-5"
            style={{ fontSize: "clamp(0.65rem, 1.2vw, 1rem)" }}
          >
            B.E. Computer Engineering
            <br />
            VCET, Mumbai • CGPA: 8.03
          </p>
          <motion.button
            onClick={() => scrollToSection("contact")}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(94, 234, 212, 0.15)" }}
            whileTap={{ scale: 0.97 }}
            className="mt-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] border border-[#5eead4]/50 text-[#5eead4] px-5 py-2.5 hover:bg-[#5eead4]/10 transition-all duration-300 pointer-events-auto font-medium"
          >
            Get in Touch
          </motion.button>
        </motion.div>

        {/* ── 3D CHARACTER — Grows and becomes focal point as text fades ── */}
        <motion.div
          style={{
            y: translateY,
            scale,
            opacity,
          }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto"
        >
          <Magnet
            padding={100}
            strength={2.8}
            activeTransition="transform 0.35s ease-out"
            inactiveTransition="transform 0.8s ease-in-out"
          >
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "clamp(280px, 48vw, 750px)",
                height: "clamp(280px, 48vh, 750px)",
              }}
            >
              {/* Purple glow - intensifies as character grows */}
              <div
                className="absolute -inset-10 rounded-full -z-10"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(182,0,168,0.28) 0%, rgba(118,33,176,0.12) 40%, transparent 70%)",
                  filter: "blur(60px)",
                  animation: "pulse 4s ease-in-out infinite",
                }}
              />
              <Suspense fallback={<div style={{ width: "100%", height: "100%" }} />}>
                <HeroMascot />
              </Suspense>
            </div>
          </Magnet>
        </motion.div>

        {/* Teal accent circle (ambient decoration) */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            top: "-10%",
            left: "-8%",
            width: "350px",
            height: "350px",
            background: "rgba(94, 234, 212, 0.05)",
            boxShadow: "inset -40px 30px 60px rgba(0,180,180,0.06)",
            filter: "blur(70px)",
            borderRadius: "50%",
            animation: "float 15s ease-in-out infinite",
          }}
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[#5eead4]/70 text-[10px] uppercase tracking-widest font-light">Scroll</span>
          <ArrowDown className="w-4 h-4 text-[#5eead4]/70" />
        </motion.div>
      </div>

      {/* ── FIXED VERTICAL SOCIAL ICONS ── */}
      <SocialIcons />

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 30px) rotate(5deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  )
}
