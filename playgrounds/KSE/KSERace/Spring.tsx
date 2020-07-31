import React from 'react'
import Animated, {
  cond,
  neq,
  set,
  useCode,
  block,
} from 'react-native-reanimated'
import { Text, View } from 'react-native'
import { useValue, spring, mix } from 'react-native-redash'

import Racer from './Racer'
import styles from './styles'
import Spacer from './Spacer'
import RaceIndicator from './RaceIndicator'
import {
  AllSpringConfig,
  springConfig,
  WW,
  CAT_SIZE,
  RACE_MARGIN,
} from './constants'

const Spring = ({ isRaceOn }: { isRaceOn: boolean }) => {
  const springValue = useValue<number>(0)
  const springValueLessVelocity = useValue<number>(0)
  const springValueMoreVelocity = useValue<number>(0)
  const springValueLessStiffness = useValue<number>(0)
  const springValueMoreStiffness = useValue<number>(0)
  const springValueLessDamping = useValue<number>(0)
  const springValueMoreDamping = useValue<number>(0)

  const animateSpring = ({
    value,
    to,
    config,
  }: {
    value: Animated.Value<number>
    to: 0 | 1
    config?: AllSpringConfig
  }) => [
    cond(
      neq(value, to),
      set(
        value,
        spring({
          from: value,
          to,
          ...springConfig({ ...config }),
        })
      )
    ),
  ]

  useCode(
    () =>
      isRaceOn
        ? block([
            animateSpring({ value: springValue, to: 1 }),
            animateSpring({
              value: springValueLessVelocity,
              to: 1,
              config: { velocity: 1 },
            }),
            animateSpring({
              value: springValueMoreVelocity,
              to: 1,
              config: { velocity: 20 },
            }),
            animateSpring({
              value: springValueLessStiffness,
              to: 1,
              config: { stiffness: 50 },
            }),
            animateSpring({
              value: springValueMoreStiffness,
              to: 1,
              config: { stiffness: 1000 },
            }),
            animateSpring({
              value: springValueLessDamping,
              to: 1,
              config: { damping: 10 },
            }),
            animateSpring({
              value: springValueMoreDamping,
              to: 1,
              config: { damping: 50 },
            }),
          ])
        : block([
            animateSpring({ value: springValue, to: 0 }),
            animateSpring({
              value: springValueLessVelocity,
              to: 0,
              config: { velocity: 1 },
            }),
            animateSpring({
              value: springValueMoreVelocity,
              to: 0,
              config: { velocity: 20 },
            }),
            animateSpring({
              value: springValueLessStiffness,
              to: 0,
              config: { stiffness: 50 },
            }),
            animateSpring({
              value: springValueMoreStiffness,
              to: 0,
              config: { stiffness: 1000 },
            }),
            animateSpring({
              value: springValueLessDamping,
              to: 0,
              config: { damping: 10 },
            }),
            animateSpring({
              value: springValueMoreDamping,
              to: 0,
              config: { damping: 50 },
            }),
          ]),
    [isRaceOn]
  )

  const translateXSpring = mix(springValue, 0, WW - CAT_SIZE - RACE_MARGIN * 2)
  const translateXSpringLessStiffness = mix(
    springValueLessStiffness,
    0,
    WW - CAT_SIZE - RACE_MARGIN * 2
  )
  const translateXSpringMoreStiffness = mix(
    springValueMoreStiffness,
    0,
    WW - CAT_SIZE - RACE_MARGIN * 2
  )

  const translateXSpringLessVelocity = mix(
    springValueLessVelocity,
    0,
    WW - CAT_SIZE - RACE_MARGIN * 2
  )
  const translateXSpringMoreVelocity = mix(
    springValueMoreVelocity,
    0,
    WW - CAT_SIZE - RACE_MARGIN * 2
  )

  const translateXSpringLessDamping = mix(
    springValueLessDamping,
    0,
    WW - CAT_SIZE - RACE_MARGIN * 2
  )
  const translateXSpringMoreDamping = mix(
    springValueMoreDamping,
    0,
    WW - CAT_SIZE - RACE_MARGIN * 2
  )

  return (
    <>
      <Text style={styles.label}>Spring</Text>
      <View style={styles.raceWrapper}>
        <Racer
          image={require('../../../assets/cat.png')}
          animatedValue={translateXSpring}
          label="Arbitrary default"
        />
        <Spacer />
        <Racer
          image={require('../../../assets/doggo.png')}
          animatedValue={translateXSpringLessVelocity}
          label="Less Velocity"
        />
        <Racer
          image={require('../../../assets/doggo.png')}
          animatedValue={translateXSpringMoreVelocity}
          label="More Velocity"
        />
        <Spacer />
        <Racer
          image={require('../../../assets/doggo.png')}
          animatedValue={translateXSpringLessStiffness}
          label="Less Stiffness"
        />
        <Racer
          image={require('../../../assets/doggo.png')}
          animatedValue={translateXSpringMoreStiffness}
          label="More Stiffness"
        />
        <Spacer />
        <Racer
          image={require('../../../assets/doggo.png')}
          animatedValue={translateXSpringLessDamping}
          label="Less Damping"
        />
        <Racer
          image={require('../../../assets/doggo.png')}
          animatedValue={translateXSpringMoreDamping}
          label="More Damping"
        />
        <Spacer height={20} />
      </View>
      <RaceIndicator />
    </>
  )
}

export default Spring
