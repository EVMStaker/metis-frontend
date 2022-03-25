import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance, fetchUserDividendsForClaimDataAsync } from 'state/actions'
import { invest, withdraw } from 'utils/callHelpers'
import { useStaker} from './useContract'

export const useInvest = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const stakerContract = useStaker()

  const handleInvest = useCallback(
    async (amount: string) => {
      const txHash = await invest(stakerContract,  pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, stakerContract, pid],
  )

  return { onInvest: handleInvest }
}



export const useWithdraw = () => {
    const dispatch = useDispatch()
    const { account } = useWallet()
    const stakerContract = useStaker()
  
    const handleWithdraw = useCallback(
      async () => {
        const txHash = await withdraw(stakerContract, account)
        dispatch(fetchUserDividendsForClaimDataAsync(account))
        console.info(txHash)
      },
      [account, dispatch, stakerContract],
    )
  
    return { onWithdraw: handleWithdraw }
  }
  
