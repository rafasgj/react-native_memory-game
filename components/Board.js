import React, { useState } from 'react'
import { Text, View } from 'react-native'

import Card from './Card'

const styles = {
  board: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "flex-start",
  },
}

function create_double_cards(size) {
  const shuffle = (array) => {
    for (let i = array.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]]= [array[j], array[i]];
    }
  }

  let cards = Array.from({length: size}, (_, index) => index)
  cards = cards.flatMap(c => [c, c])
  shuffle(cards)
  return cards
}

const MemoryGame = (props) => {
  const [score, set_score] = useState(30);

  const sizes = [7, 10, 15]

  const [times, _] = useState([2000, 1000, 750])

  let [remaining, set_remaining] = useState(sizes[props.config.difficulty])

  const [cards, set_cards] = useState([])  
  if (cards.length == 0) {
    set_cards(create_double_cards(sizes[props.config.difficulty]))
  }

  let selected = null

  const cardSelected = (card) => {
    if (selected  == null) {
      selected = card
    } else if (selected.index == card.index) {
      selected.show()
    } else {
      if (card.value == selected.value) {
        console.log("Cards match.")
        let new_score = score + 20
        set_score(new_score)
        selected.lock();
        card.lock();
        let value = remaining - 1
        set_remaining(value)
        console.log("Remaining;", value)
        if (value <= 0) {
          console.log("You win!")
          props.config.gameOver({score: new_score, win: true})
        }
      } else {
        let value = score - 5
        set_score(value)
        let wait = times[props.config.difficulty]
        const timer = setTimeout(
          () => {
            selected.hide();
            card.hide();
            clearTimeout(timer);
          }, wait);
        if (value < 0) {
          console.log("Game Over")
          props.config.gameOver({score: new_score, win: false})
        }
      }
    }
  }

 const glyphs = [
    '🔥',
    '👽',
    '📞',
    '🏠',
    '👑',
    '🐕',
    '🫖',
    '🧸',
    '🎂',
    '🎈',
    '🎉',
    '🎃',
    '🍭',
    '🦇',
    '🦄',
    '🏈',
  ];

  return (
    <>
      <Text key="game_score" style={{fontSize:48, color:"purple",padding:5, textAlign:'center'}}>Score: {score}</Text>
      <Text key="game_hiscore" style={{fontSize:24, color:"teal", padding:5, marginBottom:25, textAlign:'center'}}>High Score: {props.config.highScore}</Text>
      <View key="game_board" style={styles.board}>
        {cards.map((value, index) => (
          <Card
            key = {"card_" + index}
            glyph={glyphs[value]}
            value={value}
            index={index}
            onPress={ (card) => cardSelected(card) }
            />
        ))}
      </View>
    </>
  );
};

export {MemoryGame}
export default MemoryGame
