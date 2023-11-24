import PropTypes from "prop-types";

export default function Start({ startGame }) {
  return (
    <div className="start-page">
      <h1 className="title">Quizzical</h1>
      <p className="instructions">
        Test your trivia skills with this fun game!
      </p>
      <button className="start-game" onClick={startGame}>
        Start quiz
      </button>
    </div>
  );
}

Start.propTypes = {
  startGame: PropTypes.func,
};
