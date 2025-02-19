"use client"; // If you're in a Next.js app with the new app router
import { useState } from "react";
import sampleQuizData2 from "./jsons/CSC415unit3.json";
import "./Flashcard.css";

function FlashcardQuiz() {
  // 1. State variables
  const [currentCard, setCurrentCard] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]); // store indices of wrong questions
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState(""); // immediate feedback ("Correct!" or "Incorrect!")
  const [isReviewMode, setIsReviewMode] = useState(false); // toggles review mode for missed questions
  
  // 2. Get the array of questions from JSON
  const originalQuestions = sampleQuizData2.definition_questions;
  // In review mode, only show the wrongAnswers subset. Otherwise, show all questions.
  const questions = isReviewMode
    ? wrongAnswers.map(idx => originalQuestions[idx])
    : originalQuestions;
    
  // If in review mode, the total cards are the count of wrong ones, else the full set
  const totalCards = questions.length;

  // 3. Move to the previous question
  const handlePrevious = () => {
    setCurrentCard(prev => (prev > 0 ? prev - 1 : prev));
    setShowAnswer(false);
    setFeedback("");
  };

  // 4. Move to the next question
  const handleNext = () => {
    setCurrentCard(prev => (prev < totalCards - 1 ? prev + 1 : prev));
    setShowAnswer(false);
    setFeedback("");
  };

  // 5. Option click handler (determine right/wrong, update scoreboard, move to next)
  const handleOptionClick = (selectedOption) => {
    // Compare the selected option to the correct answer
    const isCorrect = selectedOption === questions[currentCard].answer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
    } else {
      setWrongAnswers((prevWrong) => {
        // We need the global index if not in review mode
        // or local index if we are in review mode. Let's handle each case:
        if (isReviewMode) {
          // We are reviewing from the wrongAnswers array,
          // so we should track the global index from that array
          return prevWrong; // no need to add again, it's already wrong
        } else {
          // We are in normal mode
          const globalIndex = currentCard; 
          // Check if we haven't already included it (just in case)
          return prevWrong.includes(globalIndex)
            ? prevWrong
            : [...prevWrong, globalIndex];
        }
      });
      setFeedback("Incorrect!");
    }

    // Brief delay before moving on, so user can see feedback
    setTimeout(() => {
      // Move to the next question automatically
      if (currentCard < totalCards - 1) {
        setCurrentCard(currentCard + 1);
      }
      // Reset states for next question
      setShowAnswer(false);
      setFeedback("");
    }, 1000);
  };

  // 6. Show/Hide the answer
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
    setFeedback("");
  };

  // 7. Handle "Review Missed Questions" button
  const handleReview = () => {
    setIsReviewMode(true);
    setCurrentCard(0); // reset to the first item in the review set
    setFeedback("");
    setShowAnswer(false);
  };

  // 8. Reset quiz (back to normal mode)
  const handleReset = () => {
    setIsReviewMode(false);
    setCurrentCard(0);
    setScore(0);
    setWrongAnswers([]);
    setFeedback("");
    setShowAnswer(false);
  };

  // 9. If there are no questions (just a safe check)
  if (!questions || questions.length === 0) {
    return <div>No questions available.</div>;
  }

  // 10. Current question data
  const currentQuestion = questions[currentCard];

  // 11. Render
  return (
    <div className="flashcard-quiz">
      <div className="scoreboard">
        <h3>Score: {score}</h3>
        {!isReviewMode && (
          <p>
            You have answered {currentCard} question
            {currentCard !== 1 ? "s" : ""} so far
          </p>
        )}
        {isReviewMode && (
          <p>Reviewing your missed questions</p>
        )}
      </div>

      <div className="card">
        <div className="question-area">
          <h2>{currentQuestion.question}</h2>
        </div>

        <div className="options-grid">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${index % 2 === 0 ? "dark-red" : "light-red"}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Immediate feedback */}
        {feedback && (
          <div className={`feedback ${feedback === "Correct!" ? "correct" : "incorrect"}`}>
            {feedback}
          </div>
        )}

        <div className="controls">
          <button
            className="nav-button"
            onClick={handlePrevious}
            disabled={currentCard === 0}
          >
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

      {/* Buttons for finishing or reviewing */}
      {!isReviewMode && currentCard === totalCards - 1 && (
        <div className="quiz-end">
          <p>
            You have reached the end of the quiz! You got {score} correct out of{" "}
            {totalCards}.
          </p>
          {wrongAnswers.length > 0 && (
            <button onClick={handleReview}>
              Review Missed Questions
            </button>
          )}
          <button onClick={handleReset}>
            Reset Quiz
          </button>
        </div>
      )}

      {/* If in review mode and we've gone through all missed questions */}
      {isReviewMode && currentCard === totalCards - 1 && (
        <div className="quiz-end">
          <p>You have finished reviewing your missed questions.</p>
          <button onClick={handleReset}>Reset Quiz</button>
        </div>
      )}
    </div>
  );
}

export default FlashcardQuiz;