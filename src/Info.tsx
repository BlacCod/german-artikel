import React from "react"
export const Info = ({correctCounter, wrongCounter, lastWord}: {correctCounter: number, wrongCounter: number, lastWord: string}) => {
    return (
        <div>Correct: {correctCounter} | Wrong: {wrongCounter} | Last Word: {lastWord}</div>
    )
}