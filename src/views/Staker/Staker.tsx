import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import { Staker } from 'state/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, useStakerData, useStakerUserData } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

export interface FarmsProps{
  tokenMode?: boolean
}

const Stakers: React.FC = () => {
  const { path } = useRouteMatch()

  const staker = useStakerData()
  const TranslateString = useI18n()

  // const farmsLP = useFarms()
  // const cakePrice = usePriceCakeBusd()
  // const bnbPrice = usePriceBnbBusd()

  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const stakerUser = useStakerUserData()
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
      
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

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

  return (
    <Page>
      <Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
        {TranslateString(10000, 'Deposit Fee will be used to buyback EGG')}
      </Heading>
      <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/>
      <div>
        <Divider />


        <FlexLayout>
          {/* <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route> */}
          <Route>
            {stakerList(staker)}
          </Route>
        </FlexLayout>
      </div>
    </Page>
  )
}

export default Stakers
