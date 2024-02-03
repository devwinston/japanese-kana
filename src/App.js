import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Start from "./pages/Start";
import Summary from "./pages/Summary";

export const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "dark" ? "var(--very-dark-gray)" : "var(--gray)";
    document.body.style.color =
      theme === "dark" ? "var(--almost-white)" : "var(--dark-gray)";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/start" element={<Start />}></Route>
            <Route path="/summary" element={<Summary />}></Route>
          </Routes>
        </Router>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
