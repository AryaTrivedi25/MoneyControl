// import React, { useEffect, useState } from 'react';
// import CustomPieChart from '../Charts/CustomPieChart';

// const COLORS = [
//   '#8884d8',
//   '#82ca9d',
//   '#ffc658',
//   '#ff8042',
//   '#8dd1e1',
//   '#a4de6c',
//   '#d0ed57',
//   '#ffc0cb',
// ];

// const RecentIncomeWithChart = ({ data, totalIncome }) => {
//   const [chartData, setChartData] = useState([]);

//   const prepareChartData = () => {
//     const dataArr = (data || []).map((item) => ({
//       name: item?.source || 'Unknown',  
//       amount: Number(item?.amount),
//     }));

//     setChartData(dataArr);
//   };

//   useEffect(() => {
//     prepareChartData();
//   }, [data]);

//   return (
//     <div className="p-4 bg-white rounded-2xl shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Recent Income (Chart View)</h2>
//       {chartData.length === 0 ? (
//         <p className="text-gray-500 text-sm text-center">No income data to display.</p>
//       ) : (
//         <CustomPieChart
//           data={chartData}
//           label="Total Income"
//           totalAmount={`₹${totalIncome}`}
//           showTextAnchor
//           colors={COLORS}
//         />
//       )}
//     </div>
//   );
// };

// export default RecentIncomeWithChart;

import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { prepareIncomePieChartData } from '../../utils/helper'; // import from utility

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#8dd1e1',
  '#a4de6c',
  '#d0ed57',
  '#ffc0cb',
];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomePieChartData(data);
    // console.log("Income pie chart data =>", result); // for debugging
    setChartData(result);
  }, [data]);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Recent Income (Chart View)</h2>
      {chartData.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No income data to display.</p>
      ) : (
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={`₹${totalIncome}`}
          showTextAnchor
          colors={COLORS}
        />
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
