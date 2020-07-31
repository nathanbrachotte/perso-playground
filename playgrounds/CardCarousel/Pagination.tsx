import * as React from 'react'
import { View, Dimensions } from 'react-native'
import { Value } from 'react-native-reanimated'

import { CARD_AMOUNT } from './constants'
import PaginationItem from './PaginationItem'

const { width: ww } = Dimensions.get('window')

interface PaginationProps {
  scrollY: Value<number>
}

const Pagination = ({ scrollY }: PaginationProps) => {
  let items = []

  for (let i: number = 0; i < CARD_AMOUNT; i++) {
    items.push(<PaginationItem key={i} scrollY={scrollY} index={i} />)
  }

  return (
    <View
      style={{
        width: ww,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {items}
    </View>
  )
}

export default Pagination
