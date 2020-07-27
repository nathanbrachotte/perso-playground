import React from 'react'
import { StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
  bell: {
    height: 50,
    width: 50,
  },
})

const Notification = () => {
  return null
  return (
    <Image source={require('../../../assets/bell.png')} style={styles.bell} />
  )
}

export default Notification
