import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';

import { RoundButton, BigRedButton } from './components/Buttons'
import MemoryGame from './components/Board'
import GameStats from './components/GameStats'

const styles = StyleSheet.create({
  gameView: {
    backgroundColor: "#fef",
    height: "100%",
    componentAlign: "center",
    alignItems: "center",
  },
  endMessage: {
    fontSize:24,
    color:"purple",
    padding: 0,
    marginVertical: 30,
    textAlign:'center',
    textAlignVertical: 'bottom',
    height: 120,
    width: "100%",
  },
  gameTitle: {
    fontSize:24,
    color:"purple",
    padding: 0,
    marginVertical: 10,
    textAlign:'center',
  },
})


const StartScreen = ({welcomeMessage, stats, startGame}) => {
  return (
    <View key="gameview" style={styles.gameView}>
      <Text key="gametitle" style={styles.gameTitle}>Memory Game</Text>
      <Text key="endMessage" style={styles.endMessage}>{welcomeMessage? welcomeMessage : "\n"}</Text>
      {stats.map(
        (stat, index) => (
          <RoundButton 
            title={stat.title}StartScreen
            data={{level: index}}
            onPress={startGame}
            key={stat.title + index}
          />
        )
      )}
      <GameStats key="game_stats" stats={stats} displayItems={["highScore", "games", "wins"]} />
    </View>
  )
}

export default function App() {
  const [last, set_last] = useState("Choose your level")

  const [playing, setPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  
  const gameStart = ({level}) => {
    console.log("GAME START", level)
    setDifficulty(level);
    setPlaying(true)
  };

  const [stats, setStats] = useState(
    ["Easy", "Medium", "Hard"].map((item) => ({
      title: item,
      highScore: 0,
      games: 0,
      wins: 0,
    }))
  )

  const gameOver = ({score, win}) => {
    console.log("Game over:", score, win)
    let newhighscore = false
    let statistics = stats
    let stat = statistics[difficulty]
    stat.games += 1
    if (score > stat.highScore) {
      stat.highScore = score
      newhighscore = true
    }
    if (win) {
      console.log("Finish: win", newhighscore)
      stat.wins += 1
      set_last("Conglatulations! You won!" + (newhighscore ? "\nNew High Score!" : "\n"))
    } else {
      console.log("Finish: loose")
      set_last("Game Over!\nTry again!")
    }
    statistics[difficulty] = stat
    setStats(statistics)
    setPlaying(false);
  }

  return (
    <SafeAreaView key="main_win" style={styles.gameView}>
    {
    !playing ? (
      <StartScreen
        welcomeMessage={last}
        stats={stats}
        startGame={gameStart}
        key="StartScreen"
      />
    ) : (
      <>
        <MemoryGame
          config={{
            difficulty: difficulty,
            gameOver: gameOver,
          }}
          key="MemoryGame"
          />
        <BigRedButton key="Quit" title="Quit" onPress={() => {setPlaying(false)}} />
      </>
    )
    }
    </SafeAreaView>
  )
}