import React, { useEffect, useState } from "react";
import TabIndex from "../../components/tabIndex";
import Header from "../../components/header";
import icon4 from "../../assets/image/icon4.png";
import icon1 from "../../assets/image/icon1.png";
import nodata from "../../assets/image/nodata.png";

function App() {
  const [tabIndex, setTabIndex]: any = useState(0);
  useEffect(() => {
    setTabIndex(tabIndex);
    console.log(tabIndex);
  }, [tabIndex]);

  return (
    <div className="pt-[80px]">
      <Header />
      <div
        className="flex items-center w-[230px] mx-auto rounded-full"
        style={{
          background: "rgb(5,57,66)",
        }}
      >
        <div
          className="flex-1 text-center text-[18px] text-[#43FEE8] rounded-full py-6 cursor-pointer"
          onClick={() => setTabIndex(0)}
          style={{
            background: tabIndex === 1 ? "rgb(5,57,66)" : "rgb(40,104,106)",
          }}
        >
          Level
        </div>
        <div
          className="flex-1 text-center text-[18px] text-[#43FEE8] rounded-full py-6 cursor-pointer"
          style={{
            background: tabIndex === 0 ? "rgb(5,57,66)" : "rgb(40,104,106)",
          }}
          onClick={() => {
            setTabIndex(1);
          }}
        >
          Stake
        </div>
      </div>
      <div className="mx-20 pt-20 hidden">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            className="p-[10px] mb-10 rounded-[10px] flex items-center bg-[rgb(5,57,66)] "
            key={item}
          >
            <img
              src={icon1}
              className="w-[50px] h-[50px] rounded-full mr-10"
              alt=""
            />
            <div className="flex-1">
              <div className="text-[#fff] text-[14px]">0x75f5...1666</div>
              <div className="text-[#FFC700] text-[16px] font-[300]">Lv.50</div>
            </div>
            <div className="text-[#FFC700] text-[16px] pr-10">#1</div>
          </div>
        ))}
        <div className="w-full h-[90px]"></div>
      </div>
      <div className="mx-20 pt-[40px]">
        <img
          src={nodata}
          className="w-[160px] h-[160px] mx-auto inline-block]"
          alt=""
        />
      </div>
      <TabIndex index={3} />
    </div>
  );
}

export default App;
