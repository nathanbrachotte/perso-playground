import React from 'react'
import { View, StyleSheet } from 'react-native'

import Animated, { debug } from 'react-native-reanimated'
import CardItem from './CardItem'
import { CARD_AMOUNT } from './constants'
import Pagination from './Pagination'

const { block, useCode, event } = Animated

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
    cards.push(
      <CardItem
        key={i}
        scrollY={scrollY}
        index={i}
        carouselIndex={carouselIndex}
      />
    )
  }

  return (
    <View>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        // bounces={false}
        style={styles.scrollview}
        // show={true}
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
      </Animated.ScrollView>
      <Pagination scrollY={scrollY} />
    </View>
  )
}

export default Carousel
