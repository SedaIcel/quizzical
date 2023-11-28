import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import QuizData from "./QuizData";
import Confetti from "react-confetti";
import he from "he";

export default function Quiz() {
  const [triviaData, setTriviaData] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [resetGame, setResetGame] = useState(0);
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [loading, setLoading] = useState(true);

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
  const rawtriviaDataUrl = "https://opentdb.com/api.php?amount=5&type=multiple";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(rawtriviaDataUrl);
        const allData = await data.json();
        const { status } = data;

        if (status === 200) {
          setLoading(false);
          setTriviaData(() => {
            return allData.results.map((item) => {
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
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [resetGame]);

  function holdOption(id, dataId) {
    setTriviaData((oldData) =>
      oldData.map((data) => {
        if (data.id === dataId) {
          return {
            ...data,
            options: data.options.map((option) =>
              option.id === id
                ? { ...option, isHeld: !option.isHeld }
                : { ...option, isHeld: false }
            ),
          };
        } else {
          return data;
        }
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
        questionId={id}
        question={question}
        options={options}
        isCheckAnswers={checkAnswers}
        handleClick={holdOption}
        disabledItem={disable}
        isDisable={isDisableButton}
      />
    );
  });

  function disable(item) {
    document.getElementById(item).disabled = true;
  }

  function handleClick() {
    setCheckAnswers(true);
    setIsDisableButton(true);
  }
  function reset() {
    setResetGame((prev) => prev + 1);
    setCheckAnswers(false);
    setIsDisableButton(false);
  }

  return (
    <div className="quiz">
      {loading ? (
        <p className="loading-state">Loading...</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
