import * as React from 'react'
import { Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from 'react-navigation-hooks'

import { PLAYGROUNDS } from './stack'
import { COLOR } from './constants'

interface ItemProps {
  title: string
}

const Item = ({ title }: ItemProps) => {
  const { navigate } = useNavigation()
  return (
    <TouchableOpacity
      style={{
        alignSelf: 'center',
        borderRadius: 40,
        backgroundColor: COLOR.K_PINK,
        height: 80,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
      }}
      onPress={() => navigate(title)}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

const MenuScreen = () => {
  return (
    <ScrollView style={{ width: '100%' }}>
      {PLAYGROUNDS.map((key) => (
        <Item key={key} title={key} />
      ))}
    </ScrollView>
  )
}

export default MenuScreen
