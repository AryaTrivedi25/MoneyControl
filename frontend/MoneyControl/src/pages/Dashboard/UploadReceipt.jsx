import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_PATHS } from "../../utils/apiPaths"; // Your API paths file
import DashboardLayout from '../../components/layouts/DashboardLayout';

const UploadReceipt = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setExtractedData(null); // Reset previous data on new file selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("receipt", file);

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        API_PATHS.EXPENSE.UPLOAD_RECEIPT,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setExtractedData(data);
      toast.success("Expense extracted and added successfully!");
    } catch (error) {
      console.error("Error uploading receipt:", error);
      toast.error("Failed to extract data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu = "Dashboard">
      <div className='my-5 mx-auto'>
      <div className="container p-4 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Upload Expense Receipt</h1>
        <p className="mb-6">
          Let our AI automatically read your receipt and add the expense for
          you.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="receipt" className="block text-sm font-medium mb-2">
              Receipt Image
            </label>
            <input
              type="file"
              id="receipt"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !file}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Analyzing Receipt..." : "Upload and Extract"}
          </button>
        </form>

        {extractedData && (
          <div className="mt-8 p-4 bg-gray-50 rounded-md border">
            <h2 className="text-xl font-semibold mb-2">
              Expense Added Successfully
            </h2>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(extractedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadReceipt;