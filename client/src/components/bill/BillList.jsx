import React, { useState, useEffect } from "react";
import Wrapper from "../constants/Wrapper";
import Loader from "../constants/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import DeleteModal from "../constants/DeleteModal";
import NoDataCard from "../constants/NoDataCard"

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Toggle state — farmer / merchant bills
  const [billType, setBillType] = useState("farmer");

  const getBills = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/bill/feed?type=${billType}`
      );

      if (Array.isArray(res.data.data)) {
        setBills(res.data.data);
      } else {
        setBills([]);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg); 
      setBills([]);
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

  return (
    <div className="font-inter">
      {isLoading ? (
        <Loader />
      ) : (
        <Wrapper className="bg-[#FFFFFF] border border-[#E6E9EA] shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <div>
              <h1 className="text-2xl font-semibold text-[#12202E]">
                Bill List
              </h1>
              <p className="text-sm font-extralight text-[#94A3B8] mt-1">
                View all generated farmer & merchant bills.
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setBillType("farmer")}
                className={`px-4 py-2 rounded-md font-light shadow transition 
                ${billType === "farmer"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-300 text-gray-900"
                  }`}
              >
                Farmer Bills
              </button>

              <button
                onClick={() => setBillType("merchant")}
                className={`px-4 py-2 rounded-md font-light shadow transition 
                ${billType === "merchant"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-300 text-gray-900"
                  }`}
              >
                Merchant Bills
              </button>
            </div>
          </div>
          {
            bills.length=== 0 ? <NoDataCard message="Bill" /> : 
            (
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
                    {bills.map((bill, index) => (
                      <tr
                        key={bill._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 font-light">{index + 1}</td>
                        <td className="px-4 py-3 font-light">{bill.userName}</td>
                        <td className="px-4 py-3 font-light">{bill.userMobile}</td>
                        <td className="px-4 py-3 font-light">{bill.billDate}</td>
                        <td className="px-4 py-3 font-light">₹ {bill.netTotal}</td>

                        <td className="px-4 py-3 flex justify-center gap-3">
                          <button
                            className="px-3 py-1 rounded-md bg-[#17CF91] text-white text-sm shadow hover:bg-[#16C79A] transition"
                          >
                            View
                          </button>

                          <button
                            onClick={() => document.getElementById(`delete_modal_${bill._id}`).showModal()}
                            className="px-3 py-1 rounded-md bg-[#FF6B6B] text-white text-sm shadow hover:bg-[#E53E3E] transition"
                          >
                            Delete
                          </button>
                          <DeleteModal
                            id={bill._id}
                            deleteItem="Bill"
                            displayName={bill.userName}
                            item={bill}
                            handleDelete={()=>handleDeletebill(bill)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </Wrapper>
      )}
    </div>
  );
};

export default BillList;
