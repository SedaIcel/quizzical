import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import classNames from "classnames";

export default function Quiz() {
  const result = 0;
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleOptionClick = (optionId) => {
    setTriviaQuestions((prevQuestions) =>
      prevQuestions.map((trivia) =>
        trivia.options.some((option) => option.optionID === optionId)
          ? {
              ...trivia,
              options: trivia.options.map((option) => {
                if (option.isSelected) {
                  return { ...option, isSelected: false };
                }

                return option.optionID === optionId
                  ? { ...option, isSelected: !option.isSelected }
                  : option;
              }),
            }
          : trivia
      )
    );
  };

  return (
    <div className="quiz">
      {triviaQuestions.map((trivia) => (
        <div key={nanoid()}>
          <h1 className="container-questions">{trivia?.question}</h1>
          <div className="question-options-container">
            {trivia.options.map(({ option, optionID, isSelected }) => (
              <button
                key={nanoid()}
                onClick={() => handleOptionClick(optionID)}
                className={classNames("QtnOption", {
                  selectedOption: isSelected,
                })}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div>
        <div className="results-container">
          <p className="results">You scored {result}/5 correct answers</p>
          <button className="check-answers">Check Answers</button>
        </div>
      </div>
    </div>
  );
}
