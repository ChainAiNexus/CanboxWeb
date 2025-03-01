import CryptoJS from 'crypto-js';
import bs58 from 'bs58';
import { Buffer } from 'buffer';

const base58String = '7kuGYoSEY4HRrvCVFTNGK71maU8qX4PWBXv1sMcnL9Qu';
const buffer: any = bs58.decode(base58String);
const hexString = Buffer.from(buffer).toString();

const key = CryptoJS.enc.Hex.parse(hexString);

//add
function Decrypt(data: string) {
    var decrypt = CryptoJS.AES.decrypt(data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    var result = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString());
    return result;
}

//remove
function Encrypt(word: any) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}
export { Decrypt, Encrypt };
