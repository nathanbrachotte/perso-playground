import { StyleSheet } from 'react-native'
import { COLOR } from '../../../constants'
import { RACE_MARGIN } from './constants'

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
  },

  button: {
    alignSelf: 'center',
    backgroundColor: COLOR.AUBERGINE,
    borderRadius: 25,
    height: 50,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: COLOR.WHITE },
  buttonWrapper: {
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowButton: { marginLeft: 10 },
  label: {
    marginLeft: 20,
    fontSize: 24,
    color: COLOR.AUBERGINE,
  },
  timeText: {
    fontSize: 24,
    color: COLOR.AUBERGINE,
  },
  counterWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  raceWrapper: {
    marginTop: 10,
    marginHorizontal: RACE_MARGIN,
    borderWidth: 2,
    borderColor: COLOR.K_PINK,
    backgroundColor: COLOR.K_PINK,
    borderRadius: 25,
  },
  raceIndicatorsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: RACE_MARGIN,
  },
  raceIndicator: {
    fontSize: 25,
    color: COLOR.AUBERGINE,
  },
})

export default styles
