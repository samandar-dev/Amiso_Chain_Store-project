import { Link } from 'react-router-dom'
import React from 'react'
import './Modal.scss'

function Modal({ setModal, resultCount, resultPercentage }) {
  return (
    <>
      <div className="modal">
        <div className="modal__backdrop" onClick={() => setModal(false)}></div>
        <div className="modal__inner">
          <h3 className="modal__title">Your results</h3>

          <div className="modal__result">
            <p>{resultCount} / {localStorage.getItem('quizCount')}</p>
            <span>or</span>
            <p>{resultPercentage} %</p>
          </div>

          <div className="modal__btns">
            <button className='modal__btn-ok' onClick={() => setModal(false)}>OK</button>
            <Link to={'/home'}>
              <button className='modal__btn-home' onClick={() => setModal(false)}>GO HOME</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
