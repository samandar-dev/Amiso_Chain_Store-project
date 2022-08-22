import React from 'react'
import Header from './Header/Header'

function NotFound() {
  return (
    <>
      <Header />
      <h1 style={{
        color: '#ffc107',
        textAlign: 'center',
        margin: '20px',
        fontSize: '40px'
      }}
      > Token ishlatilgan!
      </h1>

      <p style={{
        color: '#212529',
        textAlign: 'center',
        margin: '20px',
        fontSize: '40px'
      }}
      > Botga qaytadan /start yoki /menu yozing!
      </p>
    </>
  )
}

export default NotFound
