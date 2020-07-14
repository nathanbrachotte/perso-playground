import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  Extrapolate,
  concat,
} from 'react-native-reanimated'
import { mix } from 'react-native-redash'

import { COLOR } from '../../../constants'
import { BUTTON_HEIGHT, BUTTON_RADIUS, CROSS_SIZE } from './constants'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

interface ErrorTouchableProps {
  opacity: Animated.Value<0 | 1>
  onPress: () => void
  transformationValue: Animated.Value<0 | 1>
}

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
  },
  button: {
    height: BUTTON_HEIGHT,
    width: BUTTON_HEIGHT,
    borderRadius: BUTTON_RADIUS,
    backgroundColor: COLOR.FAILURE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: CROSS_SIZE,
  },
})

const ErrorTouchable = ({
  onPress,
  opacity,
  transformationValue,
}: ErrorTouchableProps) => {
  const widthInterpolation = mix(
    transformationValue,
    BUTTON_HEIGHT,
    BUTTON_HEIGHT * 4
  )

  const rotation = interpolate(opacity, {
    inputRange: [0, 1],
    outputRange: [-190, 0],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <View style={styles.buttonWrapper} pointerEvents="box-none">
      <AnimatedTouchable
        style={{
          ...styles.button,
          width: widthInterpolation,
          opacity,
        }}
        onPress={onPress}
      >
        <Animated.Text
          style={{
            ...styles.text,
            transform: [{ rotateZ: concat(rotation, 'deg') }],
          }}
        >
          ⨯
        </Animated.Text>
      </AnimatedTouchable>
    </View>
  )
}

export default ErrorTouchable
