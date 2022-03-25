import React, { useState } from 'react'
import { Input, Heading, Button, ToastContainer } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import rot13 from '../../../../utils/encode'

const StyleInput = styled(Input)`
    margin-top: 10px;
    color: #FFFFFF;
    font-color: #FFFFFF;
`

const ReferralLink = () => {
    const { account }: { account: string } = useWallet()
    const [toasts, setToasts] = useState([]);

    const handleClick = (description = "") => {
        const now = Date.now();
        const randomToast = {
            id: `id-${now}`,
            title: `Copied`,
            description,
            type: "success",
        };

        setToasts((prevToasts) => [randomToast, ...prevToasts]);
    };

    const handleRemove = (id: string) => {
        setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id));
    };

    return (
        <div>
            <StyleInput type="text" scale="md" value={`https://metis.evm-staker.com/?ref=${rot13(account)}`} readOnly />
            <CopyToClipboard text={`https://metis.evm-staker.com/?ref=${rot13(account)}`} onCopy={() => { handleClick() }}>
                <Button variant="primary" style= {{border:"solid 3px #FFFFFF", marginLeft: "14px"}}mt="8px">Copy</Button>
            </CopyToClipboard>
            <ToastContainer toasts={toasts} onRemove={handleRemove} />
        </div>
    )

}

export default ReferralLink