import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// ContactButton Component
export const ContactButton = ({ label = "Contact Me", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative rounded-full text-white font-medium uppercase tracking-widest transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center font-kanit
                 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-[10px] sm:text-xs md:text-sm"
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
        outline: "2px solid white",
        outlineOffset: "-3px"
      }}
    >
      {label}
    </button>
  )
}

// LiveProjectButton Component
export const LiveProjectButton = ({ label = "Live Project", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-colors duration-200 hover:bg-[#D7E2EA]/10 font-kanit
                 px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base"
    >
      {label}
    </button>
  )
}

// FadeIn Component
export const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, as = "div", ...props }) => {
  const Component = motion[as] || motion.div;
  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </Component>
  )
}

// Magnet Component
export const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out"
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [transition, setTransition] = useState(inactiveTransition)
  const ref = useRef(null)

  const handleMouseLeave = useCallback(() => {
    setTransition(inactiveTransition)
    setPosition({ x: 0, y: 0 })
  }, [inactiveTransition])

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    const maxRadius = Math.max(rect.width, rect.height) / 2
    if (distance < maxRadius + padding) {
      setTransition(activeTransition)
      setPosition({
        x: distanceX / strength,
        y: distanceY / strength
      })
    } else {
      handleMouseLeave()
    }
  }, [padding, strength, activeTransition, handleMouseLeave])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return (
    <div
      ref={ref}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: transition,
        willChange: "transform"
      }}
      className="inline-block"
    >
      {children}
    </div>
  )
}

const AnimatedChar = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1])

  return (
    <span className="relative inline-block">
      <span className="opacity-20">{char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 text-[#D7E2EA]"
      >
        {char}
      </motion.span>
    </span>
  )
}

// AnimatedText Component
export const AnimatedText = ({ text, className }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"]
  })

  const words = text.split(" ")
  let charCount = 0
  const totalChars = text.length

  return (
    <p ref={ref} className={className}>
      {words.map((word, wordIndex) => {
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mx-[0.2em]">
            {word.split("").map((char, charIndex) => {
              const charIdx = charCount++
              const start = charIdx / totalChars
              const end = (charIdx + 1.5) / totalChars // Slight overlap for smooth flow

              return (
                <AnimatedChar
                  key={charIndex}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              )
            })}
          </span>
        )
      })}
    </p>
  )
}
