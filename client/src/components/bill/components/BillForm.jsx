import { useBill } from "../context/BillContext";

const Bill = () => {
  const { products, generalInfo ,billData} = useBill();

  const user = generalInfo.user;
  console.log(user)
  const totalAmount = products.reduce((acc, p) => acc + p.weight * p.rate, 0);
  const commission = user === "farmer" ? (totalAmount * 8) / 100 : 0;
  const totalAmount_excude_Commition = totalAmount-commission;
  const patti = Number(generalInfo.patti || 0);
  const advancePaid = Number(generalInfo.advancePaid || 0);
  const externalVegCost = Number(generalInfo.externalVegCost || 0);
  const finalAmount = totalAmount - commission - patti - advancePaid - externalVegCost;
  console.log(billData)

  return (
    <div className="min-h-screen flex justify-center">
      <div className="rounded-xl border p-6 m-2 w-full">
        <div className="text-center">
          <h1 className="text-xl font-bold text-green-700">
            🌿 माऊली भाजी भांडार, साकोली 🌿
          </h1>
        </div>

        {/* Merchant / Farmer Info */}
        <div className="flex justify-between items-start mt-4 border-b pb-4 mb-4">
          <div>
            <p>{generalInfo.user} नाव: <span className="font-semibold">{generalInfo.name || "____"}</span></p>
            <p>फोन नंबर: <span className="font-semibold">{generalInfo.mobile || "____"}</span></p>
            <p className="mt-2">मालक नाव: <span className="font-semibold">योगेश गोटेफोडे</span></p>
            <p>फोन नंबर: <span className="font-semibold">९९९९९९९९९९</span></p>
          </div>
          <div>
            <p>दिनांक: {generalInfo.date ||""}</p>
            <p>वार: {generalInfo.day || ""}</p>
          </div>
        </div>

        {/* Product Table */}
        <table className="w-full border-collapse border text-center text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">क्र.</th>
              <th className="border px-2 py-1">भाजी</th>
              <th className="border px-2 py-1">वजन (kg)</th>
              <th className="border px-2 py-1">दर (₹/kg)</th>
              <th className="border px-2 py-1">(वजन * दर)</th>
              <th className="border px-2 py-1">एकूण</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">{prod.productName}</td>
                <td className="border px-2 py-1">{prod.weight}</td>
                <td className="border px-2 py-1">{prod.rate}</td>
                <td className="border px-2 py-1">{prod.weight * prod.rate}</td>
                <td className="border px-2 py-1 font-semibold">₹{prod.weight * prod.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="text-right mt-6 space-y-1">
          <p>एकूण (वजन * दर): <span className="font-semibold ml-4">₹{totalAmount.toFixed(0)}</span></p>
          {user === "farmer" && <p>एकूण कमिशन (8%): <span className="font-semibold ml-4">₹{commission.toFixed(0)}</span></p>}
          <p>एकूण: <span className="font-semibold ml-4">₹{totalAmount_excude_Commition.toFixed(0)}</span></p>
          <p>पट्टी (-): <span className="font-semibold ml-4">₹{patti}</span></p>
          <p>नगदी दिलेली रक्कम (-): <span className="font-semibold ml-4">₹{advancePaid.toFixed(0)}</span></p>
          <p>इतर शेतकऱ्यांचे घेतलेला मालाचे एकूण पैसे (-): <span className="font-semibold ml-4 mb-2">₹{externalVegCost.toFixed(0)}</span></p>
          <hr className="mt-2" />
          <p className="text-lg font-bold text-red-900 mt-4 ml-4">
            अंतिम रक्कम: ₹{finalAmount.toFixed(0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bill;
