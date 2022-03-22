import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import stakerABI from 'config/abi/staker.json'
import { getWeb3 } from 'utils/web3'
import { getStakerAddress, getMetisAddress, getWbnbAddress } from 'utils/addressHelpers'
import { StakedPlanState, StakedPlan} from '../types'


const web3 = getWeb3()
const stakerContract = new web3.eth.Contract(stakerABI as unknown as AbiItem, getStakerAddress())
const bnbContract = new web3.eth.Contract(erc20ABI as unknown as AbiItem, getWbnbAddress())
const metisContract = new web3.eth.Contract(erc20ABI as unknown as AbiItem, getMetisAddress())

// // Returns the Total Number of Plans that the user has deposited into
// export const fetchPlanDeposited = async (account) => {
//   const depositPid = await stakerContract.methods.getUserAmountOfDeposits(account).call()

//   return depositPid
// }


// // // Return the Total Deposits that the User has
// export const fetchTotalDeposit = async (account) => {
//   const totalDeposit = await stakerContract.methods.getUserTotalDeposits(account).call()


//   return new BigNumber(totalDeposit)
// }

 const fetchDepositedPlansInfo = async (account, pid) => {
  
  // const length = await stakerContract.methods.getUserAmountOfDeposits(account).call()
  // const allPlans: string[] = [];
  // for (let i = 0; i < parseInt(length); i++) {
  //   const promises =  stakerContract.methods.getUserDepositInfo(account, pid).call()
  //   allPlans.push(promises)
  // } 
  // await Promise.all(plan)


  // [plan, percent, amount, profit, start, finish]
  const plans = await stakerContract.methods.getUserDepositInfo(account, pid).call()

  // console.log(plans)

    return { 
    plan: plans[0],
    percent: plans[1],
    amount: plans[2],
    profit: plans[3],
    start: plans[4],
    finish: plans[5],
    }

}

const fetchDepositedPlansInfo2 = async (account) => {
  
  const length = await stakerContract.methods.getUserAmountOfDeposits(account).call()
  const allPlans: string[] = [];
  for (let i = 0; i < parseInt(length); i++) {
    const promises =  stakerContract.methods.getUserDepositInfo(account, i).call()
    allPlans.push(promises)
  } 
  await Promise.all(allPlans)

  // console.log("HI")
  // console.log(allPlans)

  // // [plan, percent, amount, profit, start, finish]
  // const plans = await stakerContract.methods.getUserDepositInfo(account, pid).call()
  // console.log(plans)
  //   return { 
  //   plan: plans[0],
  //   percent: plans[1],
  //   amount: plans[2],
  //   profit: plans[3],
  //   start: plans[4],
  //   finish: plans[5],
  //   }

  return allPlans

}

// fetchDepositedPlansInfo("0xb73E8cc008B4019b3AD5CA1e600235D405b20bA7", 0)

export default fetchDepositedPlansInfo

// fetchUserAllowance("0xb73E8cc008B4019b3AD5CA1e600235D405b20bA7")