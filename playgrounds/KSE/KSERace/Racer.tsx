import React from 'react'
import Animated from 'react-native-reanimated'
import { Text, Image, ImageProps, StyleSheet } from 'react-native'
import { CAT_SIZE } from './constants'

interface Props {
  image: ImageProps
  animatedValue: Animated.Node<number>
  label?: string
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 40,
  },
  image: {
    height: CAT_SIZE,
    width: CAT_SIZE,
    resizeMode: 'center',
  },
  label: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 11,
  },
})

const Racer = ({ image, animatedValue, label }: Props) => {
  return (
    <Animated.View
      style={{
        transform: [
          {
            translateX: animatedValue,
          },
        ],
        width: CAT_SIZE,
      }}
    >
      <Image
        source={image}
        style={{
          ...styles.image,
        }}
      />
      <Text style={styles.label}>{label}</Text>
    </Animated.View>
  )
}

export default Racer
