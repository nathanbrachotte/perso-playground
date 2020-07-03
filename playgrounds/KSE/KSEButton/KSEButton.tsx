import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Value } from 'react-native-reanimated'

import { COLOR } from '../../../constants'
import { STATUS } from './constants'
import AnimatedButtons from './AnimatedButtons'
import { useValue } from 'react-native-redash'

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLOR?.AUBERGINE, // because expo sometimes doesn't load constants 🤷‍♂️
  },
})

const KSEButton = () => {
  const [isSuccessful, setIsSuccessful] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)

  const status = useValue<STATUS>(STATUS.DEFAULT)

  const onPressDefault = async () => {
    status.setValue(STATUS.FETCHING)

    const res = await new Promise((resolve) => {
      setIsDisabled(true)
      const timeout = setTimeout(() => {
        clearTimeout(timeout)

        resolve(isSuccessful)
      }, 1000)
    })

    if (res) {
      status.setValue(STATUS.SUCCESS)
    } else {
      status.setValue(STATUS.FAILURE)
    }

    setIsDisabled(false)
    return
  }

  const onPressSuccess = async () => {
    status.setValue(STATUS.DEFAULT)
    setIsSuccessful(!isSuccessful)

    return
  }

  return (
    <View style={styles.wrapper}>
      <AnimatedButtons
        status={status}
        isDisabled={isDisabled}
        onPressDefault={onPressDefault}
        onPressSuccess={onPressSuccess}
      />
    </View>
  )
}

export default KSEButton
