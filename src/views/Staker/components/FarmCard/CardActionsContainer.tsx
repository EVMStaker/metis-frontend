import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { AbiItem } from 'web3-utils'
import { getWeb3 } from 'utils/web3'
import metisABI from 'config/abi/erc20.json'
import { Button, Flex, Text } from '@pancakeswap-libs/uikit'
import { Staker, StakerUser } from 'state/types'
import { useFarmFromPid, useFarmFromSymbol, useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { useApprove } from 'hooks/useApprove'
import useTokenBalance from 'hooks/useTokenBalance'
import {getMetisAddress} from 'utils/addressHelpers'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'


const Action = styled.div`
  padding-top: 16px;
`


interface FarmCardActionsProps {
  staker: Staker
  stakerUser: StakerUser
  ethereum?: provider
  account?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ staker, stakerUser, ethereum, account }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses, tokenAddresses, isTokenOnly, depositFeeBP } = useFarmFromPid(staker.pid)
  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const tokenAddress = tokenAddresses[process.env.REACT_APP_CHAIN_ID];
  // const isApproved = account && stakerUser.allowance && stakerUser.allowance.isGreaterThan(0)
  const isApproved = true

  // Need to fetch the Token Balance of the User 
  const tokenBalance = new BigNumber(useTokenBalance(getMetisAddress()))
  // console.log(tokenBalance)

  // Need to fetch the Allowance Level of the user 

  const lpContract = useMemo(() => {
    if(isTokenOnly){
      return getContract(ethereum as provider, tokenAddress);
    }
    return getContract(ethereum as provider, lpAddress);
  }, [ethereum, lpAddress, tokenAddress, isTokenOnly])

  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction tokenBalance={tokenBalance} tokenName={staker.name} pid={pid} depositFeeBP={depositFeeBP} />
    ) : (
      <Button mt="8px" fullWidth disabled={requestedApproval} onClick={handleApprove}>
        {TranslateString(999, 'Approve Contract')}
      </Button>
    )
  }

  return (
    <Action>
      {!account ? <UnlockButton mt="8px" fullWidth /> : renderApprovalOrStakeButton()}
    </Action>
  )
}

export default CardActions
