import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'

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
    backgroundColor: COLOR.AUBERGINE,
  },
  form: {
    // backgroundColor: 'red',
    width: '68%',
    borderBottomColor: COLOR.WHITE,
    borderBottomWidth: 2,
    marginBottom: 30,
    fontSize: 30,
    color: COLOR.WHITE,
    marginLeft: 2,
  },
  label: {
    width: '70%',
    color: COLOR.K_PINK,
    marginBottom: 5,
    fontSize: 18,
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
      {/* <Text style={styles.label}> First name </Text>
      <TextInput style={styles.form} value="Nathan" />
      <Text style={styles.label}> Last name </Text>
      <TextInput style={styles.form} value="Brachotte" /> */}
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
