import { useState, useEffect } from "react"
import Marquee from "react-fast-marquee"
import "./LoadingScreen.css"

export default function LoadingScreen() {
  const [percent, setPercent] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    let currentPercent = 0
    const interval = setInterval(() => {
      // simulate fast loading as requested
      currentPercent += Math.floor(Math.random() * 10) + 2
      if (currentPercent >= 100) {
        currentPercent = 100
        clearInterval(interval)
      }
      setPercent(currentPercent)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (percent >= 100) {
      setTimeout(() => {
        setLoaded(true)
        setTimeout(() => {
          setIsLoaded(true)
        }, 800)
      }, 300)
    }
  }, [percent])

  useEffect(() => {
    if (isLoaded) {
      setClicked(true)
    }
  }, [isLoaded])

  function handleMouseMove(e) {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    target.style.setProperty("--mouse-x", `${x}px`)
    target.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <>
      <div className="loading-header">
        <div className="loader-title uppercase font-black text-cyan-400">SHREEYANSH</div>
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee speed={60}>
            <span> Full Stack Developer</span> <span>AI Integration</span>
            <span> Full Stack Developer</span> <span>AI Integration</span>
          </Marquee>
        </div>
        
        <div
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
