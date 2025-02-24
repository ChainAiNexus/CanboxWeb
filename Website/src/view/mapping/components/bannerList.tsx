import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import home_7 from '../../../assets/image/7.png';
import loading3 from '../../../assets/image/loading3.gif';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
    chartingInfo: any;
    showIndex: number;
    buyState: number;
    onChangeIndex: Function;
}

const ComponentName = (props: Props, ref: any) => {
    const { t } = useTranslation();
    const swiperRef: any = useRef(null);

    const scrollToFirstSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideTo(0);
        }
    };

    useEffect(() => {
        const screenWidth = window.innerWidth;
        const adjustedWidth = screenWidth - 40;
        const element: any = document.querySelector('.banner_w');
        if (element) {
            element.style.width = `${adjustedWidth}px`;
            element.style.height = `${adjustedWidth}px`;
        }
    }, []);

    const [showIndex, setShowIndex] = useState(props?.showIndex || 0);

    useEffect(() => {
        setShowIndex(props?.showIndex);
        if (props?.showIndex === 0) {
            scrollToFirstSlide();
        }
    }, [props, props?.showIndex]);

    return (
        <div
            className="banner_w mx-auto mb-24 w-[335px] h-[335px] rounded-[18px] relative"
            style={{
                border: '1px solid rgba(255, 255, 255, 0.20)',
                backgroundImage:
                    props?.chartingInfo?.chartingUserList?.length > 0
                        ? `url(${props?.chartingInfo?.chartingUserList?.[showIndex]?.imgUrl})`
                        : `url(${home_7})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                className="absolute top-[20px] left-[20px] py-6 px-12 text-[#BAFE03] text-[14px] font-[600]"
                style={{
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.20)',
                    background: 'linear-gradient(267deg, #242928 -2.84%, #0D1114 88.23%)',
                    display: props?.chartingInfo?.chartingUserList?.[showIndex]?.luckNum ? 'block' : 'none',
                }}
            >
                {props?.chartingInfo?.chartingUserList?.[showIndex]?.luckNum}
            </div>
            <div
                className="absolute top-[40%] left-[20px] right-[20px] text-center py-6 px-12 text-[#fff] text-[18px] font-[500]"
                style={{
                    display: props?.chartingInfo?.chartingUserList?.length === 0 ? 'block' : 'none',
                    boxShadow: '0px 2.225px 2.225px 0px rgba(0, 0, 0, 0.25)',
                    background: 'linear-gradient(90deg, rgba(1, 1, 1, 0.00) 0%, #111 48.67%, rgba(0, 0, 0, 0.00) 100%)',
                }}
            >
                {props?.chartingInfo?.chartingUserList.length === 0 ? t('44_1') : ''}
            </div>
            <div className="absolute left-0 right-0 bottom-0 px-12 pb-18">
                {/* 2 */}
                {/* 5 */}
                {/* <div className="flex items-center justify-center hidden">
                    {[1, 2, 3].map((item, index) => (
                        <img
                            onClick={() => {
                                dispatch(createDelMessageAction(0));
                                addMessage(t('0'));
                            }}
                            src={home_7}
                            alt=""
                            className="w-[18%] mx-8 rounded-[8px]"
                            style={{
                                border: index === 1 ? '2px solid #BAFE0380' : '2px solid rgba(255, 255, 255, 0.20)',
                            }}
                        />
                    ))}
                </div> */}
                {/* 5 */}
                <Swiper ref={swiperRef} spaceBetween={10} slidesPerView={4.5} centeredSlides={false} className="">
                    {props?.chartingInfo?.chartingUserList.map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                            <img
                                onClick={() => {
                                    props?.onChangeIndex(index);
                                    // setShowIndex(index);
                                }}
                                src={item?.imgUrl}
                                alt=""
                                className="w-full rounded-[8px]"
                                style={{
                                    border:
                                        index === showIndex
                                            ? '2px solid #BAFE0380'
                                            : '2px solid rgba(255, 255, 255, 0.20)',
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div
                className="absolute top-[0px] left-[0px] right-[0px] bottom-0 bg-[#000000] justify-center"
                style={{
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.20)',
                    background: 'linear-gradient(267deg, #242928 -2.84%, #0D1114 88.23%)',
                    display: props?.buyState === 2 ? 'flex' : 'none',
                }}
            >
                <img src={loading3} className="w-[200px] h-[200px] mt-[16%]" alt="" />
            </div>
        </div>
    );
};

export default ComponentName;
