import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWithdraw } from 'hooks/useStaker'

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const WithdrawAction: React.FC = () => {
  const TranslateString = useI18n()
  const { onWithdraw } = useWithdraw()

  const renderWithdrawalButtons = () => {
    return <Button style={{backgroundColor: "#042334"}}fullWidth onClick={onWithdraw}>Withdraw Metis</Button>
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" flexDirection="column">
      {renderWithdrawalButtons()}  
      
    </Flex>
  )
}

export default WithdrawAction