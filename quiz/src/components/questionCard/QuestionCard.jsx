import React from "react";
import "./QuestionCard.css";
import { useState, useEffect } from "react";

export function QuestionCard({
  questionsData,
  count,
  questionLength,
  setCountNext,
  setCountprev,
  answers,
  modal,
  score,
  setModal,
  setScore,
}) {
  const [timer, setTimer] = useState(30);

  const approvedChoice = (answer) => {
    console.log(answer);
    const checkAnswer = answer === questionsData.correct_answer;
    console.log("checkAnswer", checkAnswer);
    if (checkAnswer) {
      setScore((score) => score + 10);
    }
    setCountNext();
    if (count == questionLength - 1) {
      setModal(true);
      setTimer(30);
    }
    console.log("score", score);
  };

  useEffect(() => {
    setTimer(30);
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
      /*if (setCountNext + 1) {
        //kullanıcının soruyu kendi geçmesi durumunda timer 30 saniyeye geri dönüyor. ama azaltma işlemi yapamadım....
        setTimer(30);
      }*/
      if (timer == 0 && count < questionLength - 1) {
        setCountNext();
        setTimer(30);
      } else if (timer == 0 && count >= questionLength - 1) {
        setModal(true);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer, count]);

  return (
    <div className="question-card">
      <div className="timer">{timer}</div>
      <h3>
        {count + 1}/{questionLength}
      </h3>

      <h4>{questionsData?.question ?? "question not found"}</h4>
      <div>
        {answers?.map((answer, i) => {
          return (
            <button onClick={() => approvedChoice(answer)} id="answers">
              {answer}
            </button>
          );
        })}
      </div>
      <button id="prev" onClick={setCountprev}>
        prev
      </button>
      <button id="next" onClick={setCountNext}>
        next
      </button>
    </div>
  );
}

export default QuestionCard;
