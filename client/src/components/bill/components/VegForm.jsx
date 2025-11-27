import React, { useState, useEffect} from "react";
import { useBill } from "../context/BillContext";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../constants/Loader";

const VegForm = () => {

  const [vegitables, setvegitables] = useState([]);
  
  const [isLoading,setIsLoading] = useState(false)
  
  const getVeg = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get("http://localhost:3000/api/v1/veg/feed");
      if(res.data.data){
      setvegitables(res.data.data);
      setIsLoading(false)
      }else {
      setvegitables([]);
      }

    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);    
      setvegitables([]);
    }
  }; 

  useEffect(() => {
    (async () => {
      await getVeg();
    })();
  }, []);

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
      toast.error("Please fill all fields!");
      return;
    }

    addProduct(formData);
    setFormData({ productName: "", weight: "", rate: "" });
    toast.success(`Product ${formData.productName}.`);
    setShowSuggestions(false);

  };

  // Filter vegetables dynamically
  const filteredVeggies = vegitables.filter(
    (veg) =>
      veg.marathiName.toLowerCase().includes(formData.productName.toLowerCase()) ||
      veg.hinglishName.toLowerCase().includes(formData.productName.toLowerCase()) ||
      veg.englishName.toLowerCase().includes(formData.productName.toLowerCase())
  );

  const handleSelectVeg = (vegName ) => {
    setFormData((prev) => ({ ...prev, productName: vegName }));
    setShowSuggestions(false);
  };

  return (
    isLoading ? <Loader/> : 
    (
      <div className="bg-white border shadow-sm border-gray-200 rounded-md p-6 flex flex-col gap-6">

        <form onSubmit={handleAddProduct} className="flex flex-col items-end">
          <div className="flex flex-col md:flex-row gap-3 w-full relative">
            <div>
              <label htmlFor="" className="label text-sm"> Product Name</label>
              <input
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="भाजीचे नाव टाइप करा किंवा निवडा"
              className="input input-accent"
              autoComplete="off"
            />
            </div>


            {/* Suggestion dropdown */}
            {showSuggestions && filteredVeggies.length > 0 && (
              <ul className="absolute top-16 left-0 md:w-[36%] w-full bg-white border border-teal-400 rounded-md shadow-md max-h-70 overflow-y-auto z-10">
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
            <div>
                <label htmlFor="" className="label text-sm"> Weight</label>
                <input
                name="weight"
                value={formData.weight}
                onKeyDown={(e)=>{
                  if(["e","E","+","-"].includes(e.key)) e.preventDefault();
                }}
                onChange={(e)=>{
                const cleaned = e.target.value.replace(/[eE+\-]/g, "");
                  handleChange({target:{name:"weight",value:cleaned}})}}
                type="number"
                placeholder="Weight"
                className="input input-accent"
              />
            </div>

            <div>
                <label htmlFor="" className="label text-sm"> Rate</label>
                <input
                  name="rate"
                  value={formData.rate}
                  onKeyDown={(e)=>{if(["e","E","+","-"].includes(e.key)) e.preventDefault()}}
                  
                  onChange={(e)=>{
                    const cleaned = e.target.value.replace(/[eE+\-]/g,"");
                    handleChange({target:{name:"rate",value:cleaned}})
                  }}
                  type="number"
                  placeholder="Rate/kg"
                  className="input input-accent"
                />
              </div>
          </div>

          <button
            type="submit"
              className="w-full mt-5 md:w-fit px-5 py-2 bg-[#16C79A] text-white font-normal rounded-md hover:bg-[#11D18C] hover:shadow-md transition duration-200 cursor-pointer"
          >
            Add Product
          </button>
        </form>
      </div>
    )

  );
};

export default VegForm;
