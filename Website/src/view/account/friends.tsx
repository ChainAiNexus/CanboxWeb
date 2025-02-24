import BarckBar from '../../components/barckBar';
import icon2 from '../../assets/image/my/11.png';
import icon8 from '../../assets/image/solLogo.png';
import icon5 from '../../assets/image/my/5.png';
import solLogo from '../../assets/image/solLogo.png';
import { Dropdown, Popover, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getFriendList, getReferee, getUserInfo } from '../../API/ido';
import { useDispatch, useSelector } from 'react-redux';
import copy from 'copy-to-clipboard';
import { useWallet } from '@solana/wallet-adapter-react';
import { createDelMessageAction } from '../../store/actions';
import { addMessage, AddrHandle, formatTimestamp2 } from '../../utils/tool';
import icon4_1 from '../../assets/image/4_1.png';
import icon17 from '../../assets/image/my/17.png';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const content = (
        <div className="bg-gradient-to-b from-[#242928] to-[#0D1114] px-20 py-14 rounded-2xl ">
            <p className="text-[#fff] text-[12px]">{t('100')}</p>
            <p className="text-[#fff] text-[12px]">{t('101')}</p>
        </div>
    );

    const [referee, setReferee]: any = useState();
    const handleGetReferee = async () => {
        try {
            let res: any = await getReferee();
            if (res.code === 200) {
                setReferee(res.data);

                getUserInfo()
                    .then((res: any) => {
                        setUserInfo(res.data);
                    })
                    .catch((err: any) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [userInfo, setUserInfo]: any = useState();
    const token = useSelector((state: any) => state?.token);
    useEffect(() => {
        if (token) {
            handleGetReferee();
        }
    }, [token]);

    const dispatch = useDispatch();
    const { publicKey, signMessage, disconnect } = useWallet();
    const handleShar = () => {
        if (!publicKey) return;
        if (!userInfo?.inviteCode) {
          dispatch(createDelMessageAction(0));
          addMessage(t('failed'));return;
        }
        const _url = window.origin + '?' + encodeURIComponent('inviteCode=' + userInfo?.inviteCode);
        copy(_url);
        dispatch(createDelMessageAction(0));
        addMessage(t('111'));
    };

    return (
        <div>
            <BarckBar title={t('99')} />
            <div
                className="px-16 mt-12 py-20 mx-20 bg-[#222] rounded-xl"
                style={{
                    border: '1px solid #999',
                }}
            >
                <div className="p-12 bg-black rounded-xl">
                    <div className="flex items-center text-[#fff] font-[500] text-[14px]">
                        <img src={icon2} alt="" className="mr-4 w-16 h-16" />
                        {t('102')}
                    </div>
                    <div className="text-[#9B9C9C] font-[400] text-[12px] pt-4">
                        {t('103')} 30 {t('104')}
                    </div>
                </div>
                <div className="p-12 bg-black rounded-xl my-16">
                    <div className="flex items-center text-[#fff] font-[500] text-[14px]">
                        <img src={icon8} alt="" className="mr-4 w-16 h-16" />
                        {t('105')}
                    </div>
                    <div className="text-[#9B9C9C] font-[400] text-[12px] pt-4">
                        {t('106')} 10% {t('107')} 5% {t('108')}
                    </div>
                </div>
                <div
                    className="flex items-center rounded-[20px] p-16 "
                    style={{
                        border: '1px solid #999',
                    }}
                >
                    <div className="text-[#fff] font-[500] text-[14px] flex-1">
                        {publicKey
                            ? AddrHandle(
                                  window.origin + '?' + encodeURIComponent('inviteCode=' + userInfo?.inviteCode),
                                  28,
                                  4
                              )
                            : '--'}
                    </div>
                    <svg
                        onClick={handleShar}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <g clip-path="url(#clip0_114_2569)">
                            <path
                                d="M14.6665 3.99984H11.9998V1.33317C11.9998 0.933171 11.7332 0.666504 11.3332 0.666504H1.33317C0.999837 0.666504 0.666504 0.999837 0.666504 1.33317V11.3332C0.666504 11.7332 0.933171 11.9998 1.33317 11.9998H3.99984V14.6665C3.99984 15.0665 4.2665 15.3332 4.6665 15.3332H14.6665C15.0665 15.3332 15.3332 15.0665 15.3332 14.6665V4.6665C15.3332 4.33317 15.0665 3.99984 14.6665 3.99984ZM1.99984 10.6665V1.99984H10.6665V3.99984H4.6665C4.33317 3.99984 3.99984 4.33317 3.99984 4.6665V10.6665H1.99984ZM13.9998 13.9998H5.33317V5.33317H13.9998V13.9998Z"
                                fill="#BAFE03"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_114_2569">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
            <div
                className="px-16 mt-[24px] py-20 mx-20 bg-[#222] rounded-xl"
                style={{
                    border: '1px solid #999',
                }}
            >
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
                                <img src={icon17} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                {t('158')}
                            </div>
                            <div className="text-[#000] font-[600] text-[18px] pt-4">{referee?.refereeSize || 0}</div>
                        </div>
                        <div className="w-[1px] h-12 bg-black"></div>
                        <div className="flex-1 text-center">
                            <div className="flex items-center justify-center text-[#000] text-[14px] font-[500]">
                                <img src={solLogo} alt="" className="w-[16px] h-[16px] mr-4 rounded-full" />
                                {t('159')}
                            </div>
                            <div className="text-[#000] font-[600] text-[18px] pt-4">{referee?.teamBuyNum || 0}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="flex items-center pt-20 pb-12 px-20 text-[#BAFE03] font-[600] text-[18px]"
                onClick={() => {
                    navigate('/account/directList');
                }}
            >
                {t('109')}
                <svg
                    className="ml-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path
                        d="M10.9096 5.72208C10.9164 5.73545 10.9285 5.74708 10.9336 5.75964C11.0571 6.00151 11.005 6.29351 10.8051 6.4807L6.08331 10.8288C6.0227 10.8851 5.95082 10.9293 5.87194 10.9587C5.79306 10.9881 5.70878 11.002 5.62412 10.9998C5.53945 10.9975 5.45613 10.9791 5.3791 10.9455C5.30207 10.912 5.23291 10.864 5.17572 10.8045C4.93205 10.5538 4.94314 10.1581 5.20065 9.9208L9.4391 6.01832L5.21778 2.05922C4.97103 1.81191 4.97694 1.41672 5.23091 1.17648C5.3461 1.06648 5.50157 1.00327 5.66466 1.00012C5.82775 0.996977 5.98578 1.05414 6.10555 1.1596L10.7845 5.54933C10.7922 5.5577 10.7956 5.57102 10.8059 5.57933C10.8119 5.58608 10.8188 5.5902 10.8273 5.59689C10.8659 5.63445 10.8839 5.68039 10.9087 5.72208H10.9096Z"
                        fill="#BAFE03"
                    />
                    <path
                        d="M6.9096 5.72209C6.9165 5.73547 6.9285 5.74709 6.93362 5.75965C7.05706 6.00153 7.00502 6.29353 6.80506 6.48071L2.08334 10.8288C2.02273 10.8851 1.95085 10.9293 1.87197 10.9587C1.79309 10.9881 1.70881 11.002 1.62415 10.9998C1.53948 10.9975 1.45616 10.9791 1.37913 10.9455C1.3021 10.912 1.23293 10.864 1.17574 10.8046C0.93201 10.5538 0.943166 10.1581 1.20068 9.92081L5.43908 6.01834L1.21774 2.05925C0.971056 1.81194 0.976898 1.41675 1.23087 1.17651C1.34607 1.06649 1.50155 1.00327 1.66465 1.00012C1.82776 0.996977 1.9858 1.05415 2.10558 1.15963L6.78452 5.54934C6.7922 5.55772 6.79568 5.57103 6.80592 5.57934C6.81195 5.58609 6.81878 5.59022 6.82738 5.59691C6.8659 5.63447 6.88395 5.68041 6.90875 5.72209H6.9096Z"
                        fill="#BAFE03"
                    />
                </svg>
            </div>
        </div>
    );
}
