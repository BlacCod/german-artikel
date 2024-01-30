
import React, { useEffect, useState } from "react";
import { Card, CardInterface } from './Card';
import DropArea from './DropArea';
import { Info } from "./Info";
import list from './assets/nouns.txt';
import './styles.css';

export type ArtikelType = 'der' | 'die' | 'das';
const wordList: Array<{word: string, artikel: ArtikelType, translation: string}> = []
let hasInit = false;


function App() {
  const [previousCard, setPreviousCard] = useState('');
  const [currentCard, setCurrentCard] = useState<CardInterface>({word: '', artikel: 'das', translation: '' });
  const [correctCounter, setCorrectCounter] = useState(0)
  const [wrongCounter, setWrongCounter] = useState(0)
  // const [wordList, setWordList] = useState<Array<CardInterface>>([])

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
