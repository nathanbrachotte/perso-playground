import * as React from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import CardCarousel from './playgrounds/CardCarousel'
import PinchScreen from './playgrounds/PinchScreen'
import Menu from './Menu'

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Menu: {
        screen: Menu,
      },
      CardCarousel: {
        screen: CardCarousel,
      },
      PinchScreen: {
        screen: PinchScreen,
      },
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#272741',
          borderBottomWidth: 0,
        },
        headerTintColor: 'white',
      },
      initialRouteName: 'Menu',
    }
  )
)

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </>
  )
}
