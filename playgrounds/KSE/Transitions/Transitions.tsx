import React, { useState } from 'react'
import { View, StyleSheet, Text, Dimensions, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLOR } from '../../../constants'
import { useValue, loop, mix } from 'react-native-redash'
import Animated, {
  useCode,
  set,
  Easing,
  debug,
  interpolate,
  concat,
} from 'react-native-reanimated'

const { width: WW, height: WH } = Dimensions.get('window')

const PLAYGROUND_HEIGHT = WH * 0.6
const PLAYGROUND_WIDTH = WW * 0.8

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    borderRadius: 25,
    height: 50,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { textAlign: 'center', color: COLOR.WHITE },
  playground: {
    marginTop: 10,
    width: PLAYGROUND_WIDTH,
    height: PLAYGROUND_HEIGHT,
    backgroundColor: COLOR.K_PINK,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 10.32,
  },
  rectangle: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
})

interface ButtonProps {
  onPress: () => any
  label: string
  isActive: boolean
}

const Button = ({ onPress, label, isActive }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: isActive ? COLOR.SUCCESS : COLOR.FAILURE,
      }}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )
}

const Transitions = () => {
  const [translateX, setTranslateX] = useState<boolean>(false)
  const [translateY, setTranslateY] = useState<boolean>(false)

  const [rotateX, setRotateX] = useState<boolean>(false)
  const [rotateY, setRotateY] = useState<boolean>(false)
  const [rotateZ, setRotateZ] = useState<boolean>(false)

  const [opacity, setOpacity] = useState<boolean>(false)

  const [scaleX, setScaleX] = useState<boolean>(false)
  const [scaleY, setScaleY] = useState<boolean>(false)

  const animatedValue = useValue<0 | 1>(0)
  const DEFAULT_ANIMATED_VALUE = useValue(0.5)

  function toggle(key: React.Dispatch<React.SetStateAction<boolean>>) {
    animatedValue.setValue(0)
    key((v: boolean) => !v)
  }

  useCode(
    () => [
      set(
        animatedValue,
        loop({
          duration: 1000,
          easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
          boomerang: true,
        })
      ),
    ],
    []
  )

  const translateXInterpolated = translateX
    ? mix(animatedValue, -PLAYGROUND_WIDTH / 2, PLAYGROUND_WIDTH / 2)
    : DEFAULT_ANIMATED_VALUE

  const translateYInterpolated = translateY
    ? mix(animatedValue, -PLAYGROUND_HEIGHT / 2, PLAYGROUND_HEIGHT / 2)
    : DEFAULT_ANIMATED_VALUE

  const rotateXInterpolated = rotateX
    ? concat(mix(animatedValue, -180, 180), 'deg')
    : '0deg'

  const rotateYInterpolated = rotateY
    ? concat(mix(animatedValue, -180, 180), 'deg')
    : '0deg'

  const rotateZInterpolated = rotateZ
    ? concat(mix(animatedValue, -180, 180), 'deg')
    : '0deg'

  const scaleXInterpolated = scaleX ? mix(animatedValue, 0, 2) : 1

  const scaleYInterpolated = scaleY ? mix(animatedValue, 0, 2) : 1

  const opacityInterpolated = opacity ? animatedValue : 1

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.playground}>
        <Animated.Image
          source={require('../../../assets/cat.png')}
          style={{
            ...styles.rectangle,
            transform: [
              {
                translateX: translateXInterpolated,
              },
              {
                translateY: translateYInterpolated,
              },
              {
                rotateX: rotateXInterpolated,
              },
              {
                rotateY: rotateYInterpolated,
              },
              {
                rotateZ: rotateZInterpolated,
              },
              {
                scaleX: scaleXInterpolated,
              },
              {
                scaleY: scaleYInterpolated,
              },
            ],
            opacity: opacityInterpolated,
          }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          onPress={() => toggle(setTranslateX)}
          label="TranslateX"
          isActive={translateX}
        />
        <Button
          onPress={() => toggle(setTranslateY)}
          label="TranslateY"
          isActive={translateY}
        />
        <Button
          onPress={() => toggle(setRotateX)}
          label="RotateX"
          isActive={rotateX}
        />
        <Button
          onPress={() => toggle(setRotateY)}
          label="RotateY"
          isActive={rotateY}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          onPress={() => toggle(setRotateZ)}
          label="RotateZ"
          isActive={rotateZ}
        />
        <Button
          onPress={() => toggle(setOpacity)}
          label="Opacity"
          isActive={opacity}
        />
        <Button
          onPress={() => toggle(setScaleX)}
          label="ScaleX"
          isActive={scaleX}
        />
        <Button
          onPress={() => toggle(setScaleY)}
          label="ScaleY"
          isActive={scaleY}
        />
      </View>
    </SafeAreaView>
  )
}

export default Transitions
