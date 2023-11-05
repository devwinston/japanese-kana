import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaEye,
  FaChartPie,
  FaStarHalfAlt,
  FaHome,
} from "react-icons/fa";

const Summary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { kana, score, count } = location.state;

  return (
    <div className="center-container">
      <h1 className="summary-header">Summary</h1>
      <h2>
        <FaStar className="icon-right" />
        Score: {score}
      </h2>

      <h2>
        <FaEye className="icon-right" />
        Accuracy: {score}/{count} (
        {count === 0 ? 0 : Math.round((score / count) * 100)}%)
      </h2>

      <h2>
        <FaChartPie className="icon-right" />
        Coverage: {kana.length}/140 ({Math.round((kana.length / 140) * 100)}%)
      </h2>

      <h1 className="adjusted-score">
        <FaStarHalfAlt className="icon-right" />
        Adjusted Score: {Math.round((kana.length / 140) * score)}
      </h1>

      <div className="row-container">
        <button className="styled-button" onClick={() => navigate("/")}>
          <FaHome className="icon-right" />
          HOME
          <FaHome className="icon-left" />
        </button>
      </div>

      <p className="challenge-tip">
        Tip: The adjusted score is computed by multiplying the coverage with the
        score, so increase the coverage by selecting more kana! Have fun!
      </p>
    </div>
  );
};

export default Summary;
