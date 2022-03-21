/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import stakerConfig from 'config/constants/staker'
import StakerUserConfig from 'config/constants/stakerUser'
import fetchStaker from './fetchStaker'
import {
  fetchDividendsForClaim,
  fetchPlanDeposited,
  fetchReferalTotalBonus,
  fetchTotalDeposit,
  fetchUserAllowance,
} from './fetchStakerUser'
import { StakersState, Staker, StakerUser, StakersUserState} from '../types'

const initialState: StakersState = { data: [...stakerConfig] }

// console.log("HI")
// const kjk = fetchDividendsForClaim("0xb73E8cc008B4019b3AD5CA1e600235D405b20bA7")

export const stakersSlice = createSlice({
  name: 'Stakers',
  initialState,
  reducers: {
    setStakersPublicData: (state, action) => {
      const liveStakersData: Staker[] = action.payload
      state.data = state.data.map((staker) => {
        const liveStakerData = liveStakersData.find((s) => s.pid === staker.pid)
        return { ...staker, ...liveStakerData }
      })
    },

    // setUserDividendsForClaim: (state, action) => {
    //   state.data = {
    //     ...state.data,
    //     dividends: action.payload,
    //   }
    // },
    // setUserPlanDeposited: (state, action) => {
    //   state.data = {
    //     ...state.data,
    //     planDeposited: action.payload,
    //   }
    // },
    // setUserReferalTotalBonus: (state, action) => {
    //   state.data = {
    //     ...state.data,
    //     totalReferral: action.payload,
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
export const { setStakersPublicData} = stakersSlice.actions

// export const { setStakersPublicData, setUserDividendsForClaim, setUserPlanDeposited, setUserReferalTotalBonus, setUserTotalDeposit, setUserAllowance} = stakersSlice.actions

// Thunks
export const fetchStakersPublicDataAsync = () => async (dispatch) => {
  const stakers = await fetchStaker()
  dispatch(setStakersPublicData(stakers))
}

// export const fetchStakerUserDataAsync = (account) => async (dispatch) => {
//   const userFarmAllowances = await fetchDividendsForClaim(account)
//   const userFarmTokenBalances = await fetchPlanDeposited(account)
//   const userStakedBalances = await fetchReferalTotalBonus(account)
//   const userFarmEarnings = await fetchTotalDeposit(account)
//   const fetchUserAllowance = await fetchUserAllowance(account)

//   const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
//     return {
//       allowance: userFarmAllowances[index],
//       tokenBalance: userFarmTokenBalances[index],
//       stakedBalance: userStakedBalances[index],
//       earnings: userFarmEarnings[index],
//     }
//   })

//   dispatch(setFarmUserData({ arrayOfUserDataObjects }))
// }

// export const fetchUserDividendsForClaimDataAsync = (account) => async (dispatch) => {
//   const data = await fetchDividendsForClaim(account)

//   dispatch(setUserDividendsForClaim(data))
// }

// export const fetchUserPlanDepositedDataAsync = (account) => async (dispatch) => {
//   const data = await fetchDividendsForClaim(account)

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


// export const fetchFarmUserDataAsync = (account) => async (dispatch) => {
//   const userFarmAllowances = await fetchFarmUserAllowances(account)
//   const userFarmTokenBalances = await fetchFarmUserTokenBalances(account)
//   const userStakedBalances = await fetchFarmUserStakedBalances(account)
//   const userFarmEarnings = await fetchFarmUserEarnings(account)

//   const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
//     return {
//       index,
//       allowance: userFarmAllowances[index],
//       tokenBalance: userFarmTokenBalances[index],
//       stakedBalance: userStakedBalances[index],
//       earnings: userFarmEarnings[index],
//     }
//   })

//   dispatch(setFarmUserData({ arrayOfUserDataObjects }))
// }

export default  stakersSlice.reducer
