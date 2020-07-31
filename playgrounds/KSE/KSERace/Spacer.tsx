import React from 'react'
import { View } from 'react-native'

const Spacer = ({ height = 50 }: { height?: number }) => {
  return <View style={{ height }} />
}

export default Spacer
