import React from "react";

const Vegmodal = ({
  showForm,
  newVeg,
  setNewVeg,
  handleAddVeg,
  handleUpdateVeg,
  isEdit
}) => {
  return (
    <dialog id="veg_modal" className="modal">
      <div className="modal-box rounded-xl border border-[#E6E9EA] shadow-md">

        <form method="dialog">
          <button className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-gray-200">✕</button>
        </form>

        <h2 className="text-xl font-semibold text-[#12202E] mb-6">
          {isEdit ? "Update Vegetable" : "Add New Vegetable"}
        </h2>

        {showForm && (
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Marathi Name"
              value={newVeg.marathiName}
              onChange={(e) => setNewVeg({ ...newVeg, marathiName: e.target.value })}
              className="input input-accent w-full"
            />

            <input
              type="text"
              placeholder="Hinglish Name"
              value={newVeg.hinglishName}
              onChange={(e) => setNewVeg({ ...newVeg, hinglishName: e.target.value })}
              className="input input-accent w-full"
            />

            <input
              type="text"
              placeholder="English Name"
              value={newVeg.englishName}
              onChange={(e) => setNewVeg({ ...newVeg, englishName: e.target.value })}
              className="input input-accent w-full"
            />

            <div className="flex justify-end pt-2">
              <button
                onClick={isEdit ? handleUpdateVeg : handleAddVeg}
                className="px-4 py-2 bg-[#16C79A] text-white rounded-md hover:bg-[#11D18C] transition"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default Vegmodal;
