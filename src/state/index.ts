import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import poolsReducer from './pools'
import stakedPlanReducer from './stakedPlans'
import stakersReducer from './staker'
import stakeruserReducer from './stakeruser'


export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    pools: poolsReducer,
    stakedPlan: stakedPlanReducer,
    stakers: stakersReducer,
    stakeruser: stakeruserReducer,
  },
})
