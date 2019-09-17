import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [state, setState] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const getShuffledArr = arr => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    setState(newArr);
  };
  return (
    <div className="App">
      <button onClick={() => getShuffledArr(state)}>Randomize!</button>
      {state.map(item => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
