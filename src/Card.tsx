import React from "react";
import { ArtikelType } from "./App";
export interface CardInterface {
    artikel: ArtikelType,
    word: string,
    translation: string
}
export const Card = ({ current}: {current: CardInterface}) => {
    function handleOnDrag(event: React.DragEvent): void {
        event.dataTransfer.setData("artikel", current.artikel);
    }
    // let item = document.getElementsByClassName('card');
    // Array.from(item).forEach(it => it.addEventListener('dragstart', handleOnDrag))

    return (
        <div className='card' draggable onDragStart={handleOnDrag}>
            {current.word}
            <br/>
            {current.translation}
        </div>
    );
}
