import BarckBar from '../../components/barckBar';
import icon6 from '../../assets/image/6.png';
import icon5 from '../../assets/image/7.png';
import home_2 from '../../assets/image/home_2.png';
import icon7 from '../../assets/image/my/7.png';
import ViewImageList from '../../components/viewImageList';
import { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWallet } from '@solana/wallet-adapter-react';
import { getChartingList, operateCollect } from '../../API/ido';
import { showLoding } from '../../utils/tool';
import { useTranslation } from 'react-i18next';
import NoData from '../../components/noData';

export default function Home() {
    const [showImgList, setShowImgList] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    const { publicKey, signMessage, disconnect } = useWallet();
    const token = useSelector((state: any) => state?.token);
    useEffect(() => {
        if (publicKey && token) {
            handleChartingList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, publicKey]);

    const [chartingList1, setChartingList1]: any = useState([]);
    const [chartingList2, setChartingList2]: any = useState([]);
    const handleChartingList = () => {
        //
        getList1(1);
        // 
        getList2(1);
    };
    const handleColl = (id: any) => {
        showLoding(true);
        operateCollect({
            id,
        })
            .then((res: any) => {
                setChartingList1([]);
                setChartingList2([]);
                setShowImgList(false);
            })
            .catch((error: any) => {})
            .finally(() => {
                showLoding(false);
                handleChartingList();
            });
    };

    const [imgList, setImgList]: any = useState([
        // 'https://amazeui.shopxo.net/static/images/001.jpg',
        // 'https://amazeui.shopxo.net/static/images/002.jpg',
        // 'https://amazeui.shopxo.net/static/images/003.jpg',
    ]);
    const { t } = useTranslation();
    const [list, setList]: any = useState([]);

    const [pageNum1, setPageNum1]: any = useState(1);
    const [total1, setTotal1]: any = useState(0);
    const getList1 = async (pageNum: any) => {
        getChartingList({ pageNum: pageNum, pageSize: 20, type: 1 })
            .then((res: any) => {
                setChartingList1((prevList: string | any[]) => prevList.concat(res?.data?.list || []));
                // setChartingList1(chartingList1.concat(res?.data?.list || []));
                setTotal1(res.data.total);
            })
            .catch((error: any) => {})
            .finally(() => {
                showLoding(false);
            });
    };

    const [pageNum2, setPageNum2]: any = useState(1);
    const [total2, setTotal2]: any = useState(0);
    const getList2 = async (pageNum: any) => {
        getChartingList({ pageNum: pageNum, pageSize: 20, type: 2 })
            .then((res: any) => {
                setChartingList2((prevList: string | any[]) => prevList.concat(res?.data?.list || []));
                // setChartingList2(chartingList2.concat(res?.data?.list || []));
                setTotal2(res.data.total);
            })
            .catch((error: any) => {})
            .finally(() => {
                showLoding(false);
            });
    };

    return (
        <div>
            <BarckBar title={t('163')} />
            <ViewImageList show={showImgList} imgIndex={imgIndex} imgList={imgList} chartingList={list} />
            <div className="mt-12 mx-20 ">
                <div className="flex items-center text-[#fff] font-[500] text-[14px]">
                    <img src={icon6} alt="" className="w-[12px] h-12 mr-6" />
                    {t('164')}({chartingList1.length})
                </div>
                <div
                    className={`flex items-start justify-start flex-wrap mt-20 `}
                    style={{
                        display: chartingList1.length > 0 ? 'flex' : 'none',
                    }}
                >
                    {/*  3 mr-10*/}
                    {chartingList1.map((item: any, index: number) => (
                        <div
                            className={`rounded-[16px] mb-16 relative overflow-hidden w-[21%] ${
                                index % 4 !== 3 ? 'mr-16' : ''
                            }`}
                            style={{
                                border: '1px solid #999',
                            }}
                        >
                            <img
                                onClick={() => {
                                    setImgIndex(-1);
                                    setShowImgList(true);
                                    let _arr = [];
                                    for (let i = 0; i < chartingList1.length; i++) {
                                        _arr.push(chartingList1[i].imgUrl);
                                    }
                                    setImgList(_arr);
                                    setList(chartingList1);
                                    setTimeout(() => {
                                        setImgIndex(index);
                                    }, 10);
                                }}
                                src={item.imgUrl}
                                alt=""
                                className="w-[100%] h-auto "
                            />
                            <div
                                className="w-full h-22 bg-[#242928] absolute z-20 left-0 right-0 bottom-0 flex items-center justify-center"
                                onClick={() => handleColl(item.id)}
                            >
                                <img src={home_2} alt="" className="w-[12px] h-[12px] " />
                            </div>
                        </div>
                    ))}
                </div>
                {chartingList1.length === 0 ? (
                    <div className="pb-[78px]">
                        <NoData />
                    </div>
                ) : (
                    ''
                )}
                <div
                    style={{ display: total1 <= chartingList1.length || chartingList1.length === 0 ? 'none' : 'flex' }}
                    className=" items-center justify-center pt-[20px] pb-[30px] text-[#fff] text-[12px] font-[300]"
                    onClick={() => {
                        showLoding(true);
                        setPageNum1(pageNum1 + 1);
                        getList1(pageNum1 + 1);
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

                <div className="flex items-center mt-10 text-[#fff] font-[500] text-[14px]">
                    <svg
                        className="w-[12px] h-12 mr-6"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                        <g clip-path="url(#clip0_114_2206)">
                            <path
                                d="M11.4961 3.67987C10.9206 2.3126 9.85767 1.20792 8.51354 0.580304C7.16941 -0.0473158 5.64002 -0.153102 4.22229 0.283483C2.80455 0.720067 1.59961 1.66787 0.841386 2.9429C0.0831653 4.21793 -0.174239 5.7292 0.119143 7.18334C0.412525 8.63748 1.23576 9.93073 2.42904 10.812C3.62231 11.6933 5.10048 12.0998 6.57659 11.9525C8.0527 11.8053 9.42144 11.1148 10.4171 10.0151C11.4127 8.91539 11.9642 7.48499 11.9645 6.00155C11.9657 5.20407 11.8064 4.41449 11.4961 3.67987ZM10.9417 6.00155C10.9417 7.14404 10.5455 8.25118 9.82073 9.13433C9.09593 10.0175 8.08733 10.622 6.96679 10.8448C5.84624 11.0677 4.68309 10.8952 3.67551 10.3566C2.66793 9.818 1.87827 8.94671 1.44107 7.89118C1.00387 6.83565 0.946193 5.66118 1.27786 4.56789C1.60952 3.4746 2.31001 2.53013 3.25996 1.89541C4.20992 1.26069 5.35057 0.974985 6.48756 1.08698C7.62455 1.19898 8.68753 1.70175 9.49538 2.50963C9.95539 2.96712 10.3201 3.51131 10.5683 4.1107C10.8166 4.71009 10.9435 5.35278 10.9417 6.00155ZM8.93787 5.90962H6.0957V3.06714C6.09527 2.93152 6.04139 2.80154 5.94573 2.7054C5.84989 2.60999 5.72016 2.55642 5.58493 2.55642C5.4497 2.55642 5.31997 2.60999 5.22413 2.7054C5.12847 2.80154 5.07459 2.93152 5.07416 3.06714V6.4207C5.07416 6.55633 5.12804 6.68641 5.22395 6.78231C5.31985 6.87822 5.44993 6.9321 5.58556 6.9321H8.93912C9.00732 6.9337 9.07516 6.92164 9.13863 6.89663C9.2021 6.87162 9.25993 6.83416 9.3087 6.78646C9.35748 6.73876 9.39621 6.68179 9.42263 6.61889C9.44905 6.55599 9.46262 6.48844 9.46254 6.42022C9.46245 6.35199 9.44872 6.28448 9.42215 6.22165C9.39557 6.15881 9.3567 6.10193 9.3078 6.05435C9.25891 6.00677 9.20099 5.96945 9.13746 5.9446C9.07393 5.91974 9.00606 5.90785 8.93787 5.90962Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_114_2206">
                                <rect width="12" height="12" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {t('165')}({chartingList2.length})
                </div>
                <div
                    className={`flex items-start justify-start flex-wrap mt-20 `}
                    style={{
                        display: chartingList2.length > 0 ? 'flex' : 'none',
                    }}
                >
                    {/*  3 mr-10*/}
                    {chartingList2.map((item: any, index: number) => (
                        <div
                            className={`rounded-[16px] mb-16 relative overflow-hidden w-[21%] ${
                                index % 4 !== 3 ? 'mr-16' : ''
                            }`}
                            style={{
                                border: '1px solid #999',
                            }}
                        >
                            <img
                                onClick={() => {
                                    setImgIndex(-1);
                                    setShowImgList(true);
                                    let _arr = [];
                                    for (let i = 0; i < chartingList2.length; i++) {
                                        _arr.push(chartingList2[i].imgUrl);
                                    }
                                    setImgList(_arr);
                                    setList(chartingList2);
                                    setTimeout(() => {
                                        setImgIndex(index);
                                    }, 10);
                                }}
                                src={item.imgUrl}
                                alt=""
                                className="w-[100%] h-auto "
                            />
                            <div
                                className="w-full h-22 bg-[#242928] absolute z-20 left-0 right-0 bottom-0 flex items-center justify-center"
                                onClick={() => handleColl(item.id)}
                            >
                                <img src={icon6} alt="" className="w-[12px] h-[12px] " />
                            </div>
                        </div>
                    ))}
                </div>
                {chartingList2.length === 0 ? (
                    <div className="pb-[78px]">
                        <NoData />
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div
                style={{ display: total2 <= chartingList2.length || chartingList2.length === 0 ? 'none' : 'flex' }}
                className=" items-center justify-center pt-[20px] pb-[30px] text-[#fff] text-[12px] font-[300]"
                onClick={() => {
                    showLoding(true);
                    setPageNum2(pageNum2 + 1);
                    getList2(pageNum2 + 1);
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
