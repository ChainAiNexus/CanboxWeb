import React from 'react';
import { useNavigate } from 'react-router-dom';
import icon1 from '../../assets/image/footerBar/icon1.png';
import icon1On from '../../assets/image/footerBar/icon1-on.png';
import icon2 from '../../assets/image/footerBar/icon2.png';
import icon2On from '../../assets/image/footerBar/icon2-on.png';
import icon3 from '../../assets/image/footerBar/icon3.png';
import icon3On from '../../assets/image/footerBar/icon3-on.png';
import icon4 from '../../assets/image/footerBar/icon4.png';
import icon4On from '../../assets/image/footerBar/icon4-on.png';
import icon5 from '../../assets/image/footerBar/icon5.png';
import icon5On from '../../assets/image/footerBar/icon5-on.png';
import { useTranslation } from 'react-i18next';
import { addMessage } from '../../utils/tool';
import { useDispatch } from 'react-redux';
import { createDelMessageAction } from '../../store/actions';

interface Props {
    index: number;
}
const ComponentName = (props: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    };
    const handleAccount = () => {
        navigate('/account');
    };
    const handleProduct = () => {
        // dispatch(createDelMessageAction(0));
        // addMessage(t('0'));
        navigate('/depin');
    };
    const handleTransaction = () => {
        navigate('/mapping');
    };
    const handleIncome = () => {
        navigate('/task');
    };
    const { t } = useTranslation();

    return (
        <div
            className="footer-bg fixed left-0 right-0 bottom-0 pb-20 z-20"
            style={{
                boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.08)',
            }}
        >
            <div className="bg-gradient-to-r from-[#333] to-[#666] h-[1px]"></div>
            <div className="flex text-[#A6A6A6] text-center pt-12">
                <div className="flex-1" onClick={handleHome}>
                    <img className="block mx-auto h-22" src={props.index === 1 ? icon1On : icon1} alt="" />
                    <div
                        className={
                            props.index === 1
                                ? 'text-[#51E04E] font-bold text-gradient text-[12px]'
                                : ' font-bold text-[12px]'
                        }
                    >
                        {t('139')}
                    </div>
                </div>
                <div className="flex-1" onClick={handleProduct}>
                    <img className="block mx-auto h-22" src={props.index === 2 ? icon2On : icon2} alt="" />
                    <div
                        className={
                            props.index === 2
                                ? 'text-[#51E04E] font-bold text-gradient text-[12px]'
                                : ' font-bold text-[12px]'
                        }
                    >
                        {t('140')}
                    </div>
                </div>
                <div className="flex-1" onClick={handleTransaction}>
                    <img className="block mx-auto h-22" src={props.index === 3 ? icon3On : icon3} alt="" />
                    <div
                        className={
                            props.index === 3
                                ? 'text-[#51E04E] font-bold text-gradient text-[12px]'
                                : ' font-bold text-[12px]'
                        }
                    >
                        {t('141')}
                    </div>
                </div>
                <div className="flex-1" onClick={handleIncome}>
                    <img className="block mx-auto h-22" src={props.index === 4 ? icon4On : icon4} alt="" />

                    <div
                        className={
                            props.index === 4
                                ? 'text-[#51E04E] font-bold text-gradient text-[12px]'
                                : ' font-bold text-[12px]'
                        }
                    >
                        {t('142')}
                    </div>
                </div>
                <div className="flex-1" onClick={handleAccount}>
                    <img className="block mx-auto h-22" src={props.index === 5 ? icon5On : icon5} alt="" />

                    <div
                        className={
                            props.index === 5
                                ? 'text-[#51E04E] font-bold text-gradient text-[12px]'
                                : ' font-bold text-[12px]'
                        }
                    >
                        {t('143')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentName;
