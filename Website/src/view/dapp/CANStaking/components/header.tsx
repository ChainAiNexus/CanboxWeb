import { useEffect, useRef, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { AddrHandle } from '../../../../utils/tool';
import icon5 from '../../../../assets/image/new/icon5.png';
import icon4 from '../../../../assets/image/new/icon4.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface TabProps {
    index?: number;
}

declare var chrome: any;
function App(props: TabProps) {
    const { publicKey } = useWallet();
    const navigate = useNavigate();
    //  Web 
    const sendMessageToPlugin = () => {
        const extensionId = 'fcaijkoknbkonilhflhofkhnkpllhlge'; // ID

        // Chrome
        chrome?.runtime?.sendMessage(
            extensionId,
            {
                event: 'login',
                data: { address: publicKey?.toString() },
            },
            (response: any) => {
                console.log('res data', response);
            }
        );
    };
    const token = useSelector((state: any) => state?.token);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (token) {
            // Clear any existing interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            // Set new interval
            intervalRef.current = setInterval(() => {
                sendMessageToPlugin();
            }, 1000);
        }

        // Cleanup function to clear interval on unmount or dependency change
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [publicKey, token]);

    return (
        <div
            className="fixed top-0 left-0 right-0 text-center px-10 py-[22px] flex justify-center items-center"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.30)' }}
        >
            <div className="flex justify-center items-center w-[1200px]">
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/?tab=web3')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path
                            d="M13.5349 14.9997L18.8386 20.3035C18.958 20.4188 19.0532 20.5567 19.1187 20.7092C19.1842 20.8617 19.2187 21.0258 19.2202 21.1917C19.2216 21.3577 19.19 21.5223 19.1271 21.6759C19.0643 21.8296 18.9715 21.9691 18.8541 22.0865C18.7367 22.2038 18.5972 22.2967 18.4435 22.3595C18.2899 22.4224 18.1253 22.454 17.9594 22.4526C17.7934 22.4511 17.6294 22.4166 17.4768 22.3511C17.3243 22.2856 17.1864 22.1904 17.0711 22.071L10.8836 15.8835C10.6493 15.6491 10.5176 15.3312 10.5176 14.9997C10.5176 14.6683 10.6493 14.3504 10.8836 14.116L17.0711 7.92849C17.1864 7.8091 17.3243 7.71387 17.4768 7.64836C17.6294 7.58285 17.7934 7.54836 17.9594 7.54692C18.1253 7.54548 18.2899 7.57711 18.4435 7.63996C18.5972 7.70281 18.7367 7.79563 18.8541 7.91299C18.9715 8.03036 19.0643 8.16992 19.1271 8.32354C19.19 8.47716 19.2216 8.64176 19.2202 8.80774C19.2187 8.97371 19.1842 9.13774 19.1187 9.29024C19.0532 9.44275 18.958 9.58068 18.8386 9.69599L13.5349 14.9997Z"
                            fill="white"
                        />
                    </svg>
                    <img className="w-[40px] h-[40px] mx-8" src={icon5} alt="" />
                </div>
                <div className="flex-1 text-[#e5e7eb] text-[20px] text-left">$CAN.</div>
                <div className="flex text-[#6F6F6F] text-[20px]">
                    <img className="w-[30px] h-[30px] mr-8" src={icon4} alt="" />
                    {publicKey && AddrHandle(publicKey?.toBase58(), 4, 4)}
                </div>
            </div>
        </div>
    );
}

export default App;
