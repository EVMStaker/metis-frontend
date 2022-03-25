/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import stakerConfig from 'config/constants/staker'
import fetchStaker from './fetchStaker'
import { StakersState, Staker} from '../types'

const initialState: StakersState = { data: [...stakerConfig] }

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
  },
})

// Actions
export const { setStakersPublicData} = stakersSlice.actions

// Thunks
export const fetchStakersPublicDataAsync = () => async (dispatch) => {
  const stakers = await fetchStaker()
  dispatch(setStakersPublicData(stakers))
}

export default  stakersSlice.reducer
