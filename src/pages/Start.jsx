import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaKeyboard, FaCheck } from "react-icons/fa";

import { ThemeContext } from "../App.js";

import data from "../data/kana.json";

const Start = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { theme } = useContext(ThemeContext);

  // eslint-disable-next-line
  const { selected, mode } = location.state ?? {
    selected: [],
    mode: "",
  };

  const duration = 60;
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
      const { selected, mode } = location.state;

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
  }, [navigate, location.state]);

  useEffect(() => {
    if (time < 0) {
      navigate("/summary", { state: { kana, score, count } });
    }
    // eslint-disable-next-line
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
    <div className={"center-container " + theme}>
      <h1 className="kana-header">{kana[index]}</h1>

      {mode === "practice" &&
        (romaji[index] === answer.trim().toLowerCase() ? (
          <div id="check-container">
            <FaCheck className="icon" />
          </div>
        ) : (
          <div id="check-container">{romaji[index]}</div>
        ))}

      {mode === "challenge" ? (
        <p className="instruction-text">
          <FaKeyboard /> Press [Enter ⏎] to submit
        </p>
      ) : (
        <p className="instruction-text">
          <FaKeyboard /> Press [Enter ⏎] to submit
          <br />
          and [Enter ⏎] again to proceed
        </p>
      )}

      <div className="row-container">
        <input
          className={"input-answer " + theme}
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
          <h1 className={"time-header " + theme}>Time: {time} s</h1>
          <h1 className={"score-header " + theme}>Score: {score}</h1>
        </div>
      )}

      <div className="row-container">
        <button className="styled-button" onClick={() => navigate("/")}>
          <FaHome className="icon-right" />
          Home
        </button>
      </div>
    </div>
  );
};

export default Start;
