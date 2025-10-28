import React, { useState } from "react";
import { useBill } from "../context/BillContext"; // ✅ Import context hook

const InfoForm = () => {
  const { addGeneralInfo } = useBill(); // ✅ Access addGeneralInfo from context

  const [formData, setFormData] = useState({
    user: "",
    date: "",
    day : "",
    name: "",
    mobile: "",
    patti: "",
    advancePaid: 0,
    externalVegCost: 0,
  });


const onChange = (e) => {
  const { name, value } = e.target;

  if ((name === "advancePaid" || name === "externalVegCost") && value < 0) {
    setFormData({ ...formData, [name]: 0 });
    return;
  }

  if (name === "date") {
    const date = new Date(value);
    // converting the date into marathi caleneder then extrating the day name
    const dayName = date.toLocaleDateString("mr-IN", { weekday: "long" }); 
    setFormData({ ...formData, [name]: value, day: dayName });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to BillContext
    addGeneralInfo(formData);
    console.log("Added General Info:", formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {/* Who is Bill User */}
        <select
          name="user"
          value={formData.user}
          onChange={onChange}
          className="select select-accent"
          required
        >
          <option value="" disabled>Who is Bill User?</option>
          <option value="farmer">शेतकरी</option>
          <option value="merchant">व्यापारी</option>
        </select>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Enter User Name"
          className="input"
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={onChange}
          className="input"
        />

        {/* Mobile */}
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={onChange}
          placeholder="Enter mobile number"
          className="input"
        />

        <div className="bg-white rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            {/* Patti */}
            <select
              name="patti"
              value={formData.patti}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>Patti</option>
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>

            {/* Advance Paid */}
            <input
              type="number"
              name="advancePaid"
              value={formData.advancePaid}
              onChange={onChange}
              min="0" 
              placeholder="नगदी दिलेली रक्कम"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* External Veg Cost */}
          <div className="flex flex-col gap-3">
            <input
              type="number"
              name="externalVegCost"
              value={formData.externalVegCost}
              onChange={onChange}
              min="0" 
              placeholder="इतर शेतकऱ्यांचे घेतलेला मालाचे एकूण पैसे"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2.5 w-full md:w-fit px-5 py-2 cursor-pointer rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Add Details
        </button>
      </form>
    </div>
  );
};

export default InfoForm;
