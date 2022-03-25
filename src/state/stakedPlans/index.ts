/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import StakedPlanConfig from 'config/constants/stakedPlans'
import { StakedPlanState, StakedPlan} from '../types'
import fetchDepositedPlansInfo from './fetchUserStakedPlans'
import {fetchPlanDeposited} from '../stakeruser/fetchUserStake'


const initialState: StakedPlanState = { data: [...StakedPlanConfig]}

export const StakedPlansSlice = createSlice({
  name: 'StakedPlans',
  initialState,
  reducers: {
    
    // setStakedPlanData: (state, action) => {
    //   const newPlan  = action.payload
    //   console.log("hi", newPlan)
    //   state.data = state.data.map((pool) => {
    //     const data = newPlan.find((f) => f.plan === pool.plan)
    //     return {...pool, ...data}
      
    //   })
    //   console.log("nani")
    // },

    setStakedPlanData: (state, action) => {
      const arrayOfUserDataObjects  = action.payload
      // console.log(state.data)
      // console.log("Must Return an Object or Array")
      // console.log("payload",action.payload)
      // console.log("Testing for Object/Array Type")
      // console.log("Index Reference 0", action.payload[0])
      // console.log("Okay, returns an Object with Possible Indexing")


      // This is the Problem as I dont know how to properly map it

      // Loop Through Everything>
      for (let i = 0; i < arrayOfUserDataObjects.length; i ++) {
        state.data[i]= {
          plan: arrayOfUserDataObjects[i].plan,
          percent: arrayOfUserDataObjects[i].percent,
          amount: arrayOfUserDataObjects[i].amount,
          profit: arrayOfUserDataObjects[i].profit,
          start: arrayOfUserDataObjects[i].start,
          finish: arrayOfUserDataObjects[i].finish
        }

      }
      // state.data[0]= {
      //   plan: arrayOfUserDataObjects[0].plan,
      //   percent: arrayOfUserDataObjects[0].percent,
      //   amount: arrayOfUserDataObjects[0].amount,
      //   profit: arrayOfUserDataObjects[0].profit,
      //   start: arrayOfUserDataObjects[0].start,
      //   finish: arrayOfUserDataObjects[0].finish
      // }
      // console.log("After Setting State Data:", state.data[1])
      // console.log("done")
      // console.log(state.data)
      // arrayOfUserDataObjects.forEach((userDataEl) => {
        
      //   const { index } = userDataEl
      //   console.log("jio")
      //   console.log(index)
      //   state.data[index] = { ...state.data[index], plan: userDataEl[index] }
      // })
    },
    
    // setStakedPlanData2: (state, action) => {
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
    // setStakerUserData: (state, action) => {
    //   const { arrayOfUserDataObjects } = action.payload
    //   arrayOfUserDataObjects.forEach((userDataEl) => {
    //     const { index } = userDataEl
    //     state.data.stakedData[index] = { ...userDataEl }
    //   })
    // },
  },
}) 


// Actions
export const { setStakedPlanData } = StakedPlansSlice.actions
// export const { setUserDividendsForClaim } = StakerUserSlice.actions


// Thunks
export const fetchStakedPlansDataAsync = (account) => async (dispatch) => {
  const data = await fetchPlanDeposited(account)

  let  allPlans = []

  const getDetails = async function(address, index){
    const result = await fetchDepositedPlansInfo(address, index).then(nice => {return nice})
    return result
  }
  for (let i = 0; i < parseInt(data); i++) {
    allPlans = allPlans.concat( getDetails(account, i))
  }
  
  await Promise.all(allPlans)
  await Promise.all(allPlans).then(result => (dispatch(setStakedPlanData(  result))))

}


export default  StakedPlansSlice.reducer
