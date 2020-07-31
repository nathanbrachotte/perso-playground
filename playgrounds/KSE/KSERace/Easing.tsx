import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Animated, {
  cond,
  neq,
  set,
  useCode,
  block,
  Easing,
} from 'react-native-reanimated'
import { useValue, mix, timing } from 'react-native-redash'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Racer from './Racer'
import styles from './styles'
import Spacer from './Spacer'
import RaceIndicator from './RaceIndicator'

import { WW, CAT_SIZE, RACE_MARGIN } from './constants'

const EasingComp = ({ isRaceOn }: { isRaceOn: boolean }) => {
  const [time, setTime] = useState(1000)

  const defaultValue = useValue<number>(0)
  const bezierValue = useValue<number>(0)
  const inValue = useValue<number>(0)
  const outValue = useValue<number>(0)
  const inOutValue = useValue<number>(0)

  const animateEasing = ({
    value,
    to,
    easing,
  }: {
    value: Animated.Value<number>
    to: 0 | 1
    easing?: Animated.EasingFunction
  }) => [
    set(
      value,
      timing({
        from: value,
        to,
        duration: time,
        ...(easing && { easing }),
      })
    ),
  ]

  useCode(
    () =>
      isRaceOn
        ? block([
            animateEasing({ value: defaultValue, to: 1 }),
            animateEasing({
              value: bezierValue,
              to: 1,
              easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
            }),
            animateEasing({
              value: inValue,
              to: 1,
              easing: Easing.in(Easing.ease),
            }),
            animateEasing({
              value: outValue,
              to: 1,
              easing: Easing.out(Easing.ease),
            }),
            animateEasing({
              value: inOutValue,
              to: 1,
              easing: Easing.inOut(Easing.ease),
            }),
          ])
        : block([
            animateEasing({ value: defaultValue, to: 0 }),
            animateEasing({
              value: bezierValue,
              to: 0,
              easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
            }),
            animateEasing({
              value: inValue,
              to: 0,
              easing: Easing.in(Easing.ease),
            }),
            animateEasing({
              value: outValue,
              to: 0,
              easing: Easing.out(Easing.ease),
            }),
            animateEasing({
              value: inOutValue,
              to: 0,
              easing: Easing.inOut(Easing.ease),
            }),
          ]),
    [isRaceOn]
  )

  const translateXDefault = mix(
    defaultValue,
    0,
    WW - CAT_SIZE - RACE_MARGIN * 2
  )
  const translateXUpdatableBezier = mix(
    bezierValue,
    0,
    WW - CAT_SIZE - RACE_MARGIN * 2
  )
  const translateXUpdatableEaseIn = mix(
    inValue,
    0,
    WW - CAT_SIZE - RACE_MARGIN * 2
  )
  const translateXUpdatableEaseOut = mix(
    outValue,
    0,
    WW - CAT_SIZE - RACE_MARGIN * 2
  )
  const translateXUpdatableEaseInOut = mix(
    inOutValue,
    0,
    WW - CAT_SIZE - RACE_MARGIN * 2
  )

  return (
    <>
      <View style={styles.buttonWrapper}>
        <Text style={styles.label}>Easing</Text>
        <View style={styles.counterWrapper}>
          <Text style={styles.timeText}>{time}ms</Text>
          <View>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => setTime((time) => time + 250)}
            >
              <Text style={styles.text}>⬆️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => setTime((time) => time - 250)}
            >
              <Text style={styles.text}>⬇️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.raceWrapper}>
        <Racer
          image={require('../../../assets/cat.png')}
          animatedValue={translateXDefault}
          label="Linear"
        />
        <Spacer />
        <Racer
          image={require('../../../assets/doggo.png')}
          animatedValue={translateXUpdatableBezier}
          label="Bezier"
        />
        <Spacer />
        <Racer
          image={require('../../../assets/doggo.png')}
          animatedValue={translateXUpdatableEaseIn}
          label="Ease-in"
        />
        <Spacer />
        <Racer
          image={require('../../../assets/doggo.png')}
          animatedValue={translateXUpdatableEaseOut}
          label="Ease-out"
        />
        <Spacer />
        <Racer
          image={require('../../../assets/doggo.png')}
          animatedValue={translateXUpdatableEaseInOut}
          label="Ease-in & out"
        />

        <Spacer height={20} />
      </View>
      <RaceIndicator />
    </>
  )
}

export default EasingComp
