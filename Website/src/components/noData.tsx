import React from 'react';
import noData from '../assets/image/noData.png';
import { useTranslation } from 'react-i18next';

const ComponentName = (props?: {}) => {
    const { t } = useTranslation();

    return (
        <div className="noData text-center">
            <img src={noData} className="w-[100px] h-[100px] inline-block mx-auto mt-[78px]" alt="" />
            <div className="text-[#fff] text-[12px]">{t('136')}</div>
        </div>
    );
};

export default ComponentName;
