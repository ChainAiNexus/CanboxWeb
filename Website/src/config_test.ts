const windowHost = window.location.origin;

export const LOCAL_KEY = 'MBAS_LANG';

let pattern = /^(http:\/\/localhost|http:\/\/192\.168|https:\/\/localhost|https:\/\/192\.168|file:\/\/*)/i;
// 
// export const isMain = pattern.test(windowHost) ? false : true; //
export const isMain = false; //
// api
export let baseUrl: string = 'http://192.168.1.37:28888';
// export let baseUrl: string = 'https://test.solanax.biz/api';
// 
export const LOCAL_RPC = 'https://api.devnet.solana.com/'; // rpc

//
export const LOCAL_programId = 'JQYoTGpQtQti9wXnypSqYQPf5ypcJnSC4TTe3wC6KD3'; // programId
export const usdt_receiver1 = 'AR9rMwxsnpQrkGPVQqqmsgaHPkzKPRr9bqkJ34uwExTD'; // to address(85%)
export const usdt_receiver2 = 'H8F5t2oT2ixG91EnuTXJnsfeKDXkJXiz1bAwqR2xWrxU'; // to address(15%)
export const TOKEN_PROGRAM_ID = '7mSU5ZJsYsm3CPf2gzfYAWXE6CghFw86k7vjkpsYznzP'; // sol.x

// 
export const usdt_mint = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'; // usdt
export const usdt_receiver = 'H8F5t2oT2ixG91EnuTXJnsfeKDXkJXiz1bAwqR2xWrxU'; // to address
