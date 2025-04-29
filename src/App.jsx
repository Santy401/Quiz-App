import './globals.css'
import questions from './Answers'
import { useState } from 'react'

function App() {
  const [quizStart, setQuizStart] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [feedback, setFeedback] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [goodAnswers, setGoodAnswers] = useState(0)
  const [badAnswers, setBadAnswers] = useState(0)

  const handleStart = () => {
    setQuizStart(true)
    setShowResults(false)
    setUserAnswers([])
    setGoodAnswers(0)
    setBadAnswers(0)
  }
  
  const handleNextQuestion = (selectedAnswer) => {
    setSelectedAnswer('')
    const correctAnswer = questions[currentQuestionIndex].answer

    if (selectedAnswer === correctAnswer) {
      setFeedback('✅ Correct!')
      setGoodAnswers(goodAnswers + 1)
    } else {
      setFeedback('❌ Incorrect!')
      setBadAnswers(badAnswers + 1)
    }

    setUserAnswers([...userAnswers, selectedAnswer])
    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setFeedback('')
    }, 2000)
  }

  const handleFinish = () => {
    setShowResults(true)
  }

  return (
    <div>
      <h1>Quiz App</h1>
      <div className='progress-bar-container'>
        <div
          className='progress-bar'
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
          }}
        ></div>
      </div>
      {quizStart ? (
        showResults ? (
          <div>
            <h2>Results</h2>
            <p>
              You answered {goodAnswers} questions correctly and {badAnswers} questions incorrectly.
            </p>
            <button className='start-btn' onClick={handleStart}>Try Again</button>
          </div>
        ) : (
          <>
            <h2>{questions[currentQuestionIndex].question}</h2>
            <div className='Answers'>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <label key={index}>
                  <input
                    type='radio'
                    name={`answer-${currentQuestionIndex}`}
                    value={option}
                    onChange={() => handleNextQuestion(option)}
                    checked={selectedAnswer === option}
                  />
                  {option}
                </label>
              ))}
            </div>
            <span>{feedback}</span>
            {currentQuestionIndex === questions.length - 1 ? (
              <button className='start-btn' onClick={handleFinish}>Finish</button>
            ) : (
              <span></span>
            )}
          </>
        )
      ) : (
        <button className='start-btn' onClick={handleStart}>Start Quiz</button>
      )}
    </div>
  )
}

export default App

