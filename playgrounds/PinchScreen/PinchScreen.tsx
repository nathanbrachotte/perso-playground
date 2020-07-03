import * as React from 'react'
import { View, Text, Image } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Value, useCode, block, cond, eq, debug } from 'react-native-reanimated'
import { onGestureEvent, vec, Vector, transformOrigin, timing } from 'react-native-redash'

import { PinchableBox } from './Pinchablebox'

const IMAGE_SIZE = 200

const PinchScreen = () => {
  const state = new Value(State.UNDETERMINED)
  const gestureScale: Animated.Value<number> = new Value(1)

  const focal = vec.createValue(0, 0)
  const origin = vec.createValue(0, 0)

  const gestureHandler = onGestureEvent({
    state,
    scale: gestureScale,
    focalX: focal.x,
    focalY: focal.y,
  })

  const scale = cond(eq(state, State.END), timing({ from: gestureScale, to: 1 }), gestureScale)

  useCode(
    () =>
      block([cond(eq(state, State.BEGAN), block([vec.set(focal, origin), debug('state', state)]))]),
    []
  )

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <PinchGestureHandler {...gestureHandler}>
          <Animated.View>
            <Animated.Image
              style={{
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                transform: [...transformOrigin(origin, { scale })],
              }}
              source={require('./dd0.png')}
            />
          </Animated.View>
        </PinchGestureHandler>
      </View>
      {/* For reference, coming from rn-gesture-handler doc */}
      <PinchableBox />
    </>
  )
}

export default PinchScreen
