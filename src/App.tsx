import { useState, useEffect, useRef } from 'react'
import './App.css'

interface Surprise {
  type: string
  content: string
  emoji: string
  color: string
  gradient: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  emoji: string
  velocity: { x: number; y: number }
  rotation: number
  rotationSpeed: number
}

const surprises: Surprise[] = [
  { type: "Quote", content: "The only way to do great work is to love what you do. - Steve Jobs", emoji: "💭", color: "#FF6B6B", gradient: "linear-gradient(135deg, #FF6B6B, #FF8E53)" },
  { type: "Activity", content: "Take a 10-minute walk outside and count how many different birds you can spot", emoji: "🐦", color: "#4ECDC4", gradient: "linear-gradient(135deg, #4ECDC4, #44A08D)" },
  { type: "Fun Fact", content: "Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.", emoji: "🍯", color: "#45B7D1", gradient: "linear-gradient(135deg, #45B7D1, #96C93D)" },
  { type: "Challenge", content: "Try writing your name with your non-dominant hand", emoji: "✍️", color: "#96CEB4", gradient: "linear-gradient(135deg, #96CEB4, #FFECD2)" },
  { type: "Compliment", content: "You have a wonderful curiosity about the world that makes you truly special!", emoji: "⭐", color: "#FFEAA7", gradient: "linear-gradient(135deg, #FFEAA7, #FDBB2D)" },
  { type: "Activity", content: "Make a paper airplane and see how far it can fly", emoji: "✈️", color: "#DDA0DD", gradient: "linear-gradient(135deg, #DDA0DD, #B19CD9)" },
  { type: "Recipe", content: "Quick snack: Mix peanut butter with honey and spread on crackers", emoji: "🥜", color: "#F39C12", gradient: "linear-gradient(135deg, #F39C12, #F1C40F)" },
  { type: "Meditation", content: "Close your eyes and take 5 deep breaths, focusing only on the sensation of breathing", emoji: "🧘", color: "#E17055", gradient: "linear-gradient(135deg, #E17055, #FDA085)" },
  { type: "Fun Fact", content: "A group of flamingos is called a 'flamboyance'", emoji: "🦩", color: "#FF7675", gradient: "linear-gradient(135deg, #FF7675, #FD79A8)" },
  { type: "Creative", content: "Draw something using only circles and triangles", emoji: "🎨", color: "#A29BFE", gradient: "linear-gradient(135deg, #A29BFE, #6C5CE7)" },
  { type: "Gratitude", content: "Think of three things you're grateful for right now", emoji: "🙏", color: "#00B894", gradient: "linear-gradient(135deg, #00B894, #00CEC9)" },
  { type: "Movement", content: "Do 10 jumping jacks to get your blood flowing", emoji: "🏃", color: "#00CEC9", gradient: "linear-gradient(135deg, #00CEC9, #74B9FF)" },
  { type: "Discovery", content: "Look up at the sky and find three different cloud shapes", emoji: "☁️", color: "#74B9FF", gradient: "linear-gradient(135deg, #74B9FF, #0984E3)" },
  { type: "Kindness", content: "Send a thoughtful message to someone you care about", emoji: "💝", color: "#FD79A8", gradient: "linear-gradient(135deg, #FD79A8, #E84393)" },
  { type: "Adventure", content: "Try a new route to somewhere you go regularly", emoji: "🗺️", color: "#FDCB6E", gradient: "linear-gradient(135deg, #FDCB6E, #E17055)" },
]

const motivationalMessages = [
  "You're doing amazing! ✨",
  "Keep exploring! 🚀",
  "You're awesome! 🌟",
  "Stay curious! 🔍",
  "You've got this! 💪",
  "Keep shining! ☀️"
]

function App() {
  const [currentSurprise, setCurrentSurprise] = useState<Surprise | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [message, setMessage] = useState("")
  const [surpriseCount, setSurpriseCount] = useState(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const particleEmojis = ['✨', '🌟', '⭐', '💫', '🎉', '🎊', '💝', '🦋', '🌈', '🔮']

  // Create particles
  const createParticles = () => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 20 + 10,
        emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        },
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 4
      })
    }
    setParticles(newParticles)
  }

  // Animate particles
  useEffect(() => {
    createParticles()
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.velocity.x,
          y: particle.y + particle.velocity.y,
          rotation: particle.rotation + particle.rotationSpeed,
          velocity: {
            x: particle.x <= 0 || particle.x >= window.innerWidth ? -particle.velocity.x : particle.velocity.x,
            y: particle.y <= 0 || particle.y >= window.innerHeight ? -particle.velocity.y : particle.velocity.y
          }
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Welcome message
    setMessage("Welcome to your Surprise App! 🎉")
  }, [])

  const generateSurprise = () => {
    setIsAnimating(true)
    createParticles() // Create new particles for each surprise
    
    setTimeout(() => {
      const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)]
      setCurrentSurprise(randomSurprise)
      setSurpriseCount(prev => prev + 1)
      
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
      setMessage(randomMessage)
      
      setIsAnimating(false)
    }, 800)
  }

  const resetApp = () => {
    setCurrentSurprise(null)
    setSurpriseCount(0)
    setMessage("Ready for a new adventure! 🎯")
    setParticles([])
  }

  return (
    <div className="app">
      <div className="background-animation"></div>
      
      {/* Floating Particles */}
      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              transform: `rotate(${particle.rotation}deg)`,
              fontSize: `${particle.size}px`,
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>
      
      <header className="app-header">
        <h1 className="app-title">
          <span className="emoji">🎁</span>
          Surprise App
          <span className="emoji">🎁</span>
        </h1>
        <p className="app-subtitle">Discover something wonderful!</p>
      </header>

      <main className="app-main">
        <div className="message-container">
          <p className="motivational-message">{message}</p>
          <div className="surprise-counter">
            Surprises discovered: <span className="count">{surpriseCount}</span>
          </div>
        </div>

        <div className={`surprise-container ${isAnimating ? 'animating' : ''}`}>
          {currentSurprise ? (
            <div 
              className="surprise-card"
              style={{ 
                background: currentSurprise.gradient,
                boxShadow: `0 20px 40px ${currentSurprise.color}33`
              }}
            >
              <div className="surprise-type">
                <span className="surprise-emoji">{currentSurprise.emoji}</span>
                <span className="surprise-type-text">{currentSurprise.type}</span>
              </div>
              <div className="surprise-content">
                {currentSurprise.content}
              </div>
              <div className="surprise-glow" style={{ background: currentSurprise.gradient }}></div>
            </div>
          ) : (
            <div className="welcome-card">
              <div className="welcome-emoji">🌟</div>
              <p>Click the button below to discover your first surprise!</p>
              <div className="welcome-sparkles">
                <span>✨</span>
                <span>💫</span>
                <span>⭐</span>
              </div>
            </div>
          )}
        </div>

        <div className="button-container">
          <button 
            className="surprise-button"
            onClick={generateSurprise}
            disabled={isAnimating}
          >
            {isAnimating ? (
              <span className="loading">
                <span className="loading-emoji">🎲</span>
                Generating Magic...
              </span>
            ) : (
              <>
                <span className="button-emoji">✨</span>
                Surprise Me!
                <span className="button-emoji">✨</span>
              </>
            )}
          </button>
          
          {surpriseCount > 0 && (
            <button 
              className="reset-button"
              onClick={resetApp}
            >
              🔄 Start Over
            </button>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Made with ❤️ and a touch of magic</p>
        <div className="footer-sparkles">
          <span>✨</span>
          <span>🌟</span>
          <span>✨</span>
        </div>
      </footer>
    </div>
  )
}

export default App
