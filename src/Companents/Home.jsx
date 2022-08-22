import React from 'react'
import Header from './Header/Header'
import Start from './Main/Start/Start'

function Home({ setQuizCount, quizCategorId, quizCount, setQuizCategorId }) {
  return (
    <>
      <Header />
      <Start
        quizCount={quizCount}
        quizCategorId={quizCategorId}
        setQuizCount={setQuizCount}
        setQuizCategorId={setQuizCategorId}
      />
    </>
  )
}

export default Home
