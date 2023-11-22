import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import blobs1 from "./assets/blobs1.png";
import blobs2 from "./assets/blobs2.png";

export default function App() {
  //two screen, one is start section, the other is quiz section
  //default : start

  const [game, setGame] = React.useState(false);

  function startGame() {
    setGame(true);
  }

  return (
    <div className="app">
      <img src={blobs1} className="appImgLeft" />
      <img src={blobs2} className="appImgRight" />
      {game ? <Quiz /> : <Start startGame={startGame} />}
    </div>
  );
}
