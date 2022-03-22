import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useInvest } from 'hooks/useStaker'
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'


interface FarmCardActionsProps {
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  depositFeeBP?: number
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({ tokenBalance, tokenName, pid, depositFeeBP}) => {
  const TranslateString = useI18n()
  const { onStake } = useInvest(pid)
  // const { onUnstake } = useUnstake(pid)

  const [onPresentDeposit] = useModal(<DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} depositFeeBP={120} />)

  const renderStakingButtons = () => {
    return (
      <Button fullWidth style={{backgroundColor: '#042334'}} onClick={onPresentDeposit}> {TranslateString(999, 'Despoit Metis')}</Button>

    )}

  return (
    <Flex justifyContent="space-between" alignItems="center">
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
