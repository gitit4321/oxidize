import React, {useState} from "react";
import Choice from "./Choice";

const GameOver = (props) => {


    return (
        <>
            <div>
            <p>Evil has prevailed...</p>
            <span><p>Would you like to try again? </p><Choice value={"Play Again"} click={props.restart} /></span>
            </div>
        </>
    )
}

export default GameOver;