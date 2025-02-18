"use client"

import { useState } from "react"
import "./FlashcardQuiz.css"

const sampleQuizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris",
    explanation: "Paris is the capital and largest city of France.",
  },
  // Add more questions as needed
]

function FlashcardQuiz() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const totalCards = sampleQuizData.length

  const handlePrevious = () => {
    setCurrentCard((prev) => (prev > 0 ? prev - 1 : prev))
    setShowAnswer(false)
  }

  const handleNext = () => {
    setCurrentCard((prev) => (prev < totalCards - 1 ? prev + 1 : prev))
    setShowAnswer(false)
  }

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  return (
    <div className="flashcard-quiz">
      <div className="card">
        <div className="question-area">
          <h2>{sampleQuizData[currentCard].question}</h2>
        </div>

        <div className="options-grid">
          {sampleQuizData[currentCard].options.map((option, index) => (
            <button key={index} className={`option-button ${index % 2 === 0 ? "dark-red" : "light-red"}`}>
              {option}
            </button>
          ))}
        </div>

        <div className="controls">
          <button className="nav-button" onClick={handlePrevious} disabled={currentCard === 0}>
            ←
          </button>

          <div className="center-controls">
            <span className="card-counter">
              {currentCard + 1}/{totalCards}
            </span>
            <button className="answer-button" onClick={toggleAnswer}>
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>
          </div>

          <button className="nav-button" onClick={handleNext} disabled={currentCard === totalCards - 1}>
            →
          </button>
        </div>

        {showAnswer && (
          <div className="answer-area">
            <p>
              <strong>Answer:</strong> {sampleQuizData[currentCard].answer}
            </p>
            <p>{sampleQuizData[currentCard].explanation}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FlashcardQuiz

