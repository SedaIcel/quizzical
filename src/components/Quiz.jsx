import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import QuizData from "./QuizData";
import Confetti from "react-confetti";
import he from "he";

export default function Quiz() {
  const [triviaData, setTriviaData] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [resetGame, setResetGame] = useState(0);

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
                value: he.decode(answer),
                isCorrect: false,
                isHeld: false,
              };
            });
            const correctAnswer = {
              id: nanoid(),
              value: he.decode(item.correct_answer),
              isCorrect: true,
              isHeld: false,
            };
            const allAnswers = shuffleArray(
              insertRandomly(incorrectAnswers, correctAnswer)
            );
            return {
              id: nanoid(),
              question: he.decode(item.question),
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
      <QuizData
        key={id}
        question={question}
        options={options}
        isCheckAnswers={checkAnswers}
        handleClick={holdOption}
      />
    );
  });

  function handleClick() {
    setCheckAnswers(true);
  }
  function reset() {
    setResetGame((prev) => prev + 1);
    setCheckAnswers(false);
  }

  console.log(result);
  return (
    <div className="quiz">
      {checkAnswers && result === 5 && <Confetti />}
      <div className="quiz-questions">{newEl}</div>

      <div className="quiz-result-button">
        {checkAnswers ? (
          <>
            <p className="quiz-result-description">{`You scored ${result}/5 correct answers`}</p>
            <button className="check-button" onClick={reset}>
              Play again
            </button>
          </>
        ) : (
          <button onClick={handleClick} className="check-button">
            Check answers
          </button>
        )}
      </div>
    </div>
  );
}
