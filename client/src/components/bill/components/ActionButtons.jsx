import React, { useState } from 'react';

const ActionButtons = () => {
  const [isActionActive, setActionActive] = useState(false);

  const handleSave = async () => {
    // Perform save logic here (e.g., API call)
    // After successful save, show next action buttons
    setActionActive(true);
  };

  return (
    <div className="flex flex-col md:flex-row justify-end gap-4 mt-6">
      {isActionActive ? (
        <>
          <button
            type="button"
            className="bg-green-600 w-full cursor-pointer md:w-fit hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            WhatsApp ने पाठवा
          </button>

          <button
            type="button"
            className="bg-amber-500 w-full cursor-pointer md:w-fit hover:bg-amber-600 text-white px-4 py-2 rounded-md"
          >
            प्रिंट करा
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={handleSave}
          className="bg-green-600 w-full cursor-pointer md:w-fit hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Save Bill
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
