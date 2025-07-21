const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Import all controller functions, including the new one
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
  extractExpenseFromReceipt, // 
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Existing routes
router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadExcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

// New route for receipt uploads
router.post(
  "/expense/upload-receipt",
  protect,
  upload.single("receipt"),
  extractExpenseFromReceipt
);

module.exports = router;