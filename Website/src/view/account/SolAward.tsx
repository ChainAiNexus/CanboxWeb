import BarckBar from '../../components/barckBar';
import icon2 from '../../assets/image/my/2.png';
import icon9 from '../../assets/image/my/9.png';
import icon5 from '../../assets/image/my/5.png';
import solLogo from '../../assets/image/solLogo.png';
import icon7 from '../../assets/image/my/7.png';
import { Key, useEffect, useState } from 'react';
import { getDrawSolAward, getMyAwardInfo, getMyAwardSolInfoDetail } from '../../API/ido';
import { useDispatch, useSelector } from 'react-redux';
import NoData from '../../components/noData';
import bs58 from 'bs58';
import { useWallet } from '@solana/wallet-adapter-react';
import { addMessage, convertToLocalUtc0Timestamp, showLoding, timestampToDateString } from '../../utils/tool';
import { useTranslation } from 'react-i18next';
import { createDelMessageAction } from '../../store/actions';

export default function Home() {
    const [userAward, setUserAward]: any = useState();
    const [userAwardList, setUserAwardList]: any = useState([]);
    const [pageNum, setPageNum]: any = useState(1);
    const [total, setTotal]: any = useState(0);
    const { publicKey, signMessage, signTransaction, connected, autoConnect, disconnect } = useWallet();
    const handleLoad = () => {
        getMyAwardInfo()
            .then((res: any) => {
                setUserAward(res.data);
                getMyAwardSolInfoDetail({ pageNum: 1, pageSize: 20 })
                    .then((_res: any) => {
                        setUserAwardList(_res?.data?.list);
                        setTotal(_res.data.total);
                    })
                    .catch((err) => {});
            })
            .catch((err) => {});
    };
    const token = useSelector((state: any) => state?.token);
    useEffect(() => {
        if (token && publicKey) {
            setPageNum(1);
            setUserAwardList([]);
            handleLoad();
        }
    }, [token, publicKey]);

    const getList = async (pageNum: number) => {
        getMyAwardSolInfoDetail({ pageNum: pageNum, pageSize: 20 })
            .then((res: any) => {
                setUserAwardList((prevList: string | any[]) => prevList.concat(res?.data?.list || []));
                setTotal(res.data.total);
            })
            .catch((err) => {});
    };

    const dispatch = useDispatch();
    const handleSubmit = async () => {
        if (userAward?.availableNum <= 0) {
            dispatch(createDelMessageAction(0));
            addMessage(t('137_1'));
            return;
        }
        const _msg = `${
            window.location.host
        } wants you to sign in with your Solana account:\n${publicKey?.toBase58()}\n\nPlease sign in.`;
        const message = new TextEncoder().encode(_msg);

        try {
            showLoding(true);
            if (!publicKey) throw new Error('Wallet not connected!');
            if (!signMessage) throw new Error('Wallet does not support message signing!');
            const signature = await signMessage(message);

            getDrawSolAward({ sign: bs58.encode(signature), signMsg: _msg, type: 1 })
                .then((res: any) => {
                    if (res?.code === 200) {
                        handleLoad();
                    }
                })
                .catch(() => {})
                .finally(() => {
                    showLoding(false);
                });
        } catch (error: any) {
            showLoding(false);
        }
    };
    const { t } = useTranslation();

    return (
        <div>
            <BarckBar title={t('125')} />

            <div
                className="px-16 py-20 mt-12 mx-20 bg-[#222] rounded-xl relative"
                style={{
                    border: '1px solid #999',
                }}
            >
                <div className="text-[#fff] font-[600] text-[14px]">{t('126')}</div>
                <div className="flex items-center text-[#BAFE03] mt-10 mb-16 font-[600] text-[20px]">
                    <img
                        src={solLogo}
                        alt=""
                        className="w-18 h-18 rounded-full mr-6 "
                        style={{ border: '1px solid #A0FF05' }}
                    />
                    {userAward?.totalAmount || 0}
                </div>
                <div
                    className="bg-gradient-to-r from-[#A0FF05]  to-[#C5D503] rounded-2xl"
                    style={{
                        border: '1px solid #999',
                    }}
                >
                    <div
                        className="flex items-center py-[24px]"
                        style={{
                            backgroundImage: 'url(' + icon7 + ')',
                            backgroundPosition: 'top',
                            backgroundSize: 'cover',
                        }}
                    >
                        <div className="flex-1 text-center">
                            <div className="flex items-center justify-center text-[#000] text-[14px] font-[500]">
                                <svg
                                    className="w-[16px] h-[16px] mr-4 rounded-full"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <g clip-path="url(#clip0_114_4983)">
                                        <path
                                            d="M0 7.99726C-1.56494e-08 9.04748 0.206855 10.0874 0.608756 11.0577C1.01066 12.028 1.59973 12.9096 2.34234 13.6522C3.08496 14.3948 3.96657 14.9839 4.93684 15.3858C5.90712 15.7877 6.94705 15.9945 7.99726 15.9945C9.04748 15.9945 10.0874 15.7877 11.0577 15.3858C12.028 14.9839 12.9096 14.3948 13.6522 13.6522C14.3948 12.9096 14.9839 12.028 15.3858 11.0577C15.7877 10.0874 15.9945 9.04748 15.9945 7.99726C15.9945 6.94705 15.7877 5.90712 15.3858 4.93684C14.9839 3.96657 14.3948 3.08496 13.6522 2.34234C12.9096 1.59973 12.028 1.01066 11.0577 0.608756C10.0874 0.206855 9.04748 0 7.99726 0C6.94705 0 5.90712 0.206855 4.93684 0.608756C3.96657 1.01066 3.08496 1.59973 2.34234 2.34234C1.59973 3.08496 1.01066 3.96657 0.608756 4.93684C0.206855 5.90712 -1.56494e-08 6.94705 0 7.99726Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M13.0181 8.16091C12.705 7.91357 12.2513 7.95543 11.9919 8.25858L10.774 9.62719C10.7638 9.63734 10.7587 9.65129 10.7587 9.66398C10.7267 10.34 10.1645 10.8639 9.48332 10.8639H8.14916C8.00093 10.8398 7.89486 10.7142 7.9153 10.5633C7.92553 10.4479 8.02137 10.3527 8.14916 10.3261C8.15172 10.3261 8.15428 10.3236 8.15939 10.3236H9.48332C9.87053 10.3337 10.1836 10.0369 10.2181 9.65256V9.64749C10.2283 9.26316 9.9242 8.94225 9.53699 8.93084H7.29423C7.28912 8.93084 7.28145 8.9283 7.27506 8.9283L6.92747 8.80146C6.02014 8.4907 5.01569 8.71774 4.33328 9.38112L2.73843 10.9641C2.71414 10.9882 2.71414 11.0225 2.73843 11.0427L4.94668 13.1838C4.97096 13.2054 5.00547 13.2054 5.02591 13.1838L5.61759 12.5966C5.62782 12.5864 5.64187 12.5813 5.65976 12.5813H9.32997C9.8258 12.5813 10.3037 12.3682 10.6373 11.9915L13.1011 9.1934C13.3554 8.89532 13.3401 8.45645 13.0475 8.18501C13.0423 8.17993 13.0372 8.17486 13.0283 8.17486C13.0232 8.16598 13.0181 8.16091 13.0181 8.16091Z"
                                            fill="#BAFE03"
                                        />
                                        <path
                                            d="M7.66759 8C7.71688 7.99958 7.76553 7.98562 7.81028 7.95905C7.85503 7.93249 7.89485 7.89394 7.92708 7.84597L9.92312 4.68843C9.95127 4.64553 9.97244 4.59579 9.98537 4.54217C9.9983 4.48854 10.0027 4.43212 9.99838 4.37626C9.99404 4.3204 9.98101 4.26622 9.96009 4.21695C9.93916 4.16768 9.91075 4.12432 9.87654 4.08944C9.80591 4.02107 9.7176 3.99007 9.62975 4.0028C9.54191 4.01553 9.46118 4.07103 9.40415 4.1579L7.62767 7.00738L6.48993 6.03188C6.41688 5.98149 6.33184 5.96799 6.25146 5.99401C6.17108 6.02004 6.10115 6.08372 6.05536 6.17258C6.00957 6.26144 5.99123 6.36909 6.00393 6.47444C6.01662 6.57979 6.05943 6.67524 6.12399 6.74212L7.51456 7.9401C7.56995 7.97794 7.6315 7.99846 7.6942 8H7.66759Z"
                                            fill="#BAFE03"
                                        />
                                        <circle cx="8" cy="6" r="3.75" stroke="#BAFE03" stroke-width="0.5" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_114_4983">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                {t('127')}
                            </div>
                            <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">
                                {userAward?.alreadyDrawNum || 0}
                            </div>
                        </div>
                        <div className="w-[1px] h-12 bg-black"></div>
                        <div className="flex-1 text-center">
                            <div className="flex items-center justify-center text-[#000] text-[14px] font-[500]">
                                <svg
                                    className="w-[16px] h-[16px] mr-4 rounded-full"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <rect width="16" height="16" rx="8" fill="black" />
                                    <path
                                        d="M13.0181 8.08083C12.705 7.83349 12.2513 7.87535 11.9919 8.1785L10.774 9.54712C10.7638 9.55726 10.7587 9.57122 10.7587 9.5839C10.7267 10.26 10.1645 10.7838 9.48332 10.7838H8.14916C8.00093 10.7597 7.89486 10.6341 7.9153 10.4832C7.92553 10.3678 8.02137 10.2726 8.14916 10.246C8.15172 10.246 8.15428 10.2435 8.15939 10.2435H9.48332C9.87053 10.2536 10.1836 9.95681 10.2181 9.57248V9.56741C10.2283 9.18308 9.9242 8.86217 9.53699 8.85076H7.29423C7.28912 8.85076 7.28145 8.84822 7.27506 8.84822L6.92747 8.72138C6.02014 8.41062 5.01569 8.63766 4.33328 9.30104L2.73843 10.884C2.71414 10.9081 2.71414 10.9424 2.73843 10.9627L4.94668 13.1037C4.97096 13.1253 5.00547 13.1253 5.02591 13.1037L5.61759 12.5165C5.62782 12.5063 5.64187 12.5013 5.65976 12.5013H9.32997C9.8258 12.5013 10.3037 12.2882 10.6373 11.9114L13.1011 9.11332C13.3554 8.81524 13.3401 8.37637 13.0475 8.10493C13.0423 8.09986 13.0372 8.09478 13.0283 8.09478C13.0232 8.0859 13.0181 8.08083 13.0181 8.08083Z"
                                        fill="#BAFE03"
                                    />
                                    <path
                                        d="M6.24023 4.04006C6.24023 4.23442 6.27645 4.42687 6.3468 4.60643C6.41716 4.78599 6.52028 4.94915 6.65028 5.08658C6.78029 5.22401 6.93462 5.33302 7.10448 5.4074C7.27433 5.48178 7.45638 5.52006 7.64023 5.52006C7.82408 5.52006 8.00614 5.48178 8.17599 5.4074C8.34585 5.33302 8.50018 5.22401 8.63018 5.08658C8.76019 4.94915 8.86331 4.78599 8.93367 4.60643C9.00402 4.42687 9.04023 4.23442 9.04023 4.04006C9.04023 3.64754 8.89274 3.27109 8.63018 2.99354C8.36763 2.71599 8.01154 2.56006 7.64023 2.56006C7.26893 2.56006 6.91284 2.71599 6.65028 2.99354C6.38773 3.27109 6.24023 3.64754 6.24023 4.04006Z"
                                        fill="#BAFE03"
                                    />
                                    <path
                                        d="M7.04004 7.64021C7.04004 7.88421 7.13275 8.11822 7.29778 8.29075C7.46282 8.46329 7.68665 8.56021 7.92004 8.56021C8.15343 8.56021 8.37726 8.46329 8.54229 8.29075C8.70732 8.11822 8.80004 7.88421 8.80004 7.64021C8.80004 7.5194 8.77728 7.39977 8.73305 7.28815C8.68883 7.17653 8.62401 7.07511 8.54229 6.98968C8.46058 6.90425 8.36357 6.83648 8.2568 6.79025C8.15003 6.74401 8.0356 6.72021 7.92004 6.72021C7.80448 6.72021 7.69004 6.74401 7.58328 6.79025C7.47651 6.83648 7.3795 6.90425 7.29778 6.98968C7.21607 7.07511 7.15125 7.17653 7.10702 7.28815C7.0628 7.39977 7.04004 7.5194 7.04004 7.64021Z"
                                        fill="#BAFE03"
                                    />
                                    <path
                                        d="M9.23534 4.47998C9.10112 5.09142 8.65332 5.57558 8.08008 5.73405C8.16412 6.24816 8.61192 6.63998 9.15255 6.63998C9.75339 6.63998 10.2401 6.15582 10.2401 5.55811C10.2401 4.9891 9.79729 4.52241 9.23534 4.47998Z"
                                        fill="#BAFE03"
                                    />
                                </svg>
                                {t('128')}
                            </div>
                            <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">
                                {userAward?.availableNum || 0}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 text-center rounded-full text-[16px] font-[700] mt-20"
                    style={{ boxShadow: '0px 5px 0px 0px #579B00' }}
                    onClick={handleSubmit}
                >
                    {t('129')}
                </div>

                <img src={icon9} alt="" className="w-[124px] h-[124px] absolute top-[-14px] right-[-8px]" />
            </div>

            <div className="text-[#BAFE03] font-[600] text-[18px] mx-20 mt-20 mb-18">{t('130')}</div>

            <div className="flex items-center py-8 mx-20">
                <div className="flex-1 text-[#fff] text-[12px] font-[500]">{t('130_0')}</div>
                <div className="flex-1 text-center text-[#fff] text-[12px] font-[500]">{t('131')}</div>
                <div className="flex-1 text-right text-[#fff] text-[12px] font-[500]">{t('132')}</div>
            </div>

            <div className="h-1 bg-[#ffffff3b] mx-20"></div>

            <div className="mx-20 ">
                {userAwardList.map((item: any, index: Key) => (
                    <div className="flex items-center py-6" key={index}>
                        <div className="flex-1 text-[#fff] text-[12px] font-[500]">
                            {timestampToDateString(convertToLocalUtc0Timestamp(item?.createTime))}
                        </div>
                        <div className="flex-1 text-center text-[#fff] text-[12px] font-[500]">
                            {item?.type === 3 ? '-' : '+'}
                            {item?.amount}
                        </div>
                        <div
                            className="flex-1 text-right text-[12px] font-[500]"
                            style={{
                                color: item?.type === 3 ? '#BAFE03' : item?.status === 1 ? '#fff' : 'red',
                            }}
                        >
                            {item?.type === 1 ? t('133') : item?.type === 2 ? t('134') : t('135')}
                        </div>
                    </div>
                ))}
                {userAwardList.length === 0 ? <NoData /> : ''}

                <div
                    style={{ display: total <= userAwardList.length || userAwardList.length === 0 ? 'none' : 'flex' }}
                    className=" items-center justify-center pt-[20px] pb-[30px] text-[#fff] text-[12px] font-[300]"
                    onClick={() => {
                        showLoding(true);
                        setPageNum(pageNum + 1);
                        getList(pageNum + 1);
                    }}
                >
                    {t('110')}
                    <svg
                        className="ml-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                        <path
                            d="M1.86828 1.84467L6.00211 5.87321L10.1887 1.82715L10.6806 1.84467L6.00211 6.79251L1.32373 1.84467H1.86828ZM1.86828 5.14121L6.00211 9.16976L10.1887 5.12959L10.6806 5.14121L6.00211 10.0949L1.32373 5.14121H1.86828Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
