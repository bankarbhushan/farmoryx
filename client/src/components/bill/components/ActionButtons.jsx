import React, { useState } from "react";
import axios from "axios";
import { useBill } from "../context/BillContext";

const ActionButtons = () => {
  const [isActionActive, setActionActive] = useState(false);
  const { billData, setCalulation } = useBill();

  const handleSave = async () => {
    if (!billData.generalInfo.user || billData.products.length === 0) {
      alert("कृपया सर्व माहिती पूर्ण भरा (User आणि Products)");
      return;
    }

    const { generalInfo, products } = billData;
    const user = generalInfo.user;

    // 🧮 Perform all calculations here
    const totalAmount = products.reduce(
      (acc, p) => acc + p.weight * p.rate,
      0
    );

    const commission = user === "farmer" ? (totalAmount * 8) / 100 : 0;
    const subTotal = totalAmount - commission;
    const patti = Number(generalInfo.patti || 0);
    const advancePaid = Number(generalInfo.advancePaid || 0);
    const externalVegCost = Number(generalInfo.externalVegCost || 0);
    const totalDeductions =
      commission + patti + advancePaid + externalVegCost;
    const finalAmount = totalAmount - totalDeductions;

    // 💾 Save all calculations to context
    const calData = {
      totalAmount,
      commission,
      subTotal,
      patti,
      advancePaid,
      externalVegCost,
      totalDeductions,
      finalAmount,
    };

    setCalulation(calData);

    // 📦 Prepare final payload
    const payload = {
      ...billData,
      calculation: calData,
    };
console.log("payload ==>",payload)
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/bill/createbill", {bill:
        payload}
      );

      console.log("✅ Bill saved successfully:", res.data);
      setActionActive(true);
    } catch (err) {
      console.error("❌ Error saving bill:", err);
      alert("बिल सेव्ह करताना काही त्रुटी आली!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-end gap-4 mt-6">
      {isActionActive ? (
        <>
          <button
            type="button"
            className="bg-green-600 w-full md:w-fit hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            WhatsApp ने पाठवा
          </button>

          <button
            type="button"
            className="bg-amber-500 w-full md:w-fit hover:bg-amber-600 text-white px-4 py-2 rounded-md"
          >
            प्रिंट करा
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={handleSave}
          className="bg-green-600 w-full md:w-fit hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Save Bill
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
