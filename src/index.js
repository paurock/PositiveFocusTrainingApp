import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import smile from "./images/smile.jpg";
import sadSmile from "./images/sadSmile.jpg";

import "./styles.css";

function App() {
  const [pressedAlready, setPressedAlready] = useState(false);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [currentScores, setCurrentScores] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [interval, setNewInterval] = useState(1000);
  const [message, setMessage] = useState("");
  const [state, setState] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ]);

  const getShuffledArr = arr => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    setState(newArr);
  };
  const levelUp = () => {
    setCurrentLevel(currentLevel + 1);
    setNewInterval(interval - 100);
  };

  const calculateCurrentLevel = () => {
    if (rightAnswers >= 3) {
      levelUp();
      setRightAnswers(0);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => getShuffledArr(state), interval);
    return () => {
      setPressedAlready(false);
      clearInterval(timer);
    };
  }, [interval, state]);

  const checkItem = e => {
    e.persist();
    if (e.target.className === "smile" && pressedAlready === false) {
      setMessage("Great!!! :)");
      setPressedAlready(true);
      setCurrentScores(Math.ceil(currentScores * (currentLevel + 1) + 10));
      setRightAnswers(rightAnswers + 1);
      calculateCurrentLevel();
    } else if (pressedAlready === false) {
      setMessage("Missed :(");
      setPressedAlready(true);
      setCurrentScores(
        Math.ceil(currentScores - currentScores / (currentLevel + 1))
      );
      calculateCurrentLevel();
    }
  };
  return (
    <div className="App">
      <div className="main-block">
        <section className="info-block">
          <p>
            <span>Current Level:</span> {currentLevel}
          </p>
          <p>
            <span>Money Earned:</span> {currentScores}$
          </p>
        </section>
        <div
          className={message === "Missed :(" ? "hit-title missed" : "hit-title"}
        >
          {message}
        </div>
        <section className="images">
          <ul>
            {state.map(item => (
              <li className="image" key={item}>
                <img
                  onClick={e => checkItem(e)}
                  key={item}
                  className={item == 10 ? "smile" : "sadSmile"}
                  src={item == 10 ? smile : sadSmile}
                  alt="smile"
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
