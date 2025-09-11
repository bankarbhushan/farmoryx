import React from 'react'

const BillTable = () => {
  return (
    <div>
        <h2 className="text-lg font-bold mb-2">बिल</h2>
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
            <tr>
              <td className="border px-2 py-1">1</td>
              <td className="border px-2 py-1">टोमॅटो</td>
              <td className="border px-2 py-1">12</td>
              <td className="border px-2 py-1">34</td>
              <td className="border px-2 py-1">408</td>
              <td className="border px-2 py-1 font-semibold">₹408</td>
            </tr>
                        <tr>
              <td className="border px-2 py-1">1</td>
              <td className="border px-2 py-1">टोमॅटो</td>
              <td className="border px-2 py-1">12</td>
              <td className="border px-2 py-1">34</td>
              <td className="border px-2 py-1">408</td>
              <td className="border px-2 py-1 font-semibold">₹408</td>
            </tr>

                        <tr>
              <td className="border px-2 py-1">1</td>
              <td className="border px-2 py-1">टोमॅटो</td>
              <td className="border px-2 py-1">12</td>
              <td className="border px-2 py-1">34</td>
              <td className="border px-2 py-1">408</td>
              <td className="border px-2 py-1 font-semibold">₹408</td>
            </tr>

            <tr>
              <td className="border px-2 py-1">1</td>
              <td className="border px-2 py-1">टोमॅटो</td>
              <td className="border px-2 py-1">12</td>
              <td className="border px-2 py-1">34</td>
              <td className="border px-2 py-1">408</td>
              <td className="border px-2 py-1 font-semibold">₹408</td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default BillTable