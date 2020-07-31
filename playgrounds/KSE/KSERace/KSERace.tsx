import React, { useState } from 'react'
import { Text } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'

import Spacer from './Spacer'
import EasingComp from './Easing'
import Spring from './Spring'
import styles from './styles'

import { SHOW_EASING, SHOW_SPRING } from './constants'

const Notification = () => {
  const [isRaceOn, setIsRaceOn] = useState(false)

  return (
    <ScrollView style={styles.wrapper}>
      <Spacer height={40} />
      {SHOW_EASING && <EasingComp isRaceOn={isRaceOn} />}
      {SHOW_SPRING && <Spring isRaceOn={isRaceOn} />}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsRaceOn((isRaceOn) => !isRaceOn)}
      >
        <Text style={styles.text}>{!isRaceOn ? 'Go' : 'Go back'}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Notification
