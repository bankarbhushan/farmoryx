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
<div className="font-inter">
  {isLoading ? (
    <Loader />
  ) : (
    <Wrapper className="bg-[#FFFFFF] border border-[#E6E9EA] shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-semibold text-[#12202E]">Vegetable List</h1>
          <p className="text-sm font-extralight text-[#94A3B8] mt-1">
            Manage and view all vegetables available in the system.
          </p>
        </div>

        <button
          onClick={openModal}
          className="px-4 py-2 rounded-md  bg-gray-600 text-white font-light shadow hover:bg-gray-800 transition"
        >
          + Add New Vegetable
        </button>
      </div>

      {/* Modal */}
      <Vegmodal
        showForm={showForm}
        setShowForm={setShowForm}
        newVegitables={newVegitables}
        setNewVegitables={setNewVegitables}
        handleAddVegitable={handleAddVegitable}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full">
          <thead className="bg-gray-200 text-[#12202E]">
            <tr>
              <th className="px-4 py-3 font-normal text-left">ID</th>
              <th className="px-4 py-3 font-normal text-left">Marathi Name</th>
              <th className="px-4 py-3 font-normal text-left">Hinglish Name</th>
              <th className="px-4 py-3 font-normal text-left">English Name</th>
              <th className="px-4 py-3 font-normal text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vegitables &&
              vegitables.map((veg, id) => (
                <tr
                  key={id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-light">{veg.id}</td>
                  <td className="px-4 py-3 font-light">{veg.marathiName}</td>
                  <td className="px-4 py-3 font-light">{veg.hinglishName}</td>
                  <td className="px-4 py-3 font-light">{veg.englishName}</td>

                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button
                      className="px-3 py-1 rounded-md bg-[#17CF91] text-white font-light text-sm shadow hover:bg-[#16C79A] transition cursor-pointer"
                    >
                      Update
                    </button>

                    <button className="px-3 py-1 rounded-md bg-[#FF6B6B] text-white font-light text-sm shadow hover:bg-[#E53E3E] transition cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  )}
</div>

  );
};

export default Veglist;
