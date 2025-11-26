import React, { useEffect, useState } from "react";
import Wrapper from "../constants/Wrapper";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../constants/Loader";
import NoDataCard from "../constants/NoDataCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import NotoSansDevanagariRegular from "../../assets/Font/NotoSansDevanagariRegularnormal"; 
import NotoSansDevanagariBold from "../../assets/Font/NotoSansDevanagariBoldnormal"; 


const BillView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bill, setBill] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSingleBill = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/bill/singlebill/${id}`);
      console.log(res)
      setBill(res.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleBill();
  }, []);
  
const generatePDF = () => {
  const doc = new jsPDF();

  // Load Base64 fonts
  doc.addFileToVFS("NotoDev-Regular.ttf", NotoSansDevanagariRegular);
  doc.addFileToVFS("NotoDev-Bold.ttf", NotoSansDevanagariBold);

  doc.addFont("NotoDev-Regular.ttf", "NotoDev", "normal");
  doc.addFont("NotoDev-Bold.ttf", "NotoDev", "bold");

  doc.setFont("NotoDev");

  // ---------- HEADER ----------
  doc.setFontSize(16);
  doc.setFont("NotoDev", "bold");
  doc.text("🌿 माऊली भाजी भांडार, साकोली 🌿", 105, 20, { align: "center" });

  doc.setFont("NotoDev", "normal");
  doc.setFontSize(12);

  // LEFT INFO
  doc.text(`${bill.userType} नाव: ${bill.userName}`, 14, 40);
  doc.text(`फोन नंबर: ${bill.userMobile}`, 14, 48);
  doc.text(`मालक नाव: ${bill.brokerId}`, 14, 56);

  // RIGHT INFO
  doc.text(`Date: ${new Date(bill.billDate).toLocaleDateString("en-IN")}`, 150, 40);
  doc.text(`Day: ${bill.weekday}`, 150, 48);

  // ---------- BORDER AROUND BILL ----------
  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 280); // x, y, width, height (adjust as needed)

  // ---------- TABLE ----------
  // Draw horizontal line above table
  doc.setLineWidth(0.2);
  doc.line(14, 65, 196, 65); // x1, y1, x2, y2

  autoTable(doc, {
    startY: 70,
    margin: { left: 14, right: 14 },
    styles: { font: "NotoDev", fontSize: 11, overflow: "linebreak", cellPadding: 2 },
    headStyles: {
      font: "NotoDev",
      fontStyle: "bold",
      fillColor: [240, 240, 240],
      textColor: 20,
      lineWidth: 0.2,
      lineColor: [0, 0, 0]
    },
    bodyStyles: { font: "NotoDev", lineWidth: 0.2, lineColor: [0, 0, 0] },
    head: [["क्र.", "भाजी", "वजन", "दर", "रक्कम"]],
    body: bill.items.map((item, i) => [
      i + 1,
      item.productName,
      item.weight,
      `₹${item.rate}`,
      `₹${item.productItemTotal}`
    ]),
    // Add borders to table
    didDrawCell: function (data) {
      doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
    }
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  // Draw horizontal line above final price
  doc.setLineWidth(0.2);
  doc.line(14, finalY - 5, 196, finalY - 5);

  // ---------- SUMMARY SECTION ----------
  doc.setFont("NotoDev", "normal");
  doc.setFontSize(11);

  const rightX = 140;

  doc.text(`एकूण: ₹${bill.totalAmount}`, rightX, finalY);
  doc.text(`पट्टी (-): ₹${bill.pattiCharges}`, rightX, finalY + 8);
  doc.text(`नगदी (-): ₹${bill.advancePaid}`, rightX, finalY + 16);
  doc.text(`इतर माल (-): ₹${bill.externalVegCost}`, rightX, finalY + 24);

  doc.setFont("NotoDev", "bold");
  doc.setFontSize(12);
  doc.text(
    `अंतिम रक्कम: ₹${bill.netTotal}`,
    rightX + 30,
    finalY + 30,
    { align: "right" }
  );

  // ---------- FOOTER ----------
  doc.setFont("NotoDev", "normal");
  doc.setFontSize(12);
  doc.text("🌾  माऊली भाजी भांडार | धन्यवाद 🙏", 105, finalY + 45, { align: "center" });

  // Save PDF
  doc.save(`${bill.userName + "_" + bill.billDate}.pdf`);
};



  return (
    isLoading ? <Loader/>
    :
    (
        <Wrapper className="bg-[#FFFFFF] border border-[#E6E9EA] shadow-sm p-8 rounded-xl">
            {
                !bill ? <NoDataCard/> :
                (
                    <div>
                        {/* TITLE */}
                        <div className="border border-[#212324] p-8">
                            <h1 className="text-center text-2xl font-semibold text-[#12202E] mb-6">
                            🌿 माऊली भाजी भांडार, साकोली 🌿
                            </h1>

                            {/* TOP SECTION */}
                            <div className="flex justify-between mb-6 text-sm text-[#12202E]">
                            {/* LEFT */}
                            <div className="space-y-1">
                                <p>merchant नाव: <span className="font-semibold">{bill.userName}</span></p>
                                <p>फोन नंबर: <span className="font-semibold">{bill.userMobile}</span></p>
                                <p>मालक नाव: <span className="font-semibold">{bill.brokerId}</span></p>
                            </div>

                            {/* RIGHT */}
                            <div className="space-y-1 text-right">
                                <p>दिनांक: {bill.billDate}</p>
                                <p>वार: {bill.weekday}</p>
                            </div>
                            </div>

                            {/* TABLE */}
                            <table className="w-full border border-[#E6E9EA] mb-6">
                            <thead className="bg-gray-100 text-[#12202E]">
                                <tr>
                                <th className="border border-[#E6E9EA] px-3 py-2 text-sm">क्र.</th>
                                <th className="border border-[#E6E9EA] px-3 py-2 text-sm">भाजी</th>
                                <th className="border border-[#E6E9EA] px-3 py-2 text-sm">वजन</th>
                                <th className="border border-[#E6E9EA] px-3 py-2 text-sm">दर</th>
                                <th className="border border-[#E6E9EA] px-3 py-2 text-sm">रक्कम</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bill.items?.map((item, index) => (
                                <tr key={item._id} className="text-sm">
                                    <td className="border border-[#E6E9EA] px-3 py-2 text-center">{index + 1}</td>
                                    <td className="border border-[#E6E9EA] px-3 py-2">{item.productName}</td>
                                    <td className="border border-[#E6E9EA] px-3 py-2 text-center">{item.weight}</td>
                                    <td className="border border-[#E6E9EA] px-3 py-2 text-center">₹{item.rate}</td>
                                    <td className="border border-[#E6E9EA] px-3 py-2 text-center font-medium">
                                    ₹{item.productItemTotal}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>

                            {/* SUMMARY */}
                            <div className="text-sm text-[#12202E] space-y-1 flex justify-end">
                            <div className="flex flex-col items-end pr-6">
                                <p>एकूण: ₹{bill.totalAmount}</p>
                                <p>पट्टी (-): ₹{bill.pattiCharges}</p>
                                <p>नगदी (-): ₹{bill.advancePaid}</p>
                                <p>इतर माल (-): ₹{bill.externalVegCost}</p>

                                <p className="pt-2 text-lg font-semibold text-[#17CF91]">
                                अंतिम रक्कम: ₹{bill.netTotal}
                                </p>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <p className="text-center text-[#12202E] mt-8 text-sm">
                        🌾 माऊली भाजी भांडार | धन्यवाद 🙏
                        </p>
                        </div>
                        
                        {/* ACTION BUTTON */}
                        <div className="bg-[#FFFFFF] p-6 mt-8 mx-4">
                            <div className="flex justify-end gap-4">
                            <button
                                onClick={generatePDF}
                                className="px-5 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
                            >   
                                Download PDF
                            </button>

                            <button
                                onClick={() => navigate("/dashbord/billlist")}
                                className="px-5 py-2 rounded-md btn text-black transition"
                            >
                                Back    
                            </button>
                        </div>
                    </div>
                    </div>
                )
            }      
        </Wrapper>
    )
  )
}
        




export default BillView;
