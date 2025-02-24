import solLogo from '../../assets/image/solLogo.png';
import solLogo2 from '../../assets/image/logo2.png';
import icon1 from '../../assets/image/my/1.png';
import icon2 from '../../assets/image/my/2.png';
import icon3 from '../../assets/image/my/3.png';
import icon4 from '../../assets/image/my/4.png';
import icon16 from '../../assets/image/my/16.png';
import icon6 from '../../assets/image/my/6.png';
import icon7 from '../../assets/image/my/7.png';
import icon4_1 from '../../assets/image/4_1.png';
import home_11 from '../../assets/image/home_11.png';
import Footer from '../../components/footer';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { addMessage, AddrHandle } from '../../utils/tool';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useNavigate } from 'react-router-dom';
import H5Top from '../../components/hander';
import { createDelMessageAction, createLoginSuccessAction } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    getChartingList,
    getFriendList,
    getIdoBuyRecord,
    getMyAwardInfo,
    getUserAwardInfo,
    getUserInfo,
} from '../../API/ido';
import { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import { LOCAL_RPC } from '../../config';
import ViewImageList from '../../components/viewImageList';

export default function Home() {
    const { setVisible } = useWalletModal();
    const { publicKey, signMessage, disconnect } = useWallet();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [userInfo, setUserInfo]: any = useState();
    const [awardSol, setAwardSol]: any = useState();
    const [awardPoints, setAwardPoints]: any = useState();
    const [userAward, setUserAward]: any = useState();
    const handleGetFriends = async () => {
        getUserInfo().then((res: any) => {
            setUserInfo(res.data);
        });
        getMyAwardInfo().then((res: any) => {
            setUserAward(res.data);
        });
        getUserAwardInfo()
            .then((res: any) => {
                // 1- 2-
                res.data.map((item: any) => {
                    if (item.type === 1) {
                        setAwardSol(item.amount);
                    }
                    if (item.type === 2) {
                        setAwardPoints(item.amount);
                    }
                });
            })
            .catch(() => {});
    };
    const token = useSelector((state: any) => state?.token);
    useEffect(() => {
        if (publicKey && token) {
            handleGetFriends();
            getTokenBalance();
            handleGetIdoBuyRecord();
            handleChartingList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, publicKey]);

    const [chartingList, setChartingList]: any = useState([]);
    const [chartingList2, setChartingList2] = useState([]);
    const [total1, setTotal1] = useState(0);
    const [total2, setTotal2] = useState(0);
    const handleChartingList = () => {
        getList1(1);

        getChartingList({ pageNum: 1, pageSize: 10, type: 2 })
            .then((res: any) => {
                setTotal2(res.data.total);
            })
            .catch(() => {});
    };
    const getList1 = async (pageNum: any) => {
        getChartingList({ pageNum: pageNum, pageSize: 30, type: 1 })
            .then((res: any) => {
                setChartingList(chartingList.concat(res?.data?.list || []));
                setTotal1(res.data.total);
            })
            .catch((error: any) => {})
            .finally(() => {});
    };

    const [idoBuyRecord, setIdoBuyRecord]: any = useState();
    const handleGetIdoBuyRecord = () => {
        getIdoBuyRecord()
            .then((res: any) => {
                if (res?.data?.buyNum > 0) {
                    setIdoBuyRecord(res?.data);
                }
            })
            .catch((error: any) => {});
    };

    const handleShar = () => {
        if (!publicKey) return;
        if (!userInfo?.inviteCode) {
            dispatch(createDelMessageAction(0));
            addMessage(t('failed'));
            return;
        }
        const _url = window.origin + '?' + encodeURIComponent('inviteCode=' + userInfo?.inviteCode);
        copy(_url);
        dispatch(createDelMessageAction(0));
        addMessage(t('111'));
    };

    const [balance_SOL, setbalance_SOL] = useState('0');
    const [solPrice, setSolPrice] = useState(0);
    const getTokenBalance = async () => {
        const _connection = new Connection(LOCAL_RPC);
        if (publicKey) {
            try {
                const SOLbalance = await _connection.getBalance(publicKey);
                setbalance_SOL(Number(SOLbalance / 1e9).toFixed(4)); //  SOL
                setSolPrice(SOLbalance / 1e9);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const [showImgList, setShowImgList] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [imgList, setImgList]: any = useState([]);
    const [list, setList]: any = useState([]);

    return (
        <div>
            <H5Top />
            <div className="px-20 pt-20 flex items-center">
                <img
                    src={userInfo?.avatarUrl || solLogo}
                    alt=""
                    className="w-[58px] h-[58px] rounded-full mr-16"
                    style={{ border: '3px solid #BAFE03' }}
                />
                <div className="flex-1">
                    <div className="text-[#fff] font-[600] text-[18px]">
                        {AddrHandle(userInfo?.userAddress, 4, 4) || '--'}
                    </div>
                    <div
                        className="text-[#fff] font-[500] text-[16px]"
                        style={{
                            color: token ? (userInfo?.userType === 1 ? '#fff' : '#A0FF05') : '#fff',
                        }}
                    >
                        {token ? (userInfo?.userType === 1 ? t('81') : t('80')) : t('81')}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-around px-20 mt-24 mb-[26px]">
                <div
                    className="flex-1 h-[72px] px-12 py-14 bg-[#222] rounded-xl"
                    style={{
                        backgroundImage: 'url(' + icon7 + ')',
                        backgroundPosition: 'top',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        border: '1px solid #999',
                    }}
                    onClick={() => {
                        handleShar();
                    }}
                >
                    <div className="flex items-center mb-8">
                        <img src={icon2} alt="" className="w-[20px] h-[20px] mr-4" />
                        <div className="text-[#fff] font-[500] text-[14px] flex-1 line-clamp-1_1 whitespace-nowrap">
                            {t('82')}
                        </div>
                        <img src={icon6} alt="" className="w-[16px] h-[16px]" />
                    </div>
                    <div className="text-[#9B9C9C] font-[500] text-[12px] line-clamp-1_1">{t('83')}</div>
                </div>
                <div className="w-[16px] h-[73px]"></div>
                <div
                    className="flex-1 h-[72px] px-12 py-14 bg-[#222] rounded-xl"
                    style={{
                        backgroundImage: 'url(' + icon7 + ')',
                        backgroundPosition: 'top',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        border: '1px solid #999',
                    }}
                >
                    <div
                        className="flex items-center mb-8"
                        onClick={() => {
                            navigate('/account/friends');
                        }}
                    >
                        <img src={icon3} alt="" className="w-[20px] h-[20px] mr-4" />
                        <div className="text-[#fff] font-[500] text-[14px] flex-1 min-w-0 line-clamp-1_1 whitespace-nowrap">
                            {t('84')} ({userInfo?.friendsNum})
                        </div>
                        <img src={icon6} alt="" className="w-[16px] h-[16px]" />
                    </div>
                    <div className="text-[#9B9C9C] font-[500] text-[12px] line-clamp-1_1">{t('85')}</div>
                </div>
            </div>

            <div
                className="mx-20 bg-gradient-to-r from-[#A0FF05]  to-[#C5D503] rounded-2xl"
                style={{
                    border: '1px solid #999',
                }}
            >
                <div
                    className=" pb-24"
                    style={{
                        backgroundImage: 'url(' + icon4_1 + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="flex items-center py-[24px]">
                        <div className="flex-1 text-center">
                            <div className="flex items-center justify-center text-[#000] text-[14px] font-[500]">
                                <img src={solLogo} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                SOL
                            </div>
                            <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">{balance_SOL}</div>
                            <div className="text-[#333] font-[400] text-[14px]">
                                ${token ? Number(solPrice * userInfo?.solPrice).toFixed(4) || 0 : 0}
                            </div>
                        </div>
                        <div className="w-[1px] h-12 bg-black"></div>
                        <div className="flex-1 text-center">
                            <div className="flex items-center justify-center text-[#000] text-[14px] font-[500]">
                                <img src={solLogo2} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                SOL-X
                            </div>
                            <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">0</div>
                            <div className="text-[#333] font-[400] text-[14px]">$0</div>
                        </div>
                    </div>
                    {publicKey ? (
                        <div
                            className="py-12 text-[#fff] rounded-2xl bg-[#000] flex items-center mx-24 px-12"
                            style={{ boxShadow: '0px 16px 32px -16px rgba(145, 64, 254, 0.50)' }}
                        >
                            <img src={icon4} alt="" className="w-[20px] h-[20px] mr-6" />
                            {t('86')}
                            <div className="flex-1 justify-end flex items-center">
                                {AddrHandle(publicKey?.toBase58(), 4, 4)}
                                <svg
                                    onClick={() => {
                                        disconnect();
                                        dispatch(createLoginSuccessAction('', 'token'));
                                        setUserAward();
                                        setUserInfo();
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-4"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M13.9878 10.745C13.6853 10.745 13.4378 10.9925 13.4378 11.295V12.5326C13.4378 12.9864 13.0665 13.3577 12.6127 13.3577H3.46814C3.01435 13.3577 2.64307 12.9864 2.64307 12.5326V3.38806C2.64307 2.93427 3.01435 2.56299 3.46814 2.56299H12.6127C13.0665 2.56299 13.4378 2.93427 13.4378 3.38806V3.93811C13.4378 4.24064 13.6853 4.48816 13.9878 4.48816C14.2904 4.48816 14.5379 4.24064 14.5379 3.93811V3.38806C14.5379 2.32922 13.6716 1.46289 12.6127 1.46289H3.46814C2.4093 1.46289 1.54297 2.32922 1.54297 3.38806V12.5326C1.54297 13.5915 2.4093 14.4578 3.46814 14.4578H12.6127C13.6716 14.4578 14.5379 13.5915 14.5379 12.5326V11.295C14.5379 10.9925 14.2904 10.745 13.9878 10.745Z"
                                        fill="#BAFE03"
                                    />
                                    <path
                                        d="M11.98 9.62451C12.09 9.73452 12.2275 9.78265 12.3719 9.78265C12.5163 9.78265 12.6538 9.72765 12.7638 9.62451L14.3796 8.00874L14.3865 8.00187L14.4209 7.96749C14.4277 7.96062 14.4346 7.95374 14.4346 7.94686C14.4415 7.93999 14.4484 7.93311 14.4484 7.92624C14.4552 7.91936 14.4621 7.91249 14.4621 7.89874C14.469 7.89186 14.469 7.88498 14.4759 7.87811C14.4827 7.87123 14.4827 7.85748 14.4896 7.85061C14.4965 7.84373 14.4965 7.83685 14.5034 7.82998C14.5102 7.8231 14.5102 7.80935 14.5102 7.80248C14.5102 7.7956 14.5171 7.78873 14.5171 7.77497C14.5171 7.7681 14.524 7.75435 14.524 7.74747C14.524 7.7406 14.5309 7.73372 14.5309 7.71997C14.5309 7.70622 14.5309 7.69934 14.5377 7.68559V7.66496C14.5446 7.63059 14.5446 7.58933 14.5377 7.55495V7.53433C14.5377 7.52058 14.5377 7.5137 14.5309 7.49995C14.5309 7.49307 14.524 7.4862 14.524 7.47245C14.524 7.46557 14.5171 7.45182 14.5171 7.44495C14.5171 7.43807 14.5102 7.43119 14.5102 7.41744C14.5102 7.41057 14.5034 7.39682 14.5034 7.38994C14.5034 7.38306 14.4965 7.37619 14.4896 7.36931C14.4827 7.36244 14.4827 7.34869 14.4759 7.34181C14.469 7.33493 14.469 7.32806 14.4621 7.32118C14.4552 7.31431 14.4552 7.30743 14.4484 7.29368C14.4415 7.28681 14.4346 7.27993 14.4346 7.27305C14.4277 7.26618 14.4277 7.2593 14.4209 7.25243C14.414 7.23868 14.4002 7.22493 14.3865 7.21805L14.3796 7.21117L12.7638 5.5954C12.5507 5.38226 12.2 5.38226 11.9869 5.5954C11.7737 5.80855 11.7737 6.15921 11.9869 6.37235L12.6607 7.04616H8.04028C7.73776 7.04616 7.49023 7.29368 7.49023 7.59621C7.49023 7.89874 7.73776 8.14626 8.04028 8.14626H12.6607L11.9869 8.82007C11.7669 9.06071 11.7669 9.40449 11.98 9.62451Z"
                                        fill="#BAFE03"
                                    />
                                </svg>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => {
                                setVisible(true);
                            }}
                            className="py-12 rounded-2xl bg-gradient-to-r from-[#5DF9A5] to-[#BAFE03] flex items-center justify-center mx-24"
                            style={{
                                boxShadow: '0px 16px 32px -16px rgba(145, 64, 254, 0.50)',
                                border: '1.406px solid rgba(145, 64, 254, 0.80)',
                            }}
                        >
                            <img src={icon4} alt="" className="w-[20px] h-[20px] mr-4" />
                            {t('87')}
                        </div>
                    )}
                </div>
            </div>

            <div
                className="mx-20 mt-[26px] px-16 py-20 bg-[#222] rounded-xl"
                style={{
                    backgroundImage: 'url(' + icon7 + ')',
                    backgroundPosition: 'top',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    border: '1px solid #999',
                }}
            >
                <div className="text-[#BAFE03] font-[600] text-[18px] mb-16">{t('88')}</div>
                <div
                    className="bg-gradient-to-r from-[#A0FF05]  to-[#C5D503] rounded-2xl"
                    style={{
                        border: '1px solid #999',
                    }}
                >
                    <div
                        className="flex items-center py-[24px]"
                        style={{
                            backgroundImage: 'url(' + icon4_1 + ')',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="flex-1 text-center">
                            <div className="flex items-center justify-center text-[#000] text-[14px] font-[500]">
                                <img src={solLogo} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                SOL
                            </div>
                            <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">{awardSol || 0}</div>
                            <div
                                onClick={() => {
                                    navigate('/account/SolAward');
                                }}
                                className="text-[#BAFE03] font-[600] text-[14px] text-center leading-[28px] mx-auto bg-black rounded-2xl w-[75px] h-[28px]"
                            >
                                {t('89')}
                            </div>
                        </div>
                        <div className="w-[1px] h-12 bg-black"></div>
                        <div className="flex-1 text-center">
                            <div className="flex items-center justify-center text-[#000] text-[14px] font-[500]">
                                <img src={icon16} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                {t('145')}
                                {/*  */}
                            </div>
                            <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">{awardPoints || 0}</div>
                            <div
                                onClick={() => {
                                    navigate('/account/integralAward');
                                }}
                                className="text-[#BAFE03] font-[600] text-[14px] text-center leading-[28px] mx-auto bg-black rounded-2xl w-[75px] h-[28px]"
                            >
                                {t('89')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="mx-20 mt-[26px] px-16 py-20 pb-[110px] bg-[#222] rounded-xl"
                style={{
                    backgroundImage: 'url(' + icon7 + ')',
                    backgroundPosition: 'top',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    border: '1px solid #999',
                }}
            >
                <div className="text-[#BAFE03] font-[600] text-[18px] mb-16 flex items-center">
                    {t('90')}
                    <div
                        className="flex-1 text-[#fff] font-[400] text-[12px] text-right"
                        onClick={() => {
                            navigate('/account/mapping');
                        }}
                    >
                        {t('91')}({total1 + total2})
                    </div>
                </div>
            </div>
            <div className="flex overflow-x-auto whitespace-nowrap mx-[36px] relative top-[-108px] pb-10">
                <div style={{ display: chartingList.length > 0 ? 'flex' : 'none' }}>
                    {chartingList.map((item: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => {
                                setImgIndex(-1);
                                setShowImgList(true);

                                let _arr = [];
                                for (let i = 0; i < chartingList.length; i++) {
                                    _arr.push(chartingList[i].imgUrl);
                                }
                                setImgList(_arr);
                                setList(chartingList);
                                setTimeout(() => {
                                    setImgIndex(index);
                                }, 10);
                            }}
                            className="mr-16"
                        >
                            <img src={item.imgUrl} className="w-[80px] min-w-[80px] h-[80px] rounded-lg" alt="" />
                        </div>
                    ))}
                </div>
                <div
                    className="w-[80px] min-w-[80px] h-[80px] rounded-lg text-center"
                    style={{ border: '1px solid #999', display: chartingList.length === 0 ? 'block' : 'none' }}
                    onClick={() => {
                        navigate('/account/mapping');
                    }}
                >
                    <div className="text-[#fff] font-[400] text-[12px] pt-18 pb-6 text-truncate_1">{t('92')}</div>
                    <div className="text-[#BAFE03] font-[400] text-[10px] text-truncate_1">{t('93')}</div>
                </div>
            </div>

            <div
                className="mx-20 mt-[-62px] px-16 py-20 bg-[#222] rounded-xl"
                style={{
                    display: idoBuyRecord?.buyNum ? 'block' : 'none',
                    backgroundImage: 'url(' + icon7 + ')',
                    backgroundPosition: 'top',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    border: '1px solid #999',
                }}
            >
                <div className="text-[#BAFE03] font-[600] text-[18px] mb-16">{t('94')}</div>
                <div
                    className="bg-gradient-to-r from-[#A0FF05]  to-[#C5D503] rounded-2xl"
                    style={{
                        border: '1px solid #999',
                    }}
                >
                    <div
                        className="flex items-center py-[24px]"
                        style={{
                            backgroundImage: 'url(' + icon4_1 + ')',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="flex-1 text-center">
                            <div className="flex items-center justify-center text-[#000] text-[14px]  font-[400]">
                                <img src={solLogo} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                {t('95')}
                            </div>
                            <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">
                                {idoBuyRecord?.buyNum || 0}
                            </div>
                            <div
                                onClick={() => {
                                    navigate('/account/subscription');
                                }}
                                className="text-[#BAFE03] font-[600] text-[14px] text-center leading-[28px] mx-auto bg-black rounded-2xl w-[75px] h-[28px]"
                            >
                                {t('96')}
                            </div>
                        </div>
                        <div className="w-[1px] h-12 bg-black"></div>
                        <div className="flex-1 text-center">
                            <div className="flex items-center justify-center text-[#000] text-[14px] font-[500]">
                                <img src={solLogo2} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                {t('97')}
                            </div>
                            <div className="text-[#000] font-[600] text-[18px] pt-4 pb-6">
                                {/* {idoBuyRecord?.subscriptionNum || 0} */}0
                            </div>
                            <div
                                onClick={() => {
                                    // dispatch(createDelMessageAction(0));
                                    // addMessage(t('0'));
                                    navigate('/account/subscription');
                                }}
                                className="text-[#BAFE03] font-[600] text-[14px] text-center leading-[28px] mx-auto bg-black rounded-2xl w-[75px] h-[28px]"
                            >
                                {t('98')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <img src={home_11} className="w-[200px] h-[200px] fixed left-0 bottom-[72px] z-[-10]" alt="" />
            <div className="h-[100px] w-full"></div>

            <ViewImageList show={showImgList} imgIndex={imgIndex} imgList={imgList} chartingList={list} />

            <Footer index={5} />
        </div>
    );
}
