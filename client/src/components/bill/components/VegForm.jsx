import React, { useState } from "react";
import { useBill } from "../context/BillContext";

const VegForm = () => {
  const vegitables = [
    { id: 1, marathiName: "वांगे", hinglishName: "Vangi", englishName: "Brinjal" },
    { id: 2, marathiName: "टोमॅटो", hinglishName: "Tamatar", englishName: "Tomato" },
    { id: 3, marathiName: "बटाटा", hinglishName: "Batata", englishName: "Potato" },
    { id: 4, marathiName: "कांदा", hinglishName: "Kanda", englishName: "Onion" },
    { id: 5, marathiName: "भेंडी", hinglishName: "Bhendi", englishName: "Lady Finger (Okra)" },
    { id: 6, marathiName: "दोडका", hinglishName: "Doodka", englishName: "Ridge Gourd" },
    { id: 7, marathiName: "तोंडली", hinglishName: "Tondali", englishName: "Ivy Gourd" },
    { id: 8, marathiName: "कोबी", hinglishName: "Kobi", englishName: "Cabbage" },
    { id: 9, marathiName: "फुलकोबी", hinglishName: "Phulkobi", englishName: "Cauliflower" },
    { id: 10, marathiName: "पालक", hinglishName: "Palak", englishName: "Spinach" }
  ];

  const { addProduct, formData, setFormData } = useBill();
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle input typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "productName") {
      setShowSuggestions(true);
    }
  };

  // Add product to context
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.weight || !formData.rate) {
      alert("Please fill all fields!");
      return;
    }

    addProduct(formData);
    setFormData({ productName: "", weight: "", rate: "" });
    setShowSuggestions(false);
  };

  // Filter vegetables dynamically
  const filteredVeggies = vegitables.filter(
    (veg) =>
      veg.marathiName.toLowerCase().includes(formData.productName.toLowerCase()) ||
      veg.hinglishName.toLowerCase().includes(formData.productName.toLowerCase()) ||
      veg.englishName.toLowerCase().includes(formData.productName.toLowerCase())
  );

  const handleSelectVeg = (vegName) => {
    setFormData((prev) => ({ ...prev, productName: vegName }));
    setShowSuggestions(false);
  };

  return (
    <div className="bg-white border mt-4 mb-4 border-gray-200 shadow-md rounded-xl p-6">
      <h3 className="mb-2 text-emerald-600 font-semibold">Add Veg</h3>

      <form onSubmit={handleAddProduct} className="flex flex-col items-end">
        <div className="flex flex-col md:flex-row gap-3 w-full relative">
          <input
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="भाजीचे नाव टाइप करा किंवा निवडा"
            className="input input-accent"
            autoComplete="off"
          />

          {/* Suggestion dropdown */}
          {showSuggestions && filteredVeggies.length > 0 && (
            <ul className="absolute top-10 left-0 md:w-[32%] w-full bg-white border border-teal-400 rounded-md shadow-md max-h-70 overflow-y-auto z-10">
              {filteredVeggies.map((veg) => (
                <li
                  key={veg.id}
                  onClick={() => handleSelectVeg(veg.marathiName)}
                  className="px-3 py-2 w-full hover:bg-green-100 cursor-pointer"
                >
                  {veg.marathiName}
                </li>
              ))}
            </ul>
          )}

          <input
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            type="number"
            placeholder="Weight"
            className="input input-accent"
          />

          <input
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            type="number"
            placeholder="Rate/kg"
            className="input input-accent"
          />
        </div>

        <button
          type="submit"
          className="mt-2.5 w-full md:w-fit px-5 py-2 cursor-pointer rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default VegForm;
