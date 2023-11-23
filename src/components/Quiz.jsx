import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Quiz() {
  const [triviaData, setTriviaData] = useState([]);

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
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => setTriviaData(organizeData(data.results)));
  }, []);

  function organizeData(data) {
    const newData = data.map((item) => {
      const incorrectAnswers = item.incorrect_answers.map((answer) => {
        return {
          id: nanoid(),
          value: answer,
          isCorrect: false,
        };
      });
      const correctAnswer = {
        id: nanoid(),
        value: item.correct_answer,
        isCorrect: true,
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
    return newData;
  }

  const newEl = triviaData.map(({ id, question, options }) => {
    return triviaData ? (
      <div key={id}>
        <h1 className="container-questions">{question}</h1>
        <div className="container-button">
          {options.map(({ id, value }) => (
            <>
              <input
                type="radio"
                id={id}
                name={question}
                className="radio-label"
                onClick={null}
              />
              <label htmlFor={id}>{value}</label>
            </>
          ))}
        </div>
        <hr />
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  });

  return <div className="quiz">{newEl}</div>;
}
