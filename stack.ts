import CardCarousel from './playgrounds/CardCarousel'
import PinchScreen from './playgrounds/PinchScreen'
import KSEButton from './playgrounds/KSE/KSEButton'
import KSENotification from './playgrounds/KSE/KSENotification'
import Transitions from './playgrounds/KSE/Transitions'

export const STACK: Record<string, { screen: JSX.Element | Function }> = {
  Transitions: {
    screen: Transitions,
  },
  CardCarousel: {
    screen: CardCarousel,
  },
  PinchScreen: {
    screen: PinchScreen,
  },
  'Button example': {
    screen: KSEButton,
  },
  'Notification Center': {
    screen: KSENotification,
  },
} as const

export const PLAYGROUNDS = Object.keys(STACK).map((item) => item)
