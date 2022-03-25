import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import poolsReducer from './pools'
import stakersReducer from './staker'
import stakeruserReducer from './stakeruser'
import stakedPlanReducer from './stakedPlans'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    pools: poolsReducer,
    stakers: stakersReducer,
    stakeruser: stakeruserReducer,
    stakedPlan: stakedPlanReducer
  },
})
