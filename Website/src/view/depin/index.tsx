import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import H5Top from '../../components/hander';
import icon4_1 from '../../assets/image/4_1.png';
import icon7 from '../../assets/image/my/7.png';
import icon18 from '../../assets/image/my/18.png';
import logo2 from '../../assets/image/logo2.png';
import home_11 from '../../assets/image/home_11.png';
import { Cascader, Input, Modal } from 'antd';
import icon32 from '../../assets/image/icon32.png';
import { cityArray } from './cityData';
import BuyDepin from './components/buyDepin';
import { useTranslation } from 'react-i18next';
import { getProductBaseList, getProductOrderList, payProduct } from '../../API';
import { use } from 'chai';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDispatch, useSelector } from 'react-redux';
import { Connection, PublicKey } from '@solana/web3.js';
import { LOCAL_RPC, TOKEN_PROGRAM_ID } from '../../config';
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';
import NoData from '../../components/noData';
import { addMessage, convertToLocalUtc0Timestamp, showLoding, timestampToDateString } from '../../utils/tool';
import { createDelMessageAction } from '../../store/actions';

const ComponentName = (props?: {}) => {
    const { TextArea } = Input;
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const handlePopupVisibleChange = (visible: boolean) => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const [proList, setProList]: any = useState([]);
    const handleProList = () => {
        getProductBaseList()
            .then((res: any) => {
                setProList(res.data);
            })
            .catch(() => {});
    };
    const [orderList, setOrderList]: any = useState([]);
    const handleOrderList = () => {
        getProductOrderList()
            .then((res: any) => {
                setOrderList(res.data);
            })
            .catch(() => {});
    };

    const token = useSelector((state: any) => state?.token);
    const { publicKey } = useWallet();
    useEffect(() => {
        if (token && publicKey) {
            handleProList();
            handleOrderList();
        }
    }, [token, publicKey]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        if (token && publicKey) {
            intervalId = setInterval(() => {
                handleProList();
                handleOrderList();
            }, 10000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [token, publicKey]);

    const [balance_SOLX, setbalance_SOLX]: any = useState('0');
    const getTokenBalance = async () => {
        const _connection = new Connection(LOCAL_RPC);
        if (publicKey && token) {
            try {
                const connection = _connection;
                const walletPublicKey = new PublicKey(publicKey);
                const tokenMintPublicKey = new PublicKey(TOKEN_PROGRAM_ID);

                const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPublicKey, {
                    mint: tokenMintPublicKey,
                });

                if (tokenAccounts.value.length === 0) {
                    setbalance_SOLX(0); // ， 0
                } else {
                    // 
                    const tokenAmount = tokenAccounts?.value[0].account.data.parsed.info.tokenAmount.amount;
                    console.log('balance_SOLX:' + tokenAmount / Math.pow(10, 6));
                    setbalance_SOLX(tokenAmount / Math.pow(10, 6)); // `uiAmount` 
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        const fetchTokenBalance = () => {
            getTokenBalance();
        };
        if (publicKey && token) {
            fetchTokenBalance(); // 
            intervalId = setInterval(fetchTokenBalance, 3000); // 3
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [publicKey, token]);

    const dispatch = useDispatch();

    const [payValue, setPayValue] = useState(0);
    const [payNum, setPayNum] = useState(0);
    const [productId, setProductId] = useState(0);
    const [receiveAddress, setReceiveAddress]: any = useState();
    const [receiveAddress2, setReceiveAddress2]: any = useState();
    const [receiveName, setReceiveName]: any = useState();
    const [receivePhone, setReceivePhone]: any = useState();
    const [SolXReceiver, setSolXReceiver] = useState();
    const handleBuy = () => {
        dispatch(createDelMessageAction(0));
        addMessage(t('248'));
        handleProList();
        handleOrderList();
        setOpen(false);
    };

    useEffect(() => {
        setReceiveName(localStorage.getItem('receiveName') || '');
        setReceivePhone(localStorage.getItem('receivePhone') || '');
        setReceiveAddress(localStorage.getItem('receiveAddress') || '');
        setReceiveAddress2(localStorage.getItem('receiveAddress2') || '');
    }, [token, publicKey, open]);

    return (
        <div>
            <H5Top />
            <div className="mx-20">
                <div className=" pt-[10px]"></div>
                <div className="flex items-center text-[#BAFE03] text-[18px] font-[600] mt-10 mb-20">{t('220')}</div>

                {proList.map((item: any, index: number) => (
                    <div
                        key={index}
                        className=" mt-[20px] pl-16 pr-4 py-20 bg-[#222] rounded-xl"
                        style={{
                            backgroundImage: 'url(' + icon7 + ')',
                            backgroundPosition: 'top',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid rgb(153 153 153 / 54%)',
                        }}
                    >
                        <div className="text-[#BAFE03] font-[600] text-[18px] mb-16 flex items-center">
                            <img src={item?.imgUrl || icon18} alt="" className="mr-10 w-[110px] h-[76px]" />
                            <div className="flex-1">
                                <div className="text-[#fff] font-[600] text-[14px]">{item?.name}</div>
                                <div className="flex items-center mb-4">
                                    <div className="text-[#BAFE03] font-[400] text-[16px] text-truncate-1">
                                        {t('221')}:
                                    </div>
                                    <img src={logo2} alt="" className="mx-6 w-[16px] h-[16px]" />
                                    <div className="text-[#BAFE03] font-[500] text-[16px] text-truncate-1">
                                        {Number(item?.needPayNum || 0).toFixed(0)} SOL.X
                                    </div>
                                </div>
                                <div className="text-[#9B9C9C] font-[500] text-[16px]">≈{item?.price} USDT</div>
                            </div>
                        </div>

                        <div className="flex items-center mb-4 mr-12">
                            <div className="flex-1 text-[#fff] font-[500] text-[12px]">{t('222')}:</div>
                            <div className="text-[#BAFE03] font-[500] text-[12px]">
                                {item?.soldNum}/{item?.totalSupply}
                            </div>
                        </div>
                        <div
                            className="h-12 bg-gradient-to-r from-[#0D1114] to-[#242928] rounded-lg relative mr-12"
                            style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}
                        >
                            <div
                                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#DBF95C] to-[#9CF021] rounded-lg "
                                style={{ width: Math.min((item?.soldNum / item?.totalSupply) * 100, 100) + '%' }}
                            ></div>
                        </div>

                        <div
                            className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 text-center rounded-full text-[16px] font-[700] mt-[20px] opacity-50 mr-12"
                            style={{
                                display: 'block',
                                boxShadow: '0px 5px 0px 0px #579B00',
                            }}
                        >
                            {t('249')}
                        </div>
                        {/* 
                        <div
                            className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 text-center rounded-full text-[16px] font-[700] mt-[20px] opacity-50 mr-12"
                            style={{
                                display: balance_SOLX < item?.needPayNum ? 'block' : 'none',
                                boxShadow: '0px 5px 0px 0px #579B00',
                            }}
                            onClick={() => {
                                dispatch(createDelMessageAction(0));
                                addMessage(t('223'));
                            }}
                        >
                            {t('223')}
                        </div>
                        */}
                        {/* 
                        <div
                            className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 text-center rounded-full text-[16px] font-[700] mt-[20px] mr-12"
                            style={{
                                display: balance_SOLX >= item?.needPayNum ? 'block' : 'none',
                                boxShadow: '0px 5px 0px 0px #579B00',
                            }}
                            onClick={() => {
                                setPayValue(item?.price);
                                setSolXReceiver(item?.receiveAddress);
                                setPayNum(item?.needPayNum);
                                setProductId(item?.id);
                                setOpen(true);
                            }}
                        >
                            {t('224')}
                        </div>
                         */}
                    </div>
                ))}

                <div className="flex items-center text-[#BAFE03] text-[18px] font-[600] mt-10 mb-20">{t('225')}</div>

                {orderList.map((item: any, index: number) => (
                    <div key={index}>
                        <div
                            className="flex pt-14"
                            style={{
                                borderTop: '1px solid rgb(153 153 153 / 54%)',
                            }}
                        >
                            <div className="flex-1">
                                <div className="text-[#9B9C9C] text-[12px] font-[300]">{t('221')}:</div>
                                <div className="text-[#fff] text-[12px] font-[400] pt-2">{item?.payNum} SOL.X</div>
                            </div>
                            <div className="flex-1">
                                <div className="text-[#9B9C9C] text-[12px] font-[300]">{t('241')}:</div>
                                <div className="text-[#fff] text-[12px] font-[400] pt-2">{item?.productName}</div>
                            </div>
                            <div className="flex-1">
                                <div className="text-[#9B9C9C] text-[12px] font-[300] text-right">{t('242')}:</div>
                                <div className="text-[#fff] text-[12px] font-[400] pt-2 text-right">
                                    {timestampToDateString(convertToLocalUtc0Timestamp(item?.createTime))}
                                </div>
                            </div>
                        </div>
                        <div className="flex py-14">
                            <div className="flex-1">
                                <div className="text-[#9B9C9C] text-[12px] font-[300]">{t('226')}:</div>
                                <div className="text-[#fff] text-[12px] font-[400] pt-2 text-truncate-2">
                                    {item?.receiveAddress}
                                </div>
                            </div>
                            <div className="w-[146px] text-right pl-2">
                                <div className="text-[#9B9C9C] text-[12px] font-[300]">{t('227')}:</div>
                                <div
                                    className="text-[#BAFE03] text-[12px] font-[400] pt-2"
                                    style={{ color: item?.status === 1 ? '#BAFE03' : '#fff' }}
                                >
                                    {item?.status === -1 ? t('243') : item?.status === 0 ? t('229') : t('228')}
                                </div>
                                <div
                                    className="text-[#fff] text-[12px] font-[400] pt-1 text-truncate-2 break-all whitespace-pre-wrap"
                                    style={{ display: item?.status === 1 ? 'block' : 'none' }}
                                >
                                    {item?.logisticsCompany}: {item?.logisticsOrderNo}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {orderList.length === 0 ? <NoData /> : ''}

                <img src={home_11} className="w-[200px] h-[200px] fixed left-0 bottom-[72px] z-[-10]" alt="" />
                <div className="h-[130px] w-full"></div>
            </div>
            <Footer index={2} />

            <Modal
                width={338}
                open={open}
                onCancel={() => {
                    setOpen(false);
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
                <div
                    className="w-[20px] h-[20px] absolute top-[20px] right-[20px] cursor-pointer z-10"
                    style={{
                        backgroundImage: `url(${icon32})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                    }}
                    onClick={() => {
                        setOpen(false);
                    }}
                ></div>
                <div className="relative px-16 pt-[30px] py-[26px]">
                    <div className="leading-[18px] text-[#BAFE03] text-[18px] font-[600] pb-6">{t('230')}</div>
                    <div>
                        <div
                            className="flex items-center pr-16 mt-16 mb-16 rounded-2xl"
                            style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}
                        >
                            <input
                                onChange={(e: any) => {
                                    // const value = e.target.value.replace(/[+\-.]/g, '');
                                    setReceiveName(e.target.value);
                                }}
                                value={receiveName}
                                maxLength={8}
                                className="flex-1 py-16 pl-16 text-[#fff] text-[12px]"
                                style={{ background: 'none' }}
                                placeholder={t('231')}
                            />
                        </div>
                        <div
                            className="flex items-center pr-16 mt-16 mb-16 rounded-2xl"
                            style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}
                        >
                            <input
                                type="number"
                                onChange={(e: any) => {
                                    const value = e.target.value.replace(/[+\-.]/g, '');
                                    setReceivePhone(e.target.value);
                                }}
                                value={receivePhone}
                                maxLength={8}
                                className="flex-1 py-16 pl-16 text-[#fff] text-[12px]"
                                style={{ background: 'none' }}
                                placeholder={t('235')}
                            />
                        </div>

                        <div className="text-[#fff] text-[12px] font-[400] pb-10">{t('232')}</div>
                        <div className="hidden">
                            <Cascader
                                placement="bottomLeft"
                                className="depinCascader"
                                options={cityArray}
                                onChange={(value: any) => {
                                    console.log('Selected values:', value);
                                    setReceiveAddress(value[0] + '' + (value[1] || '') + '' + (value[2] || ''));
                                }}
                                placeholder={t('233')}
                                changeOnSelect
                                onPopupVisibleChange={handlePopupVisibleChange}
                            >
                                <div
                                    className="flex items-center pr-16 mb-16 rounded-2xl py-16 pl-16 text-[#9B9C9C] text-[12px]"
                                    style={{
                                        border: '1px solid rgba(255, 255, 255, 0.20)',
                                        color: receiveAddress ? '#fff' : '#9B9C9C',
                                    }}
                                >
                                    {receiveAddress || t('233')}
                                </div>
                            </Cascader>
                        </div>

                        <div
                            className="flex items-center pr-16 mb-16 rounded-2xl"
                            style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}
                        >
                            <TextArea
                                autoSize
                                onChange={(e: any) => {
                                    const value = e.target.value.replace(/[+\-.]/g, '');
                                    setReceiveAddress2(value);
                                }}
                                value={receiveAddress2}
                                maxLength={60}
                                className="flex-1 py-16 pl-16 text-[#fff] text-[12px]"
                                style={{ background: 'none' }}
                                placeholder={t('234')}
                            />
                        </div>
                    </div>
                    <BuyDepin
                        payNum={payNum}
                        productId={productId}
                        receiveAddress={receiveAddress}
                        receiveAddress2={receiveAddress2}
                        receiveName={receiveName}
                        receivePhone={receivePhone}
                        SolXReceiver={SolXReceiver}
                        payValue={payValue}
                        callBack={() => {
                            handleBuy();
                        }}
                    />

                    <div className="flex justify-center text-[#fff] text-[12px] font-[400] pt-[20px]">
                        {t('237')}: <div className="text-[#BAFE03] text-[12px] font-[400] pl-4">{payNum} SOL.X</div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ComponentName;
