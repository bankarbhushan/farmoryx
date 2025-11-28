import React from 'react'

const FarmerModal = ({
  showForm,
  newFarmer,
  setNewFarmer,
  handleAddFarmer,
  handleUpdateFarmer,
  isEdit,
}) => {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box relative rounded-xl shadow-lg border border-[#E6E9EA] bg-white font-inter">
        {/* Close button */}
        <form method="dialog">
          <button className="absolute right-3 top-3 w-7 h-7 rounded-lg flex items-center justify-center bg-[#FF6B6B] text-white text-sm hover:bg-[#E53E3E] transition">
            ✕
          </button>
        </form>

        {/* Title */}
        <h2 className="text-xl font-semibold text-[#0B1220] mb-6 cursor-pointer">
          {isEdit ? 'Update Farmer' : 'Add New Farmer'}
        </h2>

        {showForm && (
          <div className="space-y-5">
            {/* Name */}
            <div className="flex items-center gap-4">
              <label className="text-sm w-1/3 font-medium text-[#4B5563]">Name</label>

              <input
                type="text"
                placeholder="Enter farmer name"
                value={newFarmer.name}
                onChange={(e) => setNewFarmer({...newFarmer, name: e.target.value})}
                className="px-3 py-2 border border-[#E6E9EA] rounded-lg w-full  text-[#0B1220] focus:ring-2 focus:ring-[#16C79A] focus:outline-none"
              />
            </div>

            {/* Village */}
            <div className="flex items-center gap-4">
              <label className="text-sm w-1/3 font-medium text-[#4B5563]">Village</label>

              <input
                type="text"
                placeholder="Enter village name"
                value={newFarmer.village}
                onChange={(e) => setNewFarmer({...newFarmer, village: e.target.value})}
                className="px-3 py-2 border border-[#E6E9EA] rounded-lg w-full  text-[#0B1220] focus:ring-2 focus:ring-[#16C79A] focus:outline-none"
              />
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-4">
              <label className="text-sm w-1/3 font-medium text-[#4B5563]">
                Mobile Number
              </label>

              <input
                type="number"
                placeholder="Enter mobile number"
                value={newFarmer.mobile}
                onChange={(e) => setNewFarmer({...newFarmer, mobile: e.target.value})}
                className="px-3 py-2 border border-[#E6E9EA] rounded-lg w-full text-[#0B1220] focus:ring-2 focus:ring-[#16C79A] focus:outline-none"
              />
            </div>

            {/* Save button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={isEdit ? handleUpdateFarmer : handleAddFarmer}
                className="px-6 py-2 rounded-lg bg-[#16C79A] text-white font-medium shadow hover:bg-[#11D18C] transition cursor-pointer cursor-pointer"
              >
                {isEdit ? 'Update Farmer' : 'Add Farmer'}
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  )
}

export default FarmerModal
