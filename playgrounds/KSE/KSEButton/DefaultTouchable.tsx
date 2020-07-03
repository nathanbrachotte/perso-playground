import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLOR } from '../../../constants'
import Animated, {
  interpolate,
  Extrapolate,
  concat,
} from 'react-native-reanimated'
import { mix } from 'react-native-redash'

interface DefaultTouchableProps {
  transformationValue: Animated.Value<0 | 1>
  opacity: Animated.Value<0 | 1>
  onPress: () => void
  isDisabled: boolean
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: COLOR?.K_PINK, // because expo sometimes doesn't load constants 🤷‍♂️
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    position: 'absolute',
    fontSize: 35,
  },
})

const DefaultTouchable = ({
  transformationValue,
  onPress,
  opacity,
  isDisabled,
}: DefaultTouchableProps) => {
  const widthInterpolation = mix(transformationValue, 50, 200)

  const textOpacityInterpolated = interpolate(transformationValue, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  const activityIndicatorOpacityInterpolated = interpolate(
    transformationValue,
    {
      inputRange: [0, 0.5, 0.6, 1],
      outputRange: [1, 0, 0, 0],
      extrapolate: Extrapolate.CLAMP,
    }
  )

  const rotation = interpolate(transformationValue, {
    inputRange: [0, 1],
    outputRange: [90, 0],
    extrapolate: Extrapolate.CLAMP,
  })

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
          transform: [{ rotateZ: concat(rotation, 'deg') }],
        }}
      >
        →
      </Animated.Text>
      <Animated.View
        style={{
          ...styles.text,
          opacity: activityIndicatorOpacityInterpolated,
        }}
      >
        <ActivityIndicator size="small" color={COLOR.AUBERGINE} />
      </Animated.View>
    </AnimatedTouchable>
  )
}

export default DefaultTouchable
