import React, { useEffect } from 'react';
import login from './index.module.css';
import logoIcon from '../../assets/image/new/logo.png';
import icon1 from '../../assets/image/new/icon1.png';
import icon2 from '../../assets/image/new/icon2.png';
import icon3 from '../../assets/image/new/icon3.png';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const ComponentName = (props?: {}) => {
    const { publicKey, signMessage, disconnect } = useWallet();
    const { setVisible } = useWalletModal();
    const handleConnect = () => {
        if (!publicKey) {
            setVisible(true);
        } else {
            // disconnect();
        }
    };

    useEffect(() => {
        console.log(publicKey?.toString());
    }, [publicKey]);

    return (
        <div className="main_app">
            <div className={`${login.box}`}>
                <div className={`${login.box_logo}`}>
                    <img className={`${login.box_logo_1}`} src={logoIcon} alt="" />
                </div>
                <div className={`${login.box_h1}`}>Hey, let’s get started!</div>
                <div className={`${login.box_h2}`}>👋 Welcome to ChainAI Nexus, please log in to continue.</div>
                <div className={`${login.box_continue}`} onClick={() => handleConnect()}>
                    <img className={`${login.box_continue_img}`} src={icon1} alt="" />
                    <img className={`${login.box_continue_img}`} src={icon2} alt="" />
                    <img className={`${login.box_continue_img}`} src={icon3} alt="" />
                    Continue with Wallets
                </div>
                <div className={`${login.box_h3}`}>
                    If you don’t have an account, linking a wallet will automatically register one for you
                </div>
                <div className={`${login.box_h4}`}>© 2025 ChainAINexus, Inc. All rights reserved.</div>
            </div>
        </div>
    );
};

export default ComponentName;
