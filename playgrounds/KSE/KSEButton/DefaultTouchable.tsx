import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated'
import { mix } from 'react-native-redash'

import { COLOR } from '../../../constants'
import { BUTTON_HEIGHT, BUTTON_RADIUS, TEXT_SIZE } from './constants'

interface DefaultTouchableProps {
  transformationValue: Animated.Value<0 | 1>
  opacity: Animated.Value<0 | 1>
  onPress: () => void
  isDisabled: boolean
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

const styles = StyleSheet.create({
  button: {
    height: BUTTON_HEIGHT,
    backgroundColor: COLOR?.K_PINK, // because expo sometimes doesn't load constants 🤷‍♂️
    borderRadius: BUTTON_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    position: 'absolute',
    fontSize: TEXT_SIZE,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2,
    paddingLeft: 2,
  },
})

const DefaultTouchable = ({
  transformationValue,
  onPress,
  opacity,
  isDisabled,
}: DefaultTouchableProps) => {
  const widthInterpolation = mix(
    transformationValue,
    BUTTON_HEIGHT,
    BUTTON_HEIGHT * 4
  )

  const textOpacityInterpolated = interpolate(transformationValue, {
    inputRange: [0, 0.1, 0.7, 1],
    outputRange: [0, 0, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  const activityIndicatorOpacityInterpolated = interpolate(
    transformationValue,
    {
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 0],
      extrapolate: Extrapolate.CLAMP,
    }
  )

  return (
    <AnimatedTouchable
      style={{
        ...styles.button,
        width: widthInterpolation,
        opacity,
      }}
      disabled={isDisabled}
      onPress={onPress}
    >
      <Animated.Text
        style={{
          ...styles.text,
          opacity: textOpacityInterpolated,
        }}
      >
        do something
      </Animated.Text>
      <Animated.View
        style={{
          ...styles.loading,
          opacity: activityIndicatorOpacityInterpolated,
        }}
      >
        <ActivityIndicator size="large" color={COLOR.AUBERGINE} />
      </Animated.View>
    </AnimatedTouchable>
  )
}

export default DefaultTouchable
