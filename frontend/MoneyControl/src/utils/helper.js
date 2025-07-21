import  moment from "moment";

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export const addThousandsSeparator = (num) => {
  if(num == null || isNaN(num)) return "";

  const [integerPart, FractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return FractionalPart ? `${formattedInteger}.${FractionalPart}` : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const grouped = {};

  data.forEach((item) => {
    const cat = item?.category || "Other";
    const amount = Number(item?.amount || 0);
    if (!grouped[cat]) {
      grouped[cat] = amount;
    } else {
      grouped[cat] += amount;
    }
  });

  return Object.entries(grouped).map(([category, amount]) => ({ category, amount }));
};

export const prepareIncomePieChartData = (data = []) => {
  return data.map((item) => ({
    name: item?.source || "Unknown",
    amount: Number(item?.amount || 0),
  }));
};

// export const prepareIncomeBarChartData = (data = []) => {
//   const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

//   const chartData = sortedData.map((item) => ({
//     month: moment(item?.date).format("Do MMM"),
//     amount: item?.amount,
//     source: item?.source,
//   }));

//   return chartData;
// };

// utils/helper.js

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    category: moment(item?.date).format("DD MMM"), // ✅ match key for XAxis
    amount: item?.amount,
  }));

  return chartData;
};

export const pareExpenseBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    category: moment(item?.date).format("DD MMM"), // ✅ match key for XAxis
    amount: item?.amount,
  }));

  return chartData;
};
