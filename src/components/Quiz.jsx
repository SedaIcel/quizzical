import React from "react"


export default function Quiz(){
    const [triviaData, setTriviaData] = React.useState([])
    
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

    React.useEffect(()=> {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setTriviaData(data.results))
    },[])

    const newData = triviaData.map((item)=> {
        return {
            ...item,
            triviaAnswers : shuffleArray(insertRandomly(item.incorrect_answers,item.correct_answer))
        }
    })        

    const newElements = newData.map(item => {
        return (
             <div className ="container">
                <h1 className ="container-questions">{item.question}</h1>
                <button className = "container-answers">{item.triviaAnswers}</button>
                <hr/>
            </div>          
            )
    });

    return(
        <div className ="quiz">
            {newElements}
        </div>
       
    )
}


