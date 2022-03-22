import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading, Card} from '@pancakeswap-libs/uikit'
import UnlockButton from 'components/UnlockButton'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import styled, { keyframes } from 'styled-components'
import { Staker } from 'state/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, useStakerData, useStakerUserData, useStakedPlansData } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { 
  fetchFarmUserDataAsync, 
  fetchUserDividendsForClaimDataAsync, 
  fetchUserPlanDepositedDataAsync, 
  fetchUserReferalTotalBonusDataAsync, 
  fetchUserTotalDepositDataAsync, 
  fetchUserAllowanceDataAsync, 
  fetchStakedPlansDataAsync} from 'state/actions'
  import fetchDepositedPlansInfo from 'state/stakedPlans/fetchUserStakedPlans'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard from './components/FarmCard/FarmCard'
import StakedCard from './components/FarmCard/StakedCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'
import WithdrawAction from './components/FarmCard/WithdrawAction'


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
const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 2fr
`
const EarningsCard = styled(Card)`
  padding: 24px;
  border-radius: 8px;
  margin-right: 20px;
  margin-left: 8px;
`
const ReferralCard = styled(Card)`
padding: 24px;
border-radius: 8px;
background-color: #042334;
`
const Stakers: React.FC = () => {
  const { path } = useRouteMatch()

  const staker = useStakerData()
  const TranslateString = useI18n()

  // const farmsLP = useFarms()
  // const cakePrice = usePriceCakeBusd()
  // const bnbPrice = usePriceBnbBusd()


  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const stakerUser = useStakerUserData()
  const stakedPool = useStakedPlansData()
  console.log("Staker Page: ", stakedPool)
  
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  // const hi = fetchDepositedPlansInfo(account, 0)
  // console.log(hi[0])
  // let stakedPool: string[] = []

  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
      dispatch(fetchUserDividendsForClaimDataAsync(account))
      dispatch(fetchUserPlanDepositedDataAsync(account))
      dispatch(fetchUserReferalTotalBonusDataAsync(account))
      dispatch(fetchUserTotalDepositDataAsync(account))
      dispatch(fetchUserAllowanceDataAsync(account))
      dispatch(fetchStakedPlansDataAsync(account))

    
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  // const stakedPool = fetchDepositedPlansInfo(account)
  // console.log(stakedPool[1])
    // Buttons for Withdrawals
  const renderClaimButton = () => {
      return <WithdrawAction />
  }

  // const stakedPools = stakedPool.filter((farm) => farm.plan === 1)
  // console.log(stakedPools)
  // console.log(typeof (stakedPool))
  // console.log(stakedPool)

  // const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  // const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

  // const stakedOnlyFarms = activeFarms.filter(
  //   (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  // )

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  // const farmsList = useCallback(
  //   (farmsToDisplay, removed: boolean) => {
  //     const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {

  //       const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1).times(new BigNumber(farm.poolWeight)) .div(new BigNumber(10).pow(18))
  //       const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

  //       let apy = cakePrice.times(cakeRewardPerYear);

  //       let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

  //       if (farm.quoteTokenSymbol === QuoteToken.BNB) {
  //         totalValue = totalValue.times(bnbPrice);
  //       }

  //       if(totalValue.comparedTo(0) > 0){
  //         apy = apy.div(totalValue);
  //       }

  //       return { ...farm, apy }
  //     })
  //     return farmsToDisplayWithAPY.map((farm) => (
  //       <FarmCard
  //         key={farm.pid}
  //         farm={farm}
  //         removed={removed}
  //         bnbPrice={bnbPrice}
  //         cakePrice={cakePrice}
  //         ethereum={ethereum}
  //         account={account}
  //       />
  //     ))
  //   },
  //   [bnbPrice, account, cakePrice, ethereum],
  // )

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



  return (
    <Page>
      <Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
        {TranslateString(10000, 'Deposit Fee will be used to buyback EGG')}
        {getBalanceNumber(stakerUser.dividends)}
      </Heading>
      <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/>
      <MainText>PACKAGES</MainText>
      <div>



        <FlexLayout>
          {/* <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route> */}
          <Route>
            {stakerList(staker)}
          </Route>
        </FlexLayout>
      </div>
      <MainText>EARNINGS</MainText>
      <Grid2>
      <EarningsCard>
        <TextHeading>Metis Staked</TextHeading>
        <TextValue>{getBalanceNumber(stakerUser.totalDeposit)} Metis</TextValue>

        <TextHeading>Available for Withdraw</TextHeading>
        <TextValue>{getBalanceNumber(stakerUser.dividends).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5})} Metis</TextValue>
        
        {!account ? <UnlockButton mt="8px" fullWidth /> : renderClaimButton()}
      </EarningsCard>
      <ReferralCard>
        REFERRAL CARD HERE
      </ReferralCard>
      </Grid2>

      <MainText style={{marginLeft: "8px", marginTop:"50px"}} >DEPOSITS</MainText>

      <div>
      <FlexLayout style={{justifyContent:"left"}}>
        <Route>
          {stakedList(stakedPool)}
        </Route>
      </FlexLayout>
      </div>
    </Page>
  )
}

export default Stakers
