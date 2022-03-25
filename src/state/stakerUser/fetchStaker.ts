import { AbiItem } from 'web3-utils'
import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import stakerABI from 'config/abi/staker.json'
import multicall from 'utils/multicall'
import { getStakerAddress } from 'utils/addressHelpers'
import stakerConfig from 'config/constants/staker'
import { getWeb3 } from 'utils/web3'
import { QuoteToken } from '../../config/constants/types'


const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
const web3 = getWeb3()
const stakerContract = new web3.eth.Contract(stakerABI as unknown as AbiItem, getStakerAddress())

const fetchStaker = async () => {
  const data = await Promise.all(
    stakerConfig.map(async (stakersConfig) => {
      // Important Information to Fetch about each Plans
      // Current Daily Percentage (use getPercent with Plan ID as the parameter)
      // Current ROI based on the number of days

      // Get the number of days of the Contract
      const days = stakersConfig.time
    
      // Get the current Percentage of the Plan
      const currentPercent = await stakerContract.methods.getPercent(stakersConfig.pid).call()

      // Get the ROI Percentage of the Plan
      const totalROI = currentPercent * days;

      return {
        ...stakersConfig,
        currentPercent: currentPercent.toString(),
        totalROI: totalROI.toString(),
      }
    }),
  )
  
  return data
}

export default fetchStaker
