
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