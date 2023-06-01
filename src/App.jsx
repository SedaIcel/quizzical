import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"

export default function App(){
//two screen, one is start section, the other is quiz section
//default : start 

    const [game, setGame] = React.useState(false)

    function startGame(){
        setGame(true)
    }
    return(
        <main>            
            {game ? <Quiz/> : <Start startGame={startGame}/>}
        </main>

    )
}
