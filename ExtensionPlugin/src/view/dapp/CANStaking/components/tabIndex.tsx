import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon5 from '../../../../assets/image/new/dapp/icon5.png';

interface TabProps {
    index: number;
}

function App(props: TabProps) {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-[10px]  left-auto w-[375px] p-10">
            <div className="bg-[#152722] flex justify-center items-center rounded-[10px] py-6">
                <div
                    className="flex-1 text-center cursor-pointer"
                    onClick={() => {
                        navigate('/dapp/CANStaking');
                    }}
                >
                    {props.index === 1 ? (
                        <svg
                            className="inline-block mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                        >
                            <path
                                d="M6 19.5H9V13.5H15V19.5H18V10.5L12 6L6 10.5V19.5ZM4 21.5V9.5L12 3.5L20 9.5V21.5H13V15.5H11V21.5H4Z"
                                fill="white"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="inline-block mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                        >
                            <g opacity="0.5">
                                <path
                                    d="M6 19.5H9V13.5H15V19.5H18V10.5L12 6L6 10.5V19.5ZM4 21.5V9.5L12 3.5L20 9.5V21.5H13V15.5H11V21.5H4Z"
                                    fill="white"
                                />
                            </g>
                        </svg>
                    )}

                    <div className="text-[14px]" style={{ color: props.index === 1 ? '#fff' : '#818181' }}>
                        Home
                    </div>
                </div>
                <div
                    className="flex-1 text-center cursor-pointer"
                    onClick={() => {
                        navigate('/dapp/CANStaking/stake');
                    }}
                >
                    {props.index === 2 ? (
                        <svg
                            className="inline-block mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                        >
                            <path
                                d="M6 20.5C5.45 20.5 4.97917 20.3042 4.5875 19.9125C4.19583 19.5208 4 19.05 4 18.5C4 17.95 4.19583 17.4792 4.5875 17.0875C4.97917 16.6958 5.45 16.5 6 16.5C6.55 16.5 7.02083 16.6958 7.4125 17.0875C7.80417 17.4792 8 17.95 8 18.5C8 19.05 7.80417 19.5208 7.4125 19.9125C7.02083 20.3042 6.55 20.5 6 20.5ZM12 20.5C11.45 20.5 10.9792 20.3042 10.5875 19.9125C10.1958 19.5208 10 19.05 10 18.5C10 17.95 10.1958 17.4792 10.5875 17.0875C10.9792 16.6958 11.45 16.5 12 16.5C12.55 16.5 13.0208 16.6958 13.4125 17.0875C13.8042 17.4792 14 17.95 14 18.5C14 19.05 13.8042 19.5208 13.4125 19.9125C13.0208 20.3042 12.55 20.5 12 20.5ZM18 20.5C17.45 20.5 16.9792 20.3042 16.5875 19.9125C16.1958 19.5208 16 19.05 16 18.5C16 17.95 16.1958 17.4792 16.5875 17.0875C16.9792 16.6958 17.45 16.5 18 16.5C18.55 16.5 19.0208 16.6958 19.4125 17.0875C19.8042 17.4792 20 17.95 20 18.5C20 19.05 19.8042 19.5208 19.4125 19.9125C19.0208 20.3042 18.55 20.5 18 20.5ZM6 14.5C5.45 14.5 4.97917 14.3042 4.5875 13.9125C4.19583 13.5208 4 13.05 4 12.5C4 11.95 4.19583 11.4792 4.5875 11.0875C4.97917 10.6958 5.45 10.5 6 10.5C6.55 10.5 7.02083 10.6958 7.4125 11.0875C7.80417 11.4792 8 11.95 8 12.5C8 13.05 7.80417 13.5208 7.4125 13.9125C7.02083 14.3042 6.55 14.5 6 14.5ZM12 14.5C11.45 14.5 10.9792 14.3042 10.5875 13.9125C10.1958 13.5208 10 13.05 10 12.5C10 11.95 10.1958 11.4792 10.5875 11.0875C10.9792 10.6958 11.45 10.5 12 10.5C12.55 10.5 13.0208 10.6958 13.4125 11.0875C13.8042 11.4792 14 11.95 14 12.5C14 13.05 13.8042 13.5208 13.4125 13.9125C13.0208 14.3042 12.55 14.5 12 14.5ZM18 14.5C17.45 14.5 16.9792 14.3042 16.5875 13.9125C16.1958 13.5208 16 13.05 16 12.5C16 11.95 16.1958 11.4792 16.5875 11.0875C16.9792 10.6958 17.45 10.5 18 10.5C18.55 10.5 19.0208 10.6958 19.4125 11.0875C19.8042 11.4792 20 11.95 20 12.5C20 13.05 19.8042 13.5208 19.4125 13.9125C19.0208 14.3042 18.55 14.5 18 14.5ZM6 8.5C5.45 8.5 4.97917 8.30417 4.5875 7.9125C4.19583 7.52083 4 7.05 4 6.5C4 5.95 4.19583 5.47917 4.5875 5.0875C4.97917 4.69583 5.45 4.5 6 4.5C6.55 4.5 7.02083 4.69583 7.4125 5.0875C7.80417 5.47917 8 5.95 8 6.5C8 7.05 7.80417 7.52083 7.4125 7.9125C7.02083 8.30417 6.55 8.5 6 8.5ZM12 8.5C11.45 8.5 10.9792 8.30417 10.5875 7.9125C10.1958 7.52083 10 7.05 10 6.5C10 5.95 10.1958 5.47917 10.5875 5.0875C10.9792 4.69583 11.45 4.5 12 4.5C12.55 4.5 13.0208 4.69583 13.4125 5.0875C13.8042 5.47917 14 5.95 14 6.5C14 7.05 13.8042 7.52083 13.4125 7.9125C13.0208 8.30417 12.55 8.5 12 8.5ZM18 8.5C17.45 8.5 16.9792 8.30417 16.5875 7.9125C16.1958 7.52083 16 7.05 16 6.5C16 5.95 16.1958 5.47917 16.5875 5.0875C16.9792 4.69583 17.45 4.5 18 4.5C18.55 4.5 19.0208 4.69583 19.4125 5.0875C19.8042 5.47917 20 5.95 20 6.5C20 7.05 19.8042 7.52083 19.4125 7.9125C19.0208 8.30417 18.55 8.5 18 8.5Z"
                                fill="white"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="inline-block mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                        >
                            <g opacity="0.5">
                                <path
                                    d="M6 20.5C5.45 20.5 4.97917 20.3042 4.5875 19.9125C4.19583 19.5208 4 19.05 4 18.5C4 17.95 4.19583 17.4792 4.5875 17.0875C4.97917 16.6958 5.45 16.5 6 16.5C6.55 16.5 7.02083 16.6958 7.4125 17.0875C7.80417 17.4792 8 17.95 8 18.5C8 19.05 7.80417 19.5208 7.4125 19.9125C7.02083 20.3042 6.55 20.5 6 20.5ZM12 20.5C11.45 20.5 10.9792 20.3042 10.5875 19.9125C10.1958 19.5208 10 19.05 10 18.5C10 17.95 10.1958 17.4792 10.5875 17.0875C10.9792 16.6958 11.45 16.5 12 16.5C12.55 16.5 13.0208 16.6958 13.4125 17.0875C13.8042 17.4792 14 17.95 14 18.5C14 19.05 13.8042 19.5208 13.4125 19.9125C13.0208 20.3042 12.55 20.5 12 20.5ZM18 20.5C17.45 20.5 16.9792 20.3042 16.5875 19.9125C16.1958 19.5208 16 19.05 16 18.5C16 17.95 16.1958 17.4792 16.5875 17.0875C16.9792 16.6958 17.45 16.5 18 16.5C18.55 16.5 19.0208 16.6958 19.4125 17.0875C19.8042 17.4792 20 17.95 20 18.5C20 19.05 19.8042 19.5208 19.4125 19.9125C19.0208 20.3042 18.55 20.5 18 20.5ZM6 14.5C5.45 14.5 4.97917 14.3042 4.5875 13.9125C4.19583 13.5208 4 13.05 4 12.5C4 11.95 4.19583 11.4792 4.5875 11.0875C4.97917 10.6958 5.45 10.5 6 10.5C6.55 10.5 7.02083 10.6958 7.4125 11.0875C7.80417 11.4792 8 11.95 8 12.5C8 13.05 7.80417 13.5208 7.4125 13.9125C7.02083 14.3042 6.55 14.5 6 14.5ZM12 14.5C11.45 14.5 10.9792 14.3042 10.5875 13.9125C10.1958 13.5208 10 13.05 10 12.5C10 11.95 10.1958 11.4792 10.5875 11.0875C10.9792 10.6958 11.45 10.5 12 10.5C12.55 10.5 13.0208 10.6958 13.4125 11.0875C13.8042 11.4792 14 11.95 14 12.5C14 13.05 13.8042 13.5208 13.4125 13.9125C13.0208 14.3042 12.55 14.5 12 14.5ZM18 14.5C17.45 14.5 16.9792 14.3042 16.5875 13.9125C16.1958 13.5208 16 13.05 16 12.5C16 11.95 16.1958 11.4792 16.5875 11.0875C16.9792 10.6958 17.45 10.5 18 10.5C18.55 10.5 19.0208 10.6958 19.4125 11.0875C19.8042 11.4792 20 11.95 20 12.5C20 13.05 19.8042 13.5208 19.4125 13.9125C19.0208 14.3042 18.55 14.5 18 14.5ZM6 8.5C5.45 8.5 4.97917 8.30417 4.5875 7.9125C4.19583 7.52083 4 7.05 4 6.5C4 5.95 4.19583 5.47917 4.5875 5.0875C4.97917 4.69583 5.45 4.5 6 4.5C6.55 4.5 7.02083 4.69583 7.4125 5.0875C7.80417 5.47917 8 5.95 8 6.5C8 7.05 7.80417 7.52083 7.4125 7.9125C7.02083 8.30417 6.55 8.5 6 8.5ZM12 8.5C11.45 8.5 10.9792 8.30417 10.5875 7.9125C10.1958 7.52083 10 7.05 10 6.5C10 5.95 10.1958 5.47917 10.5875 5.0875C10.9792 4.69583 11.45 4.5 12 4.5C12.55 4.5 13.0208 4.69583 13.4125 5.0875C13.8042 5.47917 14 5.95 14 6.5C14 7.05 13.8042 7.52083 13.4125 7.9125C13.0208 8.30417 12.55 8.5 12 8.5ZM18 8.5C17.45 8.5 16.9792 8.30417 16.5875 7.9125C16.1958 7.52083 16 7.05 16 6.5C16 5.95 16.1958 5.47917 16.5875 5.0875C16.9792 4.69583 17.45 4.5 18 4.5C18.55 4.5 19.0208 4.69583 19.4125 5.0875C19.8042 5.47917 20 5.95 20 6.5C20 7.05 19.8042 7.52083 19.4125 7.9125C19.0208 8.30417 18.55 8.5 18 8.5Z"
                                    fill="white"
                                />
                            </g>
                        </svg>
                    )}
                    <div className="text-[14px] " style={{ color: props.index === 2 ? '#fff' : '#818181' }}>
                        Stake
                    </div>
                </div>
                <div
                    className="flex-1 text-center cursor-pointer"
                    onClick={() => {
                        navigate('/dapp/CANStaking/leaderboard');
                    }}
                >
                    {props.index === 3 ? (
                        <img src={icon5} className="inline-block mx-auto w-[10px] h-[20px]" alt="" />
                    ) : (
                        <svg
                            className="inline-block mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                        >
                            <g opacity="0.5">
                                <path
                                    d="M7 2.5H17V10.35C17 10.7333 16.9167 11.075 16.75 11.375C16.5833 11.675 16.35 11.9167 16.05 12.1L12.5 14.2L13.2 16.5H17L13.9 18.7L15.1 22.5L12 20.15L8.9 22.5L10.1 18.7L7 16.5H10.8L11.5 14.2L7.95 12.1C7.65 11.9167 7.41667 11.675 7.25 11.375C7.08333 11.075 7 10.7333 7 10.35V2.5ZM9 4.5V10.35L11 11.55V4.5H9ZM15 4.5H13V11.55L15 10.35V4.5Z"
                                    fill="white"
                                />
                            </g>
                        </svg>
                    )}
                    <div
                        className="text-[14px] text-[#818181]"
                        style={{
                            color: props.index === 3 ? '#fff' : '#818181',
                            paddingTop: props.index === 3 ? '2px' : '0px',
                        }}
                    >
                        Leaderboard
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
