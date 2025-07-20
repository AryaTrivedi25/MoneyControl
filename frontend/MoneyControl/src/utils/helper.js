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

