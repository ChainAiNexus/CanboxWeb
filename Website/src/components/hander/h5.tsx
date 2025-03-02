import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/image/new/logo.png';
import icon1 from '../../assets/image/1.png';
import icon2 from '../../assets/image/2.png';
import icon3 from '../../assets/image/3.png';
import icon4 from '../../assets/image/new/icon4.png';
import icon5 from '../../assets/image/5.png';
import { Dropdown, notification } from 'antd';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { AddrHandle, getTopBarIndex, setTopBarIndex } from '../../utils/tool';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LOCAL_KEY, LOCAL_RPC } from '../../config';
import handerNav from './index.module.css';
import { getCanUserAccount, getTokenContractAddress } from '../../API';
import { useSelector } from 'react-redux';
import { Connection, PublicKey } from '@solana/web3.js';

declare var chrome: any;

const ComponentName = (props?: {}) => {
  const { publicKey, signMessage, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const navigate = useNavigate();
  const handleConnect = () => {
    if (!publicKey) {
      setVisible(true);
    } else {
      disconnect();
      navigate('/login');
    }
  };

  const { t, i18n } = useTranslation();
  const [_token, _setToken]: any = useState('');

  function changeLanguage(key: string) {
    window.localStorage.setItem(LOCAL_KEY, key);
    i18n.changeLanguage(key);
  }

  //  Web 
  const sendMessageToPlugin = () => {
    try {
      const extensionId = 'fcaijkoknbkonilhflhofkhnkpllhlge'; // ID

      // Chrome
      chrome?.runtime?.sendMessage(
        extensionId,
        {
          event: 'login',
          data: { address: publicKey?.toString() },
        },
        (response: any) => {
          // Chrome
          // console.log('res data', response);
        }
      );
    } catch (error) { }
  };
  useEffect(() => {
    setInterval(() => {
      // sendMessageToPlugin();
    }, 1000);
  }, []);

  const itemss = [
    {
      key: '2',
      label: (
        <div
          className={`${i18n.language === 'en' ? 'bg-[#020303]' : ''} px-10 py-8 rounded-lg`}
          style={{ color: i18n.language === 'en' ? '#A0FF05' : '#fff' }}
          onClick={() => changeLanguage('en')}
        >
          English
        </div>
      ),
    },
    {
      key: '1',
      label: (
        <div
          className={`${i18n.language === 'zh' ? 'bg-[#020303]' : ''} px-10 py-8 rounded-lg`}
          style={{ color: i18n.language === 'zh' ? '#A0FF05' : '#fff', fontWeight: 600 }}
          onClick={() => changeLanguage('zh')}
        >
          
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div
          className={`${i18n.language === 'ko' ? 'bg-[#020303]' : ''} px-10 py-8 rounded-lg`}
          style={{ color: i18n.language === 'ko' ? '#A0FF05' : '#fff' }}
          onClick={() => changeLanguage('ko')}
        >
          한국어
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div
          className={`${i18n.language === 'ja' ? 'bg-[#020303]' : ''} px-10 py-8 rounded-lg`}
          style={{ color: i18n.language === 'ja' ? '#A0FF05' : '#fff' }}
          onClick={() => changeLanguage('ja')}
        >
          にほんご
        </div>
      ),
    },
  ];
  const items: any = [
    {
      key: '0',
      label: (
        <div
          className={`px-10 py-8 rounded-lg text-center text-[16px]`}
          style={{ color: '#919191' }}
          onClick={() => handleConnect()}
        >
          Log out
        </div>
      ),
    },
  ];

  const token = useSelector((state: any) => state?.token);
  const [canUserAccount, setCanUserAccount] = React.useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (token) {
      getCanUserAccount()
        .then((res: any) => {
          setCanUserAccount(res?.data);
        })
        .catch(() => { });

      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set new interval
      intervalRef.current = setInterval(() => {
        sendMessageToPlugin();
      }, 1000);
      _setToken(localStorage.getItem('accessToken'));
    }

    // Cleanup function to clear interval on unmount or dependency change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [publicKey, token]);

  const [balance_SOLX, setbalance_SOLX] = useState(0);
  const getTokenBalance = async (TOKEN_PROGRAM_ID: string) => {
    if (publicKey && token) {
      const _connection = new Connection(LOCAL_RPC);
      try {
        const connection = _connection;
        const walletPublicKey = new PublicKey(publicKey.toString());
        const tokenMintPublicKey = new PublicKey(TOKEN_PROGRAM_ID);
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPublicKey, {
          mint: tokenMintPublicKey,
        });
        if (tokenAccounts.value.length === 0) {
          setbalance_SOLX(0); // ， 0
        } else {
          // 
          const tokenAmount = tokenAccounts?.value[0].account.data.parsed.info.tokenAmount.amount;
          console.log('balance:' + tokenAmount / Math.pow(10, 6));
          setbalance_SOLX(tokenAmount / Math.pow(10, 6)); // `uiAmount` 
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getTokenContractAddress()
      .then((res: any) => {
        getTokenBalance(res?.data);
      })
      .catch(() => { });
  }, [publicKey, token]);

  return (
    <div className={`${handerNav.main}`}>
      <div className={`${handerNav.box}`}>
        <img src={logo} className={`${handerNav.box_logo}`} alt="" />
        <div className={`${handerNav.box_1}`}>
          <div className={`${handerNav.box_1_1}`}>
            <div className={`${handerNav.box_1_item} ${handerNav.box_1_item_on}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9.99984 16.0556C6.47147 16.0556 3.61095 13.195 3.61095 9.66667C3.61095 6.1383 6.47147 3.27778 9.99984 3.27778C13.5282 3.27778 16.3887 6.1383 16.3887 9.66667C16.3887 13.195 13.5282 16.0556 9.99984 16.0556ZM9.99984 17.3333C14.234 17.3333 17.6665 13.9008 17.6665 9.66667C17.6665 5.43254 14.234 2 9.99984 2C5.76571 2 2.33317 5.43254 2.33317 9.66667C2.33317 13.9008 5.76571 17.3333 9.99984 17.3333Z"
                  fill="#43FEE8"
                />
                <path
                  d="M16.8387 12.6272L15.7407 13.2224C16.38 14.4028 16.5286 15.2049 16.3563 15.3772C16.1665 15.567 15.2629 15.3718 13.9622 14.6289C12.4788 13.781 10.702 12.3717 8.99838 10.6681C7.29479 8.96449 5.88548 7.18764 5.03764 5.70422C4.29468 4.40353 4.09948 3.50033 4.28927 3.31053C4.46367 3.13613 5.27571 3.2893 6.46818 3.93861L7.06504 2.84186C5.41182 1.94158 4.13319 1.70058 3.40647 2.42731C2.03503 3.79876 4.2643 7.70001 8.11558 11.5509C11.9664 15.4022 15.8677 17.6315 17.2391 16.26C17.9625 15.5371 17.7269 14.268 16.8387 12.6277V12.6272Z"
                  fill="#43FEE8"
                />
              </svg>
              Explore
            </div>
            <a
              href={`https://cloud.chainainexus.com/apps?_token=${_token}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`${handerNav.box_1_item}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M16.8125 4.75613C16.8125 5.27594 16.5793 5.74306 16.2083 6.06501V8.26832H22.25C23.2114 8.26832 24.1334 8.63836 24.8133 9.29702C25.4931 9.95568 25.875 10.849 25.875 11.7805V23.4878C25.875 24.4193 25.4931 25.3126 24.8133 25.9713C24.1334 26.63 23.2114 27 22.25 27H7.75C6.78859 27 5.86656 26.63 5.18674 25.9713C4.50692 25.3126 4.125 24.4193 4.125 23.4878V11.7805C4.125 10.849 4.50692 9.95568 5.18674 9.29702C5.86656 8.63836 6.78859 8.26832 7.75 8.26832H13.7917V6.06501C13.5663 5.86972 13.395 5.62292 13.2932 5.34708C13.1915 5.07124 13.1626 4.77511 13.2091 4.48568C13.2557 4.19624 13.3762 3.92269 13.5598 3.68993C13.7433 3.45716 13.9841 3.27258 14.2601 3.153C14.5361 3.03341 14.8386 2.98262 15.14 3.00525C15.4414 3.02787 15.7322 3.12319 15.9859 3.28254C16.2396 3.44188 16.4481 3.66017 16.5925 3.91755C16.7369 4.17493 16.8125 4.46321 16.8125 4.75613ZM7.75 10.6098C7.42953 10.6098 7.12219 10.7331 6.89558 10.9527C6.66897 11.1722 6.54167 11.47 6.54167 11.7805V23.4878C6.54167 23.7983 6.66897 24.0961 6.89558 24.3156C7.12219 24.5352 7.42953 24.6585 7.75 24.6585H22.25C22.5705 24.6585 22.8778 24.5352 23.1044 24.3156C23.331 24.0961 23.4583 23.7983 23.4583 23.4878V11.7805C23.4583 11.47 23.331 11.1722 23.1044 10.9527C22.8778 10.7331 22.5705 10.6098 22.25 10.6098H7.75ZM2.91667 14.122H0.5V21.1464H2.91667V14.122ZM27.0833 14.122H29.5V21.1464H27.0833V14.122ZM11.375 19.3903C11.8557 19.3903 12.3167 19.2052 12.6566 18.8759C12.9965 18.5466 13.1875 18.0999 13.1875 17.6342C13.1875 17.1684 12.9965 16.7217 12.6566 16.3924C12.3167 16.0631 11.8557 15.8781 11.375 15.8781C10.8943 15.8781 10.4333 16.0631 10.0934 16.3924C9.75346 16.7217 9.5625 17.1684 9.5625 17.6342C9.5625 18.0999 9.75346 18.5466 10.0934 18.8759C10.4333 19.2052 10.8943 19.3903 11.375 19.3903ZM18.625 19.3903C19.1057 19.3903 19.5667 19.2052 19.9066 18.8759C20.2465 18.5466 20.4375 18.0999 20.4375 17.6342C20.4375 17.1684 20.2465 16.7217 19.9066 16.3924C19.5667 16.0631 19.1057 15.8781 18.625 15.8781C18.1443 15.8781 17.6833 16.0631 17.3434 16.3924C17.0035 16.7217 16.8125 17.1684 16.8125 17.6342C16.8125 18.0999 17.0035 18.5466 17.3434 18.8759C17.6833 19.2052 18.1443 19.3903 18.625 19.3903Z"
                    fill="white"
                  />
                </svg>
                Studio
              </div>
            </a>
            <a
              href={`https://cloud.chainainexus.com/datasets?_token=${_token}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`${handerNav.box_1_item}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M8.85484 4.71429C8.16185 4.71429 7.49725 4.9852 7.00724 5.46744C6.51722 5.94968 6.24194 6.60373 6.24194 7.28571H4.5C4.5 6.14907 4.95881 5.05898 5.7755 4.25526C6.59219 3.45153 7.69986 3 8.85484 3H21.629C21.86 3 22.0816 3.09031 22.2449 3.25105C22.4082 3.4118 22.5 3.62981 22.5 3.85714V18.7143C22.5 18.9416 22.4082 19.1596 22.2449 19.3204C22.0816 19.4811 21.86 19.5714 21.629 19.5714H8.85484C8.16223 19.5726 7.49834 19.8439 7.00859 20.3259C6.51884 20.8079 6.24316 21.4612 6.24194 22.1429C6.24194 22.3702 6.15017 22.5882 5.98683 22.7489C5.8235 22.9097 5.60196 23 5.37097 23C5.13997 23 4.91844 22.9097 4.7551 22.7489C4.59176 22.5882 4.5 22.3702 4.5 22.1429V7.28571H6.24194V18.7166C6.99478 18.1581 7.91208 17.8564 8.85484 17.8571H20.7581V4.71429H8.85484Z"
                    fill="white"
                  />
                  <path
                    d="M24.6486 4C24.8744 4 25.091 4.0932 25.2506 4.2591C25.4103 4.425 25.5 4.65 25.5 4.88462V26.1154C25.5 26.35 25.4103 26.575 25.2506 26.7409C25.091 26.9068 24.8744 27 24.6486 27H8.75676C7.62779 27 6.54507 26.534 5.74677 25.7045C4.94848 24.875 4.5 23.75 4.5 22.5769C4.5 21.4039 4.94848 20.2788 5.74677 19.4493C6.54507 18.6198 7.62779 18.1538 8.75676 18.1538H21.2432V19.9231H8.75676C8.07938 19.9231 7.42975 20.2027 6.95077 20.7004C6.47179 21.1981 6.2027 21.8731 6.2027 22.5769C6.2027 23.2808 6.47179 23.9558 6.95077 24.4535C7.42975 24.9512 8.07938 25.2308 8.75676 25.2308H23.7973V4.88462C23.7973 4.65 23.887 4.425 24.0467 4.2591C24.2063 4.0932 24.4229 4 24.6486 4ZM22.0946 19.0385C22.0946 19.2731 22.0049 19.4981 21.8452 19.664C21.6856 19.8299 21.469 19.9231 21.2432 19.9231V18.1538C21.469 18.1538 21.6856 18.247 21.8452 18.4129C22.0049 18.5788 22.0946 18.8038 22.0946 19.0385Z"
                    fill="white"
                  />
                  <path
                    d="M8.5 22.5C8.5 22.3674 8.58932 22.2402 8.74832 22.1464C8.90732 22.0527 9.12297 22 9.34783 22H20.6522C20.877 22 21.0927 22.0527 21.2517 22.1464C21.4107 22.2402 21.5 22.3674 21.5 22.5C21.5 22.6326 21.4107 22.7598 21.2517 22.8536C21.0927 22.9473 20.877 23 20.6522 23H9.34783C9.12297 23 8.90732 22.9473 8.74832 22.8536C8.58932 22.7598 8.5 22.6326 8.5 22.5Z"
                    fill="white"
                  />
                </svg>
                Knowledge
              </div>
            </a>
            <a
              href={`https://cloud.chainainexus.com/tools?_token=${_token}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`${handerNav.box_1_item}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M18.1667 9.40001H13.1667C12.7985 9.40001 12.5 9.75817 12.5 10.2C12.5 10.6418 12.7985 11 13.1667 11H18.1666C18.5348 11 18.8333 10.6418 18.8333 10.2C18.8333 9.75813 18.5349 9.40001 18.1667 9.40001ZM20.1667 3.8V9.7C20.1667 10.1418 20.4651 10.5 20.8333 10.5C21.2015 10.5 21.5 10.1418 21.5 9.7V3.8C21.5 3.35816 21.2015 3 20.8333 3C20.4651 3 20.1667 3.35816 20.1667 3.8Z"
                    fill="white"
                  />
                  <path
                    d="M24.6667 3H13.8333L13.4286 3.09435L5.92859 6.84434C5.79861 6.90923 5.69031 7.00426 5.61494 7.11956C5.53957 7.23485 5.49989 7.36621 5.5 7.49999V9.74998C5.5006 9.94878 5.58831 10.1393 5.74409 10.2803C5.9007 10.4205 6.11244 10.4994 6.33333 10.5H12.1667V24.75C12.1698 25.9925 13.2861 26.9972 14.6667 27H16.3333C17.7139 26.9972 18.8302 25.9925 18.8333 24.75V10.5H24.6667C24.8876 10.4995 25.0993 10.4205 25.2559 10.2803C25.4117 10.1394 25.4994 9.94882 25.5 9.75001V3.75C25.4994 3.5512 25.4117 3.36063 25.2559 3.21968C25.0993 3.07948 24.8876 3.00054 24.6667 3ZM23.8333 8.99998H18C17.7791 9.00052 17.5674 9.07946 17.4108 9.21966C17.255 9.36061 17.1673 9.55118 17.1667 9.74998V24.75C17.1659 25.1576 16.7863 25.4993 16.3334 25.5H14.6667C14.2138 25.4993 13.8342 25.1576 13.8334 24.75V9.74998C13.8328 9.55118 13.7451 9.36061 13.5893 9.21966C13.4327 9.07947 13.2209 9.00053 13.0001 8.99998H7.16658V7.94127L14.0493 4.49989L23.8333 4.49996V8.99998Z"
                    fill="white"
                  />
                </svg>
                Tools
              </div>
            </a>
          </div>
        </div>
        <div className={`${handerNav.box_2}`}>
          <img src={logo} className={`${handerNav.box_2_logo}`} alt="" />
          <div>
            {/* <div className={`${handerNav.box_2_top}`}>$ {canUserAccount?.amount}</div> */}
            <div className={`${handerNav.box_2_buttom}`}>
              {balance_SOLX} {canUserAccount?.coinName || 'CAN'}
            </div>
          </div>
        </div>
        <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
          <div className={`${handerNav.box_3}`}>
            <img className={`${handerNav.box_3_img}`} src={icon4} alt="" />
            {publicKey ? AddrHandle(publicKey?.toBase58(), 4, 4) : 'Connect Wallet'}
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M20.0547 23.4258C19.7109 23.4258 19.3711 23.2969 19.1094 23.0352L14.5117 18.4375C14.1289 18.0586 14.1289 17.4375 14.5117 17.0586C14.8945 16.6758 15.5117 16.6758 15.8906 17.0586L20.0547 21.2227L24.2188 17.0586C24.6016 16.6758 25.2188 16.6758 25.5977 17.0586C25.9805 17.4414 25.9805 18.0586 25.5977 18.4375L21 23.0352C20.7383 23.2969 20.3984 23.4258 20.0547 23.4258Z"
                fill="#6F6F6F"
              />
            </svg>
          </div>
        </Dropdown>

        {/* <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
                <div className="bg-[#0D1114] p-4 rounded-lg mr-16" style={{ border: '1px solid #BAFE03' }}>
                    <img className="w-[20px] h-[20px]" src={icon1} alt="" />
                </div>
            </Dropdown> */}
        <div onClick={() => handleConnect()} className="hidden">
          {publicKey ? (
            <div className="bg-gradient-to-r from-[#A0FF05] to-[#C5D503] flex items-center justify-between py-6 px-12 text-[12px] text-[#000] rounded-lg">
              <svg
                className=" mr-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M12.1364 1.5H3.86364C2.56364 1.5 1.5 2.56364 1.5 3.86364V12.1364C1.5 13.4364 2.56364 14.5 3.86364 14.5H12.1364C13.4364 14.5 14.5 13.4364 14.5 12.1364V3.86364C14.5 2.56364 13.4364 1.5 12.1364 1.5ZM13.3182 9.77273H10.3636C9.38864 9.77273 8.59091 8.975 8.59091 8C8.59091 7.025 9.38864 6.22727 10.3636 6.22727H13.3182V9.77273ZM10.3636 5.04545C8.73864 5.04545 7.40909 6.375 7.40909 8C7.40909 9.625 8.73864 10.9545 10.3636 10.9545H13.3182V12.1364C13.3182 12.7864 12.7864 13.3182 12.1364 13.3182H3.86364C3.21364 13.3182 2.68182 12.7864 2.68182 12.1364V3.86364C2.68182 3.21364 3.21364 2.68182 3.86364 2.68182H12.1364C12.7864 2.68182 13.3182 3.21364 13.3182 3.86364V5.04545H10.3636Z"
                  fill="black"
                />
                <path
                  d="M9.47729 8.00062C9.47729 8.2357 9.57068 8.46115 9.7369 8.62737C9.90313 8.7936 10.1286 8.88698 10.3637 8.88698C10.5987 8.88698 10.8242 8.7936 10.9904 8.62737C11.1566 8.46115 11.25 8.2357 11.25 8.00062C11.25 7.76554 11.1566 7.54009 10.9904 7.37387C10.8242 7.20764 10.5987 7.11426 10.3637 7.11426C10.1286 7.11426 9.90313 7.20764 9.7369 7.37387C9.57068 7.54009 9.47729 7.76554 9.47729 8.00062Z"
                  fill="black"
                />
              </svg>
              {AddrHandle(publicKey?.toBase58(), 4, 4)}
            </div>
          ) : (
            <div
              className="flex items-center justify-between py-6 px-12 text-[12px] text-[#fff] bg-[#0D1114] rounded-lg"
              style={{ border: '1px solid rgba(255, 255, 255, 0.20)' }}
            >
              <img className="w-[16px] h-[16px] mr-4" src={icon2} alt="" />
              {/* {t('Please link wallet')} */}
              Connect Wallet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentName;
