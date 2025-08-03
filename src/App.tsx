import { useState, useEffect } from 'react'
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

interface HappinessDrop {
  id: number
  x: number
  y: number
  size: number
  emoji: string
  opacity: number
  fadeSpeed: number
  fallSpeed: number
}

const surprises: Surprise[] = [
  { type: "Magic Quote", content: "Believe in the magic within you - every unicorn started as a dream! 🦄", emoji: "🦄", color: "#FF69B4", gradient: "linear-gradient(135deg, #FF69B4, #FF1493, #DA70D6)" },
  { type: "Enchanted Activity", content: "Find a rainbow in your day - look through a prism, water droplets, or soap bubbles!", emoji: "🌈", color: "#FFB6C1", gradient: "linear-gradient(135deg, #FFB6C1, #FF69B4, #DDA0DD)" },
  { type: "Unicorn Fact", content: "Did you know? The spiral horn of a unicorn is called an 'alicorn' and it's said to have healing powers!", emoji: "🦄", color: "#E6E6FA", gradient: "linear-gradient(135deg, #E6E6FA, #DDA0DD, #DA70D6)" },
  { type: "Magic Challenge", content: "Cast a kindness spell - do something unexpectedly nice for someone today!", emoji: "✨", color: "#FFB6C1", gradient: "linear-gradient(135deg, #FFB6C1, #F0E68C, #98FB98)" },
  { type: "Sparkle Compliment", content: "You sparkle brighter than any unicorn's horn! Your magic touches everyone around you! ✨", emoji: "💖", color: "#FF1493", gradient: "linear-gradient(135deg, #FF1493, #FF69B4, #FFB6C1)" },
  { type: "Rainbow Activity", content: "Create your own rainbow - use crayons, paint, or even colorful food to make something beautiful!", emoji: "🎨", color: "#FF6347", gradient: "linear-gradient(135deg, #FF6347, #FFD700, #ADFF2F, #00CED1, #FF69B4)" },
  { type: "Magical Recipe", content: "Unicorn smoothie: Blend banana, berries, yogurt, and a tiny bit of edible glitter or colorful fruit!", emoji: "�", color: "#FFB6C1", gradient: "linear-gradient(135deg, #FFB6C1, #F0E68C, #98FB98)" },
  { type: "Enchanted Meditation", content: "Close your eyes and imagine riding a unicorn through clouds of cotton candy and rainbow mist", emoji: "🧘‍♀️", color: "#DDA0DD", gradient: "linear-gradient(135deg, #DDA0DD, #E6E6FA, #F0E68C)" },
  { type: "Magical Fact", content: "Unicorns are said to only appear to those who believe in magic - and you're seeing this, so... ✨", emoji: "�", color: "#DA70D6", gradient: "linear-gradient(135deg, #DA70D6, #FF69B4, #FFB6C1)" },
  { type: "Creative Magic", content: "Draw a unicorn using only your imagination - no rules, just pure magical creativity!", emoji: "🎨", color: "#FF69B4", gradient: "linear-gradient(135deg, #FF69B4, #DDA0DD, #E6E6FA)" },
  { type: "Gratitude Sparkles", content: "Think of three magical moments from your life that made you feel like anything was possible", emoji: "🙏", color: "#FFB6C1", gradient: "linear-gradient(135deg, #FFB6C1, #F0E68C, #98FB98)" },
  { type: "Unicorn Dance", content: "Do a happy unicorn dance - prance, twirl, and let your inner magic shine through movement!", emoji: "💃", color: "#FF1493", gradient: "linear-gradient(135deg, #FF1493, #FF69B4, #DDA0DD)" },
  { type: "Rainbow Discovery", content: "Look for hidden rainbows - in soap bubbles, oil puddles, or light through windows!", emoji: "🌈", color: "#FFD700", gradient: "linear-gradient(135deg, #FFD700, #FF69B4, #DDA0DD, #98FB98)" },
  { type: "Magic Kindness", content: "Sprinkle kindness like fairy dust - leave a sweet note for someone to find!", emoji: "💝", color: "#FF69B4", gradient: "linear-gradient(135deg, #FF69B4, #FFB6C1, #F0E68C)" },
  { type: "Enchanted Adventure", content: "Take a magical mystery walk - let your intuition guide you to somewhere new and wonderful!", emoji: "🗺️", color: "#DDA0DD", gradient: "linear-gradient(135deg, #DDA0DD, #FF69B4, #FFB6C1)" },
  { type: "Unicorn Wisdom", content: "Remember: You are magical exactly as you are - no horn required! 🦄✨", emoji: "🌟", color: "#E6E6FA", gradient: "linear-gradient(135deg, #E6E6FA, #DDA0DD, #FF69B4)" },
]

// Secret magical surprises - only accessible through special means!
const secretSurprises: Surprise[] = [
  { type: "🔮 Secret Vision", content: "You've discovered the hidden realm! You possess the rare gift of seeing beyond the ordinary into pure magic! The unicorns have chosen you as a keeper of secrets! 🦄👑", emoji: "🔮", color: "#8A2BE2", gradient: "linear-gradient(135deg, #8A2BE2, #9932CC, #BA55D3, #DDA0DD)" },
  { type: "👑 Royal Unicorn", content: "CONGRATULATIONS! You are now an honorary member of the Royal Unicorn Council! Your secret power: the ability to see magic in everything! 🦄✨👑", emoji: "👑", color: "#FFD700", gradient: "linear-gradient(135deg, #FFD700, #FFA500, #FF69B4, #8A2BE2)" },
  { type: "🌟 Cosmic Secret", content: "LEGENDARY DISCOVERY: You've unlocked the Cosmic Unicorn frequency! Legend says only 1 in 1000 beings can find this. You're truly special! 🌌🦄💫", emoji: "🌌", color: "#4B0082", gradient: "linear-gradient(135deg, #4B0082, #8A2BE2, #DA70D6, #FFB6C1)" },
  { type: "🗝️ Ancient Magic", content: "THE ULTIMATE SECRET: You hold the key to the Ancient Unicorn Library! Hidden knowledge flows through you. Guard this magic well, chosen one! 📚🦄🗝️", emoji: "🗝️", color: "#800080", gradient: "linear-gradient(135deg, #800080, #9932CC, #FF69B4, #FFD700)" },
  { type: "💎 Crystal Power", content: "MYSTICAL ACHIEVEMENT UNLOCKED: The Crystal Unicorns have blessed you with infinite sparkle power! Your aura now shimmers with secret rainbow energy! 💎🦄🌈", emoji: "💎", color: "#C71585", gradient: "linear-gradient(135deg, #C71585, #FF1493, #FF69B4, #DDA0DD, #00CED1)" },
]

const motivationalMessages = [
  "You're absolutely magical! 🦄✨",
  "Keep sparkling, unicorn! 🌟�",
  "Your magic is extraordinary! 🦄�",
  "Stay enchanted, beautiful soul! ✨�",
  "You've got unicorn power! 🦄💪",
  "Keep shining like stardust! ⭐🌙",
  "Magical things happen to magical people! 🦄✨",
  "Your sparkle lights up the world! 💖🌟"
]

function App() {
  const [currentSurprise, setCurrentSurprise] = useState<Surprise | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [message, setMessage] = useState("")
  const [surpriseCount, setSurpriseCount] = useState(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const [happinessDrops, setHappinessDrops] = useState<HappinessDrop[]>([])
  
  // Secret feature state
  const [konamiSequence, setKonamiSequence] = useState<string[]>([])
  const [secretModeUnlocked, setSecretModeUnlocked] = useState(false)
  const [secretSurprisesFound, setSecretSurprisesFound] = useState(0)
  
  // The famous Konami code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

  const particleEmojis = ['🦄', '✨', '🌟', '⭐', '💫', '�', '💖', '💝', '🔮', '�‍♀️', '�', '☁️', '💜', '�']
  const happinessEmojis = ['💧', '💎', '💝', '💖', '✨', '🌟', '💫', '🔮', '🌈', '🦄']

  // Create happiness drops
  const createHappinessDrop = () => {
    const newDrop: HappinessDrop = {
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: -20,
      size: Math.random() * 15 + 10,
      emoji: happinessEmojis[Math.floor(Math.random() * happinessEmojis.length)],
      opacity: 1,
      fadeSpeed: Math.random() * 0.01 + 0.005,
      fallSpeed: Math.random() * 2 + 1
    }
    
    setHappinessDrops(prev => [...prev, newDrop])
  }

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

  // Animate happiness drops
  useEffect(() => {
    const dropInterval = setInterval(() => {
      // Create new drops randomly
      if (Math.random() < 0.3) {
        createHappinessDrop()
      }
    }, 800)

    const animationInterval = setInterval(() => {
      setHappinessDrops(prev => 
        prev
          .map(drop => ({
            ...drop,
            y: drop.y + drop.fallSpeed,
            opacity: drop.opacity - drop.fadeSpeed
          }))
          .filter(drop => drop.y < window.innerHeight + 50 && drop.opacity > 0)
      )
    }, 16)

    return () => {
      clearInterval(dropInterval)
      clearInterval(animationInterval)
    }
  }, [])

  // Secret Konami code detection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKonamiSequence(prev => {
        const newSequence = [...prev, event.code].slice(-konamiCode.length)
        
        // Debug log for development (optional)
        if (newSequence.length >= 3) {
          console.log('Current sequence:', newSequence.join(' '))
        }
        
        // Check if the sequence matches the Konami code
        if (newSequence.length === konamiCode.length && 
            newSequence.every((key, index) => key === konamiCode[index])) {
          if (!secretModeUnlocked) {
            setSecretModeUnlocked(true)
            setMessage("🔮✨ SECRET MODE UNLOCKED! ✨🔮 You've discovered the hidden unicorn realm!")
            // Create extra magical particles
            const magicalParticles: Particle[] = []
            for (let i = 0; i < 50; i++) {
              magicalParticles.push({
                id: i + 1000,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 30 + 15,
                emoji: ['🔮', '👑', '🌌', '🗝️', '💎', '🦄', '✨'][Math.floor(Math.random() * 7)],
                velocity: {
                  x: (Math.random() - 0.5) * 4,
                  y: (Math.random() - 0.5) * 4
                },
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 6
              })
            }
            setParticles(prev => [...prev, ...magicalParticles])
          }
          return []
        }
        
        return newSequence
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiCode, secretModeUnlocked, konamiSequence])

  useEffect(() => {
    // Welcome message
    setMessage("Welcome to your Magical Unicorn Adventure! 🦄✨")
  }, [])

  const generateSurprise = () => {
    setIsAnimating(true)
    createParticles() // Create new particles for each surprise
    
    // Create extra happiness drops for celebrations!
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createHappinessDrop(), i * 200)
    }
    
    setTimeout(() => {
      let randomSurprise: Surprise
      
      // 30% chance to get a secret surprise if secret mode is unlocked
      if (secretModeUnlocked && Math.random() < 0.3) {
        randomSurprise = secretSurprises[Math.floor(Math.random() * secretSurprises.length)]
        setSecretSurprisesFound(prev => prev + 1)
        setMessage("🔮 LEGENDARY SECRET DISCOVERED! 🔮")
        
        // Extra magical happiness drops for secret discoveries!
        for (let i = 0; i < 8; i++) {
          setTimeout(() => createHappinessDrop(), i * 100)
        }
      } else {
        randomSurprise = surprises[Math.floor(Math.random() * surprises.length)]
        const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
        setMessage(randomMessage)
      }
      
      setCurrentSurprise(randomSurprise)
      setSurpriseCount(prev => prev + 1)
      
      setIsAnimating(false)
    }, 800)
  }

  const resetApp = () => {
    setCurrentSurprise(null)
    setSurpriseCount(0)
    setSecretSurprisesFound(0)
    setSecretModeUnlocked(false)
    setKonamiSequence([])
    setMessage("Ready for a new magical adventure! 🦄🌟")
    setParticles([])
    setHappinessDrops([])
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

      {/* Happiness Drops */}
      <div className="happiness-drops-container">
        {happinessDrops.map(drop => (
          <div
            key={drop.id}
            className="happiness-drop"
            style={{
              left: `${drop.x}px`,
              top: `${drop.y}px`,
              fontSize: `${drop.size}px`,
              opacity: drop.opacity,
              filter: 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.8))',
              animation: 'sparkle 1s infinite alternate'
            }}
          >
            {drop.emoji}
          </div>
        ))}
      </div>
      
      <header className="app-header">
        <h1 className="app-title">
          <span className="emoji">🦄</span>
          Magical Unicorn App
          <span className="emoji">🦄</span>
        </h1>
        <p className="app-subtitle">Discover enchanted surprises and rainbow magic!</p>
      </header>

      <main className="app-main">
        <div className="message-container">
          <p className="motivational-message">{message}</p>
          <div className="surprise-counter">
            Magical discoveries: <span className="count">{surpriseCount}</span> 🦄
            {secretModeUnlocked && (
              <div className="secret-counter">
                Secret realm discoveries: <span className="secret-count">{secretSurprisesFound}</span> 🔮
              </div>
            )}
          </div>
          {secretModeUnlocked && (
            <div className="secret-mode-indicator">
              ✨ SECRET MODE ACTIVE ✨
              <div className="secret-hint">Keep clicking for legendary discoveries!</div>
            </div>
          )}
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
              <div className="welcome-emoji">🦄</div>
              <p>Click the magical button below to discover your first enchanted surprise!</p>
              <div className="welcome-sparkles">
                <span>🌟</span>
                <span>💫</span>
                <span>✨</span>
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
                <span className="loading-emoji">🦄</span>
                Creating Magic...
              </span>
            ) : (
              <>
                <span className="button-emoji">🦄</span>
                Surprise Me!
                <span className="button-emoji">🦄</span>
              </>
            )}
          </button>
          
          {surpriseCount > 0 && (
            <button 
              className="reset-button"
              onClick={resetApp}
            >
              🌈 Start New Magic
            </button>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Made with 💖 and unicorn magic</p>
        {!secretModeUnlocked && (
          <p className="secret-hint-footer">
            Psst... ancient legends speak of a mystical code... ↑↑↓↓←→←→BA 🔮
          </p>
        )}
        <div className="footer-sparkles">
          <span>🦄</span>
          <span>✨</span>
          <span>🦄</span>
        </div>
      </footer>
    </div>
  )
}

export default App
