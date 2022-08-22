import { Route, Routes } from 'react-router-dom'
import NotFound from './companents/NotFound'
import Quation from './companents/Quation'
import Home from './companents/Home'
import { useState } from 'react'
import './App.scss'

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
