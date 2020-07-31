import React, { useState } from 'react'
import { View, StyleSheet, Text, Dimensions, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLOR } from '../../../constants'
import { useValue, loop, mix, spring } from 'react-native-redash'
import Animated, { useCode, set, Easing, concat } from 'react-native-reanimated'

const { width: WW, height: WH } = Dimensions.get('window')

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

const PLAYGROUND_HEIGHT = WH * 0.6
const PLAYGROUND_WIDTH = WW * 0.8
const IMAGE_SIZE = 100

export const springConfig = () => ({
  velocity: 4,
  config: {
    damping: 15,
    mass: 1,
    stiffness: 200,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  },
})

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  // gotta love flexin'
  flexer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  buttonSectionWrapper: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  buttonWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    height: 50,
    width: '95%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    borderRadius: 25,
    height: 50,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { textAlign: 'center', color: COLOR.WHITE },
  playground: {
    width: PLAYGROUND_WIDTH,
    height: PLAYGROUND_HEIGHT,
    borderWidth: 2,
    borderColor: COLOR.AUBERGINE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLOR.AUBERGINE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  rectangle: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 25,
  },
})

interface ButtonProps {
  onPress: () => any
  label: string
  isActive: boolean
}

const Button = ({ onPress, label, isActive }: ButtonProps) => {
  const scale = useValue(0.5)

  useCode(
    () =>
      isActive
        ? [
            set(
              scale,
              spring({
                from: scale,
                to: 1,
                ...springConfig(),
              })
            ),
          ]
        : [
            set(
              scale,
              spring({
                from: scale,
                to: 0.5,
                ...springConfig(),
              })
            ),
          ],
    [isActive]
  )

  return (
    <View style={styles.flexer}>
      <AnimatedTouchable
        onPress={onPress}
        style={{
          ...styles.button,
          backgroundColor: isActive ? COLOR.SUCCESS : COLOR.FAILURE,
          width: 90,
          height: 50,
          transform: [
            {
              scaleX: scale,
            },
            {
              scaleY: scale,
            },
          ],
        }}
      >
        <Text style={{ ...styles.buttonText, fontSize: 15 }}>{label}</Text>
      </AnimatedTouchable>
    </View>
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
    ? mix(
        animatedValue,
        -PLAYGROUND_WIDTH / 2 + IMAGE_SIZE / 2,
        PLAYGROUND_WIDTH / 2 - IMAGE_SIZE / 2
      )
    : DEFAULT_ANIMATED_VALUE

  const translateYInterpolated = translateY
    ? mix(
        animatedValue,
        -PLAYGROUND_HEIGHT / 2 + IMAGE_SIZE / 2,
        PLAYGROUND_HEIGHT / 2 - IMAGE_SIZE / 2
      )
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
      <View style={styles.flexer}>
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
      </View>
      <View style={styles.buttonSectionWrapper}>
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
      </View>
    </SafeAreaView>
  )
}

export default Transitions
