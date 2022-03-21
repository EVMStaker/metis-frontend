/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import StakerUserConfig from 'config/constants/stakerUser'
import {
  fetchDividendsForClaim,
  fetchPlanDeposited,
  fetchReferalTotalBonus,
  fetchTotalDeposit,
  fetchUserAllowance,
} from './fetchStakerUser'
import { StakersState, Staker, StakerUser, StakersUserState} from '../types'

const initialState: StakersUserState = { data: {...StakerUserConfig} }

export const StakerUserSlice = createSlice({
  name: 'stakersUser',
  initialState,
  reducers: {

    setUserDividendsForClaim: (state, action) => {
      state.data = {
        ...state.data,
        dividends: action.payload,
      }
      console.log(action.payload)
    },
    
    // setUserPlanDeposited: (state, action) => {
    //   state.data = {
    //     ...state.data,
    //     planDeposited: action.payload,
    //   }
    // },
    // setUserReferalTotalBonus: (state, action) => {
    //   state.data = {
    //     ...state.data,
    //     referralBonus: action.payload,
    //   }
    // },
    // setUserTotalDeposit: (state, action) => {
    //   state.data = {
    //     ...state.data,
    //     totalDeposit: action.payload,
    //   }
    // },
    // setUserAllowance: (state, action) => {
    //   state.data = {
    //     ...state.data,
    //     allowance: action.payload,
    //   }
    // },
  },
})


// Actions
// export const { setUserDividendsForClaim, setUserPlanDeposited, setUserReferalTotalBonus, setUserTotalDeposit, setUserAllowance } = StakerUserSlice.actions
export const { setUserDividendsForClaim } = StakerUserSlice.actions


// Thunks
export const fetchUserDividendsForClaimDataAsync = (account) => async (dispatch) => {
  console.log("HI")
  const data = await fetchDividendsForClaim(account)
  dispatch(setUserDividendsForClaim(data))
}

// export const fetchUserPlanDepositedDataAsync = (account) => async (dispatch) => {
//   console.log("HI")
//   const data = await fetchPlanDeposited(account)
//   dispatch(setUserPlanDeposited(data))
// }

// export const fetchUserReferalTotalBonusDataAsync = (account) => async (dispatch) => {
//   const data = await fetchReferalTotalBonus(account)
//   dispatch(setUserReferalTotalBonus(data))
// }

// export const fetchUserTotalDepositDataAsync = (account) => async (dispatch) => {
//   const data = await fetchTotalDeposit(account)
//   dispatch(setUserTotalDeposit(data))
// }

// export const fetchUserAllowanceDataAsync = (account) => async (dispatch) => {
//   const data = await fetchUserAllowance(account)
//   dispatch(setUserAllowance(data))
// }


export default  StakerUserSlice.reducer
