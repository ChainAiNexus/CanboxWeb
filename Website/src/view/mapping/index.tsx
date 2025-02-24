import { SetStateAction, useEffect, useRef, useState } from 'react';
import Footer from '../../components/footer';
import loding2 from '../../assets/image/loding2.png';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import home_11 from '../../assets/image/home_11.png';
import icon32 from '../../assets/image/icon32.png';
import H5Top from '../../components/hander';
import home_4_1 from '../../assets/image/4.png';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import BannerList from './components/bannerList';
import IllustrateModal from './components/illustrateModal';
import Tips from './components/tips';
import { aiCharting, getChartingInfo } from '../../API/ido';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../utils/tool';
import { createDelMessageAction } from '../../store/actions';

const ComponentName = () => {
    const { publicKey } = useWallet();
    const [buyNumber, setBuyNumber]: any = useState();
    const [buyState, setBuyState] = useState<number>(0);
    const [luckNumTips, setLuckNumTips] = useState(false);

    const token = useSelector((state: any) => state?.token);
    useEffect(() => {
        if (publicKey) {
            setBuyState(1);
        } else {
            setBuyState(0);
        }
    }, [publicKey]);
    const { setVisible } = useWalletModal();

    const handleStart = () => {
        if (!buyNumber) {
            setOpen(true);
        }
    };

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const { t } = useTranslation();

    const [chartingInfo, setChartingInfo]: any = useState();
    const handleLoad = () => {
        getChartingInfo()
            .then((res: any) => {
                setChartingInfo(res.data);
                setOpen(false);
                setOpen2(false);
                setShowBannerIndex(0);
                if (res.data?.chartingNum > 0 && res.data?.chartingUserList.length < 10) {
                    setBuyState(1);
                } else {
                    setBuyState(3);
                }
            })
            .catch(() => {});
    };

    useEffect(() => {
        if (token && publicKey) {
            handleLoad();
        }
    }, [token, publicKey]);

    const [luckNum, setLickNum]: any = useState('');
    const handleAiCharting = () => {
        setBuyState(2);

        aiCharting({
            luckNum: luckNum,
        })
            .then((res: any) => {
                if (res?.code === 200) {
                    const randomTime = Math.floor(Math.random() * (8000 - 6000 + 1)) + 6000;
                    setTimeout(() => {
                        addMessage(t('162'));
                        setLickNum('');
                    }, randomTime);
                } else {
                    handleLoad();
                }
            })
            .catch(() => {});
    };
    const [showBannerIndex, setShowBannerIndex] = useState(0);
    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div>
            <H5Top />
            <div className="mx-20">
                <div className=" pt-[10px]"></div>
                <div className="flex items-center text-[#BAFE03] text-[18px] font-[600] mt-10 mb-20">
                    {t('43')}
                    <div className="text-right flex-1 text-[#fff] text-[12px] font-[400]">
                        {t('44')}: {chartingInfo?.chartingUserList.length || 0}/{chartingInfo?.chartingDayNum || 0}
                    </div>
                </div>
                <BannerList
                    chartingInfo={chartingInfo}
                    showIndex={showBannerIndex}
                    buyState={buyState}
                    onChangeIndex={(index: SetStateAction<number>) => {
                        setShowBannerIndex(index);
                    }}
                />
                <div
                    className="py-20 px-24 rounded-2xl bg-[#161A19]"
                    style={{
                        border: '1px solid rgba(255, 255, 255, 0.20)',
                        backgroundImage: 'url(' + home_4_1 + ')',
                        backgroundPosition: 'top',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="text-center text-[#BAFE03] text-[18px] font-[600] flex items-center">
                        {t('45')}
                        <div
                            className="flex items-center text-[#fff] text-[12px] flex-1 justify-end"
                            onClick={() => {
                                setOpen2(true);
                            }}
                        >
                            <svg
                                className="mr-6"
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                            >
                                <g clip-path="url(#clip0_114_1532)">
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
                                    <clipPath id="clip0_114_1532">
                                        <rect width="12" height="12" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {t('46')}
                        </div>
                    </div>
                    <div className="">
                        <div
                            className="flex items-center pr-16 mt-24 mb-20 rounded-2xl"
                            style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}
                        >
                            <input
                                type="number"
                                onFocus={handleFocus}
                                onChange={(e: any) => {
                                    const value = e.target.value.replace(/[+\-.]/g, ''); //  +, -, . 
                                    if (value.length <= 8) {
                                        setLickNum(value);
                                    }
                                }}
                                maxLength={8}
                                value={luckNum}
                                className="flex-1 py-16 pl-16 text-[#fff] text-[12px]"
                                style={{ background: 'none' }}
                                placeholder={t('47')}
                            />
                        </div>
                        <div
                            className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 text-center rounded-full text-[16px] font-[700]"
                            style={{ boxShadow: '0px 5px 0px 0px #579B00', display: buyState === 0 ? 'block' : 'none' }}
                            onClick={() => {
                                setVisible(true);
                            }}
                        >
                            {t('48')}
                        </div>
                        <div
                            className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 text-center rounded-full text-[16px] font-[700]"
                            style={{ boxShadow: '0px 5px 0px 0px #579B00', display: buyState === 1 ? 'block' : 'none' }}
                            onClick={() => {
                                if (chartingInfo?.chartingUserList.length >= 10) {
                                    dispatch(createDelMessageAction(0));
                                    addMessage(t('166'));
                                    return;
                                }
                                if (!!luckNum) {
                                    handleAiCharting();
                                } else {
                                    handleStart();
                                }
                            }}
                        >
                            {t('49')}
                        </div>
                        <div
                            className=" items-center justify-center bg-gradient-to-r from-[#fff] to-[#999] py-9 text-center rounded-full text-[16px] font-[700]"
                            style={{ border: '2px solid #A0FF05', display: buyState === 2 ? 'flex' : 'none' }}
                        >
                            <img src={loding2} className="w-[16px] h-[16px] mr-4 rotate-360" alt="" />
                            {t('49')}
                        </div>
                        <div
                            className=" items-center justify-center bg-gradient-to-r from-[#fff] to-[#999] py-10 text-center rounded-full text-[16px] font-[700]"
                            style={{ display: buyState === 3 ? 'flex' : 'none' }}
                            onClick={() => {
                                if (chartingInfo?.chartingNum === 0) {
                                    dispatch(createDelMessageAction(0));
                                    addMessage(t('167'));
                                    return;
                                }
                                if (chartingInfo?.chartingUserList.length >= 10) {
                                    dispatch(createDelMessageAction(0));
                                    addMessage(t('166'));
                                    return;
                                }
                            }}
                        >
                            {t('49')}
                        </div>
                        <Tips chartingInfo={chartingInfo} />
                    </div>
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
                        <div className="leading-[16px] text-[#BAFE03] text-[18px] font-[600]">{t('52')}</div>
                        <div className="text-[#fff] text-[16px] py-24">{t('53')}</div>
                        <div
                            className="flex items-center pr-16 rounded-2xl"
                            style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}
                        >
                            <input
                                type="number"
                                onChange={(e: any) => {
                                    const value = e.target.value.replace(/[+\-.]/g, ''); //  +, -, . 
                                    if (value.length <= 8) {
                                        setLickNum(value);
                                    }
                                }}
                                maxLength={8}
                                value={luckNum}
                                className="flex-1 py-16 pl-16 text-[#fff] text-[12px]"
                                style={{ background: 'none' }}
                                placeholder={t('53_1')}
                            />
                        </div>
                        <div
                            className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 my-22 text-center rounded-full text-[16px] font-[700]"
                            style={{ boxShadow: '0px 5px 0px 0px #579B00', display: buyState === 1 ? 'block' : 'none' }}
                            onClick={() => {
                                handleAiCharting();
                            }}
                        >
                            {t('54')}
                        </div>

                        <div
                            className=" items-center justify-center my-22 bg-gradient-to-r from-[#fff] to-[#999] py-9 text-center rounded-full text-[16px] font-[700]"
                            style={{ border: '2px solid #A0FF05', display: buyState === 2 ? 'flex' : 'none' }}
                        >
                            <img src={loding2} className="w-[16px] h-[16px] mr-4 rotate-360" alt="" />
                            {t('49')}
                        </div>
                        <div
                            className="flex items-center text-[#fff] text-[12px] justify-center"
                            onClick={() => {
                                setLuckNumTips(!luckNumTips);
                            }}
                        >
                            <svg
                                className="mr-6"
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                            >
                                <g clip-path="url(#clip0_114_547)">
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
                                    <clipPath id="clip0_114_547">
                                        <rect width="12" height="12" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {t('55')}
                        </div>
                        <div
                            className="bg-[#000] p-16 rounded-2xl text-[#fff] text-[12px] mt-10"
                            style={{
                                display: luckNumTips ? 'block' : 'none',
                            }}
                        >
                            {t('56')}
                        </div>
                    </div>
                </Modal>

                <IllustrateModal
                    chartingInfo={chartingInfo}
                    open2={open2}
                    setOpen2Coll={(val: boolean | ((prevState: boolean) => boolean)) => {
                        setOpen2(val);
                    }}
                />

                <img src={home_11} className="w-[200px] h-[200px] fixed left-0 bottom-[72px] z-[-10]" alt="" />
                <div className="h-[130px] w-full"></div>
            </div>
            <Footer index={3} />
        </div>
    );
};

export default ComponentName;
