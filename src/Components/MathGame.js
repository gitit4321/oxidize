import React, {useEffect, useState, useRef} from "react";
import Choice from "./Choice";
import Countdown from "./Countdown"

const MathGame = (props) => {

    const [sequence, setSequence] = useState([]);
    const [sum, setSum] = useState(0)
    const [multipleChoice, setMultipleChoice] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [gameLost, setGameLost] = useState(false);
    const [userAnswer, setUserAnswer] = useState();

    useEffect(() => {
        calculateSum();
    }, [sequence]);

    useEffect(() => {
        createRandomAnswers();
    }, [sum]);

    const createRandomAnswers = () => {
        // create set of multiple choice answers (all unique) starting with correct answer
        const multipleChoiceSet = new Set();
        multipleChoiceSet.add(sum);

        // continue looping until we have 3 unique answers, including correct answer
        while (multipleChoiceSet.size < 3) {
            const newRandomNumber = Math.floor(Math.random() * ((sum + 5) - (sum - 5)) + (sum - 5));
            multipleChoiceSet.add(newRandomNumber);
        }

        // convert set to an array and update multiple choice array
        let multipleChoiceArray = [...multipleChoiceSet];
        let randomizedChoices = randomizeArrayOrder(multipleChoiceArray);
        setMultipleChoice(randomizedChoices);
    }

    const randomizeArrayOrder = (arr) => {
        let currentIndex = arr.length, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [arr[currentIndex], arr[randomIndex]] = [
                arr[randomIndex], arr[currentIndex]];
        }
        return arr;
    }


    const calculateSum = () => {
        // calculates sum of current number sequence and updates sum state
        let total = 0;
        for (var i in sequence) {
            total += sequence[i];
        }
        setSum(total);
    }

    const createGame = () => {
        createSequence();        
    }

    const createSequence = () => {
        // creates new sequence of random numbers between 1 and 9 and updates state
        let newSequence = []
        for (let i = 0; i < 6; i++) {
            newSequence.push(Math.floor(Math.random() * 9) + 1);
        }
        setSequence(newSequence);

    }

    const checkAnswer = (event) => {
        console.log(event.target.value);
        if (event.target.value == sum) {
            setGameWon(true);
        } else {
            props.handleFailure();
            setGameLost(true);
        }
    }

    const startGame = () => {
        createGame();
        setGameStarted(true);
    }

    if(gameWon){
        return (
            <>
                <div>
                <p>Congratulations, you've won this round...</p>
                <Choice value="Continue" click={props.counter}/>
                </div>
                {/* 
                !!!!!!!!!!!!!!!!!!!!!!

                We need to add a callback to continue to next scenario here
                
                !!!!!!!!!!!!!!!!!!!!!!
                */}
            </>
        );
    }

    const restartGame = () => {
        setGameWon(false);
        setGameLost(false);
        startGame();
    }

    if(gameLost){
        return (
            <div>
            <p>Abandon all hope, or try again?</p>
            <Choice value="Try Again" click={restartGame}/>
            </div>
        );
    }

    if (gameStarted) {
        return (
            <>
                <div>
                    <p>What is the sum of all the digits?</p>
                    <Countdown handleFailure={props.handleFailure} lostGame={setGameLost}/>
                    <h2>{sequence}</h2>
                    <div className="choice-container">
                        <Choice value={multipleChoice[0]} click={checkAnswer}/>
                        <Choice value={multipleChoice[1]} click={checkAnswer}/>
                        <Choice value={multipleChoice[2]} click={checkAnswer}/>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                <p>Prepare to add the numbers. You must answer within the alloted time... or else...</p>
                <div>
                    <button className='choice-btn' onClick={startGame}>Begin</button>
                </div>
                </div>
            </>
        );
    }
}

export default MathGame;