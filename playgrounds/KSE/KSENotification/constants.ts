export interface Item {
  title: string
  message: string
  image: any
}

export const ITEMS: Item[] = [
  {
    title: 'Dan Abramov',
    message: "Let's discuss let vs const",
    image: require('../../PinchScreen/dd0.png'),
  },
  {
    title: 'title',
    message: 'message',
    image: require('../../PinchScreen/dd0.png'),
  },
  {
    title: 'title',
    message: 'message',
    image: require('../../PinchScreen/dd0.png'),
  },
  {
    title: 'title',
    message: 'message',
    image: require('../../PinchScreen/dd0.png'),
  },
  {
    title: 'title',
    message: 'message',
    image: require('../../PinchScreen/dd0.png'),
  },
]

export const AMOUNT_ITEMS = ITEMS.length
export const ITEM_HEIGHT = 75
export const ANIMATION_DURATION = 300
