import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaEye,
  FaChartPie,
  FaStarHalfAlt,
  FaHome,
  FaShareAltSquare,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "react-modal";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "hsla(248, 10%, 15%, 0.9)",
  },
  content: {
    position: "absolute",
    top: "300px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "60%",
    maxWidth: "500px",
    minWidth: "300px",
    border: "1px solid hsl(251, 9%, 53%)",
    background: "hsl(248, 10%, 15%)",
    padding: "20px",
  },
};

const Summary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { kana, score, count } = location.state ?? {
    kana: [],
    score: 0,
    count: 0,
  };

  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    }
  }, [navigate, location.state]);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "scores"), {
        name: name.toUpperCase(),
        score,
        timestamp: serverTimestamp(),
      });
      toast.success("Score submitted!");
      navigate("/");
    } catch (error) {
      toast.error("Unable to submit score.");
    }
  };

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
        Coverage: {kana.length}/142 ({Math.round((kana.length / 142) * 100)}%)
      </h2>

      <h1 className="adjusted-score">
        <FaStarHalfAlt className="icon-right" />
        Adjusted Score: {Math.round((kana.length / 142) * score)}
      </h1>

      <div className="row-container">
        <button className="styled-button" onClick={() => navigate("/")}>
          <FaHome className="icon-right" />
          Home
        </button>
        <button className="styled-button score-button" onClick={openModal}>
          <FaShareAltSquare className="icon-right" />
          Share
        </button>
      </div>

      <Modal
        className="score-modal"
        isOpen={modal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <p className="name-header">Enter Name</p>
        <form className="name-form" onSubmit={handleSubmit}>
          <div className="name-container">
            <input
              className="name-input"
              id="name-input"
              name="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={3}
              autoComplete="off"
              required
            />
          </div>
          <button className="styled-button name-button" type="submit">
            Submit ⏎
          </button>
        </form>
      </Modal>

      <p className="challenge-tip">
        Tip: The adjusted score is computed by multiplying the coverage with the
        score, so increase the coverage by selecting more kana! Have fun!
      </p>
    </div>
  );
};

export default Summary;
