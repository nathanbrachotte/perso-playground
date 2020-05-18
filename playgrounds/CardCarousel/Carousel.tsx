import React, { useMemo } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import Animated, { debug } from 'react-native-reanimated'
import { ScrollView } from 'react-native-gesture-handler'
import CardItem from './CardItem'
import { CARD_AMOUNT } from './index'
import Pagination from './Pagination'

const { width: ww } = Dimensions.get('window')
const { Value, block, cond, eq, useCode, set, neq, and, event } = Animated
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

interface CarouselProps {
  scrollY: Animated.Value<number>
  carouselIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

const styles = StyleSheet.create({
  scrollview: {},
})

const Carousel = ({ scrollY, carouselIndex }: CarouselProps) => {
  useCode(() => block([debug('scrollY', scrollY)]), [])

  let cards = []

  for (let i: number = 0; i < CARD_AMOUNT; i++) {
    cards.push(<CardItem key={i} scrollY={scrollY} index={i} carouselIndex={carouselIndex} />)
  }

  return (
    <View>
      <AnimatedScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        // bounces={false}
        style={styles.scrollview}
        show
        onScroll={event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollY },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
      >
        {cards}
      </AnimatedScrollView>
      <Pagination scrollY={scrollY} />
    </View>
  )
}

export default Carousel
