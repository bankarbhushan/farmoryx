import React, { useState, useEffect } from "react";
import Wrapper from "../constants/Wrapper";
import Loader from "../constants/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import MerchantModal from "./MerchantModal";
import NoDataCard from "../constants/NoDataCard";

const MerchantList = () => {
  const [merchants, setMerchants] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  
  const [newMerchant, setNewMerchant] = useState({
    name: "",
    village: "",
    mobile: "",
    businessName: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMerchant, setEditMerchant] = useState(null);

  const [findMerchant,setFindMerchant] = useState("")

  const handlesearch = (e) =>{
    const value = e.target.value.toLowerCase();
    setFindMerchant(value);
    const filtered = merchants.filter((f) =>
      f.name.toLowerCase().includes(value)
    );
    setFilteredMerchants(filtered);
}
  // Fetch merchants
  const getMerchants = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/merchant/feed");

      if ((res.data.data)) {
        setMerchants(res.data.data);
        setFilteredMerchants(res.data.data);
      } else {
        setMerchants([]);
        setFilteredMerchants([]);
      }
    } catch (error) {
      console.error("Error fetching merchants:", error.message);
      setMerchants([]);
      setFilteredMerchants([]);
    }
  };

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await getMerchants();
      setIsLoading(false);
    };
    load();
  }, []);

  // Open Update Modal
  const handleOpenUpdate = (merchant) => {
    setEditMerchant(merchant);

    setNewMerchant({
      name: merchant.name,
      village: merchant.village,
      mobile: merchant.mobile,
      businessName: merchant.businessName
    });

    openModal();
  };

  // Create Merchant
  const handleAddMerchant = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/merchant/reg",
        newMerchant
      );

      toast.success(res.data.message);
      await getMerchants();
      closeModal();

      setNewMerchant({ name: "", village: "", mobile: "", businessName: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Update Merchant
  const handleUpdateMerchant = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/merchant/update/${editMerchant._id}`,
        newMerchant
      );

      toast.success(res.data.message);
      await getMerchants();
      closeModal();

      setEditMerchant(null);
      setNewMerchant({ name: "", village: "", mobile: "", businessName: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // Delete Merchant
  const handleDeleteMerchant = async (merchant) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/merchant/delete/${merchant._id}`
      );

      toast.success(res.data.message);
      document.getElementById(`delete_modal_${merchant._id}`).close();
      await getMerchants();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  // Open Modal
  const openModal = () => {
    setShowForm(true);
    document.getElementById("merchant_modal").showModal();
  };

  const closeModal = () => {
    setShowForm(false);
    document.getElementById("merchant_modal").close();
  };

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
                Merchant List
              </h1>
              <p className="text-sm font-extralight text-[#94A3B8] mt-1">
                View and manage all merchants associated with the network.
              </p>
            </div>

            <button
              onClick={() => {
                setEditMerchant(null);
                setNewMerchant({
                  name: "",
                  village: "",
                  mobile: "",
                  businessName: ""
                });
                openModal();
              }}
              className="px-4 py-2 rounded-md bg-gray-700 text-white font-light shadow hover:bg-gray-800 transition"
            >
              + Add New Merchant
            </button>
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
                 value={findMerchant} 
                  onChange={(e)=>handlesearch(e)} 
                  />
              </label>
          </div>

          {/* Modal */}
          <MerchantModal
            showForm={showForm}
            newMerchant={newMerchant}
            setNewMerchant={setNewMerchant}
            handleAddMerchant={handleAddMerchant}
            handleUpdateMerchant={handleUpdateMerchant}
            isEdit={!!editMerchant}
          />

          {/* Table */}
          {
            filteredMerchants.length===0 ? <NoDataCard message="Merchants"/> :
            (
              <div className="overflow-x-auto rounded-md">
                <table className="min-w-full">
                  <thead className="bg-gray-200 text-[#12202E]">
                    <tr>
                      <th className="px-4 py-3 font-normal text-left">ID</th>
                      <th className="px-4 py-3 font-normal text-left">Name</th>
                      <th className="px-4 py-3 font-normal text-left">Village</th>
                      <th className="px-4 py-3 font-normal text-left">Mobile</th>
                      <th className="px-4 py-3 font-normal text-left">Business Name</th>
                      <th className="px-4 py-3 font-normal text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredMerchants.slice().sort((a,b)=>a.name.localeCompare(b.name))?.map((merchant, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-light">{index + 1}</td>
                        <td className="px-4 py-3 font-light">{merchant.name}</td>
                        <td className="px-4 py-3 font-light">{merchant.village}</td>
                        <td className="px-4 py-3 font-light">{merchant.mobile}</td>
                        <td className="px-4 py-3 font-light">
                          {merchant.businessName}
                        </td>

                        <td className="px-4 py-3 flex justify-center gap-3">
                          <button
                            onClick={() => handleOpenUpdate(merchant)}
                            className="px-3 py-1 rounded-md bg-[#17CF91] text-white text-sm shadow hover:bg-[#16C79A] transition"
                          >
                            Update
                          </button>

                          <button
                            onClick={() =>
                              document
                                .getElementById(`delete_modal_${merchant._id}`)
                                .showModal()
                            }
                            className="px-3 py-1 rounded-md bg-[#FF6B6B] text-white text-sm shadow hover:bg-[#E53E3E] transition"
                          >
                            Delete
                          </button>

                          {/* Delete Modal */}
                          <dialog
                            id={`delete_modal_${merchant._id}`}
                            className="modal"
                          >
                            <div className="modal-box rounded-xl border border-[#E6E9EA] shadow-md">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent hover:bg-gray-200">
                                  ✕
                                </button>
                              </form>

                              <h3 className="text-lg font-semibold text-[#12202E]">
                                Delete Merchant?
                              </h3>

                              <p className="py-4 text-sm text-gray-600">
                                Are you sure you want to delete{" "}
                                <span className="font-medium text-red-600">
                                  {merchant.name}
                                </span>
                                ? This action cannot be undone.
                              </p>

                              <div className="flex justify-end gap-3">
                                <button
                                  onClick={() => handleDeleteMerchant(merchant)}
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
            )
          }

        </Wrapper>
      )}
    </div>
  );
};

export default MerchantList;
