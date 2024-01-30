import React from "react"
export const Info = ({correctCounter, wrongCounter, lastWord}: {correctCounter: number, wrongCounter: number, lastWord: string}) => {
    return (
        <>
        <div>Correct: {correctCounter} | Wrong: {wrongCounter} </div>
        <br/>
        <div> Last Word: {lastWord}</div>
        </>
    )
}