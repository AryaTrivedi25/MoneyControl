import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import ExpenseList from '../../components/Expense/ExpenseList';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import DeleteAlert from '../../components/layouts/DeleteAlert';

const Expense = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
  
    const [ openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

      //Get all expense details
  const fetchExpenseDetails = async () => {

    if(loading){
      return;
    }

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if(response.data){
        setExpenseData(response.data);
      }
    }catch(error){
      console.log("Something went wrong. Please try again", error);
    }finally{
      setLoading(false);
    }
  };

  
  //Add Expense
  const handleAddExpense = async (expense) => {
    const {category, amount, date, icon} = expense;

    if(!category.trim()){
      toast.error("category is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount Should be valid number greater than 0.");
      return;
    }

    if(!date){
      toast.error("Date is required");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category, amount, date, icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added Successfully");
      fetchExpenseDetails();
    }catch (error){
      console.error(
        "Error adding Expense : ", error.response?.data?.message || error.message
      );
    }
  };

    //delete Expense
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({show: false, data: null});
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    }catch(error){
      console.error("Error deleting expense : ", error.response?.data?.message || error.message);
    }
  };

   //download expense details
  const handleDownloadExpenseDetails = async () => {};

    useEffect(() => {
      fetchExpenseDetails();
      return () => {};
    }, []);

  return (
    <DashboardLayout activeMenu = "Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            ></ExpenseOverview>
          </div>
          <ExpenseList
          transactions={expenseData}
          onDelete={(id) => {
            setOpenDeleteAlert({show : true, data: id});
          }}
          onDownload={handleDownloadExpenseDetails}
        />
        </div>
        <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense}/>

      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({show: false, data: null})}
        title="Delete Income"
      >
        <DeleteAlert 
        content="Are you sure you want to delete income?"
        onDelete={()=>deleteExpense(openDeleteAlert.data)}
        ></DeleteAlert>
      </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense