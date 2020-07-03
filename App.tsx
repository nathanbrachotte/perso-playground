import * as React from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { COLOR } from './constants'
import { STACK } from './stack'
import MenuScreen from './Menu'

const STACK_WITH_MENU = {
  ...STACK,
  Menu: {
    screen: MenuScreen,
  },
}

const AppNavigator = createAppContainer(
  createStackNavigator(STACK_WITH_MENU, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: COLOR.AUBERGINE,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
    },
    initialRouteName: 'Menu',
  })
)

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </>
  )
}
