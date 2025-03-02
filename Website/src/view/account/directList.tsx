import BarckBar from '../../components/barckBar';
import icon2 from '../../assets/image/my/2.png';
import icon8 from '../../assets/image/my/8.png';
import icon5 from '../../assets/image/my/5.png';
import solLogo from '../../assets/image/solLogo.png';
import { Dropdown, Popover, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getFriendList, getUserInfo } from '../../API/ido';
import { useDispatch, useSelector } from 'react-redux';
import copy from 'copy-to-clipboard';
import { useWallet } from '@solana/wallet-adapter-react';
import { createDelMessageAction } from '../../store/actions';
import { addMessage, AddrHandle, formatTimestamp2 } from '../../utils/tool';
import NoData from '../../components/noData';

export default function Home() {
    const { t } = useTranslation();
    const content = (
        <div className="bg-gradient-to-b from-[#242928] to-[#0D1114] px-20 py-14 rounded-2xl ">
            <p className="text-[#fff] text-[12px] mb-4">{t('100')}</p>
            <p className="text-[#fff] text-[12px]">{t('101')}</p>
        </div>
    );

    const [showLength, setShowLength] = useState(20);
    const [pageNum, setPageNum] = useState(1);
    const [friends, setFriends] = useState([]);
    const handleGetFriends = async (num: any) => {
        try {
            let res: any = await getFriendList({
                pageNum: num,
                pageSize: 20,
            });
            if (res.code === 200) {
                setFriends(friends.concat(res.data?.records || []));
                setShowLength(res.data?.total);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const { publicKey, signMessage, disconnect } = useWallet();
    const token = useSelector((state: any) => state?.token);
    useEffect(() => {
        if (token && publicKey) {
            setFriends([]);
            handleGetFriends(1);
        }
    }, [token, publicKey]);

    return (
        <div className="pb-20">
            <BarckBar title={t('160')}>
                <Popover content={content} placement="bottomRight" trigger="click">
                    <div className="ml-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <g clip-path="url(#clip0_861_752)">
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
                                <clipPath id="clip0_861_752">
                                    <rect width="12" height="12" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </Popover>
            </BarckBar>
            <div className="h-1 bg-[#ffffff3b] mx-20"></div>

            <div className="mx-20 pt-16"></div>
            {friends.map((item: any, index: number) => (
                <div className="mx-20 flex  items-center py-8" key={index}>
                    <img
                        src={icon5}
                        alt=""
                        className={
                            item?.isJoinTask === 0
                                ? 'grayscale w-24 h-24 rounded-full mr-12'
                                : 'w-24 h-24 rounded-full mr-12'
                        }
                    />
                    <div
                        className={
                            item?.isJoinTask === 0
                                ? 'flex-1 text-[#9B9C9C] text-[12px] font-[500]'
                                : 'flex-1 text-[#fff] text-[12px] font-[500]'
                        }
                    >
                        {AddrHandle(item?.address, 4, 4)}
                    </div>
                    <div
                        className={
                            item?.isEarn === 0
                                ? 'bg-[#B6B6B6] flex items-center text-[#000] text-[12px] font-[500]  rounded-2xl py-4 px-6'
                                : 'bg-gradient-to-r from-[#A0FF05]  to-[#C5D503] flex items-center text-[#000] text-[12px] font-[500]  rounded-2xl py-4 px-6'
                        }
                        style={{ display: item?.awardSolNum > 0 ? 'flex' : 'none' }}
                    >
                        <img src={solLogo} alt="" className="w-16 h-16 rounded-full mr-2" />+{item?.awardSolNum}
                    </div>
                    <div className="ml-12 text-[#fff] text-[12px] font-[500]">{formatTimestamp2(item?.time)}</div>
                </div>
            ))}
            {friends.length === 0 ? <NoData /> : ''}
            {/* <div className="flex items-center py-8">
                <img src={icon5} alt="" className="grayscale w-24 h-24 rounded-full mr-12" />
                <div className="flex-1  text-[#9B9C9C] text-[12px] font-[500]">UQDH...v2D8</div>
                <div className="ml-12 text-[#fff] text-[12px] font-[500]">Jnly-27</div>
            </div> */}
            <div
                style={{ display: showLength === friends.length || friends.length === 0 ? 'none' : 'flex' }}
                className=" items-center justify-center pt-[20px] pb-[30px] text-[#fff] text-[12px] font-[300]"
                onClick={() => {
                    setPageNum(pageNum + 1);
                    handleGetFriends(pageNum + 1);
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
    );
}
