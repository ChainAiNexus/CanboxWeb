import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/image/logo.png";
import { indxApi } from "../api/index";

const ComponentName = (props?: {}) => {
  // 
  const openBaiduButton: any = useRef(null);
  useEffect(() => {
    const _this: any = window;
    const handleClick = () => {
      if (typeof _this !== "undefined" && _this?.chrome && _this?.chrome.tabs) {
        _this?.chrome.tabs.create({
          url: "https://plug.inscriptionalliance.io/",
        });
      } else {
        window.open("https://plug.inscriptionalliance.io/");
      }
    };
    openBaiduButton.current?.addEventListener("click", handleClick);

    return () => {
      openBaiduButton.current?.removeEventListener("click", handleClick);
    };
  }, []);

  // 
  const [webMes, setWebMes]: any = useState();
  useEffect(() => {
    chrome?.runtime?.onMessageExternal?.addListener(
      async (request, sender, sendResponse) => {
        if (request.event === "requestEvent") {
          setWebMes(request?.data);
          console.log("web");
          console.log(request?.data);
          sendResponse("chrome");
        }
      }
    );
  }, []);

  const [socketMes, setSocketMes]: any = useState({
    avatar: "", //（）
    nickname: "", //（）
    userAddress: "", //（）
    status: 0, //（：1，0）
    isPause: 0, //（：1，0）
    networkQuality: 0, //（）
    pendingTasks: 0, //（）
    miningSpeed: 0, //（）
    miningIndex: 0, //（）
    earnings: 0, //（）
  });
  useEffect(() => {
    const timerId = setInterval(() => {
      handleLoad();
    }, 6000);
    // ，
    return () => clearInterval(timerId);
  }, [webMes]);
  const handleLoad = () => {
    if (webMes?.token) {
      indxApi
        .getIndexLoad({
          token: webMes?.token,
        })
        .then((res: any) => {
          setSocketMes(res.data);
        });
    }
  };
  return (
    <div className="chrome_extension">
      <div className="flex items-center px-[22px] py-14">
        <img src={logo} className="h-[38px] mr-10 rounded-md" alt="" />
        <div className="text-[20px] text-[#202020] flex-1 text-right">
          Denim Depiner
        </div>
      </div>
      <div className="h-2 w-[100%] bg-[#ACFF79]"></div>
      <div className="pt-[14px] px-[22px]">
        <div className="flex items-center text-[20px] text-[#202020] font-[600]">
          <div className="flex-1">Status</div>
          <div className="flex items-center text-[16px] text-[#202020] font-[600]">
            {socketMes.status === 1 ? (
              <>
                <div
                  className="w-[18px] h-[18px] bg-[#57E400] mr-10 rounded-full"
                  style={{ border: "1px solid #1C1C1C" }}
                ></div>
                Connected
              </>
            ) : (
              <>
                <div
                  className="w-[16px] h-[16px] bg-[#E21111] mr-10 rounded-full"
                  style={{ border: "1px solid #1C1C1C" }}
                ></div>
                Not Connected
              </>
            )}
          </div>
        </div>
        <div className="mt-[14px] bg-[#ACFF79] rounded-md text-[16px] py-6 flex items-center justify-center text-[#1C1C1C] font-[600] ">
          <svg
            className="mr-[20px]"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <g clip-path="url(#clip0_37_1564)">
              <path
                d="M15.5 19C15.5 18.2044 15.1839 17.4413 14.6213 16.8787C14.0587 16.3161 13.2956 16 12.5 16C11.7044 16 10.9413 16.3161 10.3787 16.8787C9.81607 17.4413 9.5 18.2044 9.5 19C9.5 19.7957 9.81607 20.5587 10.3787 21.1213C10.9413 21.6839 11.7044 22 12.5 22C13.2956 22 14.0587 21.6839 14.6213 21.1213C15.1839 20.5587 15.5 19.7957 15.5 19ZM11.5 19C11.5 18.7348 11.6054 18.4804 11.7929 18.2929C11.9804 18.1054 12.2348 18 12.5 18C12.7652 18 13.0196 18.1054 13.2071 18.2929C13.3946 18.4804 13.5 18.7348 13.5 19C13.5 19.2652 13.3946 19.5196 13.2071 19.7071C13.0196 19.8947 12.7652 20 12.5 20C12.2348 20 11.9804 19.8947 11.7929 19.7071C11.6054 19.5196 11.5 19.2652 11.5 19ZM24.002 6.37001C24.1725 6.5733 24.2553 6.83601 24.2322 7.10034C24.209 7.36467 24.0818 7.60898 23.8785 7.77951C23.7778 7.86395 23.6615 7.92774 23.5362 7.96723C23.4109 8.00672 23.2791 8.02115 23.1482 8.00968C22.8838 7.98652 22.6395 7.8593 22.469 7.65601C21.2503 6.19655 19.7255 5.02295 18.0028 4.21834C16.28 3.41372 14.4014 2.99779 12.5 3.00001C8.618 3.00001 5.016 4.71001 2.56 7.62101C2.38894 7.8239 2.14428 7.95053 1.87985 7.97303C1.61543 7.99554 1.35289 7.91207 1.15 7.74101C0.947109 7.56995 0.820484 7.32529 0.797979 7.06086C0.775475 6.79644 0.858935 6.5339 1.03 6.33101C2.43681 4.65901 4.19265 3.31532 6.17419 2.39435C8.15573 1.47337 10.3149 0.997449 12.5 1.00001C16.996 1.00001 21.17 2.99101 24.002 6.37001ZM20.266 9.63101C20.4299 9.83491 20.5073 10.0949 20.4818 10.3552C20.4562 10.6156 20.3296 10.8555 20.1292 11.0236C19.9288 11.1918 19.6705 11.2746 19.4096 11.2545C19.1488 11.2344 18.9063 11.1129 18.734 10.916C17.9707 10.0019 17.0157 9.26678 15.9366 8.76285C14.8576 8.25893 13.6809 7.9985 12.49 8.00001C11.3038 7.99837 10.1317 8.25662 9.05608 8.75661C7.98044 9.25659 7.02741 9.98616 6.264 10.894C6.09145 11.0916 5.84818 11.2135 5.58661 11.2334C5.32504 11.2533 5.06613 11.1696 4.86569 11.0004C4.66524 10.8311 4.53932 10.5899 4.51506 10.3287C4.4908 10.0675 4.57015 9.80725 4.736 9.60401C5.68711 8.47378 6.87412 7.56546 8.21367 6.94285C9.55322 6.32024 11.0128 5.99843 12.49 6.00001C13.973 5.99851 15.4382 6.32297 16.782 6.95043C18.1257 7.57788 19.3151 8.493 20.266 9.63101ZM17.266 13.228C17.4299 13.4319 17.5073 13.6919 17.4818 13.9522C17.4562 14.2126 17.3296 14.4525 17.1292 14.6206C16.9288 14.7888 16.6705 14.8716 16.4096 14.8515C16.1488 14.8314 15.9063 14.7099 15.734 14.513C15.338 14.0386 14.8425 13.6571 14.2825 13.3956C13.7226 13.1341 13.112 12.9991 12.494 13C11.8786 12.9992 11.2704 13.1333 10.7124 13.3927C10.1544 13.6522 9.65996 14.0309 9.264 14.502C9.09145 14.6996 8.84818 14.8215 8.58661 14.8414C8.32504 14.8613 8.06613 14.7776 7.86568 14.6084C7.66524 14.4391 7.53932 14.1979 7.51506 13.9367C7.4908 13.6755 7.57015 13.4153 7.736 13.212C8.31967 12.5185 9.04804 11.9611 9.86999 11.579C10.6919 11.1969 11.5876 10.9992 12.494 11C14.359 11 16.092 11.827 17.266 13.228Z"
                fill="#3D3D3D"
              />
            </g>
            <defs>
              <clipPath id="clip0_37_1564">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          {/* Integral Quality:{socketMes.networkQuality}% */}
          Network Quality:{socketMes.networkQuality}%
        </div>
        <div className="mt-[18px]">
          <div className="text-[#7E7E7E] font-[600] text-[16px] mb-6">
            Pending Tasks
          </div>
          <input
            type="text"
            value={socketMes.pendingTasks}
            disabled={true}
            className="w-[100%] rounded-full text-[#1C1C1C] font-[600] text-[16px] px-[26px] py-9"
            style={{ border: "1px solid #1C1C1C" }}
          />
        </div>
        <div className="mt-[10px]">
          <div className="text-[#7E7E7E] font-[600] text-[16px] mb-6">
            {/* Mining Speed */}
            Denim Speed
          </div>
          <input
            type="text"
            value={socketMes.miningSpeed}
            disabled={true}
            className="w-[100%] rounded-full text-[#1C1C1C] font-[600] text-[16px] px-[26px] py-9"
            style={{ border: "1px solid #1C1C1C" }}
          />
        </div>
        <div className="mt-[10px]">
          <div className="text-[#7E7E7E] font-[600] text-[16px] mb-6">
            {/* Mining Index */}
            Denim Index
          </div>
          <input
            type="text"
            value={socketMes.miningIndex}
            disabled={true}
            className="w-[100%] rounded-full text-[#1C1C1C] font-[600] text-[16px] px-[26px] py-9"
            style={{ border: "1px solid #1C1C1C" }}
          />
        </div>
        <div className="mt-[10px]">
          <div className="text-[#7E7E7E] font-[600] text-[16px] mb-6">
            Earnings
          </div>
          <input
            type="text"
            value={socketMes.earnings}
            disabled={true}
            className="w-[100%] rounded-full text-[#1C1C1C] font-[600] text-[16px] px-[26px] py-9"
            style={{ border: "1px solid #1C1C1C" }}
          />
        </div>
        <div className="flex mt-[20px]">
          {/* <div
          onClick={() => {
            setSocketMes({
              avatar: "", //（）
              nickname: "", //（）
              userAddress: "", //（）
              status: socketMes.status === 0 ? 1 : 0, //（：1，0）
              isPause: 0, //（：1，0）
              networkQuality: 0, //（）
              pendingTasks: 0, //（）
              miningSpeed: 0, //（）
              miningIndex: 0, //（）
              earnings: 0, //（）
            });
          }}
            className={
              socketMes.status === 0
                ? "flex-1 mr-3 cursor-pointer rounded-lg py-11 bg-[#7E7E7E] text-[#202020] font-[600] text-[16px] flex items-center justify-center"
                : "flex-1 mr-3 cursor-pointer rounded-lg py-11 bg-[#57E400] text-[#202020] font-[600] text-[16px] flex items-center justify-center"
            }
          >
            {socketMes.status === 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M9.529 5.35005L17.754 10.2851C19.049 11.0621 19.049 12.9381 17.754 13.7151L9.53 18.6501C8.574 19.2241 7.43 18.8921 6.86 18.0841L6.859 18.0851C6.79137 17.9724 6.70221 17.8741 6.59661 17.7959C6.49101 17.7177 6.37103 17.661 6.24354 17.6292C6.11604 17.5973 5.98352 17.5909 5.85354 17.6103C5.72357 17.6296 5.59867 17.6744 5.486 17.7421C5.37333 17.8097 5.27508 17.8988 5.19686 18.0044C5.11864 18.11 5.06199 18.23 5.03014 18.3575C4.99829 18.485 4.99187 18.6175 5.01123 18.7475C5.03059 18.8775 5.07537 19.0024 5.143 19.1151L5.141 19.1161C6.251 20.8161 8.601 21.5401 10.559 20.3661L18.784 15.4301C21.374 13.8761 21.374 10.1241 18.784 8.57005L10.559 3.63505C7.892 2.03505 4.5 3.95505 4.5 7.06505V15.0001C4.49998 15.1314 4.52583 15.2614 4.57608 15.3828C4.62632 15.5041 4.69998 15.6144 4.79284 15.7073C4.8857 15.8001 4.99595 15.8738 5.11728 15.9241C5.23862 15.9743 5.36866 16.0002 5.5 16.0002C5.63133 16.0002 5.76138 15.9743 5.88272 15.9241C6.00405 15.8738 6.1143 15.8001 6.20716 15.7073C6.30002 15.6144 6.37368 15.5041 6.42392 15.3828C6.47417 15.2614 6.50002 15.1314 6.5 15.0001V7.06505C6.5 5.51005 8.196 4.55005 9.529 5.35005Z"
                  fill="#14101C"
                />
              </svg>
            ) : (
              <svg
                className="mr-[8px]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.40002 4.40361C4.40002 4.1808 4.59044 4 4.81801 4H6.51535C6.74588 4 6.93334 4.18 6.93334 4.40361V19.5964C6.93334 19.8192 6.74292 20 6.51535 20H4.81801C4.76261 19.9996 4.70783 19.9888 4.65682 19.9683C4.60581 19.9478 4.55957 19.918 4.52074 19.8805C4.48191 19.8431 4.45127 19.7987 4.43055 19.7501C4.40983 19.7014 4.39946 19.6493 4.40002 19.5968V4.40401V4.40361ZM17.0667 4.40361C17.0667 4.1808 17.2571 4 17.4847 4H19.182C19.4125 4 19.6 4.18 19.6 4.40361V19.5964C19.6 19.8192 19.4096 20 19.182 20H17.4847C17.4292 19.9996 17.3744 19.9888 17.3234 19.9683C17.2723 19.9478 17.2261 19.9179 17.1872 19.8804C17.1484 19.8429 17.1178 19.7985 17.0971 19.7498C17.0764 19.701 17.0661 19.6489 17.0667 19.5964V4.40401V4.40361Z"
                  fill="#1C1C1C"
                />
              </svg>
            )}
            {socketMes.status === 0 ? "continue" : "Pause"}
          </div> */}
          <div
            className="flex-1 ml-3 cursor-pointer rounded-lg py-11  text-[#202020] font-[600] text-[16px] flex items-center justify-center"
            ref={openBaiduButton}
            style={{ border: "1px solid #1C1C1C" }}
          >
            Go to homepage
          </div>
        </div>
      </div>
      <div className="h-[20px]"></div>
    </div>
  );
};

export default ComponentName;
