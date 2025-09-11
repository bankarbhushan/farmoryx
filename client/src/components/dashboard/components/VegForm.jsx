import React from 'react';
import Wrapper from '../../constants/Wrapper';

const VegForm = () => {
  return (
    <div className="">
      {/* Top Section */}
      <div className=" bg-white rounded-md shadow-sm p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="पट्टी"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="नगदी दिलेली रक्कम"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="इतर शेतकऱ्यांचे घेतलेला मालाचे एकूण पैसे"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="इतर शेतकऱ्यांचे घेतलेला मालाचे एकूण पैसे"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <Wrapper className=" border border-green-300 mt-4shadow-sm  bg-white">
        <div className='flex flex-col items-end' >
          <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Product Name or ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="weight"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Rate/kg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          </div>
        

          <button
            type="button"
            className="mt-2 w-fit px-5 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </div>
      </Wrapper>
    </div>
  );
};

export default VegForm;
