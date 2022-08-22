import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.scss'
import Home from './Companents/Home'
import Quation from './Companents/Quation'
import NotFound from './Companents/NotFound'

function App() {
  const [quizCount, setQuizCount] = useState(10)
  const [finishBtn, setFinishBtn] = useState(false)
  const [countActive, setCountActive] = useState(1)
  const [quizCategorId, setQuizCategorId] = useState('any')

  return (
    <>
      <section className='app'>
        <Routes>
          <Route path='/' element={<Home
            quizCount={quizCount}
            quizCategorId={quizCategorId}
            setQuizCount={setQuizCount}
            setQuizCategorId={setQuizCategorId}
          />}
          />
          <Route path='/home' element={<Home
            quizCount={quizCount}
            quizCategorId={quizCategorId}
            setQuizCount={setQuizCount}
            setQuizCategorId={setQuizCategorId}
          />}
          />
          <Route path='/quation' element={<Quation
            finishBtn={finishBtn}
            setFinishBtn={setFinishBtn}
            quizCount={quizCount}
            countActive={countActive}
            setQuizCount={setQuizCount}
            quizCategorId={quizCategorId}
            setCountActive={setCountActive}
          />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </section>
    </>
  )
}

export default App
