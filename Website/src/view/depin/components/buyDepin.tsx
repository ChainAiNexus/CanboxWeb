import React, { useState } from 'react';
import { Connection, Keypair, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, createTransferInstruction } from '@solana/spl-token';
import { LOCAL_RPC } from '../../../config';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { addMessage } from '../../../utils/tool';
import loding2 from '../../../assets/image/loding2.png';
import { createDelMessageAction } from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getSolXPrice, payProduct, payProductCallback } from '../../../API';
import geMint from '../../../utils/nftMint/index10_spl';

interface Props {
    productId: any;
    payNum: any;
    receiveName: any;
    receivePhone: any;
    receiveAddress: any;
    receiveAddress2: any;
    SolXReceiver: any;
    payValue: any;
    callBack: () => void;
}
const App = (props: Props) => {
    const { t } = useTranslation();
    const { publicKey: walletPublicKey } = useWallet();
    const Anchorwallet = useAnchorWallet();

    const handleTransfer = async (_payValue: any) => {
        payProduct({
            productId: props.productId,
            payNum: _payValue,
            // receiveAddress: props.receiveAddress + props.receiveAddress2,
            receiveAddress: props.receiveAddress2,
            receiveName: props.receiveName,
            receivePhone: props.receivePhone,
        })
            .then(async (res: any) => {
                if (res?.code === 200) {
                    localStorage.setItem('receiveName', props.receiveName);
                    localStorage.setItem('receivePhone', props.receivePhone);
                    localStorage.setItem('receiveAddress', props.receiveAddress);
                    localStorage.setItem('receiveAddress2', props.receiveAddress2);
                    try {
                        const _connection = new Connection(LOCAL_RPC);
                        geMint(
                            walletPublicKey,
                            (txId: string) => {
                                handleSendSolX2(res?.data, txId);
                            },
                            _connection,
                            Anchorwallet,
                            Number(_payValue),
                            props?.SolXReceiver,
                            (error?: any) => {
                                setBuyState(1);
                                dispatch(createDelMessageAction(0));

                                addMessage(error?.message || error?.name || 'Transaction error');
                            }
                        );
                    } catch (error: any) {
                        setBuyState(1);
                        dispatch(createDelMessageAction(0));
                        addMessage(error?.message || error?.name || 'Transaction error');
                    }
                } else {
                    setBuyState(1);
                }
            })
            .catch(() => {
                setBuyState(1);
            })
            .finally(() => {});
    };
    const dispatch = useDispatch();

    const handleSendSolX = async () => {
        if (!props.receiveName) {
            dispatch(createDelMessageAction(0));
            addMessage(t('231'));
            return;
        }
        if (!props.receivePhone) {
            dispatch(createDelMessageAction(0));
            addMessage(t('235'));
            return;
        }
        // if (!props.receiveAddress) {
        //     dispatch(createDelMessageAction(0));
        //     addMessage(t('226'));
        //     return;
        // }
        if (!props.receiveAddress2) {
            dispatch(createDelMessageAction(0));
            addMessage(t('230'));
            return;
        }
        if (!walletPublicKey) {
            return;
        }

        setBuyState(2);
        getSolXPrice()
            .then((res: any) => {
                if (res?.code === 200) {
                    const _payValue: any =
                        (props.payValue / res?.data).toString().split('.')[0] +
                        '.' +
                        (props.payValue / res?.data).toString().split('.')[1].substring(0, 6).padEnd(6, '0');

                    handleTransfer(_payValue);
                } else {
                    setBuyState(1);
                }
            })
            .catch(() => {
                setBuyState(1);
            });

        // const _payValue: any = Number(props.payValue / data).toFixed(6);
    };

    const handleSendSolX2 = async (orderId: any, txId: any) => {
        payProductCallback({
            orderId,
            txId,
        })
            .then(async (res: any) => {
                props.callBack();
                setBuyState(1);
            })
            .catch(() => {});
    };

    const waitForTransactionResult = async (connection: any, signature: any, timeout = 30000) => {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            const result = await connection.getTransaction(signature, { commitment: 'confirmed' });
            if (result) {
                if (result.meta && result.meta.err === null) {
                    console.log('Transaction success:', result);

                    addMessage(t('238'));
                    setBuyState(1);
                    props.callBack();
                    return result; // 
                } else if (result.meta && result.meta.err) {
                    addMessage('Transaction error: ' + result.meta.err);
                    throw new Error('Transaction error:' + result.meta.err);
                }
            }
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 
        }
        throw new Error('Transaction timed out');
    };

    const [buyState, setBuyState] = useState(1);

    return (
        <div className="">
            <div
                className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 text-center rounded-full text-[16px] font-[700] mt-[20px]"
                style={{
                    boxShadow: '0px 5px 0px 0px #579B00',
                    display: buyState === 1 ? 'block' : 'none',
                }}
                onClick={handleSendSolX}
            >
                {t('239')}
            </div>
            <div
                className=" items-center justify-center bg-gradient-to-r from-[#fff] to-[#999] py-9 text-center rounded-full text-[16px] font-[700] mt-[20px]"
                style={{ border: '2px solid #A0FF05', display: buyState === 2 ? 'flex' : 'none' }}
            >
                <img src={loding2} className="w-[16px] h-[16px] mr-4 rotate-360" alt="" />
                {t('240')}
            </div>
        </div>
    );
};

export default App;
