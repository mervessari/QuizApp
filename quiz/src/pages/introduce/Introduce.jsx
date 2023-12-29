import React from "react";
import "./Introduce.css";
import Dropdown from "../../components/dropdown/Dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Introduce = () => {
  const difficulty = ["easy", "medium", "hard"];
  const [difficultyChange, setDifficultyChange] = useState("");
  const navigate = useNavigate();
  const TOTAL_QUESTIONS = 10;

  console.log(difficultyChange, "difficultyChange");

  const startQuiz = () => {
    if (difficultyChange) {
      navigate(`/quiz/${difficultyChange}/${TOTAL_QUESTIONS}`);
    }
  };

  return (
    <div className="introduce">
      <div className="introduce-container">
        <img
          src="https://media.istockphoto.com/id/1346235765/vector/comic-speech-bubbles-with-text-quiz-neon-icon-vintage-cartoon-illustration-symbol-sticker.jpg?s=612x612&w=0&k=20&c=xA79hbHPU1DGyR3YrILh2Q_b_-JJnxHaDNNpPM3Tbhc="
          alt=""
        />
        <Dropdown data={difficulty} setDifficultyChange={setDifficultyChange} />
        <div onClick={startQuiz} className="introduce-btn">
          Quize Başla
        </div>
      </div>
    </div>
  );
};

export default Introduce;
