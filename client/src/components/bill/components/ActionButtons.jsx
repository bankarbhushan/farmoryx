import React, { useState } from "react";
import axios from "axios";
import { useBill } from "../context/BillContext";
import toast from "react-hot-toast";
import Loader from "../../constants/Loader";


const ActionButtons = () => {
  const { generalInfo, products ,setCalulation } =  useBill();
  const userType = generalInfo.userType;
  const [isActionActive, setActionActive] = useState(false);
  const [loading, setLoading] = useState(false);


  const totalAmount = products.reduce((acc, p) => {
    return acc + Number(p.weight) * Number(p.rate);
  }, 0);
  const commissionAmount = userType === "farmer" ? (totalAmount * 8) / 100 : 0;
  const pattiCharges = Number(generalInfo.pattiCharges || 0);
  const advancePaid = Number(generalInfo.advancePaid || 0);
  const externalVegCost = Number(generalInfo.externalVegCost || 0);
  const netTotal = Number(totalAmount - (commissionAmount + pattiCharges + advancePaid + externalVegCost));


  // Function to handle SAVE button
  const handleSave = async () => {
    if (!generalInfo.userType || products.length === 0) {
      toast.error("Please fill all data.");
      return;
    }
    setLoading(true);
    const calData = {
      totalAmount,
      commissionAmount,
      pattiCharges,
      advancePaid,
      externalVegCost,
      netTotal,
    };

    setCalulation(calData);

    const payload = {
      generalInfo,
      products,
      calculation: calData
    };

    console.log("PayLoad ==>" , payload)

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/bill/createbill",
        { bill: payload }
      );
      console.log("Bill saved:", res.data);
      setActionActive(true);
       toast.success(res.data.message || "Bill Saved Successfully!");
       setLoading(false)
    } catch (err) {
      console.error("Error:", err);
      toast.error("Fail to Bill Saved Successfully!");
    }
  };

  // Function to handle WhatsApp message
const handleSendWhatsApp = () => {
  let message = `*माऊली भाजी भांडार बिल* \n\n`;

  message += `*नाव:* ${generalInfo.userName}\n`;
  message += `*फोन नंबर:* ${generalInfo.userMobile}\n`;
  message += `*मालक नाव:* ${generalInfo.broker_id}\n`;
  message += `*दिनांक:* ${generalInfo.billDate || new Date().toLocaleDateString()}\n`;
  message += `*वार:* ${generalInfo.weekday}\n\n`;

  message += `*भाज्यांची यादी:*\n`;

  products.forEach((p, index) => {
    const total = Number(p.weight) * Number(p.rate);
    message += `${index + 1}. ${p.productName} - ${p.weight}kg × ₹${p.rate} = ₹${total}\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━\n`;
  message += `*एकूण रक्कम:* ₹${totalAmount}\n`;
  message += `*कमिशन (8%):* ₹${commissionAmount}\n`;
  message += `*पट्टी (-):* ₹${pattiCharges}\n`;
  message += `*नगदी दिलेली रक्कम (-):* ₹${advancePaid}\n`;
  message += `*इतर शेतकऱ्यांचा माल (-):* ₹${externalVegCost}\n`;
  message += `━━━━━━━━━━━━━━━━━━━\n`;
  message += `\n*अंतिम रक्कम:* ₹${netTotal}\n`;
  message += `━━━━━━━━━━━━━━━━━━━\n\n*धन्यवाद!*`;

  const encodedMsg = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/${generalInfo.userMobile}?text=${encodedMsg}`;

  window.open(whatsappUrl, "_blank");
};


  return (
    loading ? (<Loader />) : (
      <div className="flex  flex-col md:flex-row justify-end gap-4 mt-6">
      {isActionActive ? (
        <>
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="bg-green-600 cursor-pointer w-full md:w-fit hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            WhatsApp ने पाठवा
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
    )
  );
};

export default ActionButtons;
