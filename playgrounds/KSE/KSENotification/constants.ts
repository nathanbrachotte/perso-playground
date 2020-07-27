export interface Item {
  title: string
  message: string
  image: any
}

export const ITEMS: Item[] = [
  {
    title: 'New Twitter drama',
    message: 'Someone wrote offensive stuff again',
    image: require('../../../assets/twitter.png'),
  },
  {
    title: 'Weekly report',
    message: "You're still broke",
    image: require('../../../assets/report.png'),
  },
  {
    title: 'Facebook',
    message: 'Your uncle and grandma still there',
    image: require('../../../assets/facebook.png'),
  },
  {
    title: 'New Twitter drama',
    message: 'Someone wrote offensive stuff again',
    image: require('../../../assets/twitter.png'),
  },
  {
    title: 'Weekly report',
    message: "You're still broke",
    image: require('../../../assets/report.png'),
  },
  {
    title: 'Download done',
    message: 'Netflix catalogue should be better',
    image: require('../../../assets/download.png'),
  },
]

export const AMOUNT_ITEMS = ITEMS.length
export const ITEM_HEIGHT = 75
export const ANIMATION_DURATION = 300
