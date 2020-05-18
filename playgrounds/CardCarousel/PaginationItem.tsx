import * as React from 'react'
import { View, Text, Dimensions } from 'react-native'
import Animated, { Value } from 'react-native-reanimated'

const { interpolate, Extrapolate } = Animated

const { width: ww } = Dimensions.get('window')

interface PaginationItemProps {
  scrollY: Value<number>
  index: number
}

const PaginationItem = ({ scrollY, index }: PaginationItemProps) => {
  const thisItemLeftPoint = index * ww
  const thisItemRightPoint = (index + 1) * ww

  const opacity = interpolate(scrollY, {
    inputRange: [thisItemLeftPoint - ww, thisItemLeftPoint, thisItemRightPoint],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  })

  const scale = interpolate(scrollY, {
    inputRange: [thisItemLeftPoint - ww, thisItemLeftPoint, thisItemRightPoint],
    outputRange: [1, 1.3, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <Animated.View
      style={{
        backgroundColor: 'black',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 6,
        opacity,
        transform: [{ scale }],
      }}
    />
  )
}

export default PaginationItem
