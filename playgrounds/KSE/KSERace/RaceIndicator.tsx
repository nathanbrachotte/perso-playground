import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

const RaceIndicator = () => {
  return (
    <View style={styles.raceIndicatorsWrapper}>
      <Text style={styles.raceIndicator}>0</Text>
      <Text style={styles.raceIndicator}>1</Text>
    </View>
  )
}

export default RaceIndicator
