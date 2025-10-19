import React, { useState, useEffect } from "react";
import Wrapper from "../constants/Wrapper";
import Loader from "../constants/Loader";


const Veglist = () => {
  const vegetables = [
  { id: 1, marathiName: "वांगे", hinglishName: "Vangi", englishName: "Brinjal" },
  { id: 2, marathiName: "टोमॅटो", hinglishName: "Tamatar", englishName: "Tomato" },
  { id: 3, marathiName: "बटाटा", hinglishName: "Batata", englishName: "Potato" },
  { id: 4, marathiName: "कांदा", hinglishName: "Kanda", englishName: "Onion" },
  { id: 5, marathiName: "भेंडी", hinglishName: "Bhendi", englishName: "Lady Finger (Okra)" },
  { id: 6, marathiName: "दोडका", hinglishName: "Doodka", englishName: "Ridge Gourd" },
  { id: 7, marathiName: "तोंडली", hinglishName: "Tondali", englishName: "Ivy Gourd" },
  { id: 8, marathiName: "कोबी", hinglishName: "Kobi", englishName: "Cabbage" },
  { id: 9, marathiName: "फुलकोबी", hinglishName: "Phulkobi", englishName: "Cauliflower" },
  { id: 10, marathiName: "पालक", hinglishName: "Palak", englishName: "Spinach" },
  { id: 11, marathiName: "मटार", hinglishName: "Matar", englishName: "Peas" },
  { id: 12, marathiName: "गाजर", hinglishName: "Gajar", englishName: "Carrot" },
  { id: 13, marathiName: "ढोबळी मिरची", hinglishName: "Dhobli Mirchi", englishName: "Capsicum" },
  { id: 14, marathiName: "लसूण", hinglishName: "Lasun", englishName: "Garlic" },
  { id: 15, marathiName: "आले", hinglishName: "Ale", englishName: "Ginger" },
  { id: 16, marathiName: "कोथिंबीर", hinglishName: "Kothimbir", englishName: "Coriander" },
  { id: 17, marathiName: "शेंगा", hinglishName: "Shenga", englishName: "Green Beans" },
  { id: 18, marathiName: "मेथी", hinglishName: "Methi", englishName: "Fenugreek" },
  { id: 19, marathiName: "मुळा", hinglishName: "Mula", englishName: "Radish" },
  { id: 20, marathiName: "काकडी", hinglishName: "Kakdi", englishName: "Cucumber" },
];

  const [isLoading, setIsLoading] = useState(true);

  // Example: simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // 2s delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
            <Loader/>
      ) : (
        <Wrapper>
          <h1 className="text-xl font-bold text-center mb-4 text-gray-800">
            🥦 Veg List
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Marathi Name</th>
                  <th className="px-4 py-2 text-left">Hinglish Name</th>
                  <th className="px-4 py-2 text-left">English Name</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {
                  vegetables && vegetables.map((veg,id)=>
                  <tr className="hover:bg-gray-50" key={id}>
                   <td className="px-4 py-2">{veg.id}</td>
                   <td className="px-4 py-2">{veg.marathiName}</td>
                   <td className="px-4 py-2">{veg.hinglishName}</td>
                   <td className="px-4 py-2">{veg.englishName}</td>
                                    <td className="px-4 py-2 flex justify-center gap-2">
                    <button className="px-3 py-1 bg-yellow-700 text-white text-sm rounded hover:bg-yellow-600 cursor-pointer  transition">
                      Update
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer">
                      Delete
                    </button>
                  </td>
                  </tr>)
                }            
              </tbody>
            </table>
          </div>
        </Wrapper>
      )}
    </div>
  );
};

export default Veglist;
