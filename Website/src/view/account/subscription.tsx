import BarckBar from '../../components/barckBar';
import icon2 from '../../assets/image/my/2.png';
import icon9 from '../../assets/image/my/9.png';
import icon5 from '../../assets/image/my/5.png';
import solLogo from '../../assets/image/logo2.png';
import icon7 from '../../assets/image/my/7.png';
import { useTranslation } from 'react-i18next';
import { getDrawSolAward, getSubscriptionInfo, getSubscriptionInfoDetail } from '../../API/ido';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDispatch, useSelector } from 'react-redux';
import { createDelMessageAction } from '../../store/actions';
import { addMessage, formatTimestamp2, showLoding, timestampToDateString } from '../../utils/tool';
import bs58 from 'bs58';
import NoData from '../../components/noData';

export default function Home() {
    const { t } = useTranslation();

    const [pageNum, setPageNum]: any = useState(1);
    const [total, setTotal]: any = useState(0);
    const [info, setInfo]: any = useState();
    const [list, setList]: any = useState([]);
    const handleLoad = async () => {
        try {
            const _info = await getSubscriptionInfo();
            setInfo(_info?.data);
            setList([]);
            const _list = await getSubscriptionInfoDetail({ pageNum: pageNum, pageSize: 20 });
            setList(list.concat(_list?.data?.list || []));
            setTotal(_list.data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePage = async (num: any) => {
        setPageNum(num);
        const _list = await getSubscriptionInfoDetail({ pageNum: num, pageSize: 20 });
        setList(list.concat(_list?.data?.list || []));
        setTotal(_list.data?.total);
        showLoding(false);
    };

    const dispatch = useDispatch();
    const { publicKey, signMessage, signTransaction, connected, autoConnect, disconnect } = useWallet();
    const token = useSelector((state: any) => state?.token);
    useEffect(() => {
        if (token && publicKey) {
            setPageNum(1);
            setList([]);
            setTimeout(() => {
                handleLoad();
            }, 100);
        }
    }, [publicKey, token]);
    const handleSubmit = async () => {
        if (info?.amount <= 0) {
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

            getDrawSolAward({ sign: bs58.encode(signature), signMsg: _msg, type: 2 })
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

    return (
        <div>
            <BarckBar title={t('112')} />

            <div
                className="px-16 py-20 mt-12 mx-20 bg-[#222] rounded-xl relative"
                style={{
                    border: '1px solid #999',
                }}
            >
                <div className="text-[#fff] font-[600] text-[12px]">{t('113')}</div>
                <div className="flex items-center text-[#BAFE03] mt-10 mb-16 font-[600] text-[20px]">
                    <img
                        src={solLogo}
                        alt=""
                        className="w-18 h-18 rounded-full mr-6 "
                        style={{ border: '1px solid #A0FF05' }}
                    />
                    {info?.totalAmount || 0}
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
                            <div className="flex items-center justify-center text-[#000] text-[12px]">
                                <svg
                                    className="w-[16px] h-[16px] mr-4 rounded-full"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <g clip-path="url(#clip0_114_4933)">
                                        <path
                                            d="M0.0253906 8.00637C0.0253906 9.05612 0.231952 10.0956 0.63328 11.0654C1.03461 12.0353 1.62284 12.9165 2.3644 13.6588C3.10596 14.401 3.98632 14.9899 4.95521 15.3916C5.9241 15.7933 6.96255 16.0001 8.01127 16.0001C9.05999 16.0001 10.0984 15.7933 11.0673 15.3916C12.0362 14.9899 12.9166 14.401 13.6581 13.6588C14.3997 12.9165 14.9879 12.0353 15.3893 11.0654C15.7906 10.0956 15.9972 9.05612 15.9972 8.00637C15.9972 5.88632 15.1558 3.8531 13.6581 2.35399C12.1605 0.854884 10.1293 0.0126953 8.01127 0.0126953C5.89328 0.0126953 3.86204 0.854884 2.3644 2.35399C0.866758 3.8531 0.0253906 5.88632 0.0253906 8.00637Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M4.71524 11.4532C4.61842 11.3563 4.61842 11.1582 4.71524 11.015L10.8446 4.8796C10.9415 4.78268 11.1393 4.78268 11.2824 4.8796C11.3793 4.97652 11.3793 5.17457 11.2824 5.31784L5.15306 11.4532C5.00993 11.6007 4.81207 11.6007 4.71524 11.4532ZM9.86797 8.30546L11.274 9.71289C11.7539 10.1933 11.7539 10.9813 11.274 11.4616C10.7941 11.942 10.0069 11.942 9.52698 11.4616L8.12093 10.0542L7.6789 10.4967L9.08075 11.8999C9.80482 12.6247 10.992 12.6247 11.7203 11.8999C12.4443 11.1751 12.4443 9.98679 11.7203 9.25779L10.3184 7.85458C10.1837 7.98521 10.0321 8.14112 9.86797 8.30546ZM6.12972 8.03156L4.72366 6.62413C4.24375 6.14375 4.24375 5.35576 4.72366 4.87538C5.20357 4.395 5.9908 4.395 6.47071 4.87538L7.87676 6.28281L8.31878 5.84035L6.91694 4.43714C6.19286 3.71236 5.00572 3.71236 4.27743 4.43714C3.55336 5.16192 3.55336 6.35023 4.27743 7.07923L5.67928 8.48244L6.12972 8.03156Z"
                                            fill="#BAFE03"
                                            stroke="#BAFE03"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_114_4933">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                {t('114')}
                            </div>
                            <div className="text-[#000] font-[600] text-[16px] pt-4 pb-6">
                                0{/* {info?.freezeAmount || 0} */}
                            </div>
                        </div>
                        <div className="w-[1px] h-12 bg-black"></div>
                        <div className="flex-1 text-center">
                            <div className="flex items-center justify-center text-[#000] text-[12px]">
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
                                        d="M13.0176 8.08083C12.7045 7.83349 12.2508 7.87535 11.9914 8.1785L10.7735 9.54712C10.7633 9.55726 10.7582 9.57122 10.7582 9.5839C10.7263 10.26 10.164 10.7838 9.48283 10.7838H8.14868C8.00044 10.7597 7.89437 10.6341 7.91482 10.4832C7.92504 10.3678 8.02088 10.2726 8.14868 10.246C8.15123 10.246 8.15379 10.2435 8.1589 10.2435H9.48283C9.87004 10.2536 10.1831 9.95681 10.2176 9.57248V9.56741C10.2279 9.18308 9.92372 8.86217 9.5365 8.85076H7.29374C7.28863 8.85076 7.28096 8.84822 7.27457 8.84822L6.92698 8.72138C6.01965 8.41062 5.0152 8.63766 4.33279 9.30104L2.73794 10.884C2.71366 10.9081 2.71366 10.9424 2.73794 10.9627L4.94619 13.1037C4.97047 13.1253 5.00498 13.1253 5.02542 13.1037L5.6171 12.5165C5.62733 12.5063 5.64139 12.5013 5.65928 12.5013H9.32948C9.82531 12.5013 10.3033 12.2882 10.6368 11.9114L13.1006 9.11332C13.3549 8.81524 13.3396 8.37637 13.047 8.10493C13.0419 8.09986 13.0367 8.09478 13.0278 8.09478C13.0227 8.0859 13.0176 8.08083 13.0176 8.08083Z"
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
                                {t('115')}
                            </div>
                            <div className="text-[#000] font-[600] text-[16px] pt-4 pb-6">{info?.amount || 0}</div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-gradient-to-b from-[#9CF021] to-[#DBF95C] py-10 text-center rounded-full text-[16px] font-[700] mt-20"
                    style={{ boxShadow: '0px 5px 0px 0px #579B00' }}
                    onClick={handleSubmit}
                >
                    {t('116')}
                </div>

                <img src={icon9} alt="" className="w-[124px] h-[124px] absolute top-[-14px] right-[-8px]" />
            </div>

            <div className="text-[#BAFE03] font-[600] text-[18px] mx-20 mt-20 mb-10">{t('117')}</div>

            <div className="flex items-center py-8 mx-20">
                <div className="flex-1 text-[#fff] text-[12px] font-[500]">{t('118')}</div>
                <div className="flex-1 text-center text-[#fff] text-[12px] font-[500]">{t('119')}</div>
                <div className="flex-1 text-right text-[#fff] text-[12px] font-[500]">{t('120')}</div>
            </div>

            <div className="h-1 bg-[#ffffff3b] mx-20"></div>

            <div className="mx-20 ">
                {list.map((item: any, index: number) => (
                    <div className="flex items-center py-6" key={index}>
                        <div className="flex-1 text-[#fff] text-[12px] font-[500]">
                            {timestampToDateString(item?.createTime)}
                        </div>
                        <div className="flex-1 text-center text-[#fff] text-[12px] font-[500]">+{item.amount}</div>
                        {/* 8- 9-SOL */}
                        <div
                            className="flex-1 text-right text-[#fff] text-[12px] font-[500]"
                            style={{ display: item.type === 8 ? 'block' : 'none' }}
                        >
                            {t('121')}
                        </div>
                        <div
                            className="flex-1 text-right text-[#BAFE03] text-[12px] font-[500]"
                            style={{ display: item.type === 9 ? 'block' : 'none' }}
                        >
                            {t('122')}
                        </div>
                    </div>
                ))}
                {list.length === 0 ? <NoData /> : ''}
                <div
                    className="flex items-center justify-center pt-[30px] text-[#fff] text-[12px] font-[300]"
                    style={{ display: total === list.length || list.length === 0 ? 'none' : 'flex' }}
                    onClick={() => {
                        showLoding(true);
                        setPageNum(pageNum + 1);
                        handlePage(pageNum + 1);
                    }}
                >
                    {t('124')}
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
