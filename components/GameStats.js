import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

const styles = {
  statTitle: {
    fontSize: 24,
    color:"purple",
    height:50,
    padding:0,
    marginTop:50,
    textAlign:'center',
  },
  statData: {
    fontSize: 24,
    color: "teal",
    height:30,
    padding: 0,
    margin: 0,
    textAlign:'center'
  },
}

const GameStats = ({stats, displayItems}) => {
  const [level, setLevel] = useState(0)
  useEffect(() => {
    const timer = setTimeout(
      () => setLevel((level + 1) % stats.length),
      2000
    );
    return () => clearTimeout(timer);
  });

  const capitalize = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase()
    // return data.at(0).toUpperCase() + data.slice(1).toLowerCase()
  }

  return (
    <View>
      <Text key="stat_title" style={styles.statTitle}>
         {stats[level].title}
      </Text>
      {
        displayItems.map((word) => (
          <Text key={"item_" + word} style={styles.statData}>
            { capitalize(word) } { stats[level][word] }
          </Text>
        ))
      }
    </View>
  )
}

export default GameStats