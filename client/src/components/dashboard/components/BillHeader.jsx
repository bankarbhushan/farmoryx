import React from 'react'

const BillHeader = () => {
  return (
    <div> 
        <div className="text-center">
            <h1 className="text-xl font-bold text-green-700">
              🌿 माऊली भाजी भांडार, साकोली 🌿
            </h1>
        </div>
        <div className="flex justify-between items-start mt-4 border-b pb-4 mb-4">
          <div>
            <p className="flex items-center gap-2"> 
              <span role="img" aria-label="merchant"></span> व्यापारी नाव: <span className="font-semibold">____</span>
            </p>
            <p className="flex items-center gap-2">
              <span role="img" aria-label="phone"></span> फोन नंबर: <span className="font-semibold">____</span>
            </p>
            <p className="flex items-center gap-2 mt-2">
              <span role="img" aria-label="farmer"></span> मालक नाव: <span className="font-semibold">योगेश गोटेफोडे</span>
            </p>
            <p className="flex items-center gap-2">
              <span role="img" aria-label="phone"></span> फोन नंबर: <span className="font-semibold">९९९९९९९९९९</span>
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="flex items-center gap-2 justify-end">
              दिनांक: 2025-09-11
            </p>
            <p className="flex items-center gap-2 justify-end">
              वार: गुरुवार
            </p>
          </div>
        </div>
    </div>
  )
}

export default BillHeader