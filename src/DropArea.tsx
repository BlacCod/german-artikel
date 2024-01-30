import React from "react";
// import './styles.css';
import { ArtikelType } from "./App";


export const DropArea = ({id, type, nextCard, updateCounter, children}: {id: string, type: ArtikelType, nextCard: Function, updateCounter: Function, children: any}) => {
    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
        if (e.target instanceof HTMLElement) {
            let elem = document.getElementById(e.target.id)!;
            elem.style.background = "gray";
            elem.style.transition = "none";
        }
       
    }

    function handleDragLeave(e: React.DragEvent) {
        // e.preventDefault();
        if (e.target instanceof HTMLElement) {
            let elem = document.getElementById(e.target.id)!
            elem.style.background = "white"
        }
    }
    
    function handleDrop(e: React.DragEvent) {
        // e.preventDefault();
        const artikel = e.dataTransfer.getData("artikel") as ArtikelType;
        console.log("Artikel:" + artikel)
        if (e.target instanceof HTMLElement) {
            let elem = document.getElementById(e.target.id)!
            elem.style.transition = "background 1s cubic-bezier(0.22, 0.61, 0.36, 1)"
            if (type === artikel) {
                elem.style.background = "green";
                setTimeout(() => {
                    elem.style.background = "white"
                }, 900)
                updateCounter(true);
            }
            else {
                elem.style.background = "red";
                setTimeout(() => {
                    elem.style.background = "white"
                }, 900)
                updateCounter(false);
            }
        }
        nextCard();
        // Array.from(dropAreas).forEach((area) => {
        //     area.removeEventListener('dragover', handleDragOver)
        //     area.removeEventListener('dragleave', handleDragLeave)
        //     area.removeEventListener('drop', handleDrop)
        // })
    }

    // let dropAreas = document.getElementsByClassName('drop-area');
    // Array.from(dropAreas).forEach((area) => {
    //     area.addEventListener('dragenter', (e) => e.preventDefault())
    // })

    return (
        <div className="drop-area" id={id} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e)} >
            {children}
        </div>
    );
}

export default DropArea;