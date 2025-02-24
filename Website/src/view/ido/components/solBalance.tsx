import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { LOCAL_RPC } from '../../../config';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ComponentName = (props?: {}) => {
    const { publicKey, signMessage, disconnect } = useWallet();

    const [balance_SOL, setbalance_SOL]: any = useState('0');
    const getTokenBalance = async () => {
        const _connection = new Connection(LOCAL_RPC);
        if (publicKey && token) {
            try {
                const SOLbalance = await _connection.getBalance(publicKey);
                const balance = Number(SOLbalance / 1e9);
                const truncatedBalance = Math.trunc(balance * 100) / 100;
                setbalance_SOL(truncatedBalance); //  SOL
            } catch (error) {
                console.error(error);
            }
        }
    };
    const token = useSelector((state: any) => state?.token);
    useEffect(() => {
        if (publicKey && token) {
            getTokenBalance();
        }
    }, [publicKey, token]);
    const { t } = useTranslation();

    return (
        <div className="text-[#9B9C9C] text-[12px] text-right">
            {t('138')}：{balance_SOL} SOL
        </div>
    );
};

export default ComponentName;
