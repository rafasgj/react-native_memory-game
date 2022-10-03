import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const styles = {
  card: {
    backgroundColor: '#9AF',
    margin: 5,
    padding: 5,
    borderRadius: 10,
    width: "15%",
    height: 80,
    aspectRatio: 0.75,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 48,
  },
}

const Card = (props) => {
  const [hidden, setHidden] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const lock = () => {
    setHidden(false)
    setDisabled(true)
  }

  const hide = () => setHidden(true)
  const show = () => setHidden(false)

  const toggle = () => setHidden(!hidden)

  return (
    <TouchableOpacity
      key={"touchable_card_" + props.index + "_" + props.value}   
      style={styles.card}
      disabled={disabled}
      onPress={() => {
        toggle();
        props.onPress({
          value: props.value,
          index: props.index,
          toggle: toggle,
          lock: lock,
          hide: hide,
          show: show,
        });
      }}>
      <Text style={styles.cardText}>{hidden ? "🃴" : props.glyph}</Text>
    </TouchableOpacity>
  );
}

export { Card }
export default Card
