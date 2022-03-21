import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import erc20ABI from 'config/abi/erc20.json'
import stakerABI from 'config/abi/staker.json'
import multicall from 'utils/multicall'
import stakerConfig from 'config/constants/farms'
import { getWeb3 } from 'utils/web3'
import { getStakerAddress, getMetisAddress, getWbnbAddress } from 'utils/addressHelpers'


const web3 = getWeb3()
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
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
export const fetchPlanDeposited = async (account: string) => {
  const depositPid = await stakerContract.methods.getUserAmountOfDeposits(account).call()

  return depositPid
}

// Return the Total Amount of Referral Bonus Available for Claim  
export const fetchReferalTotalBonus = async (account: string) => {
  const totalReferralBonus = await stakerContract.methods.getUserReferralTotalBonus(account).call()
  return new BigNumber(totalReferralBonus)
}

// Return the Total Deposits that the User has
export const fetchTotalDeposit = async (account: string) => {
  const totalDeposit = await stakerContract.methods.getUserTotalDeposits(account).call()
  return new BigNumber(totalDeposit)
}

// Return the Allowance that the User has given to the Contract on their Metis
export const fetchUserAllowance = async (account: string) => {

  const metisAddress = getMetisAddress()
  const stakerAddress = getStakerAddress()
  // const rawAllowance = await metisContract.methods.allowance(stakerAddress).call()
  const rawAllowance = await bnbContract.methods.allowance(stakerAddress).call()
  const parsedAllowance = new BigNumber(rawAllowance).toJSON()

  return parsedAllowance
}

// // Fetch the User Deposit Info for Each that they are
// export const fetchFarmUserStakedBalances = async (account: string) => {
//   const masterChefAdress = getMasterChefAddress()

//   const calls = farmsConfig.map((farm) => {
//     return {
//       address: masterChefAdress,
//       name: 'userInfo',
//       params: [farm.pid, account],
//     }
//   })

//   const rawStakedBalances = await multicall(masterchefABI, calls)
//   const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
//     return new BigNumber(stakedBalance[0]._hex).toJSON()
//   })
//   return parsedStakedBalances
// }


// export const fetchFarmUserAllowances = async (account: string) => {
//   const masterChefAdress = getMasterChefAddress()

//   const calls = farmsConfig.map((farm) => {
//     const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
//     return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAdress] }
//   })

//   const rawLpAllowances = await multicall(erc20ABI, calls)
//   const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
//     return new BigNumber(lpBalance).toJSON()
//   })
//   return parsedLpAllowances
// }

// export const fetchFarmUserTokenBalances = async (account: string) => {
//   const calls = farmsConfig.map((farm) => {
//     const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
//     return {
//       address: lpContractAddress,
//       name: 'balanceOf',
//       params: [account],
//     }
//   })

//   const rawTokenBalances = await multicall(erc20ABI, calls)
//   const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
//     return new BigNumber(tokenBalance).toJSON()
//   })
//   return parsedTokenBalances
// }

// export const fetchFarmUserStakedBalances = async (account: string) => {
//   const masterChefAdress = getMasterChefAddress()

//   const calls = farmsConfig.map((farm) => {
//     return {
//       address: masterChefAdress,
//       name: 'userInfo',
//       params: [farm.pid, account],
//     }
//   })

//   const rawStakedBalances = await multicall(masterchefABI, calls)
//   const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
//     return new BigNumber(stakedBalance[0]._hex).toJSON()
//   })
//   return parsedStakedBalances
// }

// export const fetchFarmUserEarnings = async (account: string) => {
//   const masterChefAdress = getMasterChefAddress()

//   const calls = farmsConfig.map((farm) => {
//     return {
//       address: masterChefAdress,
//       name: 'pendingEgg',
//       params: [farm.pid, account],
//     }
//   })

//   const rawEarnings = await multicall(masterchefABI, calls)
//   const parsedEarnings = rawEarnings.map((earnings) => {
//     return new BigNumber(earnings).toJSON()
//   })
//   return parsedEarnings
// }
