import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function Quiz() {
  const result = "00";
  const [triviaQuestions, setTriviaQuestions] = useState([]);

  const rawtriviaData = "https://opentdb.com/api.php?amount=5&type=multiple";
  const fetchData = async () => {
    try {
      const data = await fetch(rawtriviaData);
      const triviaData = await data.json();
      const formattedTriviaData = triviaData.results.map((data) => {
        const formattedOptions = [
          ...data.incorrect_answers,
          data.correct_answer,
        ].map((option) => ({ option, optionID: nanoid(), isSelected: false }));

        return {
          question: data.question,
          correct: data.correct_answer,
          options: formattedOptions,
        };
      });

      setTriviaQuestions(formattedTriviaData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptionClick = (optionId) => {
    setTriviaQuestions();
    console.log(optionId);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="quiz">
        {triviaQuestions.map((trivia) => {
          const { question, options } = trivia;
          return (
            <div key={nanoid()}>
              <h1 className="container-questions">{question}</h1>
              <div className="question-options-container">
                {options.map(({ option, optionID }) => (
                  <button
                    key={nanoid()}
                    className="QtnOption"
                    onClick={() => handleOptionClick(optionID)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        <hr />
        <div>
          <p className="quiz-results">You scored {result}/5 correct answers</p>
          <button className="check-answers" onClick={() => checkAnswers}>
            Check Answers
          </button>
        </div>
      </div>
    </>
  );
}
