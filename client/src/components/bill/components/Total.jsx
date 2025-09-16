import React from 'react'

const Total = () => {
  return (
    <div>
        <div className="text-right mt-6 space-y-1">
          <p>एकूण (वजन * दर): <span className="font-semibold">₹408</span></p>
          <p>एकूण कमिशन (8%): <span className="font-semibold">₹0</span></p>
          <p>एकूण: <span className="font-semibold">₹408</span></p>
          <p>पट्टी (-): <span className="font-semibold">₹10</span></p>
          <p>नगदी दिलेली रक्कम (-): <span className="font-semibold">₹0</span></p>
          <p>इतर शेतकऱ्यांचे घेतलेला मालाचे एकूण पैसे (-): <span className="font-semibold">₹0</span></p>
          <p className="text-lg font-bold text-red-700 mt-9">
            अंतिम रक्कम: ₹398
          </p>
        </div>
    </div>
  )
}

export default Total