import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Animated, {
  useCode,
  debug,
  block,
  Easing,
  cond,
  set,
  greaterOrEq,
  add,
  multiply,
  sub,
} from 'react-native-reanimated'
import Notification from './Notification'
import { COLOR } from '../../../constants'
import { useValue, mix, timing, useClock } from 'react-native-redash'
import { ITEM_HEIGHT, Item, ITEMS, ANIMATION_DURATION } from './constants'

const styles = StyleSheet.create({
  item: {
    width: '100%',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  wrapper: {
    position: 'absolute',
    width: '90%',
    borderRadius: 25,
    height: ITEM_HEIGHT,
    backgroundColor: COLOR.WHITE,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,

    paddingHorizontal: 15,
    justifyContent: 'center',
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
    paddingTop: 2,
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
  animatedIndex: Animated.Value<number>
  index: number
  data: Item
}

const DrawerItem = ({ animatedIndex, index, data }: DrawerProps) => {
  const itemAnimatedValue = useValue<0 | 1>(0)
  const clock = useClock([])

  useCode(
    () => [
      cond(
        // use sub here to make it animate on while the parent animated value move content down
        greaterOrEq(animatedIndex, sub(index, 0.8)),
        [
          debug(`drawer${index}`, itemAnimatedValue),
          set(
            itemAnimatedValue,
            timing({
              from: itemAnimatedValue,
              to: 1,
              easing: Easing.bezier(0.17, 0.67, 0.36, 0.93),
              clock,
              duration: ANIMATION_DURATION,
            })
          ),
        ]
      ),
    ],
    [animatedIndex, index]
  )

  const translateY = add(
    20,
    multiply(ITEM_HEIGHT + 20, sub(animatedIndex, index))
  )

  const scaleY = mix(itemAnimatedValue, 0.3, 1)
  const scaleX = mix(itemAnimatedValue, 0.3, 1)

  return (
    <Animated.View
      style={{
        ...styles.wrapper,
        top: translateY,
        transform: [{ scaleY, scaleX }],
      }}
    >
      <View style={styles.item}>
        <Image style={styles.image} source={data.image} />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.message}>{data.message}</Text>
        </View>
        <View style={styles.notification}>
          <Notification />
        </View>
      </View>
    </Animated.View>
  )
}

export default DrawerItem
