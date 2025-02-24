import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import icon32 from '../../../assets/image/icon32.png';
import { useTranslation } from 'react-i18next';
import { use } from 'chai';

interface Props {
    open2: boolean;
    setOpen2Coll: any;
    chartingInfo: any;
}
const ComponentName = (props: Props) => {
    const { t } = useTranslation();
    const [open2, setOpen2] = useState(props.open2);

    useEffect(() => {
        setOpen2(props.open2);
    }, [props.open2]);

    return (
        <div>
            <Modal
                width={338}
                open={open2}
                centered={true}
                onCancel={() => {
                    props.setOpen2Coll(false);
                }}
                closable={false}
                footer={null}
                title={null}
                style={{
                    border: '2px solid #fff',
                    background: '#080A05',
                    borderRadius: '8px',
                    paddingBottom: '0px',
                }}
                destroyOnClose={true}
            >
                <div className="relative px-16 py-[30px]">
                    <div
                        className="w-[20px] h-[20px] absolute top-[20px] right-[20px]"
                        style={{
                            backgroundImage: `url(${icon32})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                        }}
                        onClick={() => {
                            props.setOpen2Coll(false);
                        }}
                    ></div>
                    <div className="leading-[16px] text-[#BAFE03] text-[18px] font-[600]">{t('57')}</div>
                    <div className="text-[#fff] text-[12px] pt-24">
                        {t('58')} {props?.chartingInfo?.chartingPrice} SOL {t('58_0')}
                    </div>
                    <div className="text-[#BAFE03] text-[12px] pt-4">
                        {t('58_1')} {props?.chartingInfo?.chartingPrice} SOL {t('58_2')}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ComponentName;
