import BarckBar from '../../components/barckBar';
import icon2 from '../../assets/image/my/2.png';
import icon9 from '../../assets/image/my/10.png';
import icon11 from '../../assets/image/my/11.png';
import icon7 from '../../assets/image/my/7.png';
import icon12 from '../../assets/image/my/12.png';
import icon13 from '../../assets/image/my/13.png';
import icon14 from '../../assets/image/my/14.png';
import icon15 from '../../assets/image/my/15.png';
import { useTranslation } from 'react-i18next';
import { Key, useEffect, useState } from 'react';
import { getScoreAwardDetail, getScoreAwardInfo } from '../../API/ido';
import { useSelector } from 'react-redux';
import { convertToLocalUtc0Timestamp, showLoding, timestampToDateString } from '../../utils/tool';
import { useWallet } from '@solana/wallet-adapter-react';
import { set } from '@coral-xyz/anchor/dist/cjs/utils/features';

export default function Homes() {
    const { t } = useTranslation();
    const token = useSelector((state: any) => state?.token);
    const [info, setInfo]: any = useState();
    const [infoList, setInfoList]: any = useState([]);

    const getInfo = async () => {
        getScoreAwardInfo()
            .then((res: any) => {
                setInfo(res.data);
                getScoreAwardDetail({ pageNum: 1, pageSize: 20 })
                    .then((res: any) => {
                        setInfoList(res?.data?.list);
                        setTotal(res.data.total);
                    })
                    .catch((err: any) => {})
                    .finally(() => {
                        showLoding(false);
                    });
            })
            .catch((err: any) => {});
    };

    const { publicKey, signMessage, signTransaction, connected, autoConnect, disconnect } = useWallet();
    const [pageNum, setPageNum]: any = useState(1);
    const [total, setTotal]: any = useState(0);
    const getList = async (pageNum: number) => {
        getScoreAwardDetail({ pageNum: pageNum, pageSize: 20 })
            .then((res: any) => {
                setInfoList(infoList.concat(res?.data?.list || []));
                setTotal(res.data.total);
            })
            .catch((err: any) => {})
            .finally(() => {
                showLoding(false);
            });
    };
    useEffect(() => {
        if (publicKey && token) {
            showLoding(true);
            setPageNum(1);
            setInfoList([]);
            getInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicKey, token]);

    return (
        <div>
            <BarckBar title={t('125')} />

            <div
                className="px-16 mt-12 py-20 mx-20 bg-[#222] rounded-xl relative"
                style={{
                    border: '1px solid #999',
                }}
            >
                <div className="text-[#fff] font-[600] text-[14px]"></div>
                <div className="flex items-center text-[#BAFE03] mt-10 mb-16 font-[600] text-[20px]">
                    <img src={icon11} alt="" className="w-18 h-18 rounded-full mr-6 " />
                    {info?.totalAmount || 0}
                </div>
                <div
                    className="bg-gradient-to-r from-[#A0FF05]  to-[#C5D503] rounded-2xl"
                    style={{
                        border: '1px solid #999',
                    }}
                >
                    <div
                        style={{
                            backgroundImage: 'url(' + icon7 + ')',
                            backgroundPosition: 'top',
                            backgroundSize: 'cover',
                        }}
                    >
                        <div className="flex items-center py-[24px]">
                            <div className="flex-1 text-center">
                                <div className="flex items-center justify-center text-[#000] text-[14px] font-[500]">
                                    <img src={icon12} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                    {t('148')}
                                </div>
                                <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">
                                    {info?.refereeAward || 0}
                                </div>
                            </div>
                            <div className="w-[1px] h-12 bg-black"></div>
                            <div className="flex-1 text-center">
                                <div className="flex items-center justify-center text-[#000] text-[14px] font-[500]">
                                    <img src={icon13} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                    {t('152')}
                                </div>
                                <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">
                                    {info?.aiPictureAward || 0}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center pb-[24px]">
                            <div className="flex-1 text-center">
                                <div className="flex items-center justify-center text-[#000] text-[14px]">
                                    <img src={icon14} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                    {t('151')}
                                </div>
                                <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">
                                    {info?.taskAward || 0}
                                </div>
                            </div>
                            <div className="w-[1px] h-12 bg-black"></div>
                            <div className="flex-1 text-center">
                                <div className="flex items-center justify-center text-[#000] text-[14px]">
                                    <img src={icon15} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                    {t('150')}
                                </div>
                                <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">
                                    {info?.signInAward || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <img src={icon9} alt="" className="w-[124px] h-[124px] absolute top-[-14px] right-[-8px]" />
            </div>

            <div className="text-[#BAFE03] font-[600] text-[18px] mx-20 mt-20 mb-18">{t('149')}</div>

            <div className="flex items-center py-8 mx-20">
                <div className="flex-1 text-[#fff] text-[12px] font-[500]">{t('130_0')}</div>
                <div className="flex-1 text-center text-[#fff] text-[12px] font-[500]">{t('131')}</div>
                <div className="flex-1 text-right text-[#fff] text-[12px] font-[500]">{t('132')}</div>
            </div>

            <div className="h-1 bg-[#ffffff3b] mx-20"></div>

            <div className="mx-20 pb-[30px]">
                {infoList.map((item: any, index: Key) => (
                    <div className="flex items-center py-6" key={index}>
                        <div className="flex-1 text-[#fff] text-[12px] font-[500]">
                            {timestampToDateString(convertToLocalUtc0Timestamp(item?.createTime))}
                        </div>
                        <div className="flex-1 text-center text-[#fff] text-[12px] font-[500]">
                            {item?.type === 3 ? '-' : '+'}
                            {item?.amount}
                        </div>
                        <div className="flex-1 text-right text-[#fff] text-[12px] font-[500]">
                            {/* 4- 5- 6- 7- */}
                            {item?.type === 4
                                ? t('153_1')
                                : item?.type === 5
                                ? t('153_2')
                                : item?.type === 6
                                ? t('153')
                                : item?.type === 7
                                ? t('153_3')
                                : t('153')}
                        </div>
                    </div>
                ))}
                <div
                    className="flex items-center justify-center pt-[30px] text-[#fff] text-[12px] font-[300]"
                    onClick={() => {
                        showLoding(true);
                        setPageNum(pageNum + 1);
                        getList(pageNum + 1);
                    }}
                    style={{ display: total <= infoList.length || infoList.length === 0 ? 'none' : 'flex' }}
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
