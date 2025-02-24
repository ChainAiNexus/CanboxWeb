import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { createDelMessageAction } from '../../../store/actions';
import { addMessage, showLoding } from '../../../utils/tool';
import home_2 from '../../../assets/image/home_2.png';
import home_13 from '../../../assets/image/home_13.png';
import { getSignBaseList, getSignIn } from '../../../API/ido';
import { useTranslation } from 'react-i18next';
import { useWallet } from '@solana/wallet-adapter-react';
import { use } from 'chai';

const ComponentName = (props?: {}) => {
    const dispatch = useDispatch();

    const { t, i18n } = useTranslation();
    const { publicKey, signMessage, signTransaction, connected, autoConnect, disconnect } = useWallet();
    const token = useSelector((state: any) => state?.token);
    const [signBase, setSignBase]: any = useState();
    const [swiperRef, setSwiperRef]: any = useState(null);
    const handleLoad = () => {
        getSignBaseList()
            .then((res: any) => {
                setSignBase(res.data);
            })
            .catch((err: any) => {});
    };
    useEffect(() => {
        if (publicKey && token) {
            handleLoad();
        } else {
            setSignBase({ list: [] });
        }
    }, [publicKey, token, i18n?.language]);

    useEffect(() => {
        if (!swiperRef || !signBase) return;
        if (signBase.currentSignDay >= 4) {
            setTimeout(() => {
                swiperRef.slideTo(7, 0);
                debugger;
            }, 1000);
        }
    }, [swiperRef, signBase]);
    const handleSign = () => {
        showLoding(true);
        getSignIn()
            .then((res: any) => {
                addMessage(t('156'));
                handleLoad();
            })
            .catch((err: any) => {})
            .finally(() => {
                showLoding(false);
            });
    };

    return (
        <div>
            <div className=" overflow-x-auto whitespace-nowrap mx-[36px] relative top-[-116px] pb-10">
                <Swiper spaceBetween={10} slidesPerView={4.3} ref={swiperRef} onSwiper={setSwiperRef}>
                    {signBase?.list.map((item: any, index: React.Key | null | undefined) => (
                        <SwiperSlide key={index}>
                            <div
                                key={index}
                                onClick={() => {
                                    if (signBase.isTodaySign) {
                                        dispatch(createDelMessageAction(0));
                                        addMessage(t('154'));
                                    }
                                    if (item.day === signBase.currentSignDay && !signBase.isTodaySign) {
                                        handleSign();
                                    }
                                }}
                                className={`${
                                    item.day === signBase.currentSignDay && !signBase.isTodaySign
                                        ? 'bg-gradient-to-b from-[#A0FF05]  to-[#C5D503]'
                                        : item.day < signBase.currentSignDay
                                        ? 'bg-[#111]'
                                        : item.day === signBase.currentSignDay && signBase.isTodaySign
                                        ? 'bg-[#111]'
                                        : 'bg-[#666868]'
                                } min-w-[64px] rounded-2xl text-center py-10`}
                                style={{
                                    border:
                                        item.day === signBase.currentSignDay && signBase.isTodaySign
                                            ? '1px solid #BAFE03'
                                            : '1px solid rgba(255, 255, 255, 0.20)',
                                    opacity: item.day > signBase.currentSignDay ? '0.5' : '1',
                                }}
                            >
                                <div
                                    className={`${
                                        item.day === signBase.currentSignDay && !signBase.isTodaySign
                                            ? 'text-[#000]'
                                            : 'text-[#fff]'
                                    } font-[600] text-[12px] py-[6px]}`}
                                >
                                    Day {item.day}
                                </div>
                                <div className="bg-[#000] p-3 mt-8 inline-block mx-auto rounded-full">
                                    {item.day < signBase.currentSignDay ||
                                    (item.day === signBase.currentSignDay && signBase.isTodaySign) ? (
                                        <img src={home_13} className="w-[18px] h-[18px]" alt="" />
                                    ) : (
                                        <img src={home_2} className="w-[18px] h-[18px]" alt="" />
                                    )}
                                </div>
                                <div
                                    className={`${
                                        item.day === signBase.currentSignDay && !signBase.isTodaySign
                                            ? 'text-[#000]'
                                            : 'text-[#BAFE03]'
                                    } font-[500] text-[12px]} pt-2`}
                                >
                                    +{item.awardNum}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ComponentName;
