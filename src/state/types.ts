import BigNumber from 'bignumber.js'
import { FarmConfig, PoolConfig, StakerConfig, StakerUserConfig, StakedPlansConfig} from 'config/constants/types'

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

export type StakedPlan = StakedPlansConfig

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

export interface StakerUserState {
  data: StakerUser
}

export interface StakedPlanState {
  data: StakedPlan[]
}

// Global state

export interface State {
  farms: FarmsState
  pools: PoolsState
  stakers: StakersState
  stakeruser: StakerUserState
  stakedPlan: StakedPlanState
}
