"use client"

import { useState, useEffect } from "react"
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Code,
  Brain,
  Server,
  Cpu,
  FileText,
  Zap,
  Settings,
  Monitor,
} from "lucide-react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Badge } from "./components/ui/badge"

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSkillCategory, setActiveSkillCategory] = useState("all")

  // Enhanced typing animation states
  const [currentJobIndex, setCurrentJobIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)

  const jobTitles = [
    "Java Programmer",
    "Frontend Developer",
    "AI Enthusiast",
    "Full Stack Developer",
    "Problem Solver",
    "DSA Enthusiast",
  ]

  // Typing and backspacing animation effect
  useEffect(() => {
    const currentJob = jobTitles[currentJobIndex]

    const timer = setTimeout(
      () => {
        if (isTyping) {
          if (charIndex < currentJob.length) {
            setCurrentText(currentJob.slice(0, charIndex + 1))
            setCharIndex(charIndex + 1)
          } else {
            // Pause before starting to backspace
            setTimeout(() => setIsTyping(false), 2000)
          }
        } else {
          if (charIndex > 0) {
            setCurrentText(currentJob.slice(0, charIndex - 1))
            setCharIndex(charIndex - 1)
          } else {
            // Move to next job title
            setCurrentJobIndex((prev) => (prev + 1) % jobTitles.length)
            setIsTyping(true)
          }
        }
      },
      isTyping ? 50 : 50,
    ) // Typing speed: 100ms, Backspacing speed: 50ms

    return () => clearTimeout(timer)
  }, [currentJobIndex, charIndex, isTyping, jobTitles])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const skillCategories = [
    {
      name: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      color: "from-slate-600 to-blue-700",
      skills: [
        { name: "Java", level: "Advanced" },
        { name: "C", level: "Advanced" },
        { name: "C++", level: "Advanced" },
        { name: "JavaScript", level: "Intermediate" },
        { name: "Python", level: "Advanced" },
        { name: "TypeScript", level: "Intermediate" },
      ],
    },
    {
      name: "Frontend & UI",
      icon: <Monitor className="w-6 h-6" />,
      color: "from-slate-700 to-blue-600",
      skills: [
        { name: "React.js", level: "Advanced" },
        { name: "Next.js", level: "Advanced" },
        { name: "Angular", level: "Intermediate" },
        { name: "Streamlit", level: "Intermediate" },
        { name: "Tailwind CSS", level: "Advanced" },
      ],
    },
    {
      name: "AI/ML Technologies",
      icon: <Brain className="w-6 h-6" />,
      color: "from-slate-700 to-blue-600",
      skills: [
        { name: "Machine Learning", level: "Intermediate" },
        { name: "Natural Language Processing", level: "Intermediate" },
        { name: "Vector Databases", level: "Intermediate" },
        { name: "Text Processing", level: "Advanced" },
        { name: "AI Models", level: "Intermediate" },
        { name: "Data Analysis", level: "Advanced" },
      ],
    },
    {
      name: "Backend & APIs",
      icon: <Server className="w-6 h-6" />,
      color: "from-gray-500 to-slate-600",
      skills: [
        { name: "Node.js", level: "Advanced" },
        { name: "FastAPI", level: "Advanced" },
        { name: "RESTful APIs", level: "Advanced" },
        { name: "Postman", level: "Advanced" },
        { name: "API Design", level: "Advanced" },
      ],
    },
    {
      name: "Data Processing",
      icon: <FileText className="w-6 h-6" />,
      color: "from-gray-500 to-slate-600",
      skills: [
        { name: "PyMuPDF", level: "Intermediate" },
        { name: "Tesseract OCR", level: "Intermediate" },
        { name: "PDF Processing", level: "Advanced" },
        { name: "Text Chunking", level: "Advanced" },
        { name: "Embeddings", level: "Intermediate" },
      ],
    },
    {
      name: "Tools & Platforms",
      icon: <Settings className="w-6 h-6" />,
      color: "from-gray-500 to-slate-600",
      skills: [
        { name: "Git", level: "Advanced" },
        { name: "GitHub", level: "Advanced" },
        { name: "VS Code", level: "Advanced" },
        { name: "Linux", level: "Intermediate" },
        { name: "Docker", level: "Intermediate" },
        { name: "Power BI", level: "Intermediate" },
      ],
    },
  ]

  const projects = [
    {
      title: "Opinion Trade",
      description:
        "A sophisticated trading platform for opinions and predictions featuring real-time data processing, user engagement systems, and advanced analytics dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Express", "WebSocket"],
      link: "https://opiniontrade.onrender.com/",
      category: "Full Stack",
      gradient: "from-slate-600 to-blue-700",
    },
    {
      title: "FileQR Karo",
      description:
        "Revolutionary file sharing platform with QR code generation, secure file transfers, real-time sharing capabilities, and cross-platform compatibility.",
      tech: ["React", "Node.js", "File Upload", "QR Generation", "Security"],
      link: "https://fileqrkaro.onrender.com/",
      category: "Web App",
      gradient: "from-slate-600 to-blue-700",
    },
    {
      title: "Bliss Bay Shopping Mall",
      description:
        "Comprehensive e-commerce management system with inventory tracking, user authentication, payment integration, and advanced admin dashboard.",
      tech: ["React", "Next.js", "Database", "Authentication", "Payment"],
      link: "https://blissbay.onrender.com/",
      category: "E-commerce",
      gradient: "from-slate-600 to-blue-700",
    },
    {
      title: "Weather App",
      description:
        "Intelligent weather application with location-based forecasts, interactive maps, weather alerts, and beautiful responsive design.",
      tech: ["React", "Weather API", "Geolocation", "CSS", "Charts"],
      link: "https://weather-app-lyart-chi.vercel.app/",
      category: "Frontend",
      gradient: "from-slate-600 to-blue-700",
    },
  ]

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const filteredSkills =
    activeSkillCategory === "all"
      ? skillCategories
      : skillCategories.filter((category) => category.name.toLowerCase().includes(activeSkillCategory))

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl z-50 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                SS
              </div>
              <div className="hidden md:flex space-x-8">
                {["About", "Skills", "Experience", "Projects", "Education", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="relative px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-600" />}
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="about" className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-teal-600/5"></div>
          <div className="max-w-7xl mx-auto text-center relative">
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-slate-800 via-blue-600 to-slate-700 dark:from-blue-400 dark:via-purple-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Shreeyansh Singh
                </span>
              </h1>
              <div className="mb-8 h-16 flex items-center justify-center">
                <p className="text-3xl md:text-4xl font-semibold text-slate-600 dark:text-slate-300 transition-all duration-500">
                  {currentText}
                  <span className="animate-pulse text-blue-600">|</span>
                </p>
              </div>
              <div className="w-32 h-1.5 bg-gradient-to-r from-slate-600 via-blue-600 to-slate-700 mx-auto mb-12 rounded-full"></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-medium">shreeyanshsingh07@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Vasai, India</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => scrollToSection("projects")}
              >
                <Zap className="w-5 h-5 mr-2" />
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 hover:bg-blue-50 dark:hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300 bg-transparent"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300 bg-transparent"
                onClick={() => window.open("https://github.com/ShreeyanshSingh-Raghuvanshi", "_blank")}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-gray-900/50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Skills & Expertise
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Specialized in <span className="font-bold text-blue-600">Java programming</span> and{" "}
                <span className="font-bold text-purple-600">frontend development</span> with professional experience as
                a <span className="font-bold text-teal-600">Full Stack Developer</span> and team leadership expertise
              </p>
            </div>

            <div className="grid gap-8">
              {skillCategories.map((category, categoryIndex) => (
                <Card
                  key={categoryIndex}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                        {category.icon}
                      </div>
                      <CardTitle className="text-2xl font-bold">{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="group/skill">
                          <div className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
                            <Badge
                              variant="secondary"
                              className={`text-xs bg-gradient-to-r ${category.color} text-white border-0`}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                Professional Experience
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Real-world experience in full-stack development and team leadership
              </p>
            </div>

            <Card className="max-w-5xl mx-auto hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <div className="h-2 bg-gradient-to-r from-teal-500 to-purple-600"></div>
              <CardHeader className="pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <CardTitle className="text-3xl font-bold mb-2">Full Stack Developer Intern</CardTitle>
                    <CardDescription className="text-xl text-teal-600 dark:text-teal-400 font-semibold">
                      Esamyak Software Pvt Ltd
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-gradient-to-r from-teal-500 to-purple-600 text-white border-0 px-4 py-2 text-sm mb-2">
                      Frontend Developer Head
                    </Badge>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Team Lead • 5 Developers</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Key Achievements</h4>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Led a team of 5 frontend developers in building scalable web applications</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Developed full-stack solutions using modern web technologies</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Implemented responsive designs and optimized user experiences</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Collaborated with cross-functional teams to deliver high-quality products</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Project Delivered</h4>
                    <Card className="bg-gradient-to-br from-teal-50 to-purple-50 dark:from-teal-900/20 dark:to-purple-900/20 border border-teal-200 dark:border-teal-700">
                      <CardContent className="p-6">
                        <h5 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">PCA Platform</h5>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          Comprehensive web platform built during internship showcasing full-stack development
                          capabilities and team collaboration.
                        </p>
                        <Button
                          variant="outline"
                          className="w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white border-0 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                          onClick={() => window.open("https://pca.pincodeads.com/", "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live Project
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {[
                      "Team Leadership",
                      "Full Stack Development",
                      "Frontend Architecture",
                      "Project Management",
                      "Code Review",
                      "Mentoring",
                    ].map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-gradient-to-r from-teal-500 to-purple-600 text-white border-0 px-4 py-2 text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Innovative solutions showcasing full-stack development and modern technologies
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <CardTitle className="text-2xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={`bg-gradient-to-r ${project.gradient} text-white border-0 px-3 py-1`}
                      >
                        {project.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      className={`w-full bg-gradient-to-r ${project.gradient} hover:shadow-lg text-white border-0 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1`}
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      View Live Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50/50 to-teal-50/50 dark:from-purple-900/20 dark:to-teal-900/20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Education
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300">My academic journey and continuous learning</p>
            </div>

            <Card className="max-w-4xl mx-auto hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <div className="h-2 bg-gradient-to-r from-teal-500 to-blue-600"></div>
              <CardHeader className="text-center pb-6">
                <div className="inline-block p-4 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 mb-6">
                  <Cpu className="w-12 h-12 text-teal-600" />
                </div>
                <CardTitle className="text-3xl font-bold mb-2">Computer Engineering</CardTitle>
                <CardDescription className="text-xl text-gray-600 dark:text-gray-300">
                  Bachelor's Degree • Currently Pursuing
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Focused on software development, artificial intelligence, data structures & algorithms, and emerging
                  technologies. Active participant in coding competitions, hackathons, and technical projects with
                  hands-on experience in modern development practices.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    "Data Structures",
                    "Algorithms",
                    "Software Engineering",
                    "Database Systems",
                    "Web Development",
                    "AI/ML",
                    "System Design",
                    "API Development",
                  ].map((subject) => (
                    <Badge
                      key={subject}
                      className="bg-gradient-to-r from-teal-500 to-blue-600 text-white border-0 px-4 py-2 text-sm"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Let's Connect
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Ready to collaborate on innovative projects and bring ideas to life
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/shreeyansh-singh-858ab633b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                    "_blank",
                  )
                }
              >
                <Linkedin className="w-6 h-6 mr-3" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-6 text-xl font-semibold rounded-2xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:-translate-y-2 transition-all duration-300 bg-transparent"
                onClick={() => window.open("https://github.com/ShreeyanshSingh-Raghuvanshi", "_blank")}
              >
                <Github className="w-6 h-6 mr-3" />
                GitHub
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-6 text-xl font-semibold rounded-2xl border-2 hover:bg-blue-50 dark:hover:bg-gray-800 transform hover:-translate-y-2 transition-all duration-300 bg-transparent"
                onClick={() => window.open("mailto:shreeyanshsingh07@gmail.com", "_blank")}
              >
                <Mail className="w-6 h-6 mr-3" />
                Email
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
                Shreeyansh Singh
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Building the future with code, creativity, and innovation
              </p>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              © 2025 Shreeyansh Singh. Crafted with React & Next.js
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
