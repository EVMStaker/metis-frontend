import { AbiItem } from 'web3-utils'
import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import stakerABI from 'config/abi/staker.json'
import { getWeb3 } from 'utils/web3'
import { getStakerAddress, getMetisAddress, getWbnbAddress } from 'utils/addressHelpers'


const web3 = getWeb3()
const stakerContract = new web3.eth.Contract(stakerABI as unknown as AbiItem, getStakerAddress())
const bnbContract = new web3.eth.Contract(erc20ABI as unknown as AbiItem, getWbnbAddress())
const metisContract = new web3.eth.Contract(erc20ABI as unknown as AbiItem, getMetisAddress())


// Important Information to Fetch About the User
// Total of Deposits of the User
// Total Amount Available for Claim 
// Get Total Number of Pools Deposited into
// Get the Deopsit Info of each Pools that the user has deposited into

// Returns the Dividends Available for Claim including Referral Returns
export const fetchDividendsForClaim = async (account: string) => {

  const dividendsForClaim = await stakerContract.methods.getUserAvailable(account).call()

  return new BigNumber(dividendsForClaim)
}

// Returns the Total Number of Plans that the user has deposited into
export const fetchPlanDeposited = async (account) => {
  const depositPid = await stakerContract.methods.getUserAmountOfDeposits(account).call()

  return depositPid
}

// // Return the Total Amount of Referral Bonus Available for Claim  
export const fetchReferalTotalBonus = async (account) => {
  const totalReferralBonus = await stakerContract.methods.getUserReferralTotalBonus(account).call()

  return new BigNumber(totalReferralBonus)
}

// // Return the Total Amount of Referral Bonus Available for Claim  
export const fetchReferralWithdrawn = async (account) => {
  const totalReferralWithdrawn = await stakerContract.methods.getUserReferralWithdrawn(account).call()

  return new BigNumber(totalReferralWithdrawn)
}

// // Return the Total Deposits that the User has
export const fetchTotalDeposit = async (account) => {
  const totalDeposit = await stakerContract.methods.getUserTotalDeposits(account).call()


  return new BigNumber(totalDeposit)
}

// // Return the Allowance that the User has given to the Contract on their Metis
export const fetchUserAllowance = async (account) => {

  const metisAddress = getMetisAddress()
  const stakerAddress = getStakerAddress()
  // const rawAllowance = await metisContract.methods.allowance(stakerAddress).call()
  const rawAllowance = await bnbContract.methods.allowance(account, stakerAddress).call()
  const parsedAllowance = new BigNumber(rawAllowance  )

  return parsedAllowance
}

export const fetchDepositedPlansInfo = async (account, pid) => {
  
  const length = await stakerContract.methods.getUserAmountOfDeposits(account).call()
  const allPlans: string[] = [];
  for (let i = 0; i < parseInt(length); i++) {
    const promises =  stakerContract.methods.getUserDepositInfo(account, pid).call()
    allPlans.push(promises)
  } 
  await Promise.all(allPlans)
  // console.log(allPlans)
  console.log("hi")
  return allPlans
}
// Fetch the User Deposit Info for Each that they are
export const fetchTotalStaked = async () => {
  const totalStaked = await multicall(stakerABI, [
    {
      address: getStakerAddress(),
      name: 'totalStaked',
    }])

  return new BigNumber(totalStaked)
}

export const fetchContractBalance = async () => {
  const rawBalance = await stakerContract.methods.getContractBalance().call()
  const parsedBalance = new BigNumber(rawBalance)
  return parsedBalance
}

// export const fetchDepositedPlansInfo2 = async (account, pid) => {
  
//   // const length = await stakerContract.methods.getUserAmountOfDeposits(account).call()
//   // const allPlans: string[] = [];
//   // for (let i = 0; i < parseInt(length); i++) {
//   //   const promises =  stakerContract.methods.getUserDepositInfo(account, pid).call()
//   //   allPlans.push(promises)
//   // } 
//   // await Promise.all(plan)

//   console.log("HI")
//   // [plan, percent, amount, profit, start, finish]
//   const plans = stakerContract.methods.getUserDepositInfo(account, pid).call()
//   console.log(plans)
// }
