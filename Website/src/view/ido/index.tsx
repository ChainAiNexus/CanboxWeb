import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../components/footer';
import loding2 from '../../assets/image/loding2.png';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { LOCAL_RPC, usdt_receiver } from '../../config';
import { addMessage, formatTimestamp } from '../../utils/tool';
import home_11 from '../../assets/image/home_11.png';
import home_4_1 from '../../assets/image/4.png';
import home_4 from '../../assets/image/4_1.png';
import H5Top from '../../components/hander';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getIdoBaseInfo, getIdoBuyRecord, getIdoPay, getUserInfo } from '../../API/ido';
import copy from 'copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { createDelMessageAction } from '../../store/actions';
import SolBakabce from './components/solBalance';
import geMint from '../../utils/nftMint/index13';
import { Modal } from 'antd';
import icon32 from '../../assets/image/icon32.png';

const ComponentName = (props?: {}) => {
    window.Buffer = Buffer;
    const { publicKey, signMessage, disconnect } = useWallet();
    const [buyNumber, setBuyNumber]: any = useState();
    const [buyState, setBuyState] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (publicKey) {
            // setBuyState(1);
        } else {
            setBuyState(0);
        }
    }, [publicKey]);
    const { setVisible } = useWalletModal();
    const token = useSelector((state: any) => state?.token);

    const [balance_SOL, setbalance_SOL] = useState('0');
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
        if (publicKey && token) {
            getTokenBalance();
        }
    }, [publicKey, token]);

    const { connection } = useConnection();
    const Anchorwallet = useAnchorWallet();
    const [idoTransferNum, setIdoTransferNum] = useState(-1);
    const handleTransfer = async () => {
        if (!buyNumber) {
            return;
        }
        if (!publicKey || idsInfo?.status === 0) {
            return;
        }
        if (balance_SOL < buyNumber) {
            dispatch(createDelMessageAction(0));
            addMessage(t('137_1'));
            return;
        }
        if (buyNumber < idsInfo?.minNum || buyNumber > idsInfo?.maxNum) {
            dispatch(createDelMessageAction(0));
            addMessage(t('137'));
            return;
        }
        setBuyState(2);
        geMint(publicKey, connection, Anchorwallet, successColl, buyNumber, catchColl);
        return;

        // try {
        //  Solana Devnet
        // const connection = new Connection(LOCAL_RPC);
        // setBuyState(2);

        // 2. 
        // const transaction = new Transaction().add(
        //     SystemProgram.transfer({
        //         fromPubkey: publicKey,
        //         toPubkey: new PublicKey(idsInfo?.receiveAddress),
        //         lamports: Math.floor(parseFloat(buyNumber) * 1e9), //  lamports
        //     })
        // );
        // let blockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        // transaction.feePayer = publicKey;
        // transaction.recentBlockhash = blockhash;

        // 3. 
        // const { signature } = await window.solana.signAndSendTransaction(transaction);
        // await connection.confirmTransaction(signature, 'processed');

        // setIdoTransferNum(buyNumber);
        // setBuyState(-1);
        // addMessage(t('144'));
        // setTimeout(() => {
        //     handleLoad();
        // }, 5000);
        // console.log(`hash: ${signature}`);
        // } catch (error: any) {
        //     setBuyState(1);
        // addMessage(error?.message);
        // console.error(error?.message);
        // }
    };

    const successColl = () => {
        setIdoTransferNum(buyNumber);
        setBuyState(-1);
        addMessage(t('144'));
        setTimeout(() => {
            handleLoad();
        }, 5000);
    };

    const catchColl = (error: any) => {
        setBuyState(1);
        const keywords = ['Blockhash', 'BlockHeight', 'Simulation failed'];
        if (error && error.message && keywords.some((keyword) => error.message.includes(keyword))) {
            setOpen2(true);
        } else {
            addMessage(error?.message || error?.name || 'RPC request timeout, try again later');
        }
    };

    const [countdown, setCountdown] = useState<any>(['00', '00', '00', '00']);
    const [targetTimestamp, setTargetTimestamp] = useState(Date.now());
    useEffect(() => {
        // const _targetTimestamp = Date.now() + (24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000 + 6 * 60 * 1000 + 55 * 1000); // 15655
        if (Date.now() >= targetTimestamp) {
            setCountdown(['00', '00', '00', '00']);
            return;
        }
        const timer = setInterval(() => {
            const formattedTime = formatTimestamp(targetTimestamp);
            setCountdown(formattedTime);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [targetTimestamp]);
    const { t } = useTranslation();

    const [idsInfo, setIdsInfo]: any = useState();
    const handleLoad = () => {
        getIdoBaseInfo()
            .then((res: any) => {
                setIdsInfo(res.data);
                // 0- 1- 2- 3-token
                if (res.data.status === 0) {
                    setBuyState(3);
                    setTargetTimestamp(res.data.startTime);
                } else if (res.data.status === 1) {
                    setTargetTimestamp(res.data.endTime);
                } else if (res.data.status === 2) {
                    setBuyState(-1);
                    setTargetTimestamp(Date.now());
                } else {
                    setBuyState(-1);
                    setTargetTimestamp(Date.now());
                }
            })
            .catch((error: any) => {});
    };
    useEffect(() => {
        handleLoad();
        handleGetIdoBuyRecord();
        if (token) {
            handleGetIdoBuyRecord();
        }
    }, [token]);

    const [userInfo, setUserInfo]: any = useState();
    const [isLoadOk, setIsLoadOk] = useState(false);
    const handleGetIdoBuyRecord = () => {
        setIdoTransferNum(-1);
        getIdoBuyRecord()
            .then((res: any) => {
                if (res?.data?.buyNum > 0) {
                    setBuyState(-1);
                    setIdoTransferNum(res?.data?.buyNum);
                }
                setIsLoadOk(true);

                getUserInfo()
                    .then((res: any) => {
                        setUserInfo(res.data);
                    })
                    .catch((error: any) => {});
            })
            .catch((error: any) => {});
    };

    const dispatch = useDispatch();
    const handleShar = () => {
        if (!publicKey) return;
        const _url = window.origin + '?' + encodeURIComponent('inviteCode=' + userInfo?.inviteCode);
        copy(_url);
        dispatch(createDelMessageAction(0));
        addMessage(t('111'));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const num = parseFloat(value);
        const truncatedValue = Math.trunc(num * 100) / 100;
        setBuyNumber(truncatedValue.toString());
        if (truncatedValue > idsInfo?.maxNum) {
            setBuyNumber(idsInfo?.maxNum);
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    const [open2, setOpen2] = useState(false);

    return (
        <div>
            <H5Top />
            <div className="mx-20">
                <div className=" pt-[10px]"></div>
                <div
                    className="py-20 px-24 rounded-lg bg-[#161A19]"
                    style={{
                        border: '1px solid rgba(255, 255, 255, 0.20)',
                        backgroundImage: 'url(' + home_4_1 + ')',
                        backgroundPosition: 'top',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="text-center text-[#BAFE03] text-[18px] font-[600]">{t('59')}</div>
                    <div className="flex items-center justify-center my-22 ">
                        {/* ：22F1BD，：BAFE03 */}
                        <div
                            className=" bg-[#000] text-[#22F1BD] px-8 py-17 rounded-lg text-[28px] font-[600]"
                            style={{
                                border: '1px solid rgba(255, 255, 255, 0.20)',
                                color: idsInfo?.status === 0 ? '#22F1BD' : '#BAFE03',
                            }}
                        >
                            {countdown[0]}
                        </div>
                        <div
                            className=" text-[28px] font-[600] mx-6"
                            style={{
                                color: idsInfo?.status === 0 ? '#22F1BD' : '#BAFE03',
                            }}
                        >
                            :
                        </div>
                        <div
                            className=" bg-[#000] px-8 py-17 rounded-lg text-[28px] font-[600]"
                            style={{
                                border: '1px solid rgba(255, 255, 255, 0.20)',
                                color: idsInfo?.status === 0 ? '#22F1BD' : '#BAFE03',
                            }}
                        >
                            {countdown[1]}
                        </div>
                        <div
                            className=" text-[28px] font-[600] mx-6"
                            style={{
                                color: idsInfo?.status === 0 ? '#22F1BD' : '#BAFE03',
                            }}
                        >
                            :
                        </div>
                        <div
                            className=" bg-[#000] px-8 py-17 rounded-lg text-[28px] font-[600]"
                            style={{
                                border: '1px solid rgba(255, 255, 255, 0.20)',
                                color: idsInfo?.status === 0 ? '#22F1BD' : '#BAFE03',
                            }}
                        >
                            {countdown[2]}
                        </div>
                        <div
                            className=" text-[28px] font-[600] mx-6"
                            style={{
                                color: idsInfo?.status === 0 ? '#22F1BD' : '#BAFE03',
                            }}
                        >
                            :
                        </div>
                        <div
                            className=" bg-[#000] px-8 py-17 rounded-lg text-[28px] font-[600]"
                            style={{
                                border: '1px solid rgba(255, 255, 255, 0.20)',
                                color: idsInfo?.status === 0 ? '#22F1BD' : '#BAFE03',
                            }}
                        >
                            {countdown[3]}
                        </div>
                    </div>
                    <div
                        className="h-12 bg-gradient-to-r from-[#0D1114] to-[#242928] rounded-lg relative"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}
                    >
                        <div
                            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#DBF95C] to-[#9CF021] rounded-lg "
                            style={{ width: Math.min((idsInfo?.soldNum / idsInfo?.totalSupply) * 100, 100) + '%' }}
                        ></div>
                    </div>
                    <div className="text-right text-[#BAFE03] text-[12px] font-[500] mt-4 mb-14">
                        {idsInfo?.soldNum}/{(idsInfo?.totalSupply || 0).toLocaleString('en-US')} Sol
                    </div>
                    <div className="flex items-center">
                        <div className="text-[#fff] text-[14px] font-[400]">{t('60')}:</div>
                        <div
                            className="flex-1 text-right text-[14px] font-[600] "
                            style={{ color: idsInfo?.status === 0 ? '#22F1BD' : '#BAFE03' }}
                        >
                            {/*   0- 1- 2- 3-token */}
                            {idsInfo?.status === 0
                                ? t('61')
                                : idsInfo?.status === 1
                                ? t('62')
                                : idsInfo?.status === 2
                                ? t('63')
                                : t('64')}
                            {/* {t('61')}：22F1BD，：BAFE03 */}
                            {/* {t('62')} */}
                            {/* {t('63')} */}
                            {/* token{t('64')} */}
                        </div>
                    </div>
                    <div className="flex items-center pt-10">
                        <div className="text-[#fff] text-[14px] font-[400]">{t('65')}:</div>
                        <div className="flex-1 text-right text-[14px] font-[600] text-[#fff]">
                            {idsInfo?.joinUserNum || 0}
                        </div>
                    </div>
                    <div className="flex items-center pt-10">
                        <div className="text-[#fff] text-[14px] font-[400]">{t('66')}:</div>
                        <div className="flex-1 text-right text-[14px] font-[600] text-[#fff]">
                            {(idsInfo?.pricing || 0).toLocaleString('en-US')} SOLX = 1 SOL
                        </div>
                    </div>
                    <div className="">
                        <div
                            className=" items-center pr-16 mt-24 mb-4 rounded-lg"
                            style={{
                                border: '1px solid rgba(255, 255, 255, 0.20)',
                                display: idoTransferNum > 0 || !isLoadOk || idsInfo?.status > 1 ? 'none' : 'flex',
                            }}
                        >
                            <input
                                type="number"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                value={buyNumber}
                                className="flex-1 py-16 pl-14 text-[#fff] text-[14px]"
                                style={{ background: 'none' }}
                                placeholder={
                                    t('67') + '(' + idsInfo?.minNum + '-' + idsInfo?.maxNum + ',' + t('67_1') + '0.01)'
                                }
                            />
                            <div className="text-[#BAFE03] text-[12px] font-[500]">SOL </div>
                            <div className="w-[1px] h-6 bg-[#D9D9D9] mx-8"></div>
                            <div
                                className="text-[#BAFE03] text-[12px] font-[500]"
                                onClick={() => {
                                    if (Number(balance_SOL) === 0) {
                                        dispatch(createDelMessageAction(0));
                                        addMessage(t('137_1'));
                                        return;
                                    }
                                    setBuyNumber(
                                        balance_SOL < idsInfo?.maxNum
                                            ? Math.trunc(Number(balance_SOL) * 100) / 100
                                            : idsInfo?.maxNum
                                    );
                                }}
                            >
                                MAX
                            </div>
                        </div>
                        <div
                            className="mb-20"
                            style={{
                                display: idoTransferNum > 0 || !isLoadOk || idsInfo?.status > 1 ? 'none' : 'block',
                            }}
                        >
                            <SolBakabce />
                        </div>

                        <div
                            className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 mt-20 text-center rounded-full text-[16px] font-[700]"
                            style={{
                                boxShadow: '0px 5px 0px 0px #579B00',
                                display: !publicKey ? 'block' : 'none',
                            }}
                            onClick={() => {
                                setVisible(true);
                            }}
                        >
                            {t('68')}
                        </div>
                        <div
                            style={{
                                display:
                                    (idoTransferNum > 0 || !isLoadOk) && publicKey && idsInfo?.status === 0
                                        ? 'none'
                                        : 'block',
                            }}
                        >
                            <div
                                className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 text-center rounded-full text-[16px] font-[700]"
                                style={{
                                    boxShadow: '0px 5px 0px 0px #579B00',
                                    display: buyState === 1 ? 'block' : 'none',
                                }}
                                onClick={() => {
                                    handleTransfer();
                                }}
                            >
                                {/*  */}
                                {t('69')} {buyNumber > 0 ? buyNumber + ' SOL' : ''}
                            </div>
                            <div
                                className=" items-center justify-center bg-gradient-to-r from-[#fff] to-[#999] py-9 text-center rounded-full text-[16px] font-[700]"
                                style={{ border: '2px solid #A0FF05', display: buyState === 2 ? 'flex' : 'none' }}
                            >
                                <img src={loding2} className="w-[16px] h-[16px] mr-4 rotate-360" alt="" />
                                {/*  */}
                                {t('70')}
                            </div>
                            <div
                                className="bg-gradient-to-r from-[#fff] to-[#fff] py-10 text-center rounded-full text-[16px] font-[700] opacity-[0.6]"
                                style={{ display: buyState === 3 && idsInfo?.status > 0 ? 'block' : 'none' }}
                            >
                                {/*  */}
                                {t('71')}
                            </div>
                        </div>
                    </div>
                    <div
                        className="bg-gradient-to-r from-[#9CF021] rounded-2xl mt-20 to-[#DBF95C] py-14"
                        style={{ display: idoTransferNum > 0 ? 'block' : 'none' }}
                    >
                        <div
                            className="rounded-lg"
                            style={{
                                backgroundImage: 'url(' + home_4 + ')',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <div className="text-[#000] text-[16px] font-[600] text-center px-10">
                                {t('73')} {idoTransferNum} SOL
                            </div>
                            <div className="text-[#50631E] text-[12px] font-[400] mt-6px mb-10 text-center px-10">
                                {t('74')}
                            </div>
                            <div className="flex justify-center px-[10px]">
                                {/* // 0- 1- 2- 3-token */}
                                {/* ：，token：token */}
                                <div
                                    style={{ display: buyState !== 3 ? 'flex' : 'none' }}
                                    onClick={() => {
                                        handleShar();
                                    }}
                                    className="whitespace-nowrap items-center text-[#BAFE03] text-[12px] px-18 py-6 bg-gradient-to-r from-[#161A19] to-[#020303] rounded-full"
                                >
                                    <svg
                                        className="mr-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <path
                                            d="M10.6561 4.93325C10.5109 4.83905 10.3441 4.79465 10.1767 4.79885V2.59085C10.1767 1.85045 9.58391 1.24805 8.85611 1.24805H3.34031C2.61191 1.24805 2.01911 1.85045 2.01911 2.59085V4.83425C1.90218 4.79886 1.77894 4.78944 1.658 4.80664C1.53705 4.82384 1.42132 4.86726 1.31891 4.93385C1.07711 5.08985 0.933105 5.35505 0.933105 5.64245V9.11105C0.933105 10.0374 1.68671 10.791 2.61311 10.791H9.36131C10.2877 10.791 11.0413 10.0374 11.0413 9.11105V5.64185C11.0419 5.35445 10.8979 5.08925 10.6561 4.93325ZM3.34031 2.20805H8.85611C9.05531 2.20805 9.21671 2.37965 9.21671 2.59085V5.15885L6.28271 6.48065C6.1897 6.52247 6.08888 6.5441 5.98691 6.5441C5.88493 6.5441 5.78411 6.52247 5.69111 6.48065L2.97911 5.25845V2.59085C2.97911 2.37965 3.14111 2.20805 3.34031 2.20805ZM10.0819 9.11045C10.0819 9.50765 9.75911 9.83045 9.36191 9.83045H2.61311C2.21591 9.83045 1.89311 9.50765 1.89311 9.11045V5.82245L5.29751 7.35605C5.73611 7.55345 6.23951 7.55345 6.67751 7.35605L10.0819 5.82245V9.11045Z"
                                            fill="#BAFE03"
                                        />
                                        <path
                                            d="M7.43666 4.56352H4.71926C4.45406 4.56352 4.23926 4.34872 4.23926 4.08352C4.23926 3.81832 4.45406 3.60352 4.71926 3.60352H7.43666C7.70186 3.60352 7.91666 3.81832 7.91666 4.08352C7.91666 4.34872 7.70186 4.56352 7.43666 4.56352Z"
                                            fill="#BAFE03"
                                        />
                                    </svg>
                                    {t('75')}
                                </div>

                                <div
                                    onClick={() => {
                                        // dispatch(createDelMessageAction(0));
                                        // addMessage(t('0'));
                                        navigate('/account/subscription');
                                    }}
                                    style={{ display: buyState === 3 ? 'flex' : 'none' }}
                                    className="whitespace-nowrap items-center text-[#BAFE03] text-[12px] px-18 py-6 bg-gradient-to-r from-[#161A19] to-[#020303] rounded-full"
                                >
                                    <svg
                                        className="mr-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <path
                                            d="M6.0001 10.9625C5.01861 10.9625 4.05916 10.6715 3.24308 10.1262C2.427 9.58088 1.79095 8.80585 1.41535 7.89907C1.03975 6.99229 0.941474 5.9945 1.13295 5.03186C1.32443 4.06923 1.79706 3.185 2.49108 2.49098C3.1851 1.79697 4.06933 1.32433 5.03196 1.13285C5.9946 0.941375 6.99239 1.03965 7.89917 1.41525C8.80594 1.79085 9.58098 2.4269 10.1263 3.24298C10.6716 4.05906 10.9626 5.01851 10.9626 6C10.9613 7.31573 10.438 8.57719 9.50766 9.50756C8.57729 10.4379 7.31583 10.9612 6.0001 10.9625ZM6.0001 1.89C5.18662 1.89 4.39141 2.13126 3.71506 2.58326C3.03871 3.03525 2.5116 3.67769 2.20041 4.42929C1.88921 5.1809 1.80792 6.00792 1.9668 6.80573C2.12569 7.60354 2.51761 8.33632 3.09301 8.91136C3.6684 9.48641 4.40141 9.87789 5.19932 10.0363C5.99724 10.1947 6.8242 10.1129 7.57562 9.80124C8.32704 9.48959 8.96915 8.96209 9.42073 8.28546C9.87232 7.60884 10.1131 6.81348 10.1126 6C10.1113 4.90993 9.67749 3.86493 8.90646 3.09437C8.13543 2.32381 7.09017 1.89066 6.0001 1.89ZM6.0001 8.71C5.87599 8.71036 5.75305 8.68601 5.63845 8.63837C5.52385 8.59072 5.41988 8.52074 5.3326 8.4325L3.5676 6.6825C3.47969 6.59473 3.40995 6.49049 3.36236 6.37574C3.31477 6.26098 3.29028 6.13798 3.29028 6.01375C3.29028 5.88952 3.31477 5.76652 3.36236 5.65177C3.40995 5.53701 3.47969 5.43277 3.5676 5.345L5.3326 3.58C5.50976 3.40322 5.74982 3.30393 6.0001 3.30393C6.25038 3.30393 6.49044 3.40322 6.6676 3.58L8.4326 5.345C8.60893 5.52291 8.70786 5.76326 8.70786 6.01375C8.70786 6.26424 8.60893 6.50459 8.4326 6.6825L6.6676 8.4325C6.58016 8.52052 6.47616 8.59035 6.36159 8.63798C6.24703 8.68561 6.12417 8.71009 6.0001 8.71ZM6.0001 4.1425C5.98753 4.14196 5.975 4.14414 5.96335 4.14889C5.9517 4.15363 5.94121 4.16083 5.9326 4.17L4.1676 5.9325C4.15868 5.94133 4.1516 5.95185 4.14677 5.96343C4.14194 5.97502 4.13945 5.98745 4.13945 6C4.13945 6.01255 4.14194 6.02498 4.14677 6.03657C4.1516 6.04815 4.15868 6.05867 4.1676 6.0675L5.9326 7.8325C5.94143 7.84142 5.95195 7.8485 5.96353 7.85333C5.97512 7.85816 5.98755 7.86065 6.0001 7.86065C6.01265 7.86065 6.02508 7.85816 6.03667 7.85333C6.04825 7.8485 6.05877 7.84142 6.0676 7.8325L7.8301 6.0675C7.83902 6.05867 7.8461 6.04815 7.85093 6.03657C7.85576 6.02498 7.85825 6.01255 7.85825 6C7.85825 5.98745 7.85576 5.97502 7.85093 5.96343C7.8461 5.95185 7.83902 5.94133 7.8301 5.9325L6.0801 4.1825C6.07141 4.16944 6.05945 4.15888 6.04542 4.15186C6.03139 4.14484 6.01576 4.14162 6.0001 4.1425Z"
                                            fill="#BAFE03"
                                        />
                                    </svg>
                                    {t('76')}
                                </div>
                                <div className="w-[20px]"></div>
                                <div
                                    onClick={() => {
                                        navigate('/account/SolAward');
                                    }}
                                    className="whitespace-nowrap flex items-center text-[#BAFE03] text-[12px] px-18 py-6 bg-gradient-to-r from-[#161A19] to-[#020303] rounded-full"
                                >
                                    <svg
                                        className="mr-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <path
                                            d="M8.15472 11.0608H3.84519C2.79757 11.0608 1.94043 10.2036 1.94043 9.15601V5.6203H10.0476V9.14411C10.0595 10.2036 9.20234 11.0608 8.15472 11.0608ZM2.89281 6.57268V9.14411C2.89281 9.66792 3.32138 10.0965 3.84519 10.0965H8.14281C8.66662 10.0965 9.09519 9.66792 9.09519 9.14411V6.57268H2.89281Z"
                                            fill="#BAFE03"
                                        />
                                        <path
                                            d="M9.59524 6.57148H2.40476C1.63095 6.57148 1 5.94052 1 5.16671V4.45243C1 3.67862 1.63095 3.04767 2.40476 3.04767H9.58333C10.369 3.03576 11 3.66671 11 4.45243V5.16671C11 5.94052 10.369 6.57148 9.59524 6.57148ZM2.40476 3.98814C2.15476 3.98814 1.95238 4.19052 1.95238 4.44052V5.15481C1.95238 5.40481 2.15476 5.60719 2.40476 5.60719H9.58333C9.83333 5.60719 10.0357 5.40481 10.0357 5.15481V4.44052C10.0357 4.19052 9.83333 3.98814 9.58333 3.98814H2.40476Z"
                                            fill="#BAFE03"
                                        />
                                        <path
                                            d="M6.47633 3.98929H4.95252C4.10728 3.98929 3.42871 3.31072 3.42871 2.46548C3.42871 1.62024 4.10728 0.941673 4.95252 0.941673C5.79776 0.941673 6.47633 1.62024 6.47633 2.46548V3.98929ZM4.95252 1.89405C4.643 1.89405 4.38109 2.15596 4.38109 2.46548C4.38109 2.77501 4.643 3.03691 4.95252 3.03691H5.52395V2.46548C5.52395 2.15596 5.26204 1.89405 4.95252 1.89405Z"
                                            fill="#BAFE03"
                                        />
                                        <path
                                            d="M7.04725 3.98929H5.52344V2.46548C5.52344 1.62024 6.20201 0.941673 7.04725 0.941673C7.89248 0.941673 8.57106 1.62024 8.57106 2.46548C8.57106 3.31072 7.89248 3.98929 7.04725 3.98929ZM6.47582 3.03691H7.04725C7.35677 3.03691 7.61868 2.77501 7.61868 2.46548C7.61868 2.15596 7.35677 1.89405 7.04725 1.89405C6.73772 1.89405 6.47582 2.15596 6.47582 2.46548V3.03691Z"
                                            fill="#BAFE03"
                                        />
                                        <path
                                            d="M6.00012 10.8816C5.73821 10.8816 5.52393 10.6673 5.52393 10.4054V3.17923C5.52393 2.91733 5.73821 2.70304 6.00012 2.70304C6.26202 2.70304 6.47631 2.91733 6.47631 3.17923V10.4054C6.47631 10.6673 6.26202 10.8816 6.00012 10.8816Z"
                                            fill="#BAFE03"
                                        />
                                    </svg>
                                    {t('77')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden">
                    <div className="text-[#fff] text-[14px] font-[500] mt-[24px] mb-[10px]">{t('78')}</div>
                    <div className="text-[#9B9C9C] text-[12px] font-[500] pb-4">{t('79')}</div>
                </div>
                <img src={home_11} className="w-[200px] h-[200px] fixed left-0 bottom-[72px] z-[-10]" alt="" />
                <div className="h-[130px] w-full"></div>
            </div>

            <Modal
                width={338}
                open={open2}
                centered={true}
                onCancel={() => {
                    setOpen2(false);
                    Modal.destroyAll();
                }}
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
                    <div className="leading-[16px] text-[#BAFE03] text-[18px] font-[600] pb-20">{t('52')}</div>
                    <div className="text-[#fff] text-[12px]">{t('160_1')}</div>
                    <div
                        className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 mt-20 text-center rounded-full text-[16px] font-[700]"
                        style={{
                            boxShadow: '0px 5px 0px 0px #579B00',
                        }}
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        {t('160_2')}
                    </div>
                </div>
            </Modal>
            <Footer index={2} />
        </div>
    );
};

export default ComponentName;
