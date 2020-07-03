import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLOR } from '../../../constants'
import Animated, {
  sub,
  interpolate,
  Extrapolate,
  concat,
} from 'react-native-reanimated'
import { mix } from 'react-native-redash'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

interface SuccessTouchableProps {
  opacity: Animated.Value<0 | 1>
  onPress: () => void
  transformationValue: Animated.Value<0 | 1>
}

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLOR.SUCCESS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 25,
  },
})

const SuccessButton = ({
  onPress,
  opacity,
  transformationValue,
}: SuccessTouchableProps) => {
  const widthInterpolation = mix(transformationValue, 50, 200)
  const rotation = interpolate(opacity, {
    inputRange: [0, 1],
    outputRange: [-90, 0],
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
          ✔
        </Animated.Text>
      </AnimatedTouchable>
    </View>
  )
}

export default SuccessButton
