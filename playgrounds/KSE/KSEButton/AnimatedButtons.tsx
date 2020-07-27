import React from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, { debug, cond, Easing } from 'react-native-reanimated'
import { timing, useValue } from 'react-native-redash'

import { COLOR } from '../../../constants'
import { STATUS } from './constants'
import DefaultTouchable from './DefaultTouchable'
import SuccessTouchable from './SuccessTouchable'
import ErrorTouchable from './ErrorTouchable'

const { useCode, block, eq, set } = Animated

export interface AnimatedButtonsProps {
  status: Animated.Value<STATUS>
  onPressDefault: () => void
  onPressSuccess: () => void
  isDisabled: boolean
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    backgroundColor: COLOR?.K_PINK, // because expo sometimes doesn't load constants 🤷‍♂️
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
  },
})

const AnimatedButtons = ({
  status,
  onPressDefault,
  onPressSuccess,
  isDisabled,
}: AnimatedButtonsProps) => {
  const pinkButton = useValue<0 | 1>(1)
  const pinkButtonOpacity = useValue<0 | 1>(1)
  const greenButtonOpacity = useValue<0 | 1>(0)
  const redButtonOpacity = useValue<0 | 1>(0)

  const animatePink = (to: 0 | 1) => [
    set(
      pinkButton,
      timing({
        from: pinkButton,
        to,
        easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
      })
    ),
  ]

  const animatePinkButtonOpacity = (to: 0 | 1) => [
    set(
      pinkButtonOpacity,
      timing({
        from: pinkButtonOpacity,
        to,
        easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
      })
    ),
  ]

  const animateGreenButtonOpacity = (to: 0 | 1) => [
    set(
      greenButtonOpacity,
      timing({
        from: greenButtonOpacity,
        to,
        easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
      })
    ),
  ]

  const animateRedButtonOpacity = (to: 0 | 1) => [
    set(
      redButtonOpacity,
      timing({
        from: redButtonOpacity,
        to,
        easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
      })
    ),
  ]

  const animateToDefault = block([
    debug('Default', pinkButton),
    [
      animatePink(1),
      animatePinkButtonOpacity(1),
      animateGreenButtonOpacity(0),
      animateRedButtonOpacity(0),
    ],
  ])

  const animateToFetching = block([
    debug('Fetching', pinkButton),
    [animatePink(0)],
  ])

  const animateToSuccess = block([
    debug('Success', pinkButton),
    [animatePinkButtonOpacity(0), animateGreenButtonOpacity(1)],
  ])

  const animateToFailure = block([
    debug('Default', pinkButton),
    [animatePinkButtonOpacity(0), animateRedButtonOpacity(1)],
  ])

  useCode(
    () => [
      cond(eq(status, STATUS.DEFAULT), animateToDefault),
      cond(eq(status, STATUS.FETCHING), animateToFetching),
      cond(eq(status, STATUS.SUCCESS), animateToSuccess),
      cond(eq(status, STATUS.FAILURE), animateToFailure),
    ],
    [status]
  )

  return (
    <View style={styles.wrapper}>
      <DefaultTouchable
        isDisabled={isDisabled}
        onPress={onPressDefault}
        transformationValue={pinkButton}
        opacity={pinkButtonOpacity}
      />
      <SuccessTouchable
        onPress={onPressSuccess}
        opacity={greenButtonOpacity}
        transformationValue={pinkButton}
      />
      <ErrorTouchable
        onPress={onPressSuccess}
        opacity={redButtonOpacity}
        transformationValue={pinkButton}
      />
    </View>
  )
}

export default AnimatedButtons
