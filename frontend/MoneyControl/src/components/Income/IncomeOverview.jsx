import React, { useEffect, useState } from 'react';
import{LuPlus} from "react-icons/lu";
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

//sample chartData
const sampleChartData = 
[
  { category: '10 Jul', amount: 1500 },
  { category: '18 Jul', amount: 3500 }
]

const IncomeOverview = ({transactions, onAddIncome}) => {
  console.log(transactions);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
      if (Array.isArray(transactions)) {
        const result = prepareIncomeBarChartData(transactions);
        // console.log("Processed chart data =>", result); //  Debug
        setChartData(result);
      }
    }, [transactions]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div className=''>
          <h5 className='text-lg'>
            Income OverView
          </h5>
          <p className='text-xs text-gray-400 mt-0.5'>Track your Earnings</p>
        </div>

        <button className='add-btn' onClick={onAddIncome}>
          <LuPlus className='text-lg'/>
          Add Income
        </button>
      </div>

      <div className='mt-10'>
        <CustomBarChart data={chartData}/>
       
      </div>
    </div>
  )
}

export default IncomeOverview;