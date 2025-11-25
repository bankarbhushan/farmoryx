import React, { useRef } from "react";
import { useBill } from "../context/BillContext";
import ActionButtons from "./ActionButtons"

const Bill = () => {
  const { products, generalInfo, setFormData, setEditIndex } = useBill();
  const printRef = useRef();

  const userType = generalInfo.userType;
  const totalAmount = products.reduce((acc, p) => {
    return acc + Number(p.weight) * Number(p.rate);
  }, 0);
  const commission = userType === "farmer" ? (totalAmount * 8) / 100 : 0;
  const pattiCharges = Number(generalInfo.pattiCharges || 0);
  const advancePaid = Number(generalInfo.advancePaid || 0);
  const externalVegCost = Number(generalInfo.externalVegCost || 0);
  const netTotal = Number(totalAmount - (commission + pattiCharges + advancePaid + externalVegCost));

  const handleEdit = (index, product) => {
    setFormData(product);
    setEditIndex(index);
  };

  // 🖨 Print only the bill section
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
      // window.location.reload();
  };

  const BillContent = () => (
    <div className=" w-full border-2 p-4  bg-white text-sm">
      <div className="text-center mb-3">
        <h1 className="font-bold text-green-700 text-lg">🌿 माऊली भाजी भांडार, साकोली 🌿</h1>
        <hr />
        <br />
      </div>

      <div className="flex justify-between border-b pb-2 mb-2">
        <div>
          <p>{generalInfo.userType} नाव: <b>{generalInfo.userName|| "____"}</b></p>
          <p>फोन नंबर: <b>{generalInfo.userMobile || "____"}</b></p>
          <p>मालक नाव: <b>योगेश गोटेफोडे</b></p>
        </div>
        <div>
        <p>
          दिनांक: {
            generalInfo.billDate
              ? new Intl.DateTimeFormat('mr-IN', { dateStyle: 'short' }).format(new Date(generalInfo.billDate))
              : new Intl.DateTimeFormat('mr-IN', { dateStyle: 'short' }).format(new Date())
          }
        </p>
          <p>वार: {generalInfo.weekday || ""}</p>
        </div>
      </div>

      <table className="w-full border-collapse border text-center text-xs">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-1 py-1">क्र.</th>
            <th className="border px-1 py-1">भाजी</th>
            <th className="border px-1 py-1">वजन</th>
            <th className="border px-1 py-1">दर</th>
            {userType === "farmer" &&<th className="border px-1 py-1">कमिशन</th>}
            <th className="border px-1 py-1">रक्कम</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} onClick={()=>handleEdit(i,p)}>
              <td className="border px-1 py-1">{i + 1}</td>
              <td className="border px-1 py-1">{p.productName}</td>
              <td className="border px-1 py-1">{p.weight}</td>
              <td className="border px-1 py-1">₹{p.rate}</td>
             {userType === "farmer" && <td className="border px-1 py-1">₹{commission.toFixed(0)}</td>}
              <td className="border px-1 py-1">₹{(p.weight * p.rate).toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right w-full mt-2 space-y-0.5">
        <div className="">
        <p className={userType === "farmer" ? "pr-[8%]" : "pr-[11%]"}>
          एकूण: ₹{totalAmount.toFixed(0)}
        </p>
          <hr />
          {userType === "farmer" && <p className={userType === "farmer" ? "pr-[8%]" : "pr-[11%]"}>कमिशन (8%): ₹{commission.toFixed(0)}</p>}
          <p className={userType === "farmer" ? "pr-[8%]" : "pr-[11%]"} >पट्टी (-): ₹{pattiCharges}</p>
          <p className={userType === "farmer" ? "pr-[8%]" : "pr-[11%]"}>नगदी (-): ₹{advancePaid.toFixed(0)}</p>
          <p className={userType === "farmer" ? "pr-[8%]" : "pr-[11%]"}>इतर माल (-): ₹{externalVegCost.toFixed(0)}</p>
          <hr />
          <p className={userType === "farmer" ? "pr-[8%]  text-red-800 text-md mt-1" : "pr-[11%] font-bold  text-red-800 text-md mt-1"}>
            अंतिम रक्कम: ₹{netTotal.toFixed(0)}
          </p>
        </div>
      </div>


      <div className="text-center text-xs mt-2 text-gray-600">
        <p>🌿 माऊली भाजी भांडार | धन्यवाद 🙏</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  w-full flex flex-col items-center">
      {/* Printable section */}
      <div
        ref={printRef}
        className="flex w-full justify-between gap-2 p-4 bg-gray-50 print:bg-white print:gap-0 print:p-0"
      >
        {/* Two side-by-side bills */}
        <BillContent />
      </div>

      {/* Print button */}
      <div className=" w-full print:hidden flex justify-end mr-6">
        <div className="flex items-center justify-end">
            <button
          onClick={handlePrint}
          className="bg-gray-500  cursor-pointer w-full md:w-fit hover:bg-gray-600 text-white px-4 py-2 mt-8 mr-4 rounded-md transition-all"
        >
          Print Bill
        </button>
        <ActionButtons/>
        </div>
      </div>
    </div>
  );
};

export default Bill;
