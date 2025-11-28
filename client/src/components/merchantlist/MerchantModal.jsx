import React from 'react'

const MerchantModal = ({
  showForm,
  newMerchant,
  setNewMerchant,
  handleAddMerchant,
  handleUpdateMerchant,
  isEdit,
}) => {
  return (
    <dialog id="merchant_modal" className="modal">
      <div className="modal-box relative rounded-xl shadow-lg border border-[#E6E9EA] bg-white font-inter">
        {/* Close button */}
        <form method="dialog">
          <button className="absolute right-3 top-3 w-7 h-7 rounded-lg flex items-center justify-center bg-[#FF6B6B] text-white text-sm hover:bg-[#E53E3E] transition">
            ✕
          </button>
        </form>

        {/* Title */}
        <h2 className="text-xl font-semibold text-[#0B1220] mb-6 cursor-pointer">
          {isEdit ? 'Update Merchant' : 'Add New Merchant'}
        </h2>

        {showForm && (
          <div className="space-y-5">
            {/* Name */}
            <div className="flex items-center gap-4">
              <label className="text-sm w-1/3 font-medium text-[#4B5563]">Name</label>

              <input
                type="text"
                placeholder="Enter merchant name"
                value={newMerchant.name}
                onChange={(e) => setNewMerchant({...newMerchant, name: e.target.value})}
                className="px-3 py-2 border border-[#E6E9EA] rounded-lg w-full text-[#0B1220] focus:ring-2 focus:ring-[#16C79A] focus:outline-none"
              />
            </div>

            {/* Village */}
            <div className="flex items-center gap-4">
              <label className="text-sm w-1/3 font-medium text-[#4B5563]">Village</label>

              <input
                type="text"
                placeholder="Enter village name"
                value={newMerchant.village}
                onChange={(e) =>
                  setNewMerchant({...newMerchant, village: e.target.value})
                }
                className="px-3 py-2 border border-[#E6E9EA] rounded-lg w-full text-[#0B1220] focus:ring-2 focus:ring-[#16C79A] focus:outline-none"
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
                value={newMerchant.mobile}
                onChange={(e) => setNewMerchant({...newMerchant, mobile: e.target.value})}
                className="px-3 py-2 border border-[#E6E9EA] rounded-lg w-full text-[#0B1220] focus:ring-2 focus:ring-[#16C79A] focus:outline-none"
              />
            </div>

            {/* Business Name */}
            <div className="flex items-center gap-4">
              <label className="text-sm w-1/3 font-medium text-[#4B5563]">
                Business Name
              </label>

              <input
                type="text"
                placeholder="Enter business name"
                value={newMerchant.businessName}
                onChange={(e) =>
                  setNewMerchant({...newMerchant, businessName: e.target.value})
                }
                className="px-3 py-2 border border-[#E6E9EA] rounded-lg w-full text-[#0B1220] focus:ring-2 focus:ring-[#16C79A] focus:outline-none"
              />
            </div>

            {/* Save button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={isEdit ? handleUpdateMerchant : handleAddMerchant}
                className="px-6 py-2 rounded-lg bg-[#16C79A] text-white font-medium shadow hover:bg-[#11D18C] transition cursor-pointer"
              >
                {isEdit ? 'Update Merchant' : 'Add Merchant'}
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  )
}

export default MerchantModal
