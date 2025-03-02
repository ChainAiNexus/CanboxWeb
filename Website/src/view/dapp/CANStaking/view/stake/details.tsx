import { useEffect, useState } from "react";
import Header from "../../components/header";
import { AddrHandle, convertToLocalUtc0Timestamp, dateFormat } from "../../../../../utils/tool";
import TabIndex from "../../components/tabIndex";
import { getPledgeRecord } from "../../../../../API";
import { useSelector } from "react-redux";
import { useWallet } from "@solana/wallet-adapter-react";
import NoData from "../../../../../components/noData";

function App() {


  const token = useSelector((state: any) => state?.token);
  const { publicKey, sendTransaction, wallet } = useWallet();
  const [PledgeRecord, setPledgeRecord]: any = useState({})
  const handleList = () => {
    getPledgeRecord().then((res: any) => {
      setPledgeRecord(res?.data)
    }).catch(() => { });
  }
  useEffect(() => {
    handleList()
  }, [publicKey, token]);

  return (
    <div className="main_app">
      <Header />
      <div className=" w-[400px] mx-auto pt-[130px]">

        <div className="text-[#FFF] text-[22px] text-center mb-[18px]">
          Pledge record
        </div>
        <div className="flex items-center mb-[18px] ">
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
          PledgeRecord?.list?.length > 0 ?
            PledgeRecord?.list?.map(
              (item: any, index: number) =>
                <div key={index} className="flex items-center mb-[10px] pb-[10px]" style={{ borderBottom: '1px solid #001D1F' }}>
                  <div className="text-[#fff] text-[16px] text-left flex-1">
                    {dateFormat('YYYY-mm-dd HH:MM', new Date(convertToLocalUtc0Timestamp(item.createTime)))}
                  </div>
                  <div className="text-[#fff] text-[16px] text-center w-[100px]">
                    {item.num}
                  </div>
                  <div className="text-[#fff] text-[16px] text-right w-[110px]">

                    {AddrHandle(item.userAddress) || "--"}
                  </div>
                </div>
            )
            :
            <NoData />
        }
        <TabIndex index={2} />
      </div>
    </div>
  );
}
export default App;