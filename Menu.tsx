import * as React from 'react'
import { Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from 'react-navigation-hooks'

const PLAYGROUNDS = ['PinchScreen', 'CardCarousel']

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
        backgroundColor: '#FFB3C7',
        height: 150,
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

const Menu = () => {
  return (
    <ScrollView style={{ width: '100%' }}>
      {PLAYGROUNDS.map((key) => (
        <Item key={key} title={key} />
      ))}
    </ScrollView>
  )
}

export default Menu
