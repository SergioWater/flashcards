"use client"; // If you're in a Next.js app with the new app router
import { useState } from "react";
// Import the JSON file (adjust path if needed)
import sampleQuizData2 from "./flashcards-Qz4.json";
import "./Flashcard.css";

function FlashcardQuiz() {
  // This will track which question in the JSON we are on.
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Extract the array of questions from your JSON:
  const questions = sampleQuizData2.definition_questions;
  const totalCards = questions.length;

  // Go to the previous question
  const handlePrevious = () => {
    setCurrentCard((prev) => (prev > 0 ? prev - 1 : prev));
    setShowAnswer(false);
  };

  // Go to the next question
  const handleNext = () => {
    setCurrentCard((prev) => (prev < totalCards - 1 ? prev + 1 : prev));
    setShowAnswer(false);
  };

  // Toggle the answer/explanation section
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  // Current question data
  const currentQuestion = questions[currentCard];

  return (
    <div className="flashcard-quiz">
      <div className="card">
        <div className="question-area">
          <h2>{currentQuestion.question}</h2>
        </div>

        <div className="options-grid">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${index % 2 === 0 ? "dark-red" : "light-red"}`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="controls">
          {/* Go Back Button */}
          <button
            className="nav-button"
            onClick={handlePrevious}
            disabled={currentCard === 0}
          >
            ←
          </button>

          <div className="center-controls">
            {/* Progress Display */}
            <span className="card-counter">
              {currentCard + 1}/{totalCards}
            </span>
            {/* Show/Hide Answer Button */}
            <button className="answer-button" onClick={toggleAnswer}>
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>
          </div>

          {/* Go Forward Button */}
          <button
            className="nav-button"
            onClick={handleNext}
            disabled={currentCard === totalCards - 1}
          >
            →
          </button>
        </div>

        {/* Conditionally render answer + explanation */}
        {showAnswer && (
          <div className="answer-area">
            <p>
              <strong>Answer:</strong> {currentQuestion.answer}
            </p>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashcardQuiz;