import React, { useState, useRef, useEffect, useContext } from "react";
import { useBill } from "../context/BillContext";
import UserContext from "../../../context/userContext";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../constants/Loader";



const InfoForm = () => {
  const { addGeneralInfo } = useBill();
  const [farmers, setFarmers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [merchants, setMerchants] = useState([]); 
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const [showUser,setShowUser] = useState(false)
  const [formData, setFormData] = useState({
    broker_id :"bhushan_bankar",
    userType: "",
    billDate: "",
    weekday: "",
    userName: "",
    userMobile: "",
    pattiCharges: "",
    advancePaid: 0,
    externalVegCost: 0
  });
  const { setUserName } = useContext(UserContext);

  const getFarmer = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/farmer/feed");
      if (res.data.data) {
        setFarmers(res.data.data);
      } else {
        setFarmers([]);
      }

    } catch (error) {
      console.error("Error fetching farmers:", error.message);
      setFarmers([]);
    }
  };

  const getMerchants = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/merchant/feed");

      if ((res.data.data)) {
        setMerchants(res.data.data);
      } else {
        setMerchants([]);
      }
    } catch (error) {
      console.error("Error fetching merchants:", error.message);
      setMerchants([]);
    }
  };

  useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);   
        await getFarmer();  
        await getMerchants()  
        setIsLoading(false);  
      };
      fetchData();
  }, []);
  
  // Handle input changes
  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "broker_id") {
    setUserName(value);
  }

  if (name === "userType") {
    setShowUser(true);
    setFormData({...formData, userName: "", userMobile: ""});
  }


    if ((name === "advancePaid" || name === "externalVegCost") && value < 0) {
      setFormData({ ...formData, [name]: 0 });
      return;
    }

    if (name === "billDate") {
      const billDate = new Date(value);
      const weekday = billDate.toLocaleDateString("mr-IN", { weekday: "long" });
      setFormData({ ...formData, [name]: value, weekday: weekday });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "userName") setShowSuggestions(true);
  };

  // Filter farmers dynamically
  const filteredUser = 
  formData.userType==="farmer" ? 
  farmers.filter((far) =>
    far.name.toLowerCase().includes(formData.userName.toLowerCase())
  ) :   merchants.filter((mer) =>
    mer.name.toLowerCase().includes(formData.userName.toLowerCase())
  ) 

  // When a farmer is selected
  const handleSelectUser = (user) => {
  setFormData(prev => ({
      ...prev,
      userName: user.name,
      userMobile: user.mobile
    }));
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addGeneralInfo(formData);
    toast.success(`User is ${formData.userName}.`);
  };

  return (
    isLoading ? <Loader/> : 
    (
<form
  onSubmit={handleSubmit}
  className="bg-white border shadow-sm border-gray-200 rounded-md p-6 flex flex-col gap-6"
>
  {/* --- Row 1: Broker, User Type, Name --- */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    
    {/* Broker */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">दलाल</label>
      <select
        name="broker_id"
        value={formData.broker_id}
        className="select select-accent w-full"
        required
        onChange={onChange}
      >
        <option value="Yogesh_Gotephode">Yogesh Gotephode</option>
        <option value="Bhushan_Bankar">Bhushan Bankar</option>
      </select>
    </div>

    {/* User Type */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">शेतकरी / व्यापारी</label>
      <select
        name="userType"
        value={formData.userType}
        onChange={onChange}
        className="select select-accent w-full"
        required
      >
        <option value="" disabled>Select User</option>
        <option value="farmer">शेतकरी</option>
        <option value="merchant">व्यापारी</option>
      </select>
    </div>

    {/* Name + Suggestions */}
    <div className="flex flex-col gap-1 relative" ref={suggestionRef}>
      <label className="text-sm font-medium text-gray-700">
        {formData.userType === "farmer"
          ? "शेतकरी नाव"
          : formData.userType === "merchant"
          ? "व्यापारी नाव"
          : "नाव"}
      </label>

      <input
        type="text"
        name="userName"
        value={formData.userName}
        onChange={onChange}
        placeholder="नाव टाइप करा किंवा निवडा"
        className="input input-accent w-full"
        onFocus={() => setShowSuggestions(true)}
        autoComplete="off"
        required
      />

      {/* Suggestions */}
      {showSuggestions && formData.userName && filteredUser.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          {filteredUser.map((user) => (
            <li
              key={user.mobile}
              onClick={() => handleSelectUser(user)}
              className="px-3 py-2 hover:bg-green-100 cursor-pointer"
            >
              {user.name}{" "}
              <span className="text-gray-500 text-sm">({user.village})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>

  {/* --- Row 2: Mobile, Date, Patti --- */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

    {/* Mobile */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">मोबाईल नंबर</label>
      <input
        type="number"
        name="userMobile"
        value={formData.userMobile}
        onChange={onChange}
        onKeyDown={(e)=>["e","E","+","-"].includes(e.key) && e.preventDefault()}
        placeholder="मोबाईल नंबर टाइप करा"
        className="input input-accent w-full"
        required
      />
    </div>

    {/* Date */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">तारीख</label>
      <input
        type="date"
        name="billDate"
        value={formData.billDate}
        onChange={onChange}
        className="input input-accent w-full"
        required
      />
    </div>

    {/* Patti */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">पट्टी</label>
      <select
        name="pattiCharges"
        value={formData.pattiCharges}
        onChange={onChange}
        className="select select-accent w-full"
      >
        <option value="" disabled>Select Patti</option>
        {[0,10,20,30,50,100,150,200,300,500,1000].map(p=>(
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>
  </div>

  {/* --- Row 3: Advance, External Veg --- */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

    {/* Advance */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">नगदी दिलेली रक्कम</label>
      <input
        type="number"
        name="advancePaid"
        value={formData.advancePaid}
        onChange={onChange}
        onKeyDown={(e)=>["e","E","+","-"].includes(e.key) && e.preventDefault()}
        min="0"
        className="input input-accent w-full"
      />
    </div>

    {/* External Veg Cost */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">इतर शेतकऱ्यांच्या मालाचे पैसे</label>
      <input
        type="number"
        name="externalVegCost"
        value={formData.externalVegCost}
        onChange={onChange}
        onKeyDown={(e)=>["e","E","+","-"].includes(e.key) && e.preventDefault()}
        min="0"
        className="input input-accent w-full"
      />
    </div>
  </div>

  {/* Submit */}
  <div className="flex justify-end">
    <button
      type="submit"
      className="px-5 py-2 bg-[#16C79A] text-white rounded-md hover:bg-[#11D18C] shadow-sm transition"
    >
      Add Details
    </button>
  </div>
</form>

    )
     
  );
};

export default InfoForm;
