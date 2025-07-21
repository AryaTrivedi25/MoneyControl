💸 Expense Tracker Web App
A full-stack web application to help users track income and expenses, view earnings visually, and filter transactions by a date range. The app also supports adding, listing, and visualizing transactions with intuitive UI components.

🚀 Features
✅ Add new income and expenses

✅ Visualize income using bar charts (Recharts)

✅ Filter transactions by custom date range

✅ Responsive and modern React UI

✅ Backend powered by Node.js, Express, and MongoDB

📦 Tech Stack
Frontend: React, Tailwind CSS, Recharts

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Icons: react-icons

🔍 Filter Income/Expenses by Date Range
✨ How it works:
Users can select a start and end date from the calendar inputs on the UI, and the app will:

Make an API call with the date range as query params

The backend fetches all income and expense records in that range

Results are shown in a list or graph format

📄 Sample Request:
sql
Copy
Edit
GET /api/transactions?start=2025-07-01&end=2025-07-15
📦 Sample Response:
json
Copy
Edit
{
  "income": [
    {
      "_id": "123",
      "amount": 5000,
      "source": "Freelancing",
      "date": "2025-07-10"
    }
  ],
  "expenses": [
    {
      "_id": "456",
      "amount": 1200,
      "category": "Shopping",
      "date": "2025-07-11"
    }
  ]
}
🧪 Sample Data Format
js
Copy
Edit
[
  {
    amount: 10000,
    source: "Salary",
    date: "2025-07-01",
    userId: "abc123"
  },
  {
    amount: 200,
    category: "Snacks",
    date: "2025-07-02",
    userId: "abc123"
  }
]
🛠️ Local Setup
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
2. Install Dependencies
bash
Copy
Edit
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
3. Run the App
bash
Copy
Edit
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm start
Make sure MongoDB is running locally or use MongoDB Atlas.

📁 Folder Structure
bash
Copy
Edit
/client     → React frontend
/server     → Express backend
/models     → Mongoose schemas
/routes     → Express routes
/utils      → Data helpers (e.g., bar chart prep)
📈 Future Enhancements
OCR for reading receipts (image/PDF)

Authentication & authorization

Export reports to Excel

Pie chart by category
