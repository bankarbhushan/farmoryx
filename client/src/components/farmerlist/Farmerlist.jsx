import React, { useState, useEffect } from "react";
import Wrapper from "../constants/Wrapper";
import Loader from "../constants/Loader";
import FarmerModal from "./FarmerModal";
import toast from "react-hot-toast";
import axios from "axios";

const FarmerList = () => {
  const [farmers, setFarmers] = useState([]);
  const [newFarmer, setNewFarmer] = useState({ name: "", village: "", mobile: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editFarmer, setEditFarmer] = useState(null);


  const getFarmer = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/farmer/feed");

      if (Array.isArray(res.data.data)) {
        setFarmers(res.data.data);
      } else {
        setFarmers([]);
      }

    } catch (error) {
      console.error("Error fetching farmers:", error.message);
      setFarmers([]);
    }
  };

  const handleOpenUpdate = (farmer) => {
    setEditFarmer(farmer);
    setNewFarmer({
      name: farmer.name,
      village: farmer.village,
      mobile: farmer.mobile,
    });
    openModal();
  };

  const handleAddFarmer = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/farmer/reg",
        newFarmer
      );

      toast.success(res.data.message);
      await getFarmer();
      closeModal();
      setNewFarmer({ name: "", village: "", mobile: "" });
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  const handleUpdateFarmer = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/farmer/update/${editFarmer._id}`,
        newFarmer
      );

      toast.success(res.data.message);
      await getFarmer();
      closeModal();

      setEditFarmer(null);
      setNewFarmer({ name: "", village: "", mobile: "" });
    } catch (error) {
      const msg = error.response?.data?.message || "Update failed";
      toast.error(msg);
    }
  };

  const handleDeleteFarmer = async (farmer) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/farmer/delete/${farmer._id}`
      );

      toast.success(res.data.message);
     document.getElementById(`delete_modal_${farmer._id}`).close();
      await getFarmer();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const openModal = () => {
    setShowForm(true);
    document.getElementById("my_modal_3").showModal();
  };

  const closeModal = () => {
    setShowForm(false);
    document.getElementById("my_modal_3").close();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);   
      await getFarmer();    
      setIsLoading(false);  
    };
    fetchData();
  }, []);

  return (
  <div className="font-inter">
    {isLoading ? (
      <Loader />
    ) : (
      <Wrapper className="bg-[#FFFFFF] border border-[#E6E9EA] shadow-sm">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-semibold text-[#12202E]">Farmer List</h1>
            <p className="text-sm font-extralight text-[#94A3B8] mt-1">Manage and view details of all registered farmers in the network.</p>
          </div>
         

          <button
            onClick={() => {
              setEditFarmer(null);
              setNewFarmer({ name: "", village: "", mobile: "" });
              openModal();
            }}
            className="px-4 py-2 rounded-md bg-gray-700 text-white font-light shadow hover:bg-gray-800 transition"
          >
            + Add New Farmer
          </button>
        </div>

        {/* Modal */}
        <FarmerModal
          showForm={showForm}
          newFarmer={newFarmer}
          setNewFarmer={setNewFarmer}
          handleAddFarmer={handleAddFarmer}
          handleUpdateFarmer={handleUpdateFarmer}
          isEdit={!!editFarmer}
        />

        {/* Farmer Table */}
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full">
            <thead className="bg-gray-200 text-[#12202E]">
              <tr>
                <th className="px-4 py-3 font-normal text-left">ID</th>
                <th className="px-4 py-3 font-normal text-left">Name</th>
                <th className="px-4 py-3 font-normal text-left">Village</th>
                <th className="px-4 py-3 font-normal text-left">Mobile No</th>
                <th className="px-4 py-3 font-normal text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {farmers.map((farmer, index) => (
                <tr
                  key={index}
                  className={`
                    hover:bg-gray-50 transition
                  `}
                >
                  <td className="px-4 font-light py-3">{index + 1}</td>
                  <td className="px-4 font-light  py-3">{farmer.name}</td>
                  <td className="px-4 font-light  py-3">{farmer.village}</td>
                  <td className="px-4 font-light  py-3">{farmer.mobile}</td>

                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleOpenUpdate(farmer)}
                      className="px-3 py-1 rounded-md bg-[#17CF91] font-light  text-white text-sm shadow hover:bg-[#16C79A] transition cursor-pointer"
                    >
                      Update
                    </button>
                  <button
                    onClick={() => document.getElementById(`delete_modal_${farmer._id}`).showModal()}
                    className="px-3 py-1 rounded-md bg-[#FF6B6B] text-white text-sm font-light shadow hover:bg-[#E53E3E] transition cursor-pointer"
                  >
                    Delete
                  </button>

                  <dialog id={`delete_modal_${farmer._id}`} className="modal">
                    <div className="modal-box rounded-xl border border-[#E6E9EA] shadow-md">

                      {/* Close Button */}
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent hover:bg-gray-200">
                          ✕
                        </button>
                      </form>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-[#12202E]">Delete Farmer?</h3>

                      {/* Message */}
                      <p className="py-4 text-sm text-gray-600">
                        Are you sure you want to delete <span className="font-medium text-red-600">{farmer.name}</span>?  
                        This action cannot be undone.
                      </p>

                      {/* Buttons */}
                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          onClick={() => handleDeleteFarmer(farmer)}
                          className="px-4 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-[#E53E3E] transition font-medium"
                        >
                          Yes, Delete
                        </button>

                        <form method="dialog">
                          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition font-medium">
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

      </Wrapper>
    )}
  </div>
  );
};

export default FarmerList;
