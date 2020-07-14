import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {},
  alert: {
    fontSize: 30,
  },
})

const Notification = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.alert}>❗️</Text>
    </View>
  )
}

export default Notification
