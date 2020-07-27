import React from 'react'
import { View, StyleSheet } from 'react-native'
import DrawerItem from './DrawerItem'

import { AMOUNT_ITEMS, ITEMS, ANIMATION_DURATION } from './constants'
import { useValue, timing, delay, useClock } from 'react-native-redash'
import {
  useCode,
  block,
  cond,
  eq,
  set,
  debug,
  lessThan,
  greaterThan,
  and,
  or,
  Easing,
} from 'react-native-reanimated'

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})

const KSENotification = () => {
  const animatedIndex = useValue<number>(0)

  const animateTo = (to: number) => [
    set(
      animatedIndex,
      timing({
        from: animatedIndex,
        to,
        easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
        duration: ANIMATION_DURATION,
      })
    ),
  ]

  const delayUpdate = (
    fromValue: number,
    toValue: number,
    duration: number
  ) => [
    cond(
      eq(animatedIndex, fromValue),
      delay(set(animatedIndex, toValue), duration)
    ),
  ]

  const animateItem = (setValue: number, maxValue: number) => [
    cond(
      or(
        eq(animatedIndex, setValue),
        and(
          greaterThan(animatedIndex, setValue),
          lessThan(animatedIndex, maxValue)
        )
      ),
      animateTo(maxValue)
    ),
  ]

  useCode(
    () =>
      block([
        // TODO: abstract delayUpdate and animateItem to be only
        // called when a new instance is added to ITEMS.
        // for the demo it's good enough
        delayUpdate(0, 0.11, 1000),
        animateItem(0.1, 1),
        delayUpdate(1, 1.1, 1000),
        animateItem(1.1, 2),
        delayUpdate(2, 2.1, 1000),
        animateItem(2.1, 3),
        delayUpdate(3, 3.1, 1000),
        animateItem(3.1, 4),
        delayUpdate(4, 4.1, 1000),
        animateItem(4.1, 5),
      ]),
    [animatedIndex]
  )

  return (
    <View style={styles.wrapper}>
      {[...Array(AMOUNT_ITEMS)].map((e, i) => (
        <DrawerItem
          key={i}
          index={i}
          animatedIndex={animatedIndex}
          data={ITEMS[i]}
        />
      ))}
    </View>
  )
}

export default KSENotification
