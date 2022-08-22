import React from 'react'
import Header from './Header/Header'
import Quations from './Main/Quations/Quations'

function Quation({ finishBtn, setFinishBtn, countActive, setQuizCount, quizCount, quizCategorId, setCountActive }) {
  return (
    <>
      <Header
        setFinishBtn={setFinishBtn}
        countActive={countActive}
      />
      <Quations
        finishBtn={finishBtn}
        quizCount={quizCount}
        setQuizCount={setQuizCount}
        quizCategorId={quizCategorId}
        setCountActive={setCountActive}
      />
    </>
  )
}

export default Quation
