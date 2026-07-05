import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Joyride } from "react-joyride"

export default function FoldcraftPage({ onNavigate }) {
  const [runTour, setRunTour] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenPortfolioTour")
    console.log("Joyride initial check - hasSeenTour cache status:", hasSeenTour)
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        console.log("Joyride starting tour run...")
        setRunTour(true)
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleJoyrideCallback = (data) => {
    console.log("Joyride Callback Data:", data)
    const { status } = data
    if (["finished", "skipped"].includes(status)) {
      console.log("Joyride completed/skipped, setting localStorage cache...")
      localStorage.setItem("hasSeenPortfolioTour", "true")
      setRunTour(false)
    }
  }

  const steps = [
    {
      target: "#see-portfolio-btn",
      content: "Click here to see the whole portfolio.",
      placement: "bottom-end",
      disableBeacon: true,
      skipBeacon: true,
    }
  ]

  const joyrideStyles = {
    options: {
      arrowColor: "#ffffff",
      backgroundColor: "#ffffff",
      overlayColor: "rgba(0, 0, 0, 0.5)",
      primaryColor: "#2563eb", // blue button
      textColor: "#333333",
      zIndex: 1000,
    }
  }

  return (
    <div className="relative min-h-screen md:h-screen w-full overflow-x-hidden overflow-y-auto md:overflow-hidden bg-black font-geist text-white flex flex-col justify-center">
      {/* React Joyride Onboarding */}
      {runTour && (
        <Joyride
          steps={steps}
          run={runTour}
          continuous={false}
          showSkipButton={true}
          showCloseButton={true}
          locale={{ last: "Got it" }}
          styles={joyrideStyles}
          callback={handleJoyrideCallback}
          debug={true}
        />
      )}

      {/* Background Video (Wider and shifted left to increase space between waterfall and button) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none object-center md:w-[140%] md:max-w-none md:object-center md:-translate-x-[20%]"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay for Video Readability */}
      <div className="absolute inset-0 bg-black/60 md:bg-black/40 pointer-events-none" />

      {/* Brand Logo / Creator Name */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-12 z-20 select-none animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#B600A8] animate-pulse" />
          <span className="font-geist text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase text-white">
            SHREEYANSH
          </span>
          <span className="hidden sm:inline text-[10px] md:text-xs font-semibold tracking-wider text-white/40 uppercase">
            / Portfolio
          </span>
        </div>
      </div>

      {/* Floating See Portfolio Escape Hatch */}
      <button
        id="see-portfolio-btn"
        onClick={() => onNavigate(null)}
        className="see-portfolio-btn absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-12 z-20 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black hover:border-white px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 animate-[fadeSlideUp_0.8s_ease_0.2s_both]"
      >
        See Portfolio &rarr;
      </button>

      {/* Hero Content (Centered vertically to eliminate the large gap) */}
      <div className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-80px)] md:h-full px-6 py-20 sm:py-12 md:px-12 lg:px-16 gap-6 md:gap-10">
        {/* Top Section */}
        <div className="max-w-4xl">
          <div className="inline-block text-xs sm:text-sm text-white/90 tracking-wide uppercase px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-4 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
            SOFTWARE ENGINEERING & AI
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight text-white animate-[fadeSlideUp_0.8s_ease_0.4s_both] mb-4">
            Building Intelligent <br className="hidden sm:inline" /> Software.
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-medium text-white/80 leading-relaxed max-w-2xl animate-[fadeSlideUp_0.8s_ease_0.5s_both]">
            Full Stack Developer crafting scalable web applications, AI-powered products, and secure backend systems.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-start mt-0">
          <p className="text-sm sm:text-base leading-relaxed text-white/60 max-w-sm sm:max-w-lg mb-6 animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
            Computer Engineering student passionate about solving real-world problems through software engineering, artificial intelligence, and modern cloud technologies.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
            <button
              onClick={() => onNavigate("projects")}
              className="rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              Explore Work
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="rounded-lg border border-white/20 bg-black/40 backdrop-blur-sm px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-white hover:scale-105 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
