import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Animated, {
  useCode,
  debug,
  block,
  Easing,
  cond,
  eq,
  set,
  not,
  clockRunning,
  and,
  greaterOrEq,
  add,
  multiply,
  sub,
} from 'react-native-reanimated'
import Notification from './Notification'
import { COLOR } from '../../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useValue, mix, timing, useClock } from 'react-native-redash'
import { AMOUNT_ITEMS } from './constants'

const ITEM_HEIGHT = 75
const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    margin: 20,
    backgroundColor: 'red',
  },
  wrapper: {
    position: 'absolute',
    width: '90%',
    marginBottom: 10,
    borderRadius: 25,
    height: ITEM_HEIGHT,
    paddingHorizontal: 15,
    backgroundColor: COLOR.WHITE,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 18,
    alignSelf: 'center',
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingTop: 10,
  },
  notification: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
  },
  message: {
    color: COLOR.GREY,
  },
})

interface DrawerProps {
  hasAnimatedIndex: number
  index: number
}

const DrawerItem = ({ hasAnimatedIndex, index }: DrawerProps) => {
  const itemAnimatedValue = useValue<0 | 1>(0)
  const clock = useClock([])

  function animate() {}

  useCode(
    () =>
      block([
        // debug('animation', itemAnimatedValue),
        cond(
          greaterOrEq(hasAnimatedIndex, index),
          block([
            debug(`drawer${index}`, itemAnimatedValue),
            set(
              itemAnimatedValue,
              timing({
                from: itemAnimatedValue,
                to: 1,
                easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
                clock,
              })
            ),
            // debug('drawer', itemAnimatedValue),
          ])
        ),
      ]),
    [hasAnimatedIndex, index]
  )

  const translateY = multiply(
    mix(itemAnimatedValue, -ITEM_HEIGHT, ITEM_HEIGHT),
    sub(hasAnimatedIndex, index)
  )

  const scaleY = mix(itemAnimatedValue, 0, 1)

  return (
    <Animated.View
      style={{
        ...styles.wrapper,
        top: translateY,
        transform: [{ scaleY }],
      }}
    >
      <TouchableOpacity style={styles.touchable} onPress={animate}>
        <Animated.View style={{ ...styles.wrapper, transform: [{}] }}>
          <Image
            style={styles.image}
            source={require('../../PinchScreen/dd0.png')}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.title}>Jane Birkin</Text>
            <Text style={styles.message}>Jane Birkin</Text>
          </View>
          <View style={styles.notification}>
            <Notification />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default DrawerItem
