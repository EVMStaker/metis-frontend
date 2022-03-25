import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton, Heading} from '@pancakeswap-libs/uikit'
import { communityFarms } from 'config/constants'
import { Staker, StakerUser } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import NewTokenInput from 'components/NewTokenInput'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'



const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
  rgba(255, 0, 0, 1) 0%,
  rgba(255, 154, 0, 1) 10%,
  rgba(208, 222, 33, 1) 20%,
  rgba(79, 220, 74, 1) 30%,
  rgba(63, 218, 216, 1) 40%,
  rgba(47, 201, 226, 1) 50%,
  rgba(28, 127, 238, 1) 60%,
  rgba(95, 21, 242, 1) 70%,
  rgba(186, 12, 248, 1) 80%,
  rgba(251, 7, 217, 1) 90%,
  rgba(255, 0, 0, 1) 100%);
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: #09d4c7;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
  border-radius: 8px;
`
const FlexContainer = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 20px;
`
const DoubleRow = styled.div`
  display: flex;
  flex-direction: column;
`
const DoubleRowCenter= styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`


const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ValueDiv = styled.div`
  background-color: #FFFFFF;
  width: 50%;
  align-items: center;
  background-color: ${(props) => props.theme.colors.input};
  border-radius: ${(props) => props.theme.radii.default};
  display: flex;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
  height: 45px;
  margin-left: 20px;
  color: #042334;
`

const MainText = styled(Heading)`
  text-align: justify;
  justify-content: space-between;
  font-size: 1.25rem;
  color: #FFFFFF;
`
const SubText = styled(Heading)`
  text-align: justify;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #FFFFFF;
`
const TimeTextHeading = styled(Heading)`
  text-align: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #000;
  align-self: center;
  vertical-align: middle;
`
const TimeTextSub = styled(Text)`
  text-align: center;
  justify-content: center;
  font-size: 1rem;
  color: #000;
  align-self: center;
  vertical-align: middle;
  font-weight: 400;
`

const Cicle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: #FFFFFF;
  items-align: center;
  text-align: center;
  display: flex;
  align-self: center;
  justify-content: center;
`
const CicleWrapper = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: #FFFFFF;
  align-self: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
`

interface FarmCardProps {
  staker: Staker
  stakerUser: StakerUser
  ethereum?: provider
  currentPercentage?: string
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ staker, stakerUser,  currentPercentage, ethereum, account }) => {
  const TranslateString = useI18n()

  const parsedDailyPercentage = parseFloat(staker.currentPercent) / 10


  let parsedTotalROI 
  if (staker.pid >= 3 ) {
    parsedTotalROI = ((((1 + parsedDailyPercentage / 100) ** staker.time  ) * 100 ) - 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})
  } else {
    parsedTotalROI = parseFloat(staker.totalROI) / 10 
  }
  // const parsedTotalROI = parseFloat(staker.totalROI) / 10 

  const [val, setVal] = useState('')

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  return (
    <FCard>
      <FlexContainer>
        <MainText>{staker.name.toUpperCase()}</MainText>
        <MainText>{staker.type.toUpperCase()}</MainText>
      </FlexContainer>

      <FlexContainer>
        <DoubleRow>
        <SubText>Daily Earnings</SubText>
        <MainText>{parsedDailyPercentage}%</MainText>
        </DoubleRow>
        <DoubleRow>
        <SubText>Total ROI</SubText>
        <MainText style = {{textAlign:"right"}}>{parsedTotalROI}%</MainText>
        </DoubleRow>
      </FlexContainer>

      <CicleWrapper>
      <Cicle>
      <DoubleRowCenter>
        <TimeTextHeading>{staker.time}</TimeTextHeading>
        <TimeTextSub>days</TimeTextSub>
        </DoubleRowCenter>
      </Cicle>
      </CicleWrapper>

      <FlexContainer style={{marginBottom:"0px"}}>
      <NewTokenInput
        value={val} onChange={handleChange}
        symbol= "METIS"
      />

        <ValueDiv>
        <Heading>{(parseFloat(val) * parsedTotalROI / 100 + parseFloat(val)).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
          })}
          </Heading>
        </ValueDiv>
      </FlexContainer>
    
 
      <CardActionsContainer staker={staker} stakerUser = {stakerUser} ethereum={ethereum} account={account} />
    </FCard>
  )
}

export default FarmCard
