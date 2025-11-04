import React, { useState } from "react";
import axios from "axios";
import { useBill } from "../context/BillContext";

const ActionButtons = () => {
  const { billData, setCalulation } = useBill();
  const { generalInfo, products } = billData;
  console.log("product" ,products)
  const user = generalInfo.user;
  const phoneNumber = generalInfo.mobile;
  const [isActionActive, setActionActive] = useState(true);
  console.log(billData);

    // ✅ Perform all calculations
    const totalAmount = products.reduce((acc, p) => acc + p.weight * p.rate, 0);
    const commission = user === "farmer" ? (totalAmount * 8) / 100 : 0;
    const subTotal = totalAmount - commission;
    const patti = Number(generalInfo.patti || 0);
    const advancePaid = Number(generalInfo.advancePaid || 0);
    const externalVegCost = Number(generalInfo.externalVegCost || 0);
    const totalDeductions =
    commission + patti + advancePaid + externalVegCost;
    const finalAmount = totalAmount - totalDeductions; 



  // const totalAmount = products.reduce((acc, p) => acc + p.weight * p.rate, 0);
  // const commission = user === "farmer" ? (totalAmount * 8) / 100 : 0;
  // const subTotal = totalAmount - commission;
  // const patti = Number(generalInfo.patti || 0);
  // const advancePaid = Number(generalInfo.advancePaid || 0);
  // const externalVegCost = Number(generalInfo.externalVegCost || 0);
  // const totalDeductions = commission + patti + advancePaid + externalVegCost;
  // const finalAmount = totalAmount - totalDeductions;

  // 🟢 Function to handle SAVE button
  const handleSave = async () => {
    if (!billData.generalInfo.user || billData.products.length === 0) {
      alert("कृपया सर्व माहिती पूर्ण भरा (User आणि Products)");
      return;
    }

    // 💾 Save calculations in context
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

    // 📦 Final payload
    const payload = { ...billData, calculation: calData };
    console.log("payload ==>", payload);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/bill/createbill",
        { bill: payload }
      );
      console.log("✅ Bill saved successfully:", res.data);
      setActionActive(true);
    } catch (err) {
      console.error("❌ Error saving bill:", err);
      alert("बिल सेव्ह करताना काही त्रुटी आली!");
    }
  };

  // 🟢 Function to handle WhatsApp message
  const handleSendWhatsApp = () => {
    if (!billData.generalInfo.user || billData.products.length === 0) {
      alert("कृपया सर्व माहिती पूर्ण भरा (User आणि Products)");
      return;
    }

    const { generalInfo, products, calculation } = billData;

  let message = `*माऊली भाजी भांडार बिल* \n\n`;

  message += ` *नाव:* ${generalInfo.name}\n`;
  message += `*फोन नंबर:* ${generalInfo.mobile}\n`;
  message += ` *मालक नाव:* ${generalInfo.broker_id}\n`;
  message += `*दिनांक:* ${generalInfo.date || new Date().toLocaleDateString()}\n`;
  message += `*वार:* ${generalInfo.day}\n\n`;

  message += `*भाज्यांची यादी:*\n`;
  products.forEach((p, index) => {
    message += `${index + 1}. ${p.productName} - ${p.weight}kg × ₹${p.rate} = ₹${(
      p.weight * p.rate
    ).toFixed(0)}\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━\n`;
  message += `*एकूण रक्कम:* ₹${totalAmount.toFixed(0)}\n`;
  message += `*कमिशन (8%):* ₹${commission.toFixed(0)}\n`;
  message += `*एकूण:* ₹${subTotal.toFixed(0)}\n`;
  message += `*पट्टी (-):* ₹${patti.toFixed(0)}\n`;
  message += `*नगदी दिलेली रक्कम (-):* ₹${advancePaid.toFixed(0)}\n`;
  message += `*इतर शेतकऱ्यांचा माल (-):* ₹${externalVegCost.toFixed(0)}\n`;
  message += `━━━━━━━━━━━━━━━━━━━\n`;
  message += `\n*अंतिम रक्कम:* ₹${finalAmount.toFixed(0)}\n`;
  message += `━━━━━━━━━━━━━━━━━━━\n\n*धन्यवाद!* `;

    // ✅ Encode message for URL
    const encodedMsg = encodeURIComponent(message);

    // 🔗 Create WhatsApp link (you can set broker/farmer number here)
    // const phoneNumber = "91xxxxxxxxxx"; // replace with actual number
    const whatsappUrl = `https://wa.me/${generalInfo.mobile}?text=${encodedMsg}`;

    // Open in new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row justify-end gap-4 mt-6">
      {isActionActive ? (
        <>
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="bg-green-600 cursor-pointer w-full md:w-fit hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            WhatsApp ने पाठवा
          </button>

          <button
            type="button"
            className="bg-amber-500 cursor-pointer w-full md:w-fit hover:bg-amber-600 text-white px-4 py-2 rounded-md"
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
