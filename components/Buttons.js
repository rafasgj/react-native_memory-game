import React from 'react'
import { Pressable, Text } from 'react-native'


const RoundButton = (props) => {
  const style= {
    buttonStyle: {
      backgroundColor: "purple",
      textAlign: "center",
      padding: 10,
      width: 175,
      marginHorizontal: "auto",
      marginVertical: 5,
      borderRadius: 10,
      alignItems: 'center',
    },
    textStyle: {
      color: "white",
      fontSize: 16,
      marginHorizontal: "auto",
    },
  }

  return (
    <Pressable style={style.buttonStyle} onPress={() => props.onPress(props.data)}>
      <Text style={style.textStyle}>{props.title.toUpperCase()}</Text>
    </Pressable>
  )
}

const BigRedButton = ({onPress, title}) => {
  const styles = {
    quitButton : {
      backgroundColor: "red",
      width: 100,
      height: 50,
      textAlign: 'center',
      componentAlign: "center",
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 150,
      borderRadius: 10,
    },
    quitButtonText : {
      color: "white",
      fontSize: 24,
      fontWeight: "Bolder",
      marginHorizontal: "auto",
    },
  }

  return (
    <Pressable key={"pressable_" + title} style={styles.quitButton} onPress={onPress}>
      <Text key={"plessable_" + title +"_text"} style={styles.quitButtonText}>{title}</Text>
    </Pressable>
  );
}

// Export objects
export {
  BigRedButton,
  RoundButton
}
