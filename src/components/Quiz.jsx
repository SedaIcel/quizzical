import React from "react"
import {nanoid} from "nanoid"


export default function Quiz(){
    const [triviaData, setTriviaData] = React.useState([])
    const [selectedData, setSelectedData] = React.useState([])
    const [isSelected, setIsSelected] = React.useState(false)

    


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
            id: nanoid(),
            triviaAnswers : shuffleArray(insertRandomly(item.incorrect_answers,item.correct_answer))
        }
    }) 

    //console.log(newData)


    function handleClick(event) {
        setSelectedData(newData.map(item => {
            return item.question === event.target.name ?
            {
                ...item,
                selectedAnswer : event.target.value
            } :
            {
                ...item,            
                selectedAnswer : ""
            }
        }))        
    }

    console.log(selectedData)
  
    const result = selectedData.filter(item => item.correct_answer === item.selectedAnswer).length
    
    // function checkAnswers() {
    //     const 
    //    selectedData.map(item => {
    //     if(item.selectedAnswer) {

    //     }
    //    })
    // }

    
     
    

    const triviaSet = newData.map (({question, triviaAnswers}) => {        
        return (
            <>                
                <h1 className = "container-questions">{question}</h1>
                <div className = "container-button"
                                        
                    >
                     {triviaAnswers.map(answer =>                      
                     <>                        
                        <input                         
                        name={question}
                        type="radio" 
                        className="radio-input"
                        id={answer}
                        value={answer}
                        onChange={handleClick}                        
                        
                        >
                        </input> 
                        <label htmlFor={answer} className="radio-label">{answer}</label>                    
                     
                     </>
                        )
                    }
                </div>   
                <hr/>                 
            </>
            )
    })

   

    return(
        <div className ="quiz">
            {triviaSet}
            <div>
                
                <p className="quiz-results">You scored {result}/5 correct answers</p>
                
                <button 
                    className="check-answers"
                    onClick={()=> checkAnswers}
                >
                    Check Answers
                </button>

            </div>

        </div>
       
    )
}


