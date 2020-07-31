import React, { useState } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import Animated, {
  useCode,
  set,
  Easing,
  neq,
  cond,
} from 'react-native-reanimated'
import { useValue, mix, timing, spring } from 'react-native-redash'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLOR } from '../../../constants'

const { width: WW } = Dimensions.get('window')

const CAT_SIZE = 60

export const springConfig = ({
  stiffness = 200,
  damping = 15,
  mass = 1,
}: {
  stiffness?: number
  damping?: number
  mass?: number
}) => ({
  velocity: 4,
  config: {
    damping,
    mass,
    stiffness,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  },
})

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 40,
  },
  cat: {
    height: CAT_SIZE,
    width: CAT_SIZE,
    resizeMode: 'center',
  },
  button: {
    alignSelf: 'center',
    marginTop: 50,
    backgroundColor: COLOR.AUBERGINE,
    borderRadius: 25,
    height: 50,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: COLOR.WHITE },
  buttonWrapper: {
    marginRight: 30,
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowButton: { marginLeft: 10 },
  label: {
    marginLeft: 20,
    fontSize: 24,
    color: COLOR.AUBERGINE,
  },
  timeText: {
    fontSize: 24,
    color: COLOR.AUBERGINE,
  },
  counterWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  raceWrapper: {
    marginTop: 10,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: COLOR.K_PINK,
    backgroundColor: COLOR.K_PINK,
    borderRadius: 25,
  },
  raceIndicatorsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  raceIndicator: {
    fontSize: 25,
    color: COLOR.AUBERGINE,
  },
})

const Spacer = ({ height = 50 }: { height?: number }) => {
  return <View style={{ height }} />
}

const RaceIndicator = () => {
  return (
    <View style={styles.raceIndicatorsWrapper}>
      <Text style={styles.raceIndicator}>0</Text>
      <Text style={styles.raceIndicator}>1</Text>
    </View>
  )
}

const Notification = () => {
  const [isRaceOn, setIsRaceOn] = useState(false)
  const [time, setTime] = useState(1000)

  const defaultValue = useValue<number>(0)
  const updatableValue = useValue<number>(0)
  const springValue = useValue<number>(0)

  const translateXDefault = mix(defaultValue, 0, WW - CAT_SIZE - 40)
  const translateXUpdatable = mix(updatableValue, 0, WW - CAT_SIZE - 40)
  const translateXSpring = mix(springValue, 0, WW - CAT_SIZE - 40)

  useCode(
    () =>
      isRaceOn
        ? [
            set(
              defaultValue,
              timing({
                from: updatableValue,
                to: 1,
                duration: time,
                easing: Easing.linear,
              })
            ),
            set(
              updatableValue,
              timing({
                from: updatableValue,
                to: 1,
                easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
                duration: time,
              })
            ),
            cond(
              neq(springValue, 1),
              set(
                springValue,
                spring({
                  from: springValue,
                  to: 1,
                  ...springConfig({}),
                })
              )
            ),
          ]
        : [
            set(
              defaultValue,
              timing({
                from: defaultValue,
                to: 0,
                duration: time,
              })
            ),
            set(
              updatableValue,
              timing({
                from: updatableValue,
                easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
                to: 0,
                duration: time,
              })
            ),
            cond(
              neq(springValue, 0),
              set(
                springValue,
                spring({
                  from: springValue,
                  to: 0,
                  ...springConfig({}),
                })
              )
            ),
          ],
    [isRaceOn]
  )

  return (
    <View style={styles.wrapper}>
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
        <Animated.Image
          source={require('../../../assets/cat.png')}
          style={{
            ...styles.cat,
            transform: [
              {
                translateX: translateXDefault,
              },
            ],
          }}
        />
        <Animated.Image
          source={require('../../../assets/doggo.png')}
          style={{
            ...styles.cat,
            transform: [
              {
                translateX: translateXUpdatable,
              },
            ],
          }}
        />
      </View>
      <RaceIndicator />
      <Spacer />
      <Text style={styles.label}>Spring</Text>
      <View style={styles.raceWrapper}>
        <Animated.Image
          source={require('../../../assets/cat.png')}
          style={{
            ...styles.cat,
            transform: [
              {
                translateX: translateXSpring,
              },
            ],
          }}
        />
      </View>
      <RaceIndicator />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsRaceOn((isRaceOn) => !isRaceOn)}
      >
        <Text style={styles.text}>{!isRaceOn ? 'Race' : 'Reset'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Notification
