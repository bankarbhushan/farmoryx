import React, { useState } from 'react';
import Wrapper from '../../constants/Wrapper';
import { useBill } from "../context/BillContext"

const VegForm = () => {

  // we are geeting the data from the use context hook 
  const { addProduct } = useBill(); 

  const [formData, setFormData] = useState({
    productName: '',
    weight: '',
    rate: ''
  });

  // set the single product data .
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!formData.productName || !formData.weight || !formData.rate) {
      alert('Please fill all fields!');
      return;
    }

    // set the produts data into the use context.
    // set the product as and array of the object 
    addProduct(formData);

    // here we reset the product for the adding new product details
    setFormData({ productName: '', weight: '', rate: '' });
  };

  return (
    <Wrapper className="border border-green-300 mt-4 shadow-sm bg-white">
      <h3 className="m-4 text-emerald-600 font-semibold">Add Veg</h3>

      <form onSubmit={handleAddProduct} className="flex flex-col items-end">
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <input
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            type="text"
            placeholder="Enter Product Name or ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            type="number"
            placeholder="Weight"
            className="w-full input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            type="number"
            placeholder="Rate/kg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2.5 w-full md:w-fit px-5 py-2 cursor-pointer rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </Wrapper>
  );
};

export default VegForm;
