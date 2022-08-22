import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.scss'

function Header({ setFinishBtn, countActive }) {
  const location = useLocation()
  const backBtn = useNavigate()

  return (
    <>
      <header className='header'>
        <div className="container">
          <div className="header__inner">
            <div>
              <Link to={'/home'}>
                <h1 className="header__title">FinalExam</h1>
              </Link>
            </div>

            {
              location.pathname === '/quation' ?
                <>
                  <div>
                    <p className="header__quiz-count">{countActive} - {JSON.parse(localStorage.getItem('quizCount'))}</p>
                  </div>

                  <div>
                    <button className="btn header__quiz-finish-btn" onClick={() => setFinishBtn(true)}>FINISH</button>
                  </div>
                </>
                : location.pathname === '/notFound' ? <div><button className="btn header__quiz-back-btn" onClick={() => backBtn(-1)}>BACK</button></div> : ""
            }
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
