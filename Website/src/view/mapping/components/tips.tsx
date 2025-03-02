import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import icon32 from '../../../assets/image/icon32.png';
import solLogo from '../../../assets/image/solLogo.png';
import { Modal } from 'antd';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { LOCAL_RPC } from '../../../config';
import { useWallet } from '@solana/wallet-adapter-react';
import loding2 from '../../../assets/image/loding2.png';
import { addMessage } from '../../../utils/tool';
import { Buffer } from 'buffer';

interface Props {
    chartingInfo: any;
}
const ComponentName = (props: Props) => {
    window.Buffer = Buffer;
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [buyNumber, setBuyNumber]: any = useState();
    const [balance_SOL, setbalance_SOL] = useState('0');
    const { publicKey } = useWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getTokenBalance = async () => {
        const _connection = new Connection(LOCAL_RPC);
        if (publicKey) {
            try {
                const SOLbalance = await _connection.getBalance(publicKey);
                setbalance_SOL(Number(SOLbalance / 1e9).toFixed(4)); //  SOL
            } catch (error) {
                console.error(error);
            }
        }
    };
    useEffect(() => {
        if (publicKey) {
            getTokenBalance();
        }
    }, [getTokenBalance, publicKey]);

    const [buyState, setBuyState]: any = useState(1);
    const handleTransfer = async () => {
        if (!publicKey || !buyNumber) {
            return;
        }
        try {
            // 
            const connection = new Connection(LOCAL_RPC);
            setBuyState(2);

            // 2. 
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(props?.chartingInfo?.chartingReceiveAddress),
                    lamports: Math.floor(
                        parseFloat(JSON.stringify(buyNumber * (props?.chartingInfo?.chartingPrice || 0) * 1e9))
                    ), //  lamports
                })
            );
            let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
            transaction.feePayer = publicKey;
            transaction.recentBlockhash = blockhash;

            // 3. 
            const { signature } = await window.solana.signAndSendTransaction(transaction);
            await connection.confirmTransaction(signature, 'singleGossip');

            setBuyState(3);
            addMessage(t('161'));
            setOpen(false);
            console.log(`hash: ${signature}`);
        } catch (error: any) {
            setBuyState(1);
            setOpen(false);
            addMessage(error?.message);
            console.error(error?.message);
        }
    };

    return (
        <div>
            <div
                className="flex items-center text-[#fff] text-[12px] pt-20 justify-center"
                style={{ display: publicKey ? 'flex' : 'none' }}
            >
                <svg
                    className="mr-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path
                        d="M6.41978 9.69548H7.82551C7.90421 9.69548 7.96803 9.63165 7.96803 9.55295V9.54803L7.92482 8.28765C7.92229 8.21462 7.93854 8.14217 7.972 8.07721C8.00546 8.01226 8.05502 7.95697 8.11595 7.91663C9.18555 7.20762 9.84128 6.01282 9.84128 4.70582C9.84128 2.57997 8.11794 0.856629 5.9922 0.856629C3.86634 0.856629 2.143 2.57997 2.143 4.70582C2.143 6.01305 2.79919 7.20821 3.86903 7.91698C3.92586 7.95459 3.97288 8.00524 4.00617 8.06471C4.03945 8.12417 4.05805 8.19073 4.0604 8.25884L4.10502 9.55764C4.10759 9.63446 4.1706 9.69536 4.24755 9.69536H5.5645V6.80006L4.54021 5.71184C4.37836 5.5398 4.38656 5.26914 4.5586 5.10717C4.73064 4.94532 5.00129 4.95352 5.16326 5.12556L6.01012 6.02547L6.98158 5.10776C7.15339 4.94556 7.42404 4.95329 7.58624 5.12498C7.74844 5.29667 7.74071 5.56732 7.56903 5.72964L6.4199 6.81482V9.69548H6.41978ZM10.6966 4.70594C10.6977 6.19903 9.98919 7.60382 8.78772 8.49014L8.82297 9.51875C8.82756 9.65261 8.80515 9.78603 8.75709 9.91105C8.70903 10.0361 8.63629 10.1501 8.54321 10.2464C8.45014 10.3428 8.33862 10.4193 8.21532 10.4716C8.09202 10.524 7.95944 10.5509 7.82551 10.5509H4.24719C3.70941 10.551 3.26835 10.1247 3.24985 9.58715L3.21261 8.50197C2.00176 7.61647 1.28643 6.20606 1.2876 4.70594C1.2876 2.10764 3.39402 0.00134277 5.9922 0.00134277C8.59026 0.00134277 10.6966 2.10764 10.6966 4.70594ZM4.70909 11.9765C4.47287 11.9765 4.28139 11.785 4.28139 11.5488C4.28139 11.3127 4.47287 11.1212 4.70909 11.1212H7.27518C7.5114 11.1212 7.70289 11.3127 7.70289 11.5488C7.70289 11.785 7.5114 11.9765 7.27518 11.9765H4.70909Z"
                        fill="white"
                    />
                </svg>
                {t('51_1')}
                <span className="text-[#BAFE03] text-[16px] font-bold mx-6">{props.chartingInfo?.chartingNum}</span>
                <span
                    className="text-[#BAFE03] text-[12px] underline"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    {t('51_2')}
                </span>
            </div>

            <Modal
                width={338}
                open={open}
                onCancel={() => {
                    setOpen(false);
                    Modal.destroyAll();
                }}
                centered={true}
                closable={false}
                footer={null}
                title={null}
                style={{
                    border: '2px solid #fff',
                    background: '#080A05',
                    borderRadius: '8px',
                    paddingBottom: '0px',
                }}
                destroyOnClose={true}
            >
                <div className="relative px-16 py-[30px]">
                    <div
                        className="w-[20px] h-[20px] absolute top-[20px] right-[20px]"
                        style={{
                            backgroundImage: `url(${icon32})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                        }}
                        onClick={() => {
                            setOpen(false);
                            Modal.destroyAll();
                        }}
                    ></div>
                    <div className="leading-[16px] text-[#BAFE03] text-[18px] font-[600]">{t('51_3')}</div>
                    <div className="text-[#fff] text-[16px] pt-24 pb-8">{t('51_4')}</div>
                    <div
                        className="flex items-center pr-16 rounded-2xl"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}
                    >
                        <input
                            type="number"
                            onChange={(e: any) => {
                                if (Number(e.target.value) > 50) {
                                    setBuyNumber(50);
                                    return;
                                }
                                setBuyNumber(Number(e.target.value).toFixed(0));
                            }}
                            value={buyNumber}
                            className="flex-1 py-16 pl-16 text-[#fff] text-[12px]"
                            style={{ background: 'none' }}
                            placeholder={t('51_5')}
                        />
                        <span
                            className="text-[#BAFE03] text-[12px]"
                            onClick={() => {
                                setBuyNumber(50);
                            }}
                        >
                            {t('51_6')}
                        </span>
                    </div>
                    <div className="text-[#fff] text-[16px] pt-24 pb-8">{t('51_7')}</div>
                    <div
                        className="flex items-center pr-16 rounded-2xl p-[16px]"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}
                    >
                        <img src={solLogo} className="w-[24px] h-[24px] rounded-full" alt="" />
                        <div className="flex-1 text-right text-[#fff] text-[14px] font-[500]">
                            {Number(buyNumber * props?.chartingInfo?.chartingPrice || 0)}
                        </div>
                        <span className="text-[#BAFE03] text-[12px] ml-6">SOL</span>
                    </div>
                    <div className="text-[#fff] text-[12px] text-right pt-2">
                        {t('51_8')}：{balance_SOL} SOL
                    </div>
                    <div
                        className="bg-gradient-to-b block from-[#9CF021] to-[#DBF95C] py-10 my-22 text-center rounded-full text-[16px] font-[700]"
                        style={{ boxShadow: '0px 5px 0px 0px #579B00', display: buyState === 1 ? 'block' : 'none' }}
                        onClick={handleTransfer}
                    >
                        {t('51_9')}
                    </div>
                    <div
                        className=" items-center justify-center bg-gradient-to-r from-[#fff] to-[#999]  my-22 py-9 text-center rounded-full text-[16px] font-[700]"
                        style={{ border: '2px solid #A0FF05', display: buyState === 2 ? 'flex' : 'none' }}
                    >
                        <img src={loding2} className="w-[16px] h-[16px] mr-4 rotate-360" alt="" />
                        {t('50')}
                    </div>
                    <div className="flex items-start text-[#fff] text-[12px] justify-center">
                        <svg
                            className="mr-6 relative top-[4px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                        >
                            <g clip-path="url(#clip0_975_675)">
                                <path
                                    d="M6 0C2.68649 0 0 2.68649 0 6C0 9.31351 2.68649 12 6 12C9.31351 12 12 9.31351 12 6C12 2.68649 9.31351 0 6 0ZM6 10.7748C3.36216 10.7748 1.22523 8.63784 1.22523 6C1.22523 3.36216 3.36216 1.22523 6 1.22523C8.63784 1.22523 10.7748 3.36216 10.7748 6C10.7748 8.63784 8.63784 10.7748 6 10.7748Z"
                                    fill="white"
                                />
                                <path
                                    d="M5.99982 4.41406C5.66108 4.41406 5.38721 4.68794 5.38721 5.02668V8.8465C5.38721 9.18523 5.66108 9.45911 5.99982 9.45911C6.33856 9.45911 6.61243 9.18523 6.61243 8.8465V5.02668C6.61243 4.68794 6.33856 4.41406 5.99982 4.41406Z"
                                    fill="white"
                                />
                                <path
                                    d="M5.38721 3.15363C5.38721 3.3161 5.45175 3.47192 5.56664 3.58681C5.68152 3.7017 5.83734 3.76624 5.99982 3.76624C6.16229 3.76624 6.31812 3.7017 6.433 3.58681C6.54789 3.47192 6.61243 3.3161 6.61243 3.15363C6.61243 2.99115 6.54789 2.83533 6.433 2.72045C6.31812 2.60556 6.16229 2.54102 5.99982 2.54102C5.83734 2.54102 5.68152 2.60556 5.56664 2.72045C5.45175 2.83533 5.38721 2.99115 5.38721 3.15363Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_975_675">
                                    <rect width="12" height="12" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {t('50_1')}
                        {props?.chartingInfo?.chartingPrice || 0} SOL
                        {t('51')}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ComponentName;
