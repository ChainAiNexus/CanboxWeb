import { useEffect, useState } from "react";
import Header from "../components/header";
import TabIndex from "../components/tabIndex";
import { AddrHandle } from "../utils";
import nodata from "../assets/image/nodata.png";
import { convertToLocalUtc0Timestamp, dateFormat } from "../utils/tool";

function App() {
  // 
  const [webMes, setWebMes]: any = useState();
  useEffect(() => {
    chrome?.runtime?.onMessageExternal?.addListener(
      async (request, sender, sendResponse) => {
        // 
        if (request.event === "pledgeRecord") {
          setWebMes(request?.data);
          console.log("web");
          console.log(request?.data);
          sendResponse("chrome");
        }
      }
    );
  }, []);
  return (
    <div className="pt-[80px]">
      <Header />
      <div className="text-[#FFF] text-[22px] text-center mb-[18px]">
        Pledge record
      </div>
      <div>
        <div className="flex items-center mb-[18px] mx-20">
          <div className="text-[#9D9D9D] text-[16px] text-left flex-1">
            Time
          </div>
          <div className="text-[#9D9D9D] text-[16px] text-center w-[100px]">
            Number
          </div>
          <div className="text-[#9D9D9D] text-[16px] text-right  w-[110px]">
            Address
          </div>
        </div>
        {
          webMes?.list?.length > 0 ?
            webMes?.list?.map(
              (item: any, index: number) =>
                <div key={index} className="flex items-center mb-[10px] mx-20 pb-[10px]" style={{ borderBottom: '1px solid #001D1F' }}>
                  <div className="text-[#fff] text-[14px] text-left flex-1">
                    {dateFormat('YYYY-mm-dd HH:MM', new Date(convertToLocalUtc0Timestamp(item.createTime)))}
                  </div>
                  <div className="text-[#fff] text-[14px] text-center w-[100px]">
                    {item.num}
                  </div>
                  <div className="text-[#fff] text-[14px] text-right w-[110px]">

                    {AddrHandle(item.userAddress) || "--"}
                  </div>
                </div>
            )
            : <div className="mx-20 pt-[40px]">
              <img
                src={nodata}
                className="w-[160px] h-[160px] mx-auto inline-block]"
                alt=""
              />
            </div>
        }

        <TabIndex index={2} />
      </div>
    </div>
  );
}
export default App;