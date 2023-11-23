import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Quiz() {
  const [triviaData, setTriviaData] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [resetGame, setResetGame] = useState(0);

  // const [showAnswers, setShowAnswers] = useState(false);

  // function resetGame() {
  //   setStartGame((prev) => prev + 1);
  //   setShowAnswers(false);
  // }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function insertRandomly(array, element) {
    const newArray = [...array];
    const index = Math.floor(Math.random() * (newArray.length + 1));
    newArray.splice(index, 0, element);
    return newArray;
  }

  useEffect(() => {
    let url = "https://opentdb.com/api.php?amount=5&type=multiple";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) =>
        setTriviaData(() => {
          return data.results.map((item) => {
            const incorrectAnswers = item.incorrect_answers.map((answer) => {
              return {
                id: nanoid(),
                value: answer,
                isCorrect: false,
                isHeld: false,
              };
            });
            const correctAnswer = {
              id: nanoid(),
              value: item.correct_answer,
              isCorrect: true,
              isHeld: false,
            };
            const allAnswers = shuffleArray(
              insertRandomly(incorrectAnswers, correctAnswer)
            );
            return {
              id: nanoid(),
              question: item.question,
              options: allAnswers,
            };
          });
        })
      )
      .catch((error) => console.log(error));
  }, [resetGame]);
  function holdOption(id) {
    setTriviaData((oldData) =>
      oldData.map((data) => {
        return {
          ...data,
          options: data.options.map((option) =>
            option.id === id ? { ...option, isHeld: !option.isHeld } : option
          ),
        };
      })
    );
  }
  console.log(triviaData);

  let result = 0;
  if (checkAnswers) {
    triviaData.map(({ options }) => {
      return options.forEach((option) => {
        option.isHeld && option.isCorrect ? result++ : result;
      });
    });
  }

  const newEl = triviaData.map(({ id, question, options }) => {
    return (
      <div key={id}>
        <h1 className="container-questions">{question}</h1>
        <div className="container-button">
          {options.map(({ id, value, isCorrect, isHeld }) => {
            let styles = { backgroundColor: isHeld ? "#D6DBF5" : "#F5F7FB" };
            if (checkAnswers) {
              if (isHeld && isCorrect) {
                styles = { backgroundColor: "#94D7A2" };
              } else if (isHeld && isCorrect === false) {
                styles = { backgroundColor: "#F8BCBC" };
              } else if (isCorrect) {
                styles = { backgroundColor: "#94D7A2" };
              }
            }
            console.log(styles);
            return (
              <>
                <input
                  type="radio"
                  id={id}
                  name={question}
                  className="radio-label"
                  onClick={() => holdOption(id)}
                  style={styles}
                />
                <label htmlFor={id}>{value}</label>
              </>
            );
          })}
        </div>
        <hr />
      </div>
    );
  });

  function handleClick() {
    setCheckAnswers(true);
  }
  function reset() {
    setResetGame((prev) => prev + 1);
    setCheckAnswers(false);
  }

  return (
    <div className="quiz">
      {newEl}
      <div>
        {checkAnswers ? (
          <div>
            <p>{`You scored ${result}/5 correct answers`}</p>
            <button className="quiz-check-button" onClick={reset}>
              Play again
            </button>
          </div>
        ) : (
          <button onClick={handleClick} className="quiz-check-button">
            Check answers
          </button>
        )}
      </div>
    </div>
  );
}
