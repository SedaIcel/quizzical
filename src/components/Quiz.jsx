import { useState, useEffect } from "react";
// import { nanoid } from "nanoid";

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
    const newData = data.map((item, index) => {
      return {
        key: index,
        id: index,
        question: item.question,
        allAnswers: shuffleArray(
          insertRandomly(item.incorrect_answers, item.correct_answer)
        ),
        correctAnswer: item.correct_answer,
      };
    });
    return newData;
  }

  const newEl = triviaData.map(({ question, allAnswers }) => {
    console.log(question);
    console.log(allAnswers);

    return triviaData ? (
      <div key={question}>
        <h1 className="container-questions">{question}</h1>
        <div className="container-button">
          {allAnswers.map((answer) => (
            <>
              <input
                type="radio"
                id={answer}
                name={question}
                className="radio-label"
              />
              <label htmlFor={answer}>{answer}</label>
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
