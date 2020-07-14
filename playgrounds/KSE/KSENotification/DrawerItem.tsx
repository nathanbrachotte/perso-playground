import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

import Notification from './Notification'
import { COLOR } from '../../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    margin: 20,
  },
  wrapper: {
    width: '90%',
    marginBottom: 10,
    borderRadius: 25,
    height: 75,
    paddingHorizontal: 15,
    backgroundColor: COLOR.WHITE,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 18,
    alignSelf: 'center',
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: COLOR.AUBERGINE,
    paddingLeft: 20,
    paddingTop: 10,
  },
  notification: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
  },
  message: {
    color: COLOR.GREY,
  },
})

const DrawerItem = () => {
  function onPress() {
    alert('dilling dilling')
  }

  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <View style={styles.wrapper}>
        <Image
          style={styles.image}
          source={require('../../PinchScreen/dd0.png')}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Jane Birkin</Text>
          <Text style={styles.message}>Jane Birkin</Text>
        </View>
        <View style={styles.notification}>
          <Notification />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DrawerItem
