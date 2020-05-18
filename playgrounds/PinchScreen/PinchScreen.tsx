import * as React from 'react'
import { View, Text, Image } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Value } from 'react-native-reanimated'
import { onGestureEvent } from 'react-native-redash'

const PinchScreen = () => {
  const state = new Value(State.UNDETERMINED)
  const scale = new Value(1)
  const focalX = new Value(1)
  const focalY = new Value(1)
  const gestureHandler = onGestureEvent({ state, scale, focalX, focalY })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PinchGestureHandler {...gestureHandler}>
        <Animated.View>
          <Animated.Image style={{ width: 200, height: 200 }} source={require('./dd0.png')} />
        </Animated.View>
      </PinchGestureHandler>
    </View>
  )
}

export default PinchScreen
