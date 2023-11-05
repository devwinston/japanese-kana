import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaKeyboard, FaCheck } from "react-icons/fa";

import data from "../data/kana.json";

const Start = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selected, mode } = location.state;

  const duration = 100;
  const [time, setTime] = useState(duration);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  const [kana, setKana] = useState("");
  const [romaji, setRomaji] = useState("");
  const [answer, setAnswer] = useState("");
  const [index, setIndex] = useState(0);

  let intervalRef = useRef();
  const decreaseTime = () => setTime((prev) => prev - 1);
  const increaseScore = () => setScore((prev) => prev + 1);

  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    } else {
      let scope = {};
      for (let i = 0; i < selected.length; i++) {
        scope = { ...scope, ...data[selected[i]] };
      }
      setKana(Object.keys(scope));
      setRomaji(Object.values(scope));

      document.getElementById("input-answer").focus();

      if (mode === "challenge") {
        intervalRef.current = setInterval(decreaseTime, 1000);

        return () => {
          clearInterval(intervalRef.current);
        };
      }

      if (mode === "practice") {
        document.getElementById("check-container").style.display = "none";
      }
    }
  }, []);

  useEffect(() => {
    if (time < 0) {
      navigate("/summary", { state: { kana, score, count } });
    }
  }, [time]);

  const handleSpace = (e) => {
    if (mode === "challenge") {
      if (e.keyCode === 13) {
        if (answer.trim().toLowerCase() === romaji[index]) {
          increaseScore();
        }

        setCount((prev) => prev + 1);
        setIndex(Math.floor(Math.random() * kana.length));
        setAnswer("");
      }
    }

    if (mode === "practice") {
      if (e.keyCode === 13) {
        var element = document.getElementById("check-container");
        if (element.style.display === "none") {
          element.style.display = "flex";
        } else {
          element.style.display = "none";

          setIndex(Math.floor(Math.random() * kana.length));
          setAnswer("");
        }
      }
    }
  };

  return (
    <div className="center-container">
      <h1 className="kana-header">{kana[index]}</h1>

      {mode === "practice" &&
        (romaji[index] === answer.trim().toLowerCase() ? (
          <div id="check-container">
            <FaCheck className="icon" />
          </div>
        ) : (
          <div id="check-container">{romaji[index]} </div>
        ))}

      {mode === "challenge" ? (
        <div className="row-container">
          <FaKeyboard className="icon-right" />
          Press [Enter ⏎] to submit
        </div>
      ) : (
        <div className="row-container">
          <FaKeyboard className="icon-right" />
          Press [Enter ⏎] to submit and [Enter ⏎] again to proceed
        </div>
      )}

      <div className="row-container">
        <input
          className="input-answer"
          id="input-answer"
          name="input-answer"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleSpace}
          autoComplete="off"
        />
      </div>

      {mode === "challenge" && (
        <div className="row-container">
          <h1 className="time-header">Time: {time} s</h1>
          <h1 className="score-header">Score: {score}</h1>
        </div>
      )}

      <div className="row-container">
        <button className="styled-button" onClick={() => navigate("/")}>
          <FaHome className="icon-right" />
          HOME
          <FaHome className="icon-left" />
        </button>
      </div>
    </div>
  );
};

export default Start;
