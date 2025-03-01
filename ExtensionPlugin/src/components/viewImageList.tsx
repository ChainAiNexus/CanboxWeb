import React, { useEffect } from 'react';
import icon32 from '../assets/image/icon32.png';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
    show: boolean;
    imgIndex: number;
    imgList: [];
    chartingList: any[];
}
const ComponentName = (props: Props) => {
    const [show, setShow] = React.useState(props?.show || false);
    const [imgIndex, setImgIndex] = React.useState(props?.imgIndex || 0);
    const [imgList, setImgList] = React.useState(props?.imgList || []);
    const [chartingList, setChartingList] = React.useState(props?.chartingList || []);
    const [swiperRef, setSwiperRef]: any = React.useState(null);
    useEffect(() => {
        setShow(props?.show || false);
        setImgIndex(props?.imgIndex || 0);
        setImgList(props?.imgList || []);
        setChartingList(props?.chartingList || []);
        swiperRef?.slideTo(props?.imgIndex || 0, 0);
    }, [props, swiperRef]);

    return (
        <div>
            <div className={`${show ? 'block' : 'hidden'}`}>
                <div className="fixed right-10 left-10 top-[20%] z-[31]">
                    <div className=" relative">
                        <Swiper
                            ref={swiperRef}
                            onSwiper={setSwiperRef}
                            spaceBetween={0}
                            slidesPerView={1}
                            initialSlide={imgIndex}
                            freeMode={true}
                            onSlideChange={(e: any) => setImgIndex(e.activeIndex)}
                        >
                            {imgList.map((item: any, index: React.Key | null | undefined) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={item}
                                        className="w-full rounded-2xl"
                                        style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}
                                        alt=""
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div
                            className="bg-[#242928] absolute top-[16px] left-[20px] rounded-full p-6 z-10 text-[14px] text-[#BAFE03]"
                            style={{
                                display: chartingList[imgIndex]?.luckNum ? 'block' : 'none',
                                border: '1px solid rgba(255, 255, 255, 0.20)',
                            }}
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            {chartingList[imgIndex]?.luckNum}
                        </div>
                        <div
                            className="bg-[#242928] absolute top-[16px] right-[20px] rounded-full p-6 z-10"
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            <img src={icon32} className="w-[20px]" alt="" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center pt-[36px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            onClick={() => {
                                if (imgIndex + 1 > 1) {
                                    setImgIndex(imgIndex - 1);
                                    if (swiperRef) {
                                        swiperRef?.slideTo(imgIndex - 1, 0);
                                    }
                                }
                            }}
                        >
                            <path
                                d="M13.875 17.25C13.6875 17.25 13.5 17.175 13.35 17.025L8.85 12.525C8.55 12.225 8.55 11.775 8.85 11.475L13.35 6.975C13.65 6.675 14.1 6.675 14.4 6.975C14.7 7.275 14.7 7.725 14.4 8.025L10.425 12L14.4 15.975C14.7 16.275 14.7 16.725 14.4 17.025C14.25 17.175 14.0625 17.25 13.875 17.25ZM12 22.5C6.225 22.5 1.5 17.775 1.5 12C1.5 6.225 6.225 1.5 12 1.5C17.775 1.5 22.5 6.225 22.5 12C22.5 17.775 17.775 22.5 12 22.5ZM12 3C7.05 3 3 7.05 3 12C3 16.95 7.05 21 12 21C16.95 21 21 16.95 21 12C21 7.05 16.95 3 12 3Z"
                                fill="#BAFE03"
                            />
                        </svg>
                        <div className="text-[#fff] font-[500] text-[20px] mx-[30px]">
                            {imgIndex + 1}/{imgList.length}
                        </div>
                        <svg
                            onClick={() => {
                                if (imgIndex + 1 < imgList.length) {
                                    setImgIndex(imgIndex + 1);
                                    if (swiperRef) {
                                        swiperRef?.slideTo(imgIndex + 1, 0);
                                    }
                                }
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M10.125 17.25C10.3125 17.25 10.5 17.175 10.65 17.025L15.15 12.525C15.45 12.225 15.45 11.775 15.15 11.475L10.65 6.975C10.35 6.675 9.9 6.675 9.6 6.975C9.3 7.275 9.3 7.725 9.6 8.025L13.575 12L9.6 15.975C9.3 16.275 9.3 16.725 9.6 17.025C9.75 17.175 9.9375 17.25 10.125 17.25ZM12 22.5C17.775 22.5 22.5 17.775 22.5 12C22.5 6.225 17.775 1.5 12 1.5C6.225 1.5 1.5 6.225 1.5 12C1.5 17.775 6.225 22.5 12 22.5ZM12 3C16.95 3 21 7.05 21 12C21 16.95 16.95 21 12 21C7.05 21 3 16.95 3 12C3 7.05 7.05 3 12 3Z"
                                fill="#BAFE03"
                            />
                        </svg>
                    </div>
                </div>
                <div
                    onClick={() => {
                        setShow(false);
                    }}
                    className="fixed top-0 right-0 bottom-0 left-0 z-30"
                    style={{ background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(2.5px)' }}
                ></div>
            </div>
        </div>
    );
};

export default ComponentName;
