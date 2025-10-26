import React, { useState, useEffect } from "react";
import Wrapper from "../constants/Wrapper";
import Loader from "../constants/Loader";
import Vegmodal from "./Vegmodal";


const Veglist = () => {
  const [vegitables,setVegitables]=useState([
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

  ])

  const [newVegitables,setNewVegitables]=useState({id:" ",marathiName:" ",hinglishName:" ",englishName:" " })
  const [isLoading, setIsLoading] = useState(true);

  const [showForm,setShowForm]=useState(false);

  // Example: simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // 2s delay
    return () => clearTimeout(timer);
  }, []);

  const handleAddVegitable=()=>{
       
    const {id,marathiName,hinglishName,englishName}=newVegitables;
    if(id.trim() && marathiName.trim() && hinglishName.trim() && englishName.trim()){
        console.log("Added:", newVegitables);
      setVegitables([...vegitables,{id:id.trim(),marathiName:marathiName.trim(),hinglishName:hinglishName.trim(),englishName:englishName.trim()}])
      setNewVegitables({});
      setShowForm(false)
      closeModal();
    }
  
  }

  const openModal=()=>{
       setShowForm(true);
       document.getElementById("my_modal_4").showModal();
  }

  const closeModal=()=>{
    setShowForm(false);
    document.getElementById("my_modal_4")
  }

  return (
    <div>
      {isLoading ? (
            <Loader/>
      ) : (
        <Wrapper>
          <div className="flex justify-between item-center mb-4">
          <h1 className="text-xl font-bold text-center mb-4 text-gray-800">
            🥦 Veg List
          </h1>
          <button
          onClick={openModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >AddNewVegitables</button>
          </div>
          <Vegmodal
          showForm={showForm}
          setShowForm={setShowForm}
          newVegitables={newVegitables}
          setNewVegitables={setNewVegitables}
          handleAddVegitable={handleAddVegitable}
          />
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
                  vegitables && vegitables.map((veg,id)=>
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
