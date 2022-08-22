import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Start.scss'

function Start({ quizCount, quizCategorId, setQuizCount, setQuizCategorId }) {

  useEffect(() => {
    localStorage.setItem('quizCount', quizCount)
    localStorage.setItem('quizCategor', quizCategorId)
  }, [quizCount, quizCategorId]);

  useEffect(() => {
    localStorage.setItem('quizCount', 10)
    localStorage.setItem('quizCategor', 'any')
  }, []);

  return (
    <>
      <section className='start'>
        <div className="container">
          <div className="start__inner">
            <div className="start__select-box">
              <p>Number Of Questions:</p>

              <select className='start__select' onChange={(e) => setQuizCount(+e.target.value)}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
            </div>

            <div className="start__select-box">
              <p>Select Category:</p>

              <select className='start__select' onChange={(e) => setQuizCategorId(e.target.value)}>
                <option value="any">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
              </select>
            </div>

            <div className="start__btn-box">
              <Link to={'/quation'}>
                <button className='start__btn-start'>START</button>
              </Link>

              <Link to={'/notFound'}>
                <button className='start__btn-tests'>TESTS</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Start
