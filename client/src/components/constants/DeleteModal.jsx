import React from "react";

const DeleteModal = ({
  id,
  deleteItem,
  displayName,
  handleDelete,
  item,
}) => {
  return (
    <dialog id={`delete_modal_${id}`} className="modal">
      <div className="modal-box rounded-xl border border-[#E6E9EA] shadow-md">
        
        {/* Close Button */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent hover:bg-gray-200">
            ✕
          </button>
        </form>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#12202E]">
          {`Delete ${deleteItem}?`}
        </h3>

        {/* Message */}
        <p className="py-4 text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-medium text-red-600">{displayName}</span>?  
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => handleDelete(item)}
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
  );
};

export default DeleteModal;
