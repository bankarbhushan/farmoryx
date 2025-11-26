import React, { useEffect, useState } from "react";
import Wrapper from "../constants/Wrapper";
import Loader from "../constants/Loader";
import Vegmodal from "./Vegmodal";
import axios from "axios";
import toast from "react-hot-toast";
import NoDataCard from "../constants/NoDataCard";

const Veglist = () => {
  const [vegs, setVegs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editVeg, setEditVeg] = useState(null);

  const [newVeg, setNewVeg] = useState({
    marathiName: "",
    hinglishName: "",
    englishName: ""
  });

  const getVeg = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/veg/feed");
      setVegs(res.data.data);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);    
    }
  };

  useEffect(() => {
    (async () => {
      await getVeg();
      setIsLoading(false);
    })();
  }, []);

  const openModal = () => {
    setShowForm(true);
    document.getElementById("veg_modal").showModal();
  };

  const closeModal = () => {
    setShowForm(false);
    document.getElementById("veg_modal").close();
  };

  const handleAddVeg = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/veg/add",
        newVeg
      );

      toast.success(res.data.message);
      await getVeg();
      closeModal();
      setNewVeg({ marathiName: "", hinglishName: "", englishName: "" });
} catch (error) {
  console.log("ERROR:", error);

  const msg =
    error.response?.data?.message ||   // APIError 
    error.response?.data?.errors?.[0] || // Mongoose multiple errors (if any)
    error.message || // JavaScript error
    "Something went wrong";

  toast.error(msg);
}
  }

  const handleOpenUpdate = (veg) => {
    setEditVeg(veg);
    setNewVeg({
      marathiName: veg.marathiName,
      hinglishName: veg.hinglishName,
      englishName: veg.englishName
    });
    openModal();
  };

  const handleUpdateVeg = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/veg/update/${editVeg._id}`,
        newVeg
      );

      toast.success(res.data.message);
      await getVeg();
      closeModal();
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  const handleDeleteVeg = async (veg) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/veg/delete/${veg._id}`);
      toast.success("Vegetable deleted!");
      document.getElementById(`delete_modal_${veg._id}`).close();
      await getVeg();
    } catch(error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);    }
  };

  return (
    <div className="font-inter">
      {isLoading ? (
        <Loader />
      ) : (
        <Wrapper className="bg-[#FFFFFF] border border-[#E6E9EA] shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h1 className="text-2xl font-semibold text-[#12202E]">Vegetable List</h1>
              <p className="text-sm text-[#94A3B8] font-light mt-1">Manage all vegetables in the system.</p>
            </div>

            <button
              onClick={() => {
                setEditVeg(null);
                setNewVeg({ marathiName: "", hinglishName: "", englishName: "" });
                openModal();
              }}
              className="px-4 py-2 rounded-md bg-gray-700 text-white font-light shadow hover:bg-gray-800 transition cursor-pointer"
            >
              + Add Vegetable
            </button>
          </div>

          <Vegmodal
            showForm={showForm}
            newVeg={newVeg}
            setNewVeg={setNewVeg}
            handleAddVeg={handleAddVeg}
            handleUpdateVeg={handleUpdateVeg}
            isEdit={!!editVeg}
          />

          {
            vegs.length===0 ? <NoDataCard message="Vegetables"/>
            :
            (
              <div className="overflow-x-auto rounded-md">
                <table className="min-w-full">
                  <thead className="bg-gray-200 text-[#12202E]">
                    <tr>
                      <th className="px-4 py-3 text-left font-normal">Marathi</th>
                      <th className="px-4 py-3 text-left font-normal">Hinglish</th>
                      <th className="px-4 py-3 text-left font-normal">English</th>
                      <th className="px-4 py-3 text-center font-normal">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {vegs.map((veg) => (
                      <tr key={veg._id} className="hover:bg-gray-50 transition">
                        <td className="px-4 font-light py-3">{veg.marathiName}</td>
                        <td className="px-4 font-light py-3">{veg.hinglishName}</td>
                        <td className="px-4 font-light py-3">{veg.englishName}</td>

                        <td className="px-4 py-3 flex justify-center gap-3">
                          <button
                            onClick={() => handleOpenUpdate(veg)}
                            className="px-3 py-1 rounded-md bg-[#17CF91] text-white text-sm shadow hover:bg-[#16C79A] transition cursor-pointer"
                          >
                            Update
                          </button>
                      <button
                        onClick={() => document.getElementById(`delete_modal_${veg._id}`).showModal()}
                        className="px-3 py-1 rounded-md bg-[#FF6B6B] text-white text-sm font-light shadow hover:bg-[#E53E3E] transition cursor-pointer"
                      >
                        Delete
                      </button>

                      <dialog id={`delete_modal_${veg._id}`} className="modal">
                        <div className="modal-box rounded-xl border border-[#E6E9EA] shadow-md">

                          {/* Close Button */}
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent hover:bg-gray-200">
                              ✕
                            </button>
                          </form>

                          {/* Title */}
                          <h3 className="text-lg font-semibold text-[#12202E]">Delete Veg?</h3>

                          {/* Message */}
                          <p className="py-4 text-sm text-gray-600">
                            Are you sure you want to delete <span className="font-medium text-red-600">{veg.marathiName}</span>?  
                            This action cannot be undone.
                          </p>

                          {/* Buttons */}
                          <div className="flex justify-end gap-3 mt-4">
                            <button
                              onClick={() => handleDeleteVeg(veg)}
                              className="px-4 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-[#E53E3E] transition font-medium cursor-pointer"
                            >
                              Yes, Delete
                            </button>

                            <form method="dialog">
                              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition font-medium cursor-pointer">
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

export default Veglist;
