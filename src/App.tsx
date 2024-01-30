
import { polyfill } from "mobile-drag-drop";
import React, { useEffect, useState } from "react";
import { Card, CardInterface } from './Card';
import DropArea from './DropArea';
import { Info } from "./Info";
import list from './assets/nouns.txt';
import useScript from "./hooks/useScript";
import './styles.css';

// optional import of scroll behaviour
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";

export type ArtikelType = 'der' | 'die' | 'das';
const wordList: Array<{word: string, artikel: ArtikelType, translation: string}> = []
let hasInit = false;


function App() {
  const [previousCard, setPreviousCard] = useState('');
  const [currentCard, setCurrentCard] = useState<CardInterface>({word: '', artikel: 'das', translation: '' });
  const [correctCounter, setCorrectCounter] = useState(0)
  const [wrongCounter, setWrongCounter] = useState(0)
  // const [wordList, setWordList] = useState<Array<CardInterface>>([])
  useScript("https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0-rc.2/index.min.js")
// options are optional ;)
polyfill({
  // use this to make use of the scroll behaviour
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});
  function nextCard() {
    console.log(wordList.length);
    const index = Math.floor(Math.random() * (wordList.length - 1));
    console.log("Word list has length" + wordList.length);
    const next = wordList[index];
    if (currentCard.word === '') setPreviousCard("");
    else setPreviousCard(`${currentCard.artikel} ${currentCard.word}: ${currentCard.translation}`);
    setCurrentCard({artikel: next.artikel, word: next.word, translation: next.translation})
  }

  useEffect(() =>  {
    async function loadWordList() {
      const s = await fetch(list).then(list => list.text());
      const arr = s.split('\r\n')
      const newList: Array<{word: string, artikel: ArtikelType, translation: string}> = []
      arr.forEach((line) => {
        const [translation, artikel, word] = line.split(";");
        newList.push({word, artikel: artikel as ArtikelType, translation});
      })
      console.log(newList.length)
      wordList.push(...newList);
    
    }
    if (!hasInit) {
      loadWordList().then(() => nextCard())
      hasInit = true;
    }
    return () => {while (wordList.length > 0) wordList.pop()}
  }, [])

  /**
   * 
   * @param isCorrect 
   */
  function updateCounter(isCorrect: boolean) {
    if (isCorrect) setCorrectCounter(correctCounter + 1);
    else setWrongCounter(wrongCounter + 1);
  }

  
  
  
  return (
    <div className="App">
      {/* <script src="https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0-rc.2/index.min.js"></script> */}
      <div className="row1">
        <DropArea id="der" type="der" nextCard={nextCard} updateCounter={updateCounter}>Der</DropArea>
        <DropArea id="die" type="die" nextCard={nextCard} updateCounter={updateCounter}>Die</DropArea>
      </div>
      <div className="card-container">
        <Card current={currentCard}></Card>
      </div>
      <div className="row2">
        <DropArea id="das" type="das" nextCard={nextCard} updateCounter={updateCounter}>Das</DropArea>
      </div>
      <Info correctCounter={correctCounter} wrongCounter={wrongCounter} lastWord={previousCard}></Info>
    </div>
  );
}


export default App;
