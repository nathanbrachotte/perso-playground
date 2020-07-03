import * as React from 'react'
import { View, Text, ScrollView } from 'react-native'

// import Carousel from './Carousel'
import { Value } from 'react-native-reanimated'

export const CARD_AMOUNT = 4

const CardCarousel = () => {
  const CarouselScrollY1 = new Value(0)
  const CarouselScrollY2 = new Value(0)
  const CarouselScrollY3 = new Value(0)
  const CarouselScrollY4 = new Value(0)
  const CarouselScrollY5 = new Value(0)
  const CarouselScrollY6 = new Value(0)

  return null

  // return (
  //   <ScrollView
  //     style={{ marginBottom: 20 }}
  //     contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
  //   >
  //     <View style={{ width: '100%' }}>
  //       <Text
  //         style={{
  //           width: '100%',
  //           textAlign: 'center',
  //           marginTop: 50,
  //         }}
  //       >
  //         Variation 1 - vanilla
  //       </Text>
  //       <Carousel scrollY={CarouselScrollY1} carouselIndex={1} />
  //     </View>
  //     <View style={{ width: '100%' }}>
  //       <Text
  //         style={{
  //           width: '100%',
  //           textAlign: 'center',
  //           marginTop: 50,
  //         }}
  //       >
  //         Variation 2 - perspective
  //       </Text>
  //       <Carousel scrollY={CarouselScrollY2} carouselIndex={2} />
  //     </View>
  //     <View style={{ width: '100%' }}>
  //       <Text
  //         style={{
  //           width: '100%',
  //           textAlign: 'center',
  //           marginTop: 50,
  //         }}
  //       >
  //         Variation 3 - no perspective
  //       </Text>
  //       <Carousel scrollY={CarouselScrollY3} carouselIndex={3} />
  //     </View>
  //     <View style={{ width: '100%' }}>
  //       <Text
  //         style={{
  //           width: '100%',
  //           textAlign: 'center',
  //           marginTop: 50,
  //         }}
  //       >
  //         Variation 4 - no opacity change
  //       </Text>
  //       <Carousel scrollY={CarouselScrollY4} carouselIndex={4} />
  //     </View>
  //     <View style={{ width: '100%' }}>
  //       <Text
  //         style={{
  //           width: '100%',
  //           textAlign: 'center',
  //           marginTop: 50,
  //         }}
  //       >
  //         Variation 5 - ascending
  //       </Text>
  //       <Carousel scrollY={CarouselScrollY5} carouselIndex={5} />
  //     </View>
  //     <View style={{ width: '100%' }}>
  //       <Text
  //         style={{
  //           width: '100%',
  //           textAlign: 'center',
  //           marginTop: 50,
  //         }}
  //       >
  //         Variation 6 - ascending/no opacity
  //       </Text>
  //       <Carousel scrollY={CarouselScrollY6} carouselIndex={6} />
  //     </View>
  //   </ScrollView>
  // )
}

export default CardCarousel
