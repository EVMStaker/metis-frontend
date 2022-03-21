import BigNumber from 'bignumber.js'
import { FarmConfig, PoolConfig, StakerConfig, StakerUserConfig } from 'config/constants/types'

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  // quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: number
  depositFeeBP?: number
  eggPerBlock?: number
    userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}
 
export interface Staker extends StakerConfig {
  currentPercent?: string
  totalROI?: string
  // dividendsForClaim?: BigNumber
  // userData?: {
  //   allowance: BigNumber
  //   dividends: BigNumber
  //   totalDeposit: BigNumber
  //   planDeposited: BigNumber
  //   referralBonus : BigNumber
  // }
}

// export interface StakerUser {
//   dividendsForClaim?: BigNumber
//   totalDeposit: BigNumber
//   allowance: BigNumber
//   referralBonus : BigNumber
//   planDeposited: number

//   // plan?: number
//   // percent?: number
//   // amount?: number
//   // profit?: number
//   // start?: number
//   // finish?: number
// }



export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}


export type StakerUser = StakerUserConfig

// Slices states

export interface FarmsState {
  data: Farm[]
}

export interface PoolsState {
  data: Pool[]
}

export interface StakersState {
  data: Staker[]
}

export interface StakersUserState {
  data: StakerUser
}

// Global state

export interface State {
  farms: FarmsState
  pools: PoolsState
  stakers: StakersState
  stakerUser: StakersUserState
}
