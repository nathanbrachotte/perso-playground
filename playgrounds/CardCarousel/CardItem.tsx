import * as React from 'react'
import { View, Dimensions } from 'react-native'
import Animated, {
  Value,
  interpolate,
  concat,
  Extrapolate,
} from 'react-native-reanimated'
import { COLOR } from '../../constants'

const { width: ww } = Dimensions.get('window')

interface CardItemProps {
  scrollY: Value<number>
  index: number
  carouselIndex: number
}

export const CARD_WIDTH = 250

const CardItem = ({ scrollY, index, carouselIndex }: CardItemProps) => {
  const thisItemLeftPoint = index * ww
  const thisItemRightPoint = (index + 1) * ww

  const opacity = interpolate(scrollY, {
    inputRange: [thisItemLeftPoint - ww, thisItemLeftPoint, thisItemRightPoint],
    outputRange: [1, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  })

  const rotateY = interpolate(scrollY, {
    inputRange: [thisItemLeftPoint - ww, thisItemLeftPoint, thisItemRightPoint],
    outputRange: [0, 0, 100],
    extrapolate: Extrapolate.CLAMP,
  })

  const rotateZ = interpolate(scrollY, {
    inputRange: [thisItemLeftPoint - ww, thisItemLeftPoint, thisItemRightPoint],
    outputRange: [0, 0, 180],
    extrapolate: Extrapolate.CLAMP,
  })

  const translateX = interpolate(scrollY, {
    inputRange: [thisItemLeftPoint - ww, thisItemLeftPoint, thisItemRightPoint],
    outputRange: [-160, 0, 0],
    extrapolate: Extrapolate.CLAMP,
  })

  const translateY = interpolate(scrollY, {
    inputRange: [thisItemLeftPoint - ww, thisItemLeftPoint, thisItemRightPoint],
    outputRange: [-10, 0, 0],
    extrapolate: Extrapolate.CLAMP,
  })

  const scale = interpolate(scrollY, {
    inputRange: [thisItemLeftPoint - ww, thisItemLeftPoint, thisItemRightPoint],
    outputRange: [0.8, 1, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  const scale2 = interpolate(scrollY, {
    inputRange: [thisItemLeftPoint - ww, thisItemLeftPoint, thisItemRightPoint],
    outputRange: [0.5, 1, 1.5],
    extrapolate: Extrapolate.CLAMP,
  })

  let animations = {}

  switch (carouselIndex) {
    case 1:
      break
    case 2:
      animations = {
        opacity,
        transform: [
          { perspective: 1000 },
          { translateX },
          { translateY },
          { rotateY: concat(rotateY, 'deg') },
          { scale },
        ],
      }
      break
    case 3:
      animations = {
        opacity,
        transform: [
          { perspective: 1000 },
          { translateX },
          { translateY },
          { scale },
        ],
      }
      break
    case 4:
      animations = {
        // opacity,
        transform: [{ translateX }, { translateY }, { scale }],
      }
      break
    case 5:
      animations = {
        opacity,
        transform: [
          { perspective: 1000 },
          { translateX },
          { translateY },
          { rotateY: concat(rotateY, 'deg') },
          { scale: scale2 },
        ],
      }
      break
    case 6:
      animations = {
        // opacity,
        transform: [
          { perspective: 1000 },
          { translateX },
          { translateY },
          { rotateY: concat(rotateY, 'deg') },
          { scale: scale2 },
        ],
      }
      break

    default:
      break
  }

  return (
    <View
      style={{
        width: ww * 0.7,
        marginLeft: ww * 0.15,
        marginRight: ww * 0.15,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={{
          width: CARD_WIDTH,
          height: CARD_WIDTH * 0.62,
          backgroundColor: COLOR.AUBERGINE,
          borderRadius: CARD_WIDTH / 2,
          // transform: [{ translateY: translateY }],
          // transform: [{ rotateY: concat(rotateY, 'deg'), rotateZ: concat(rotateZ, 'deg') }],
          // TODO: Nathan try this
          ...animations,
        }}
      />
    </View>
  )
}

export default CardItem
