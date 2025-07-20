import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard} from "react-icons/io";
import {addThousandsSeparator} from "../../utils/helper";
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from "../../components/Dashboard/last30DaysExpenses";
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [DashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if(response.data){
        setDashboardData(response.data);
      }
    }catch(error){
      console.log("Something went wrong, Please try again.", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  // console.log("1Transactions:", DashboardData?.last60DaysIncome?.transactions?.slice(0,4));
  return (
    <DashboardLayout activeMenu = "Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(DashboardData?.totalBalance || 0)}
            color="bg-primary" />

            <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(DashboardData?.totalIncome || 0)}
            color="bg-green-500" />

            <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(DashboardData?.totalExpense || 0)}
            color="bg-red-500" />
          
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={DashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview 
            totalBalance={DashboardData?.totalBalance || 0}
            totalIncome={DashboardData?.totalIncome || 0}
            totalExpense={DashboardData?.totalExpense || 0}
          />


          <ExpenseTransactions transactions={DashboardData?.last30DaysExpenses?.transactions || []} 
            onSeeMore={() => navigate("/expense")}  />

          <Last30DaysExpenses data={DashboardData?.last30DaysExpenses?.transactions || []} />


          <RecentIncomeWithChart 
            data={DashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome={DashboardData?.totalIncome || 0}
          />

          <RecentIncome 
            transactions = {DashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore ={() => navigate("/income")}
          />


        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
