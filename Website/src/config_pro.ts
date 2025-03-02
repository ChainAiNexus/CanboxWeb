const windowHost = window.location.origin;

export const LOCAL_KEY = 'MBAS_LANG';

let pattern = /^(http:\/\/localhost|http:\/\/192\.168|https:\/\/localhost|https:\/\/192\.168|file:\/\/*)/i;
// 
// export const isMain = pattern.test(windowHost) ? false : true; //
export const isMain = true; //
// api
export let baseUrl: string = 'https://solworld.biz/api';
// 
// export const LOCAL_RPC = 'https://mainnet.helius-rpc.com/?api-key=34778cf4-2c5b-4584-ad71-a157b7e14eb5'; // rpc
export const LOCAL_RPC = 'https://mainnet.helius-rpc.com/?api-key=c21589ef-128c-4985-9b69-dd24de901469'; // rpc
// https://api.devnet.solana.com/
export const LOCAL_programId = '76pmutj7EJEkk2mUmNiXJycyLFRSHY4PtcNdfAUYVrNa'; // programId
export const usdt_receiver1 = 'BYpRHcHr2ekVYF4epcUCmgbwj2KGh3jifoqzyiRWY6MG'; // to address(85%)
export const usdt_receiver2 = 'FrJCgkpJEeAwtoz8BrAozjFafQvD71kxqyMFVjZX3rHB'; // to address(15%)
export const TOKEN_PROGRAM_ID = '7mSU5ZJsYsm3CPf2gzfYAWXE6CghFw86k7vjkpsYznzP'; // sol.x

// 
export const usdt_mint = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'; // usdt
export const usdt_receiver = 'H8F5t2oT2ixG91EnuTXJnsfeKDXkJXiz1bAwqR2xWrxU'; // to address
