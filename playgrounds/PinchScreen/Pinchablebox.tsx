import React from 'react'
import { Animated, StyleSheet } from 'react-native'

import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler'

const USE_NATIVE_DRIVER = true

// Working example from rn-gesture-handler
export class PinchableBox extends React.Component {
  panRef = React.createRef()
  rotationRef = React.createRef()
  pinchRef = React.createRef()

  _baseScale: any = undefined
  _pinchScale: any = undefined
  _scale: any = undefined
  _lastScale: any = undefined
  _onPinchGestureEvent: any = undefined
  _rotate: any = undefined
  _rotateStr: any = undefined
  _lastRotate: any = undefined
  _onRotateGestureEvent: any = undefined
  _tilt: any = undefined
  _tiltStr: any = undefined
  _lastTilt: any = undefined
  _onTiltGestureEvent: any = undefined

  constructor(props: {}) {
    super(props)

    /* Pinching */
    this._baseScale = new Animated.Value(1)
    this._pinchScale = new Animated.Value(1)
    this._scale = Animated.multiply(this._baseScale, this._pinchScale)
    this._lastScale = 1
    this._onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this._pinchScale } }],
      {
        useNativeDriver: USE_NATIVE_DRIVER,
      }
    )

    /* Rotation */
    this._rotate = new Animated.Value(0)
    this._rotateStr = this._rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ['-100rad', '100rad'],
    })
    this._lastRotate = 0
    this._onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: this._rotate } }],
      {
        useNativeDriver: USE_NATIVE_DRIVER,
      }
    )

    /* Tilt */
    this._tilt = new Animated.Value(0)
    this._tiltStr = this._tilt.interpolate({
      inputRange: [-501, -500, 0, 1],
      outputRange: ['1rad', '1rad', '0rad', '0rad'],
    })
    this._lastTilt = 0
    this._onTiltGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this._tilt } }],
      {
        useNativeDriver: USE_NATIVE_DRIVER,
      }
    )
  }

  _onRotateHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastRotate += event.nativeEvent.rotation
      this._rotate.setOffset(this._lastRotate)
      this._rotate.setValue(0)
    }
  }
  _onPinchHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale
      this._baseScale.setValue(this._lastScale)
      this._pinchScale.setValue(1)
    }
  }
  _onTiltGestureStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastTilt += event.nativeEvent.translationY
      this._tilt.setOffset(this._lastTilt)
      this._tilt.setValue(0)
    }
  }
  render() {
    return (
      <PanGestureHandler
        //@ts-ignore
        ref={this.panRef}
        onGestureEvent={this._onTiltGestureEvent}
        onHandlerStateChange={this._onTiltGestureStateChange}
        minDist={10}
        minPointers={2}
        maxPointers={2}
        avgTouches
      >
        <Animated.View style={styles.wrapper}>
          <RotationGestureHandler
            //@ts-ignore
            ref={this.rotationRef}
            simultaneousHandlers={this.pinchRef}
            onGestureEvent={this._onRotateGestureEvent}
            onHandlerStateChange={this._onRotateHandlerStateChange}
          >
            <Animated.View style={styles.wrapper}>
              <PinchGestureHandler
                //@ts-ignore
                ref={this.pinchRef}
                simultaneousHandlers={this.rotationRef}
                onGestureEvent={this._onPinchGestureEvent}
                onHandlerStateChange={this._onPinchHandlerStateChange}
              >
                <Animated.View style={styles.container} collapsable={false}>
                  <Animated.Image
                    style={[
                      styles.pinchableImage,
                      {
                        transform: [
                          { perspective: 200 },
                          { scale: this._scale },
                          { rotate: this._rotateStr },
                          { rotateX: this._tiltStr },
                        ],
                      },
                    ]}
                    source={require('./dd0.png')}
                  />
                </Animated.View>
              </PinchGestureHandler>
            </Animated.View>
          </RotationGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    )
  }
}

export default PinchableBox

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pinchableImage: {
    width: 250,
    height: 250,
  },
  wrapper: {
    flex: 1,
  },
})
