import React, { useState, createElement } from 'react'
import { View, StyleSheet } from 'react-native'
import { useValue } from 'react-native-redash'
import DrawerItem from './DrawerItem'

import { COLOR } from '../../../constants'

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})

const AMOUNT_ITEMS = 4

const KSENotification = () => {
  const [isSuccessful, setIsSuccessful] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)

  return (
    <View style={styles.wrapper}>
      {[...Array(AMOUNT_ITEMS)].map((e, i) => (
        <DrawerItem key={i} />
      ))}
    </View>
  )
}

export default KSENotification
