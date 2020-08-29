import CardCarousel from './playgrounds/CardCarousel'
import PinchScreen from './playgrounds/PinchScreen'
import KSEButton from './playgrounds/KSE/KSEButton'
import KSENotification from './playgrounds/KSE/KSENotification'
import KSERace from './playgrounds/KSE/KSERace'
import Transitions from './playgrounds/KSE/Transitions'

export const STACK: Record<string, { screen: JSX.Element | Function }> = {
  Transitions: {
    screen: Transitions,
  },
  'Easing/Spring': {
    screen: KSERace,
  },
  'Notification Center': {
    screen: KSENotification,
  },
  'Animated Carousel': {
    screen: CardCarousel,
  },
  PinchScreen: {
    screen: PinchScreen,
  },
  'Button example': {
    screen: KSEButton,
  },
} as const

export const PLAYGROUNDS = Object.keys(STACK).map((item) => item)
