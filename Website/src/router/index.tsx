import React, { Suspense } from 'react';
import { Route, Routes, BrowserRouter as Routers } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import PageLoding from '../components/PageLoding';

const Home = React.lazy(() => import('../view/index'));
const Login = React.lazy(() => import('../view/login/index'));
const DappCANStaking = React.lazy(() => import('../view/dapp/CANStaking/index'));
const DappCANStakingLeaderboard = React.lazy(() => import('../view/dapp/CANStaking/view/leaderboard/index'));
const DappCANStakingStake = React.lazy(() => import('../view/dapp/CANStaking/view/stake/index'));
const DappCANStakingStakeDetails = React.lazy(() => import('../view/dapp/CANStaking/view/stake/details'));

export default function Router() {
  return (
    <Suspense fallback={<PageLoding></PageLoding>}>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dapp/CANStaking" element={<DappCANStaking />} />
          <Route path="dapp/CANStaking/leaderboard" element={<DappCANStakingLeaderboard />} />
          <Route path="dapp/CANStaking/stake" element={<DappCANStakingStake />} />
          <Route path="dapp/CANStaking/stake/details" element={<DappCANStakingStakeDetails />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
