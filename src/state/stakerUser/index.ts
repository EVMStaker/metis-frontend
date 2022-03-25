/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import StakerUserConfig from 'config/constants/stakerUser'
import { StakerUserState} from '../types'
import { 
  fetchDividendsForClaim,
  fetchPlanDeposited, 
  fetchReferalTotalBonus,
  fetchTotalDeposit, 
  fetchUserAllowance,
  fetchTotalStaked,
  fetchContractBalance,
  fetchReferralWithdrawn,
 } from './fetchUserStake'

const initialState: StakerUserState = { data: {...StakerUserConfig} }

export const StakerUserSlice = createSlice({
  name: 'StakerUser',
  initialState,
  reducers: {
    
    setUserDividendsForClaim: (state, action) => {
      state.data = {
        ...state.data,
        dividends: action.payload,
      }
      
    },
    setUserPlanDeposited: (state, action) => {
      state.data = {
        ...state.data,
        planDeposited: action.payload,
      }
    },
    setUserReferalTotalBonus: (state, action) => {
      state.data = {
        ...state.data,
        referralBonus: action.payload,
      }
    },
    setUserTotalDeposit: (state, action) => {
      state.data = {
        ...state.data,
        totalDeposit: action.payload,
      }
    },
    setUserAllowance: (state, action) => {
      state.data = {
        ...state.data,
        allowance: action.payload,
      }
    },
    setTotalStaked: (state, action) => {
      console.log(action.payload)
      state.data = {
        ...state.data,
        totalStaked: action.payload,
      }
    },
    setContractBalance: (state, action) => {
      state.data = {
        ...state.data,
        contractBalance: action.payload,
      }
    },
    setReferralWithdrawn: (state, action) => {
      state.data = {
        ...state.data,
        referralWithdrawn: action.payload,
      }
    },
  },
})


// Actions
export const { setUserDividendsForClaim,  setReferralWithdrawn, setUserPlanDeposited, setUserReferalTotalBonus, setUserTotalDeposit, setUserAllowance, setTotalStaked, setContractBalance} = StakerUserSlice.actions


// Thunks
export const fetchUserDividendsForClaimDataAsync = (account) => async (dispatch) => {
  const data = await fetchDividendsForClaim(account)
  dispatch(setUserDividendsForClaim(data))
}

export const fetchUserPlanDepositedDataAsync = (account) => async (dispatch) => {
  const data = await fetchPlanDeposited(account)
  dispatch(setUserPlanDeposited(data))
}

export const fetchUserReferalTotalBonusDataAsync = (account) => async (dispatch) => {
  const data = await fetchReferalTotalBonus(account)
  dispatch(setUserReferalTotalBonus(data))
}

export const fetchUserTotalDepositDataAsync = (account) => async (dispatch) => {
  const data = await fetchTotalDeposit(account)
  dispatch(setUserTotalDeposit(data))
}

export const fetchUserAllowanceDataAsync = (account) => async (dispatch) => {
  const data = await fetchUserAllowance(account)
  dispatch(setUserAllowance(data))
}

export const fetchTotalStakedDataAsync = () => async (dispatch) => {
  const data = await fetchTotalStaked()
  dispatch(setTotalStaked(data))
}

export const fetchContractBalanceDataAsync = () => async (dispatch) => {
  const data = await fetchContractBalance()
  dispatch(setContractBalance(data))
}

export const fetchReferralWithdrawnDataAsync = (account) => async (dispatch) => {
  const data = await fetchReferralWithdrawn(account)
  dispatch(setReferralWithdrawn(data))
}


export default StakerUserSlice.reducer
