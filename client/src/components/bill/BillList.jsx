import React, { useState, useEffect } from "react";
import Wrapper from "../constants/Wrapper";
import Loader from "../constants/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import DeleteModal from "../constants/DeleteModal";
import NoDataCard from "../constants/NoDataCard"
import BillView from "./BillView";
import { useNavigate } from "react-router";

const BillList = () => {
  const [bills, setBills] = useState([]);
    const [filtereBills, setFilteredBills] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  // Toggle state — farmer / merchant bills
  const [billType, setBillType] = useState("farmer");

  const [findBill,setFindBill] = useState("")
    
  const handlesearch  = (e) =>{
    const value = e.target.value.toLowerCase();
    setFindBill(value);
    const filtered = bills.filter((f)=>{
      return  f.userName.toLowerCase().includes(value) || f.userMobile.includes(value)
    }
     
    )
      setFilteredBills(filtered);
  }


  const getBills = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/bill/feed?type=${billType}`
      );

      if (Array.isArray(res.data.data)) {
        setBills(res.data.data);
        setFilteredBills(res.data.data);
      } else {
        setBills([]);
        setFilteredBills([]);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg); 
      setBills([]);
      setFilteredBills([]);
    }
  };

  const handleDeletebill = async(bill) =>{
    try {
      await axios.delete(`http://localhost:3000/api/v1/bill/delete/${bill._id}`);
      toast.success("Bill deleted!");
      document.getElementById(`delete_modal_${bill._id}`).close();
      await getBills();
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);    }
  };
  


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getBills();
      setIsLoading(false);
    };
    fetchData();
  }, [billType]); 

  // const openModal = () => {
  //   document.getElementById(`delete_modal_${bill._id}`).showModal();
  // };

  // const closeModal = () => {
  //   document.getElementById(`delete_modal_${bill._id}`).close();
  // };

  return (
<div className="font-inter">
  {isLoading ? (
    <Loader />
  ):
    <Wrapper className="bg-[#FFFFFF] border border-[#E6E9EA] shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-semibold text-[#12202E]">Bill List</h1>
          <p className="text-sm font-extralight text-[#94A3B8] mt-1">
            View all generated farmer & merchant bills.
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setBillType("farmer")}
            className={`px-4 py-2 rounded-md font-light shadow transition ${
              billType === "farmer"
                ? "bg-gray-800 text-white"
                : "bg-gray-300 text-gray-900"
            }`}
          >
            Farmer Bills
          </button>

          <button
            onClick={() => setBillType("merchant")}
            className={`px-4 py-2 rounded-md font-light shadow transition ${
              billType === "merchant"
                ? "bg-gray-800 text-white"
                : "bg-gray-300 text-gray-900"
            }`}
          >
            Merchant Bills
          </button>
        </div>
      </div>
                  {/* search */}
            <div className="mt-5 mb-5 flex items-end justify-end">
              {/* <label htmlFor="" className="label mr-4">Search Farmer :  </label> */}
            <label className="input border-[#17CF91] focus-within:border-[#17CF91] focus-within:outline-none">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input  type="search" required placeholder="Search"
                 value={findBill} 
                  onChange={(e)=>handlesearch(e)} 
                  />
              </label>
          </div>

      {/* No Data */}
      {filtereBills.length === 0 ? (
        <NoDataCard message="Bill" />
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full">
            <thead className="bg-gray-200 text-[#12202E]">
              <tr>
                <th className="px-4 py-3 font-normal text-left">ID</th>
                <th className="px-4 py-3 font-normal text-left">User</th>
                <th className="px-4 py-3 font-normal text-left">Mobile</th>
                <th className="px-4 py-3 font-normal text-left">Date</th>
                <th className="px-4 py-3 font-normal text-left">Total</th>
                <th className="px-4 py-3 font-normal text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtereBills.map((bill, index) => (
                <tr key={bill._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-light">{index + 1}</td>
                  <td className="px-4 py-3 font-light">{bill.userName}</td>
                  <td className="px-4 py-3 font-light">{bill.userMobile}</td>
                  <td className="px-4 py-3 font-light">{bill.billDate}</td>
                  <td className="px-4 py-3 font-light">₹ {bill.netTotal}</td>

                  <td className="px-4 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => navigate(`/dashbord/billview/${bill._id}`)}
                    className="px-3 py-1 rounded-md bg-[#17CF91] text-white text-sm shadow hover:bg-[#16C79A] transition"
                  >
                    View
                  </button>
                    <button
                      onClick={() =>document.getElementById(`delete_modal_${bill._id}`).showModal()}
                      className="px-3 py-1 rounded-md bg-[#FF6B6B] text-white text-sm shadow hover:bg-[#E53E3E] transition"
                    >
                      Delete
                    </button>
                    <dialog
                            id={`delete_modal_${bill._id}`}
                            className="modal"
                          >
                            <div className="modal-box rounded-xl border border-[#E6E9EA] shadow-md">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent hover:bg-gray-200">
                                  ✕
                                </button>
                              </form>

                              <h3 className="text-lg font-semibold text-[#12202E]">
                                Delete Bill?
                              </h3>

                              <p className="py-4 text-sm text-gray-600">
                                Are you sure you want to delete{" "}
                                <span className="font-medium text-red-600">
                                  {bill.userName}
                                </span>
                                ? This action cannot be undone.
                              </p>

                              <div className="flex justify-end gap-3">
                                <button
                                  onClick={() => handleDeletebill(bill)}
                                  className="px-4 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-[#E53E3E] transition"
                                >
                                  Yes, Delete
                                </button>

                                <form method="dialog">
                                  <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
                                    Cancel
                                  </button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Wrapper>
  }
</div>

  );
};

export default BillList;
