import contracts from './contracts'
import { StakerConfig, QuoteToken } from './types'

const stakers: StakerConfig[] = [
  {
    pid: 0,
    name: "Savings",
    type: "Unlocked",
    time: 14,
    percent: 8,
  },
  {
    pid: 1,
    name: "Classic",
    type: "Unlocked",
    time: 21,
    percent: 7.5
  },
  {
    pid: 2,
    name: "Premium",
    type: "Unlocked",
    time: 28,
    percent: 7,
  },
  {
    pid: 3,
    name: "Silver",
    type: "Locked",
    time: 14,
    percent: 8,
  },
  {
    pid: 4,
    name: "Gold",
    type: "Locked",
    time: 21,
    percent: 7.5
  },
  {
    pid: 5,
    name: "Platinum",
    type: "Locked",
    time: 28,
    percent: 7,
  },
]

export default stakers
