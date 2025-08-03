import { useState, useEffect } from 'react'
import './App.css'

interface Surprise {
  type: string
  content: string
  emoji: string
  color: string
}

const surprises: Surprise[] = [
  { type: "Quote", content: "The only way to do great work is to love what you do. - Steve Jobs", emoji: "💭", color: "#FF6B6B" },
  { type: "Activity", content: "Take a 10-minute walk outside and count how many different birds you can spot", emoji: "🐦", color: "#4ECDC4" },
  { type: "Fun Fact", content: "Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.", emoji: "🍯", color: "#45B7D1" },
  { type: "Challenge", content: "Try writing your name with your non-dominant hand", emoji: "✍️", color: "#96CEB4" },
  { type: "Compliment", content: "You have a wonderful curiosity about the world that makes you truly special!", emoji: "⭐", color: "#FFEAA7" },
  { type: "Activity", content: "Make a paper airplane and see how far it can fly", emoji: "✈️", color: "#DDA0DD" },
  { type: "Recipe", content: "Quick snack: Mix peanut butter with honey and spread on crackers", emoji: "🥜", color: "#F39C12" },
  { type: "Meditation", content: "Close your eyes and take 5 deep breaths, focusing only on the sensation of breathing", emoji: "🧘", color: "#E17055" },
  { type: "Fun Fact", content: "A group of flamingos is called a 'flamboyance'", emoji: "🦩", color: "#FF7675" },
  { type: "Creative", content: "Draw something using only circles and triangles", emoji: "🎨", color: "#A29BFE" },
  { type: "Gratitude", content: "Think of three things you're grateful for right now", emoji: "🙏", color: "#00B894" },
  { type: "Movement", content: "Do 10 jumping jacks to get your blood flowing", emoji: "🏃", color: "#00CEC9" },
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

  useEffect(() => {
    // Welcome message
    setMessage("Welcome to your Surprise App! 🎉")
  }, [])

  const generateSurprise = () => {
    setIsAnimating(true)
    
    setTimeout(() => {
      const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)]
      setCurrentSurprise(randomSurprise)
      setSurpriseCount(prev => prev + 1)
      
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
      setMessage(randomMessage)
      
      setIsAnimating(false)
    }, 500)
  }

  const resetApp = () => {
    setCurrentSurprise(null)
    setSurpriseCount(0)
    setMessage("Ready for a new adventure! 🎯")
  }

  return (
    <div className="app">
      <div className="background-animation"></div>
      
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
              style={{ background: `linear-gradient(135deg, ${currentSurprise.color}22, ${currentSurprise.color}66)` }}
            >
              <div className="surprise-type">
                <span className="surprise-emoji">{currentSurprise.emoji}</span>
                <span className="surprise-type-text">{currentSurprise.type}</span>
              </div>
              <div className="surprise-content">
                {currentSurprise.content}
              </div>
            </div>
          ) : (
            <div className="welcome-card">
              <div className="welcome-emoji">🌟</div>
              <p>Click the button below to discover your first surprise!</p>
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
                Generating...
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
      </footer>
    </div>
  )
}

export default App
