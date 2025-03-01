import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    title: string;
    children?: React.ReactNode;
}

const ComponentName = (props: any) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <div
            className="relative text-center w-[100vw]"
            style={{
                boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.08)',
            }}
        >
            <svg
                className="absolute top-[19px] left-[20px]"
                onClick={goBack}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
            >
                <g clip-path="url(#clip0_114_2562)">
                    <path
                        d="M8.26643 12.4683L6.95549 13.7792L1.95191 8.77562L1.95098 8.77747L0.639126 7.46469L4.2456 3.85914L6.04791 2.05683L6.94907 1.15475L8.26092 2.46753L3.26377 7.46468L5.56206 9.7639L7.36528 11.5671L8.26643 12.4683Z"
                        fill="#BAFE03"
                    />
                    <path
                        d="M2.12305 6.5376L16.0297 6.53752L16.0297 8.39174L2.12304 8.39182L2.12305 6.5376Z"
                        fill="#BAFE03"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_114_2562">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <div className="text-[#fff] text-[16px] font-bold p-14 flex items-center justify-center">
                {props.title}
                {props.children}
            </div>
        </div>
    );
};

export default ComponentName;
