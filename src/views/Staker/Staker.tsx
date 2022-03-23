import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading, Card, Button} from '@pancakeswap-libs/uikit'
import UnlockButton from 'components/UnlockButton'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import styled, { keyframes } from 'styled-components'
import Cookies from 'universal-cookie';
import { Staker } from 'state/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useQueryParam, StringParam } from 'use-query-params';
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, useStakerData, useStakerUserData, useStakedPlansData } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { 
  fetchFarmUserDataAsync, 
  fetchUserDividendsForClaimDataAsync, 
  fetchUserPlanDepositedDataAsync, 
  fetchUserReferalTotalBonusDataAsync, 
  fetchUserTotalDepositDataAsync, 
  fetchUserAllowanceDataAsync, 
  fetchStakedPlansDataAsync,
  fetchTotalStakedDataAsync,
  fetchContractBalanceDataAsync} from 'state/actions'
import {fetchTotalStaked} from 'state/stakeruser/fetchUserStake'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import stakeruser from 'config/constants/stakerUser'
import { AbiItem } from 'web3-utils'
import usdcABI from 'config/abi/usdc.json'
import { getWeb3 } from 'utils/web3'
import { getMetisAddress } from '../../utils/addressHelpers'
import rot13 from '../../utils/encode'
import { isAddress } from '../../utils/web3'
import FarmCard from './components/FarmCard/FarmCard'
import StakedCard from './components/FarmCard/StakedCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'
import WithdrawAction from './components/FarmCard/WithdrawAction'
import ReferralLink from './components/FarmCard/ReferralLink'



const MainText = styled(Heading)`
  text-align: justify;
  justify-content: space-between;
  font-size: 1.25rem;
  color: #042334;
  margin-left: 8px;
  margin-bottom: 10px;
`
const TextHeading = styled(Heading)`
  text-align: justify;
  justify-content: space-between;
  font-size: 1rem;
  color: #042334;
  margin-left: 8px;
  margin-bottom: 4px;
`
const TextValue = styled(Heading)`
  text-align: justify;
  justify-content: space-between;
  font-size: 2rem;
  color: #042334;
  margin-left: 8px;
  margin-bottom: 25px;
`

const TextHeading2 = styled(Heading)`
  text-align: justify;
  justify-content: space-between;
  font-size: 1rem;
  color: #FFFFFF;
  margin-left: 8px;
  margin-bottom: 4px;
`

const TextHeading3 = styled(Heading)`
  text-align: left;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #FFFFFF;
  margin-left: 8px;
  margin-bottom: 8px;
`
const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 2fr
`
const Grid3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.3fr;
`

const NavGrid5 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-content: center;
  margin-bottom: 40px;
  text-align: center;
`

const TopGrid3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
const TopGrid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const Column = styled.div`
margin-right: 10px;
`
const EarningsCard = styled(Card)`
  padding: 24px;
  border-radius: 8px;
  margin-right: 20px;
  margin-left: 8px;
`
const GlobalCard = styled(Card)`
  padding: 24px;
  border-radius: 8px;
  margin-right: 20px;
  margin-left: 8px;
  background: #09d4c7;
`

const ReferralCard = styled(Card)`
padding: 24px;
border-radius: 8px;
background-color: #042334;
`

const NavButton = styled(Button)`
border-radius: 0px;
background-color: #232A34;
height: 40px;
border-radius: 4px;

  &:hover:not(:disabled):not(.button--disabled):not(:active)  {
  background-color: #09d4c7;
}
`

const Actions = styled.div`
  margin-top: 24px;
`
const Stakers: React.FC = () => {
  const { path } = useRouteMatch()

  const staker = useStakerData()
  const TranslateString = useI18n()

  // const farmsLP = useFarms()
  // const cakePrice = usePriceCakeBusd()
  // const bnbPrice = usePriceBnbBusd()

  const cookies = new Cookies();
  const [ref, setNum] = useQueryParam('ref', StringParam);

  if(ref) {
    if(isAddress(rot13(ref))) {
      cookies.set("ref", ref)
    }
  }

  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const stakerUser = useStakerUserData()
  const stakedPool = useStakedPlansData()
  
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
      dispatch(fetchTotalStakedDataAsync())
      dispatch(fetchContractBalanceDataAsync())
  }, [account, dispatch, fastRefresh])

  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
      dispatch(fetchUserDividendsForClaimDataAsync(account))
      dispatch(fetchUserPlanDepositedDataAsync(account))
      dispatch(fetchUserReferalTotalBonusDataAsync(account))
      dispatch(fetchUserTotalDepositDataAsync(account))
      dispatch(fetchUserAllowanceDataAsync(account))
      dispatch(fetchStakedPlansDataAsync(account))
      dispatch(fetchTotalStakedDataAsync())
    
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  // const cakeBalance = getBalanceNumber(useTokenBalance(getMetisAddress()))
  // console.log("hi", cakeBalance)

  // const web3 = getWeb3()
  // const fetchMetisBalance = async(address) => {
  //   const metisContract = new web3.eth.Contract(usdcABI as unknown as AbiItem, getMetisAddress())
  //   const metisBalance = await metisContract.methods.balanceOf(address).call()
  //   return metisBalance
  // }

  // const hi = fetchMetisBalance(account)
  // console.log(hi)



  const renderClaimButton = () => {
      return <WithdrawAction />
  }
  
  let referralBonus = 0

  const stakerList = useCallback(
    (stakersToDisplay) => {
      return stakersToDisplay.map((stakers) => (
        <FarmCard
          staker={stakers}
          currentPercentage = {stakers.currentPercentage}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [ account, ethereum],
  )

  const stakedList = useCallback(
    (stakersToDisplay) => { 
      return stakersToDisplay.map((stakers) => (
        <StakedCard
          staker={stakers}
          currentPercentage = {stakers.currentPercentage}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [ account, ethereum],
  )
    
  const totalReferralBonus = getBalanceNumber(stakerUser.referralBonus) 
  if (!totalReferralBonus) {
    referralBonus = 0
  } else {
    referralBonus = totalReferralBonus
  }

  return (
    <Page>
      <NavGrid5>
        <Column><a href="/"><NavButton>DASHBOARD</NavButton> </a></Column>
        <a href="/"><NavButton>CONTRACT</NavButton> </a>
        <a href="https://convertingcolors.com/rgb-color-35_42_52.html?search=RGB(35,%2042,%2052)"><NavButton>DOCUMENTATION</NavButton> </a>
        <a href="https://convertingcolors.com/rgb-color-35_42_52.html?search=RGB(35,%2042,%2052)"><NavButton>TELEGRAM</NavButton> </a>
        <a href="https://convertingcolors.com/rgb-color-35_42_52.html?search=RGB(35,%2042,%2052)"><NavButton>$MSTAKER</NavButton> </a>
      </NavGrid5>
      <TopGrid3 style = {{marginBottom: "40px", textAlign:"left"}}>
      <Column><MainText style = {{fontSize: "2rem", textAlign:"left"}}> Stake Your Metis and Earn up to 20% Daily</MainText></Column>
      {/* FOR GLOBAL STATS */}
      <Column>
      <GlobalCard>
        <MainText style = {{color: "#FFFFFF", fontSize:"1rem", marginBottom: "20px"}}> Global Stats</MainText>
        <TopGrid2>

          <Column>
          <MainText style = {{color: "#FFFFFF", fontSize:"0.9rem", textAlign: "left", fontWeight: "200"}}> Total Contract Balance</MainText>
          <MainText style = {{color: "#FFFFFF", fontSize:"1rem"}}> {getBalanceNumber(stakerUser.contractBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})}</MainText>
          </Column>
          <Column>
          <MainText style = {{color: "#FFFFFF", fontSize:"0.9rem", textAlign: "left", fontWeight: "200"}}>Total Metis Staked</MainText>
          <MainText style = {{color: "#FFFFFF", fontSize:"1rem"}}> {getBalanceNumber(stakerUser.totalStaked).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})}</MainText>
          </Column>
        </TopGrid2>
      </GlobalCard>
      </Column>

      {/* MEASURE THE USER BALANCE */}
      <Column>      
      <GlobalCard>
        <MainText style = {{color: "#FFFFFF", fontSize:"1rem", marginBottom: "20px"}}> User Wallet Balance</MainText>
        <TopGrid2 style={{  gridTemplateColumns: "1fr 1fr"}}>
          <Column>
            <MainText style = {{color: "#FFFFFF", fontSize:"0.9rem", textAlign: "left", fontWeight: "200"}}>$MSTAKER Price</MainText>
            <MainText style = {{color: "#FFFFFF", fontSize:"1rem"}}>Pending</MainText>
          </Column>
          <Column>
            <MainText style = {{color: "#FFFFFF", fontSize:"0.9rem", textAlign: "left", fontWeight: "200"}}>METIS</MainText>
            <MainText style = {{color: "#FFFFFF", fontSize:"1rem"}}> FETCH BALANCE HERE</MainText>
          </Column>
        </TopGrid2>
      </GlobalCard>
      </Column>
      </TopGrid3>


      <MainText>PACKAGES</MainText>
      <div>
        <FlexLayout>
          <Route>
            {stakerList(staker)}
          </Route>
        </FlexLayout>
      </div>
      <MainText style={{marginTop: "30px"}}>EARNINGS</MainText>
      <Grid2>
      <EarningsCard>
        <TextHeading>Total Metis Staked</TextHeading>
        <TextValue>{getBalanceNumber(stakerUser.totalDeposit)} Metis</TextValue>

        <TextHeading>Available for Withdraw</TextHeading>
        <TextValue>{getBalanceNumber(stakerUser.dividends).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5})} Metis</TextValue>
        
        {!account ? <UnlockButton mt="8px" fullWidth /> : renderClaimButton()}
      </EarningsCard>
      <ReferralCard>
        <TextHeading2>Your Referral Link</TextHeading2>
        <Actions>
        {account ? (
          <div><ReferralLink /></div>
          ) : (
            <div>
            <UnlockButton />
            <MainText size="md">Unlock wallet to get your unique referral link</MainText>
            </div>
          )}
      </Actions>  
      <Grid3 style = {{marginTop: "20px"}}>
        <Column><TextHeading2 style={{textAlign: "left"}}>Total Referral Earned</TextHeading2>
        <TextValue style={{color: "#FFF"}}>{referralBonus.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5})}</TextValue>
        </Column>
        <Column><TextHeading2 style={{textAlign: "left"}}>Total Referral Withdrawn</TextHeading2>
        <TextValue style={{color: "#FFF"}}>{referralBonus.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5})}</TextValue>
        </Column>

        <Column>
        <TextHeading3 style={{textAlign: "left"}}>MetisStaker Referral Information</TextHeading3>
        <TextHeading3 style={{textAlign: "left"}}>You will receive: </TextHeading3>
        <TextHeading3 style={{textAlign: "left"}}>6% from each level 1 referral deposit </TextHeading3>
        <TextHeading3 style={{textAlign: "left"}}>3% from each level 2 referral deposit </TextHeading3>
        <TextHeading3 style={{textAlign: "left"}}>1% from each level 3 referral deposit </TextHeading3>
        <TextHeading3 style={{textAlign: "left"}}>Note! You need to have at least 1 deposit to start receive earnings </TextHeading3>
    
        </Column>

        </Grid3>      
      </ReferralCard>
      </Grid2>

      <MainText style={{marginLeft: "8px", marginTop:"50px"}} >DEPOSITS</MainText>

      <div>
      <FlexLayout style={{justifyContent:"left"}}>
        <Route>
        {stakedPool[0].plan !== null ? stakedList(stakedPool) : <MainText>You have No Deposits!</MainText>}
          {/* {stakedList(stakedPool)} */}
        </Route>
      </FlexLayout>
      </div>
    </Page>
  )
}

export default Stakers
