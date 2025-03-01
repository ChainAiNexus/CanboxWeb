import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';
import AppRouter from './router';
import { WalletModalProvider as AntDesignWalletModalProvider } from '@solana/wallet-adapter-ant-design';
import { WalletDialogProvider as MaterialUIWalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from './store/reducer';
import Loding from './components/loding';
import cloneIcon from './assets/image/icon32.png';

import './lang/i18n';
import { useTranslation } from 'react-i18next';
import { isMain } from './config';
import { createDelMessageAction } from './store/actions';

require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    // const network = WalletAdapterNetwork.Devnet;
    const network = isMain ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            // new UnsafeBurnerWalletAdapter(),
            new PhantomWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <MaterialUIWalletDialogProvider>
                    <AntDesignWalletModalProvider>
                        <WalletModalProvider>{children}</WalletModalProvider>
                    </AntDesignWalletModalProvider>
                </MaterialUIWalletDialogProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const MessageBox = styled.div`
    position: fixed;
    z-index: 9999;
    top: 58px;
    @media screen and (max-width: 967px) {
        right: 0 !important;
        left: 0;
        text-align: center;
    }
`;

const Content: FC = () => {
    const dispatch = useDispatch();
    let state = useSelector<stateType, stateType>((state) => state);

    return (
        <div className="App">
            <MessageBox>
                {/* <div className="messageItem">
                    <div className="messageConter">
                        <div className="messageConter_content">111111111</div>
                        <img className="clone" src={cloneIcon} alt="" /> 
                    </div>
                </div> */}
                {state?.message?.map((item, index) => (
                    <div className="messageItem" key={index}>
                        <div className="messageConter">
                            <div className="messageConter_content">{item.message}</div>
                            <img
                                className="clone hidden"
                                onClick={() => {
                                    dispatch(createDelMessageAction(item.index));
                                }}
                                src={cloneIcon}
                                alt=""
                            />
                        </div>
                    </div>
                ))}
            </MessageBox>
            <AppRouter />
            {state.showLoding && <Loding></Loding>}
        </div>
    );
};
