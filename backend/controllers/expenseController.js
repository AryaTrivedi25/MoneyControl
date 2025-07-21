const xlsx = require("xlsx");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Expense = require("../models/Expense");

// --- Gemini API Configuration ---
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

// Helper function to convert a file on disk to a Gemini-compatible format
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

// Add Expense category
exports.addExpense = async(req, res) => {
  const userId = req.user.id;

  try{
    const {icon, category, amount, date} = req.body;
    // validation check for missing fields
    if(!category || !amount || !date){
      return res.status(400).json({message : "All fields are required"});
    }
  
    const newExpense = new Expense ({
      userId,
      icon,
      category,
      amount,
      date : new Date(date)
    });
  
    await newExpense.save();
    res.status(200).json(newExpense);
  }catch(err){
    res.status(500).json({message : "Server Error"});
  }
}

//Get all Expense  
exports.getAllExpense = async(req, res) => {
  const userId = req.user.id;

  try{
    const expense = await Expense.find({userId}).sort({date : -1});
    res.json(expense);
  }catch(error){
    res.status(500).json({message : "Server Error"});
  }
};

//Delete Expense source
exports.deleteExpense = async (req, res) => {

  try{
    await Expense.findByIdAndDelete(req.params.id);
    res.json({message  : "Expense deleted Successfully"});
  }catch(err){
    res.status(500).json({message : "Server Error"});
  }
}

//Download Excel
exports.downloadExpenseExcel = async(req,res) => {
  const userId = req.user.id;

  try{
    const expense = await Expense.find({userId}).sort({date : -1});

    //prepare Data for Excel
    const data = expense.map((item) => ({
      Category : item.category,
      Amount : item.amount,
      Date : item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  }catch(err){
    res.status(500).json({message : "Server Error"});
  }
};

// --- Function for AI Receipt Scanning ---
exports.extractExpenseFromReceipt = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No receipt image uploaded." });
  }

  const filePath = req.file.path;

  try {
    const prompt = `
      You are an expert expense-tracking assistant. Your task is to analyze the provided receipt image and extract key information.

      Based on the image, extract the following details:
      1. 'description': The name of the store or vendor.
      2. 'amount': The final total amount paid. It must be a number (float).
      3. 'date': The transaction date in YYYY-MM-DD format. If the date is not found, use today's date: ${new Date().toISOString().split('T')[0]}.
      4. 'category': Categorize into "Food & Dining", "Groceries", "Transportation", "Utilities", "Shopping", "Entertainment", or "Other".

      Respond ONLY with a single, valid JSON object.
    `;

    const imagePart = fileToGenerativePart(filePath, req.file.mimetype);

    const result = await model.generateContent([prompt, imagePart]);
    const cleanedText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    const extractedData = JSON.parse(cleanedText);

    const newExpense = new Expense({
      userId: req.user.id,
      description: extractedData.description,
      category: extractedData.category,
      amount: extractedData.amount,
      date: new Date(extractedData.date),
    });

    await newExpense.save();
    res.status(201).json(newExpense);

  } catch (error) {
    console.error("Error processing receipt:", error);
    res.status(500).json({ message: "Failed to process receipt." });
  } finally {
    fs.unlinkSync(filePath);
  }
};