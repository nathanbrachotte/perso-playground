import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import DrawerItem from './DrawerItem'

import { AMOUNT_ITEMS } from './constants'

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})

const KSENotification = () => {
  const [hasAnimatedIndex, setHasAnimatedIndex] = useState<number>(0)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (hasAnimatedIndex < AMOUNT_ITEMS - 1) {
      timeout = setTimeout(() => {
        console.log({ hasAnimatedIndex })
        setHasAnimatedIndex(hasAnimatedIndex + 1)
        console.log({ hasAnimatedIndex })
      }, 1000)
    }

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [hasAnimatedIndex])

  console.log(hasAnimatedIndex)
  return (
    <View style={styles.wrapper}>
      {[...Array(AMOUNT_ITEMS)].map((e, i) => (
        <DrawerItem key={i} index={i} hasAnimatedIndex={hasAnimatedIndex} />
      ))}
    </View>
  )
}

export default KSENotification
