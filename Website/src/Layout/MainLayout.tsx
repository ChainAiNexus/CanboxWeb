import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getPledgeRecord, getTokenContractAddress, Login } from '../API';
import { ed25519 } from '@noble/curves/ed25519';
import bs58 from 'bs58';
import { useDispatch, useSelector } from 'react-redux';
import { createDelMessageAction, createLoginSuccessAction } from '../store/actions';
import { useWallet } from '@solana/wallet-adapter-react';
import { getQueryParam } from '../utils/getUrlParamsLegacy';
import Hander from '../components/hander';
import { showLoding } from '../utils/tool';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useTranslation } from 'react-i18next';
import { use } from 'chai';
import { Connection, PublicKey } from '@solana/web3.js';
import { LOCAL_RPC } from '../config';

declare var chrome: any;
const MainLayout: React.FC = () => {
  let { t, i18n } = useTranslation();
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const token = useSelector((state: any) => state?.token);

  const { publicKey, signMessage, signTransaction, connected, autoConnect, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const handleLoad = (sign: any, signMsg: any, signature: any) => {
    const account: any = publicKey?.toBase58();
    if (!account) return;
    const exampleValue = getQueryParam('inviteCode') || ''; // 
    Login({
      chainName: 'solana',
      sign,
      signMsg,
      signature: signature,
      inviteCode: exampleValue,
      userAddress: account,
    })
      .then((res: any) => {
        if (res.code === 200) {
          localStorage.setItem('accessToken', res.data.accessToken);
          dispatch(createLoginSuccessAction(res.data.token, account as string));

          const currentUrl = window.location.href;
          if (currentUrl.includes("login")) {
            navigate('/');
          }

        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        showLoding(false);
      });
  };

  const sendMessage = async () => {
    try {
      showLoding(true);
      if (!publicKey) throw new Error('Wallet not connected!');
      if (!signMessage) throw new Error('Wallet does not support message signing!');

      const _msg = `Login to ChainAINexus`;
      const message = new TextEncoder().encode(_msg);
      const signature = Array.from(await signMessage(message));
      console.log(signature);

      handleLoad(bs58.encode(signature), _msg, signature);

      // if (!ed25519.verify(signature, message, publicKey.toBytes())) throw new Error('Message signature invalid!');
      console.log(`Message signature: ${bs58.encode(signature)}`);
    } catch (error: any) {
      showLoding(false);
      disconnect();
      console.log(`Sign Message failed: ${error?.message}`);
    }
  };

  //  Web 
  const [pledgeRecord, setPledgeRecord] = useState<any>();
  const extensionId = 'fcaijkoknbkonilhflhofkhnkpllhlge'; // ID
  const loadMessageToPlugin = () => {
    try {
      getPledgeRecord().then((res: any) => {
        setPledgeRecord(res?.data);
        // Chrome
        chrome?.runtime?.sendMessage(
          extensionId,
          {
            event: 'pledgeRecord',
            data: res?.data,
          },
          (response: any) => {
            // Chrome
            // console.log('res data', response);
          }
        );
      }).catch(() => { });
    } catch (error) { }
  };
  const intervalRef2 = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (publicKey && token) {
      intervalRef2.current = setInterval(() => {
        loadMessageToPlugin();

        getTokenContractAddress()
          .then((res: any) => {
            getTokenBalance(res?.data);
          })
          .catch(() => { });
      }, 12000);
    }
    return () => {
      if (intervalRef2.current) {
        clearInterval(intervalRef2.current);
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
          console.info('balance:' + tokenAmount / Math.pow(10, 6));

          chrome?.runtime?.sendMessage(
            extensionId,
            {
              event: 'balance',
              data: { balance: tokenAmount / Math.pow(10, 6) },
            },
            (response: any) => {
              // Chrome
              console.log('res data', response);
            },
          );
          setbalance_SOLX(tokenAmount / Math.pow(10, 6)); // `uiAmount` 
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    // setVisible(!publicKey);
    if (!publicKey) {
      dispatch(createLoginSuccessAction('', 'token'));
      // navigate('/login');
    }
  }, [publicKey]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (publicKey && connected) {
      // if (wallet?.adapter.name !== 'Phantom') {
      //     alert('please_switch_phantom');
      //     disconnect().catch(() => {
      //         setVisible(true);
      //     });
      //     return;
      // }
      sendMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, connected]);

  // 
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <div className="">
      {/* <Hander /> */}
      <div className="">
        {/*  */}
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
