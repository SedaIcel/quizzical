import PropTypes from "prop-types";

export default function QuizData({
  question,
  options,
  isCheckAnswers,
  handleClick,
}) {
  const allButtons = options.map(({ id, value, isCorrect, isHeld }) => {
    var labelStyles = { backgroundColor: isHeld ? "#D6DBF5" : "#F5F7FB" };
    if (isCheckAnswers) {
      if (isHeld && isCorrect) {
        labelStyles = { backgroundColor: "#94D7A2" };
      } else if (isHeld && isCorrect === false) {
        labelStyles = { backgroundColor: "#F8BCBC" };
      } else if (isCorrect) {
        labelStyles = { backgroundColor: "#94D7A2" };
      }
    }
    return (
      <>
        <input
          type="radio"
          id={id}
          name={question}
          className="radio-input"
          onClick={() => handleClick(id)}
        />
        <label htmlFor={id} className="radio-label" style={labelStyles}>
          {value}
        </label>
      </>
    );
  });

  return (
    <div className="container">
      <h1 className="container-questions">{question}</h1>
      <div className="container-answers">{allButtons}</div>
      <hr />
    </div>
  );
}

QuizData.propTypes = {
  question: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  isCheckAnswers: PropTypes.bool,
  handleClick: PropTypes.func,
};
