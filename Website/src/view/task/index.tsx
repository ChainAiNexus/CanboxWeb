import { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, AddrHandle, openLinkInNewTab, showLoding } from '../../utils/tool';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { LOCAL_RPC, usdt_mint } from '../../config';
import { useTranslation } from 'react-i18next';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Footer from '../../components/footer';
import home_1 from '../../assets/image/home_1.png';
import home_2 from '../../assets/image/home_2.png';
import home_3 from '../../assets/image/home_3.png';
import home_4 from '../../assets/image/home_4.png';
import home_5 from '../../assets/image/home_5.png';
import home_6 from '../../assets/image/home_6.png';
import home_7 from '../../assets/image/home_7.png';
import home_10 from '../../assets/image/home_10.png';
import home_9 from '../../assets/image/home_9.png';
import home_11 from '../../assets/image/home_11.png';
import home_12 from '../../assets/image/home_12.png';
import home_linktree from '../../assets/image/home_linktree.png';
import home_youtub from '../../assets/image/home_youtub.png';

import home_4_1 from '../../assets/image/4.png';
import icon4 from '../../assets/image/my/4.png';
import { createDelMessageAction } from '../../store/actions';
import H5Top from '../../components/hander';
import SignIn from './components/signIn';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getTaskList, startTask, submitTask } from '../../API/ido';
export default function Home() {
    const { t, i18n } = useTranslation();
    const token = useSelector((state: any) => state?.token);
    const { publicKey } = useWallet();
    const Anchorwallet = useAnchorWallet();

    const { setVisible } = useWalletModal();
    const dispatch = useDispatch();

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [taskList, setTaskList] = useState<any>([]);
    const [taskList2, setTaskList2] = useState<any>([]);
    const fetchMoreData = () => {
        setHasMore(true);
        setPage(page === 1 ? 2 : page);
        if (taskList2.length >= total) {
            // setHasMore(false);
            return;
        } else {
            handleLoad(2);
        }
    };
    const handleLoad = (type: number = 1) => {
        // type =1  =2
        getTaskList(type)
            .then((res: any) => {
                if (type === 1) {
                    // 
                    setTotal(res.data.length);
                    setTaskList(res.data);
                } else {
                    // 
                    setTotal(res.data.length);
                    setTaskList2(res.data);
                }
            })
            .catch((err: any) => {});
    };
    useEffect(() => {
        if (!!publicKey && token) {
            handleLoad(1);
            handleLoad(2);
        } else {
        }
    }, [token, publicKey, i18n?.language]);

    return (
        <div className="overflow-hidden">
            <H5Top />
            <div className=" pt-[10px]"></div>
            <div
                className="mt-[30px] mx-20 rounded-2xl px-16 py-20 relative bg-[#161A19]"
                style={{
                    border: '1px solid rgba(255, 255, 255, 0.20)',
                    backgroundImage: 'url(' + home_4_1 + ')',
                    backgroundPosition: 'top',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="text-[#BAFE03] font-[600] text-[18px] ">{t('28')}</div>
                <div className="text-[#fff] font-[400] text-[12px] mt-[40px] mb-20"> </div>
                <img src={home_1} className="w-[114px] h-[114px] absolute top-[-32px] right-[-2px]" alt="" />
                <div className="h-[92px]"></div>
                <div
                    onClick={() => {
                        setVisible(true);
                    }}
                    className="py-12 rounded-2xl bg-gradient-to-r from-[#5DF9A5] to-[#BAFE03] flex items-center justify-center mx-24"
                    style={{
                        display: publicKey ? 'none' : 'flex',
                        boxShadow: '0px 16px 32px -16px rgba(145, 64, 254, 0.50)',
                        border: '1.406px solid rgba(145, 64, 254, 0.80)',
                    }}
                >
                    <img src={icon4} alt="" className="w-[20px] h-[20px] mr-4" />
                    {t('87')}
                </div>
            </div>
            <SignIn />
            <div className={`${publicKey ? 'block' : 'hidden'} mt-[-100px] pt-[26px] px-[20px]`}>
                <div
                    className="text-[#BAFE03] font-[600] text-[18px] mb-[20px]  items-center"
                    style={{
                        display: taskList.length > 0 ? 'flex' : 'none',
                    }}
                >
                    {t('29')}
                    <div className="flex items-center justify-end flex-1">
                        <img src={home_3} className="w-[16px] h-[16px]" alt="" />
                        <img src={home_3} className="w-[16px] h-[16px]" alt="" />
                        <img src={home_3} className="w-[16px] h-[16px]" alt="" />
                    </div>
                </div>
                <div
                    className="pt-24 pb-4 px-16 rounded-2xl relative bg-[#161A19]"
                    style={{
                        display: taskList.length > 0 ? 'block' : 'none',
                        border: '1px solid rgba(255, 255, 255, 0.20)',
                        backgroundImage: 'url(' + home_4_1 + ')',
                        backgroundPosition: 'top',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <img src={home_12} alt="" className="absolute top-[0px] right-[0px] w-[230px] h-[194px] z-[-2]" />

                    {taskList.map((item: any, index: number) => (
                        <div key={item.id}>
                            <div className="text-[#fff]"></div>
                            {/* taskType 1- 2-TG 3-systemType
                          systemType 1- 2- 3- */}
                            <div
                                className="py-18 px-16 mb-20 rounded-2xl flex items-center"
                                style={{
                                    border: '1px solid rgba(255, 255, 255, 0.20)',
                                }}
                            >
                                <img
                                    src={home_linktree}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{ display: item.taskType === 4 ? 'block' : 'none' }}
                                    alt=""
                                />
                                <img
                                    src={home_youtub}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{ display: item.taskType === 5 ? 'block' : 'none' }}
                                    alt=""
                                />
                                <img
                                    src={home_4}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{ display: item.taskType === 2 ? 'block' : 'none' }}
                                    alt=""
                                />
                                <img
                                    src={home_5}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{ display: item.taskType === 1 ? 'block' : 'none' }}
                                    alt=""
                                />
                                <img
                                    src={home_6}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{
                                        display:
                                            item.taskType === 3 && (item.systemType === 1 || item.systemType === 3)
                                                ? 'block'
                                                : 'none',
                                    }}
                                    alt=""
                                />
                                <img
                                    src={home_7}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{ display: item.taskType === 3 && item.systemType === 2 ? 'block' : 'none' }}
                                    alt=""
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="text-[#fff] font-[600] text-[14px] line-clamp-1_1">
                                        {item.name}
                                        {/* {t('38')} */}
                                    </div>
                                    <div className=" flex items-center text-[#9B9C9C] font-[400] text-[12px]">
                                        <img src={home_2} className="w-[12px] h-[12px] mr-4" alt="" />+{item.awardNum}{' '}
                                        {t('145')}
                                    </div>
                                </div>
                                {/* taskStatus -1  0- 1- 2- */}
                                <div
                                    style={{
                                        display: item.taskStatus === 0 ? 'flex' : 'none',
                                    }}
                                    onClick={() => {
                                        dispatch(createDelMessageAction(0));
                                        showLoding(true);
                                        submitTask({ taskBaseId: item.id })
                                            .then((res: any) => {
                                                handleLoad(1);
                                                if (res?.code === 200) {
                                                    addMessage(t('155'));
                                                }
                                            })
                                            .catch((err: any) => {})
                                            .finally(() => showLoding(false));
                                    }}
                                    className="w-[72px] flex justify-center items-center text-[#000] font-[600] rounded-2xl text-[12px] px-8 py-5 bg-gradient-to-r from-[#A0FF05]  to-[#C5D503]"
                                >
                                    <div className="bg-[#000] p-3 inline-block rounded-full mr-4">
                                        <img src={home_2} className="w-[10px] h-[10px]" alt="" />
                                    </div>
                                    <div className="line-clamp-1_1">{t('39')}</div>
                                </div>
                                {/* 、 */}
                                <div
                                    onClick={() => {
                                        showLoding(true);
                                        startTask({
                                            taskBaseId: item.id,
                                        })
                                            .then((res: any) => {
                                                if (item.taskType !== 3) {
                                                    openLinkInNewTab(item.taskUrl);
                                                }
                                                setTimeout(() => {
                                                    handleLoad(1);
                                                }, 2000);
                                            })
                                            .catch((err: any) => {})
                                            .finally(() => showLoding(false));
                                    }}
                                    className="w-[72px]  flex justify-center items-center text-[#000] font-[600] rounded-2xl text-[12px] px-8 py-5 bg-[#fff]"
                                    style={{
                                        display: item.taskStatus === -1 || item.taskStatus === 2 ? 'flex' : 'none',
                                    }}
                                >
                                    <img src={home_10} className="w-[16px] h-[16px] mr-4" alt="" />
                                    <div className="line-clamp-1_1">{item.taskType === 3 ? t('157') : t('41')}</div>
                                </div>
                                {/*  */}
                                <div
                                    className="w-[72px] flex justify-end items-center text-[#000] font-[600] rounded-2xl text-[12px] px-8 py-5 "
                                    style={{
                                        display: item.taskStatus === 1 ? 'flex' : 'none',
                                    }}
                                >
                                    <img src={home_9} className="w-[16px] h-[16px]" alt="" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${publicKey ? 'block' : 'hidden'} mt-[32px] px-[20px]`}>
                <div className="text-[#BAFE03] font-[600] text-[18px] mb-[20px] flex items-center">
                    {t('37')}
                    <div className="flex items-center justify-end flex-1">
                        <img src={home_3} className="w-[16px] h-[16px]" alt="" />
                        <img src={home_3} className="w-[16px] h-[16px]" alt="" />
                        <img src={home_3} className="w-[16px] h-[16px]" alt="" />
                    </div>
                </div>

                <div
                    className="pt-24 pb-4 px-16 rounded-2xl relative bg-[#161A19] mb-[10px]"
                    style={{
                        border: '1px solid rgba(255, 255, 255, 0.20)',
                        backgroundImage: 'url(' + home_4_1 + ')',
                        backgroundPosition: 'top',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <img src={home_12} alt="" className="absolute top-[0px] right-[0px] w-[230px] h-[194px] z-[-2]" />
                    {taskList2.map((item: any, index: number) => (
                        <div key={item.id}>
                            <div className="text-[#fff]"></div>
                            {/* taskType 1- 2-TG 3-systemType
                          systemType 1- 2- 3- */}
                            <div
                                className="py-18 px-16 mb-20 rounded-2xl flex items-center"
                                style={{
                                    border: '1px solid rgba(255, 255, 255, 0.20)',
                                }}
                            >
                                <img
                                    src={home_linktree}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{ display: item.taskType === 4 ? 'block' : 'none' }}
                                    alt=""
                                />
                                <img
                                    src={home_youtub}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{ display: item.taskType === 5 ? 'block' : 'none' }}
                                    alt=""
                                />
                                <img
                                    src={home_4}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{ display: item.taskType === 2 ? 'block' : 'none' }}
                                    alt=""
                                />
                                <img
                                    src={home_5}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{ display: item.taskType === 1 ? 'block' : 'none' }}
                                    alt=""
                                />
                                <img
                                    src={home_6}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{
                                        display:
                                            item.taskType === 3 && (item.systemType === 1 || item.systemType === 3)
                                                ? 'block'
                                                : 'none',
                                    }}
                                    alt=""
                                />
                                <img
                                    src={home_7}
                                    className="w-[32px] h-[32px] mr-12"
                                    style={{ display: item.taskType === 3 && item.systemType === 2 ? 'block' : 'none' }}
                                    alt=""
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="text-[#fff] font-[600] text-[14px] line-clamp-1_1">
                                        {item.name}
                                        {/* {t('38')} */}
                                    </div>
                                    <div className=" flex items-center text-[#9B9C9C] font-[400] text-[12px]">
                                        <img src={home_2} className="w-[12px] h-[12px] mr-4" alt="" />+{item.awardNum}{' '}
                                        {t('145')}
                                    </div>
                                </div>
                                {/* taskStatus -1  0- 1- 2- */}
                                <div
                                    style={{
                                        display: item.taskStatus === 0 ? 'flex' : 'none',
                                    }}
                                    onClick={() => {
                                        dispatch(createDelMessageAction(0));
                                        showLoding(true);
                                        submitTask({ taskBaseId: item.id })
                                            .then((res: any) => {
                                                handleLoad(2);
                                                if (res?.code === 200) {
                                                    addMessage(t('155'));
                                                }
                                            })
                                            .catch((err: any) => {})
                                            .finally(() => showLoding(false));
                                    }}
                                    className="w-[72px] flex justify-center items-center text-[#000] font-[600] rounded-2xl text-[12px] px-8 py-5 bg-gradient-to-r from-[#A0FF05]  to-[#C5D503]"
                                >
                                    <div className="bg-[#000] p-3 inline-block rounded-full mr-4">
                                        <img src={home_2} className="w-[10px] h-[10px]" alt="" />
                                    </div>
                                    <div className="line-clamp-1_1">{t('39')}</div>
                                </div>
                                {/* 、 */}
                                <div
                                    onClick={() => {
                                        showLoding(true);
                                        startTask({
                                            taskBaseId: item.id,
                                        })
                                            .then((res: any) => {
                                                if (item.taskType !== 3) {
                                                    openLinkInNewTab(item.taskUrl);
                                                }
                                                setTimeout(() => {
                                                    handleLoad(2);
                                                }, 5000);
                                            })
                                            .catch((err: any) => {})
                                            .finally(() => showLoding(false));
                                    }}
                                    className="w-[72px] flex justify-center items-center text-[#000] font-[600] rounded-2xl text-[12px] px-8 py-5 bg-[#fff]"
                                    style={{
                                        display: item.taskStatus === -1 || item.taskStatus === 2 ? 'flex' : 'none',
                                    }}
                                >
                                    <img src={home_10} className="w-[16px] h-[16px] mr-4" alt="" />
                                    <div className="line-clamp-1_1">{item.taskType === 3 ? t('157') : t('41')}</div>
                                </div>
                                {/*  */}
                                <div
                                    className="w-[72px] flex justify-end items-center text-[#000] font-[600] rounded-2xl text-[12px] px-8 py-5 "
                                    style={{
                                        display: item.taskStatus === 1 ? 'flex' : 'none',
                                    }}
                                >
                                    <img src={home_9} className="w-[16px] h-[16px]" alt="" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <img src={home_11} className="w-[200px] h-[200px] fixed left-0 bottom-[72px] z-[-10]" alt="" />
            <div className="h-[220px] w-full"></div>
            <Footer index={4} />
        </div>
    );
}
