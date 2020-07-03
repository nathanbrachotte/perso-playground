import CardCarousel from './playgrounds/CardCarousel'
import PinchScreen from './playgrounds/PinchScreen'
import KSEButton from './playgrounds/KSE/KSEButton'

export const STACK: Record<string, { screen: JSX.Element | Function }> = {
  CardCarousel: {
    screen: CardCarousel,
  },
  PinchScreen: {
    screen: PinchScreen,
  },
  KSE_ButtonScreen: {
    screen: KSEButton,
  },
} as const

export const PLAYGROUNDS = Object.keys(STACK).map((item) => item)
