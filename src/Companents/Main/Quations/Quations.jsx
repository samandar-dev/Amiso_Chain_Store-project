import React, { useEffect, useState } from 'react'
import Modal from './Modal/Modal'
import './Quations.scss'

function Quations({ finishBtn, setQuizCount, setCountActive }) {
  const [api, setApi] = useState([])
  const [btnsArr, setBtnsArr] = useState([])
  const [resItem, setResItem] = useState({})
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultArr, setResultArr] = useState([])
  const [answerItem, setAnswerItem] = useState("")
  const [sliderCount, setSliderCount] = useState(1)
  const [resultCount, setResultCount] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [answerItemTwo, setAnswerItemTwo] = useState("")
  const [resultPercentage, setResultPercentage] = useState(0)
  const [resultTrueFalse, setResultTrueFalse] = useState(false)
  const [correctAnswerActive, setCorrectAnswerActive] = useState("")
  const [incorrectAnswersArr, setIncorrectAnswersArr] = useState([])
  const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]


  // --------------------------------------------------------------------------------------------
  // FETCH FUNCTION -----------------------
  // --------------------------------------------------------------------------------------------

  const fetchFunc = () => {
    fetch(`${localStorage.getItem('quizCategor') === 'any'
      ? `https://opentdb.com/api.php?amount=${JSON.parse(localStorage.getItem('quizCount'))}`
      : `https://opentdb.com/api.php?amount=
            ${localStorage.getItem('quizCount')}&category=
            ${localStorage.getItem('quizCategor')}`}`
    )
      .then(res => res.json())
      .then(data => {
        data.results.length > 1 ? setLoading(true) : setLoading(false)
        setBtnsArr(data.results)

        let arr = []
        data.results.map((item, inx) => {
          inx + 1 === 1
            ? arr.push({ id: inx + 1, randomNum: Math.floor(Math.random() * 4) + 1, ...item })
            : arr.push({ id: inx + 1, randomNum: 0, ...item })
        })

        setApi(arr)
      })
  }


  // --------------------------------------------------------------------------------------------
  // FINISH BTN FUNCTION THIS NOT FINISHED -----------------------
  // --------------------------------------------------------------------------------------------

  const finishBtnHandlar = () => {
    let arr = []
    api.map((item, inx) => {
      arr.push({
        id: inx + 1,
        correct: false,
        incorrectAnswers: "",
        correctAnswer: item.correct_answer,
        incorrectAnswersArr: item.incorrect_answers
      })
    })

    setResultArr(arr)
    setBtnsArr(arr)
  }

  useEffect(() => {
    finishBtnHandlar()
  }, [finishBtn]);


  // --------------------------------------------------------------------------------------------
  // ANSWERS CLICK FUNCTION -----------------------
  // --------------------------------------------------------------------------------------------

  const quizCorrectAnswerHandler = (answer, iaArr) => {
    setAnswerItem(answer)
    setIncorrectAnswersArr(iaArr)
  }


  // --------------------------------------------------------------------------------------------
  // SUBMIT FUNCTION -----------------------
  // --------------------------------------------------------------------------------------------

  const submitFunc = () => {
    let obj = {
      id: sliderCount,
      correct: false,
      randomNum: 0,
      correctAnswer: correctAnswerActive,
      incorrectAnswers: answerItemTwo,
      incorrectAnswersArr: incorrectAnswersArr,
    }
    api.map((item, inx) => item.id === sliderCount ? (setCorrectAnswerActive(item.correct_answer), obj.randomNum = item.randomNum) : 0)

    if (correctAnswerActive === answerItemTwo) {
      obj.correct = true
    }
    if (resultArr.length > 0) {
      let item = resultArr.filter(item => item.id === sliderCount)[0]

      if (item !== undefined) {
        item = sliderCount
      }
      if (item !== sliderCount) {
        setResultArr([...resultArr, obj])
        btnsArr.map((item, inx) => {
          if (inx + 1 === sliderCount) {
            item.id = sliderCount
            item.correct = obj.correct
          }
        })
      }
    }
    else {
      setResultArr([...resultArr, obj])
      btnsArr.map((item, inx) => {
        if (inx + 1 === sliderCount) {
          item.id = sliderCount
          item.correct = obj.correct
        }
      })
    }

    setCorrectAnswer(api.map((item, inx) => inx + 1 === sliderCount ? item.correct_answer : 0)[0])
    setAnswerItem("")
  }

  useEffect(() => {
    resultArr.map(item => item.correct ? setResultCount(resultCount + 1) : setResultCount(resultCount))
    resultArr.length === JSON.parse(localStorage.getItem('quizCount'))
      ? (setResultPercentage(Math.round(resultCount * 100 / resultArr.length)), setModal(true))
      : setModal(false)
  }, [resultArr.length]);

  // --------------------------------------------------------------------------------------------
  // Incorrect Answers Change useEffect -----------------------
  // --------------------------------------------------------------------------------------------

  useEffect(() => {
    setAnswerItemTwo(answerItem)

    if (sliderCount === 1) {
      setCorrectAnswer(answerItem)
      setCorrectAnswerActive(correctAnswer)
    }
  }, [answerItem]);


  // --------------------------------------------------------------------------------------------
  // Correct Answer Change useEffect -----------------------
  // --------------------------------------------------------------------------------------------

  useEffect(() => {
    setResItem(resultArr.filter(item => item.id === sliderCount ? item : setResultTrueFalse(false))[0])
    resultArr.map(item => item.id === sliderCount ? setResultTrueFalse(true) : "")
  }, [sliderCount, correctAnswer]);


  useEffect(() => {
    api.map((item, inx) => inx + 1 === sliderCount ? setCorrectAnswerActive(item.correct_answer) : 0)
    setCountActive(sliderCount)

    let arr = api.map((item, inx) => {
      if (item.id === sliderCount && item.randomNum === 0) {
        return { ...item, randomNum: Math.floor(Math.random() * 4) + 1 }
      }
      else return item
    })
    setApi(arr)
  }, [sliderCount]);

  // --------------------------------------------------------------------------------------------
  // FETCH useEffect -----------------------
  // --------------------------------------------------------------------------------------------

  useEffect(() => {
    setQuizCount(JSON.parse(localStorage.getItem('quizCount')))
    fetchFunc()
  }, []);

  // ----------------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------------

  if (!loading) {
    return <div className="loading-box">
      <ul className="loading-top-list">{loadingArr.map((item, inx) => <li key={inx + 1}></li>)}</ul>
      <div className="loading-main-box"></div>
    </div>
  }
  return (
    <>
      <section className='quiz'>
        <div className="container">
          <div className="quiz__inner">
            <div className="quiz__btns-box">
              <ul className="quiz__btns-list">
                {
                  btnsArr.map((item, inx) =>
                    item.correct !== undefined ?
                      item.correct ?
                        <li
                          className={`quiz__btns-item correctAnswerActive ${inx + 1 === sliderCount ? "act-item " : ""}`}
                          key={inx + 1}
                          onClick={() => setSliderCount(inx + 1)}
                        >
                          <button className='quiz__btns-btn'>{inx + 1}</button>
                        </li>
                        :
                        <li className={`quiz__btns-item incorrectAnswers ${inx + 1 === sliderCount ? "act-item " : ""}`}
                          key={inx + 1}
                          onClick={() => setSliderCount(inx + 1)}
                        >
                          <button className='quiz__btns-btn'>{inx + 1}</button>
                        </li>
                      :
                      <li
                        className={`quiz__btns-item ${inx + 1 === sliderCount ? "act-item" : ""}`}
                        key={inx + 1}
                        onClick={() => setSliderCount(inx + 1)}>
                        <button className='quiz__btns-btn'>{inx + 1}</button>
                      </li>
                  )
                }
              </ul>
            </div>

            <div className="quiz__desc-quiz-box">
              <ul className="quiz__desc-quiz-list" style={{
                transform: `translateX(-${sliderCount * 100 - 100}%)`
              }}>

                {
                  api.map((item, inx) => (
                    <li className={`quiz__desc-quiz-item ${sliderCount === inx + 1 ? "activeItem" : ""}`}
                      key={inx + 1}>
                      <div className="quiz__desc-quiz-item-desc">
                        <p>{item.question}</p>
                      </div>

                      <ul className="quiz__desc-quiz-options-list">
                        {
                          !resultTrueFalse ?
                            <>
                              {
                                item.incorrect_answers.length > 2 ?
                                  item.incorrect_answers.map((itm, i) => (
                                    i + 1 === 1 ?
                                      <li className={`quiz__desc-quiz-options-item ${itm === answerItemTwo ? "clickItemsBG" : ""}`}
                                        onClick={() => (quizCorrectAnswerHandler(itm, item.incorrect_answers), setCorrectAnswer(""))}
                                        key={i + 1}
                                        style={{
                                          transform: `translateY(${item.randomNum === 1 ? 132 : 0}px)`
                                        }}>
                                        <button>{itm}</button>
                                      </li>
                                      : i + 1 === 2 ?
                                        <li className={`quiz__desc-quiz-options-item ${itm === answerItemTwo ? "clickItemsBG" : ""}`}
                                          onClick={() => (quizCorrectAnswerHandler(itm, item.incorrect_answers), setCorrectAnswer(""))}
                                          key={i + 1}
                                          style={{
                                            transform: `translateY(${item.randomNum === 2 ? 88 : 0}px)`
                                          }}>
                                          <button>{itm}</button>
                                        </li>
                                        : i + 1 === 3 ?
                                          <li className={`quiz__desc-quiz-options-item ${itm === answerItemTwo ? "clickItemsBG" : ""}`}
                                            onClick={() => (quizCorrectAnswerHandler(itm, item.incorrect_answers), setCorrectAnswer(""))}
                                            key={i + 1}
                                            style={{
                                              transform: `translateY(${item.randomNum === 3 ? 44 : 0}px)`
                                            }}>
                                            <button>{itm}</button>
                                          </li>
                                          : undefined
                                  ))

                                  : item.incorrect_answers.map((itm, i) => (
                                    <li className={`quiz__desc-quiz-options-item ${itm === answerItemTwo ? "clickItemsBG" : ""}`}
                                      onClick={() => (quizCorrectAnswerHandler(itm, item.incorrect_answers), setCorrectAnswer(""))}
                                      key={i + 1}>
                                      <button>{itm}</button>
                                    </li>
                                  ))
                              }

                              {
                                item.incorrect_answers.length !== 1 ?
                                  <li className={`quiz__desc-quiz-options-item  ${correctAnswer === item.correct_answer ? "clickItemsBG" : ""}`}
                                    onClick={() => (quizCorrectAnswerHandler(item.correct_answer, item.incorrect_answers), setCorrectAnswer(item.correct_answer))}
                                    style={{
                                      transform: `translateY(-${item.randomNum === 1 ? 132 : item.randomNum === 2 ? 88 : item.randomNum === 3 ? 44 : 0}px)`
                                    }}>
                                    <button>{item.correct_answer}</button>
                                  </li>
                                  :
                                  <li
                                    className={`quiz__desc-quiz-options-item ${correctAnswer === item.correct_answer ? "clickItemsBG" : ""}`}
                                    onClick={() => (quizCorrectAnswerHandler(item.correct_answer, item.incorrect_answers), setCorrectAnswer(item.correct_answer))}>
                                    <button>{item.correct_answer}</button>
                                  </li>
                              }
                            </>
                            :
                            <>
                              {
                                resItem != null ?
                                  <>
                                    {
                                      resItem.incorrectAnswersArr.length > 2
                                        ? resItem.incorrectAnswersArr.map((elem, ind) => (
                                          ind + 1 === 1 ?
                                            <li className={`quiz__desc-quiz-options-item ${resItem.incorrectAnswers === elem ? "incorrectAnswers" : ""}`}
                                              key={ind + 1}
                                              style={{
                                                transform: `translateY(${resItem.randomNum === 1 ? 132 : 0}px)`
                                              }}>
                                              <button>{elem}</button>
                                            </li>
                                            :
                                            ind + 1 === 2 ?
                                              <li className={`quiz__desc-quiz-options-item ${resItem.incorrectAnswers === elem ? "incorrectAnswers" : ""}`}
                                                key={ind + 1}
                                                style={{
                                                  transform: `translateY(${resItem.randomNum === 2 ? 88 : 0}px)`
                                                }}>
                                                <button>{elem}</button>
                                              </li>
                                              :
                                              ind + 1 === 3 ?
                                                <li className={`quiz__desc-quiz-options-item ${resItem.incorrectAnswers === elem ? "incorrectAnswers" : ""}`}
                                                  key={ind + 1}
                                                  style={{
                                                    transform: `translateY(${resItem.randomNum === 3 ? 44 : 0}px)`
                                                  }}>
                                                  <button>{elem}</button>
                                                </li>
                                                : undefined
                                        ))

                                        : resItem.incorrectAnswersArr.map((elem, ind) => (
                                          <li className={`quiz__desc-quiz-options-item ${resItem.incorrectAnswers === elem ? "incorrectAnswers" : ""}`}
                                            key={ind + 1}>
                                            <button>{elem}</button>
                                          </li>
                                        ))
                                    }

                                    {
                                      resItem.incorrectAnswersArr.length !== 1 ?
                                        <li className="quiz__desc-quiz-options-item correctAnswerActive"
                                          style={{
                                            transform: `translateY(-${resItem.randomNum === 1 ? 132 : resItem.randomNum === 2 ? 88 : resItem.randomNum === 3 ? 44 : 0}px)`
                                          }}>
                                          <button>{correctAnswerActive}</button>
                                        </li>
                                        : <li className="quiz__desc-quiz-options-item correctAnswerActive">
                                          <button>{correctAnswerActive}</button>
                                        </li>
                                    }
                                  </>
                                  : undefined
                              }
                            </>
                        }
                      </ul>
                    </li>
                  ))}
              </ul>

              <div className="quiz__desc-quiz-next-prive-box">
                <button className={`btn quiz__desc-quiz-prive-btn ${sliderCount === 1 ? "disabled" : ""}`}
                  onClick={() => setSliderCount(sliderCount > 1 ? sliderCount - 1 : 1)}>PREVIOUS
                </button>

                <button className={`btn quiz__desc-quiz-submit-btn ${answerItem === "" ? "disabled" : "submit"}`}
                  onClick={() => submitFunc()}>SUBNIT
                </button>

                <button className={`btn quiz__desc-quiz-next-btn ${sliderCount === api.length ? "disabled" : ""}`}
                  onClick={() => setSliderCount(sliderCount < api.length ? sliderCount + 1 : api.length)}>NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modal ? <Modal setModal={setModal} resultCount={resultCount} resultPercentage={resultPercentage} /> : ""}
    </>
  )
}

export default Quations
