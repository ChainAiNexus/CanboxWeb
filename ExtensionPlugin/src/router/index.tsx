import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import MainLayout from "../Layout/MainLayout";

const HomeIndex = React.lazy(() => import("../Home/index"));
const PcIndex = React.lazy(() => import("../Pc/index"));
const StakeIndex = React.lazy(() => import("../Stake/index"));
const StakeDetails = React.lazy(() => import("../Stake/details"));
const Leaderboard = React.lazy(() => import("../view/leaderboard"));

export default function Router() {
  return (
    <Suspense>
      <Routes>
        <Route path="/*" element={<HomeIndex />} />
        <Route path="/stake" element={<StakeIndex />} />
        <Route path="/stake/details" element={<StakeDetails />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/pc" element={<PcIndex />} />
      </Routes>
    </Suspense>
  );
}
