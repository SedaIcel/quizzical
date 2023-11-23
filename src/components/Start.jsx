export default function Start(props) {
  return (
    <div className="start-page">
      <h1 className="title">Quizzical</h1>
      <p className="instructions">
        Test your trivia skills with this fun game!
      </p>
      <button className="start-game" onClick={props.startGame}>
        Start quiz
      </button>
    </div>
  );
}
