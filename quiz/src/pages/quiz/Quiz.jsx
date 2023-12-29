import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../api/api";
import { QuestionCard } from "../../components/questionCard/QuestionCard";
import axios from "axios";
import Modal from "../../components/modal/Modal";

const Quiz = () => {
  const { difficulty, amount } = useParams();
  const [questionsData, setQuestionsData] = useState([]);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState([]);

  //Count arttırma fonksiyonu
  const handleNextCount = () => {
    setCount((prev) => (prev == questionsData.length - 1 ? 0 : prev + 1));
  };

  //Count azaltma fonksiyonu
  const handlePrevCount = () => {
    setCount((prev) => (prev == 0 ? questionsData.length - 1 : prev - 1));
    if (count == 1) {
      setModal(true);
    }
  };

  useEffect(() => console.log("answers", answers), [answers]);

  // datayı çekme fonksiyonu
  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      axios
        .get(
          `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
        )
        .then((res) => {
          setQuestionsData(res.data.results);
          res.data.results.map((dt) =>
            setAnswers((prev) => [
              ...prev,
              [...dt.incorrect_answers, dt.correct_answer],
            ])
          );
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    getQuestions();
  }, []);

  useEffect(() => {
    console.log("questionsData", questionsData);
  }, [questionsData]);

  useEffect(() => console.log("loading:", loading), [loading]);

  return (
    <div className="quiz">
      {/*error && <h4 style={{ color: "red" }}>{error}</h4>*/}
      {loading && <h4 style={{ color: "green" }}>Loading...</h4>}
      {modal ? (
        <Modal score={score} />
      ) : (
        <QuestionCard
          score={score}
          setScore={setScore}
          setModal={setModal}
          modal={modal}
          questionsData={questionsData[count]}
          count={count}
          questionLength={questionsData.length}
          setCountNext={handleNextCount}
          setCountprev={handlePrevCount}
          answers={answers[count]}
        />
      )}
    </div>
  );
};

export default Quiz;
