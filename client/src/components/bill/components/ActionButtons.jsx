import React from 'react'

const ActionButtons = () => {
  return (
        <div className="flex justify-end gap-4 mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                WhatsApp ने पाठवा
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                प्रिंट करा
            </button>
        </div>
  )
}

export default ActionButtons