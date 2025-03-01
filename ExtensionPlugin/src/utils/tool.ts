import dayjs from 'dayjs';
import store from '../store';
import { createAddMessageAction, createSetLodingAction } from '../store/actions';
import relativeTime from 'dayjs/plugin/relativeTime';
import BigNumber from 'big.js';
export function toThousands(num: string) {
  let numArr = num.split('.');
  if (numArr.length > 1) {
    return parseFloat(numArr[0]).toLocaleString() + '.' + numArr[1];
  } else {
    return parseFloat(numArr[0]).toLocaleString();
  }
}
//
export function AddrHandle(addr: string, start = 4, end = 4, replace = '...'): string | undefined {
  if (!addr) {
    return;
  }
  let r = new RegExp('(.{' + start + '}).*(.{' + end + '})');
  let addrArr: RegExpMatchArray | null = addr.match(r);
  return addrArr![1] + replace + addrArr![2];
}
export function HowLongAgo(time: number) {
  dayjs.extend(relativeTime);
  var a = dayjs();
  return a.to(new Date(time));
}

export function GetQueryString(name: string) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  // console.log(window.location)
  var r = window.location.search.slice(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

export function JudgmentNumber(number: string) {
  let numArr = number.split('.');
  if (numArr.length > 1) {
    return numArr[1].length > 18;
  }
  return false;
}
// 
export function NumSplic(val: any, len: number = 6) {
  var f = parseFloat(val);
  if (isNaN(f)) {
    return false;
  }
  var s = val.toString();
  if (s.indexOf('.') > 0) {
    let f = s.split('.')[1].substring(0, len);
    s = s.split('.')[0] + '.' + f;
  }
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + len) {
    s += '0';
  }
  return s;
}
// 0
export function NumSplic1(val: any, len: number = 6) {
  var f = parseFloat(val);
  if (isNaN(f)) {
    return false;
  }
  var s = val.toString();
  if (s.indexOf('.') > 0) {
    let f = s.split('.')[1].substring(0, len);
    s = s.split('.')[0] + '.' + f;
  }
  return s;
}
// （）
export function getBit(value: number, bit = 5) {
  let str = value.toString();
  let strIndex = str.indexOf('.');
  if (strIndex === -1) return str;
  str = str.substring(0, strIndex + bit);
  // console.log(str, bit);
  // console.log(typeof str,'getBit')
  return str;
}

export function numberDivision() { }

export function showLoding(isShow: boolean) {
  store.dispatch(createSetLodingAction(isShow));
}

export function addMessage(msg: string) {
  store.dispatch(
    createAddMessageAction({
      message: msg,
      index: store.getState().message.length,
    })
  );
}
export function isApprove(price: number | string, Approve: string) {
  return new BigNumber(Approve).gte(price);
}
export function dateFormat(fmt: string, date: Date) {
  let ret;
  const opt: { [key: string]: string } = {
    'Y+': date.getFullYear().toString(), // 
    'm+': (date.getMonth() + 1).toString(), // 
    'd+': date.getDate().toString(), // 
    'H+': date.getHours().toString(), // 
    'M+': date.getMinutes().toString(), // 
    'S+': date.getSeconds().toString(), // 
    // ，
  };
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
    }
  }
  return fmt;
}
export function getFullNum(num: any) {
  //
  if (isNaN(num)) {
    return num;
  }
  //
  var str = '' + num;
  if (!/e/i.test(str)) {
    return num;
  }
  return num.toFixed(18).replace(/\.?0+$/, '');
}

export function startWord(name: string) {
  if (name.startsWith('/View')) return name.slice(5);
  return '';
}

//
export function timestampToDateString(timestamp: any) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const dateString = `${month}/${day} ${hours}:${minutes}`;
  return dateString;
}

export function formatTimestamp(timestamp: number): string[] {
  //  Date 
  const date = new Date(timestamp);

  // 
  const now = new Date();

  // （）
  const diffMs = date.getTime() - now.getTime();

  // 
  const diffSec = Math.floor(diffMs / 1000);

  // 
  const days = Math.floor(diffSec / (24 * 60 * 60));
  const remainingSecAfterDays = diffSec % (24 * 60 * 60);

  // 
  const hours = Math.floor(remainingSecAfterDays / (60 * 60));
  const remainingSecAfterHours = remainingSecAfterDays % (60 * 60);

  // 
  const minutes = Math.floor(remainingSecAfterHours / 60);
  const seconds = remainingSecAfterHours % 60;

  // 
  const formattedDays = String(days).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  // 
  return [`${formattedDays}`, `${formattedHours}`, `${formattedMinutes}`, `${formattedSeconds}`];
}

export function formatTimestamp2(timestamp: number): string {
  const date = new Date(timestamp);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}

//input
export function handleBeforeInput(event: any) {
  const regex = /[\u4e00-\u9fff]/;
  return regex.test(event);
}

// 
export function openLinkInNewTab(url: string) {
  try {
    //  window.open 
    const newWindow = window.open(url);
    if (!newWindow) {
      console.warn('window.open failed, falling back to location.href');
      window.location.href = url;
    }
  } catch (error) {
    // window.open 
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank'; // 
    setTimeout(() => {
      link.click();
    }, 100);
  }
  // if (typeof url === 'string' && url.length > 0) {

  // }
}

// json
export function parseJsonString(jsonString: string) {
  try {
    //  JSON.parse  JSON 
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  } catch (error) {
    // 
    console.error('Failed to parse JSON string:', error);
    return null;
  }
}

// 
export function generateTwoDigitRandomNumber(min: number = 1, max: number = 99) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// utc0
export function convertToLocalUtc0Timestamp(timeString: number): number {
  // 
  const localDate = new Date(timeString);

  //  UTC （）
  const offset = localDate.getTimezoneOffset();

  //  Date ， UTC 0 
  const utc0Date = new Date(localDate.getTime() + offset * 60 * 1000);

  //  UTC 0 
  return utc0Date.getTime();
}

// 
export function setTopBarIndex(min: string) {
  sessionStorage.setItem('topBarIndex', min);
}
// 
export function getTopBarIndex() {
  return sessionStorage.getItem('topBarIndex');
}
