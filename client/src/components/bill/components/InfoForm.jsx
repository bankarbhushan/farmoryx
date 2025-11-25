import React, { useState, useRef, useEffect, useContext } from "react";
import { useBill } from "../context/BillContext";
import UserContext from "../../../context/userContext";
import toast from "react-hot-toast";




const InfoForm = () => {
  const { addGeneralInfo } = useBill();

  const [farmers] = useState([
    { name: "Ramesh Patil", village: "Shirpur", mobile: "9823012345" },
    { name: "Suresh Pawar", village: "Sakri", mobile: "9876543210" },
    { name: "Mahesh Jadhav", village: "Nandgaon", mobile: "9834567890" },
    { name: "Ganesh Shinde", village: "Chalisgaon", mobile: "9811122233" },
    { name: "Prakash Deshmukh", village: "Parola", mobile: "9898989898" },
    { name: "Vijay More", village: "Malegaon", mobile: "9765432109" },
    { name: "Santosh Kale", village: "Dhule", mobile: "9933445566" },
    { name: "Ravindra Chavan", village: "Jamner", mobile: "9822001122" },
    { name: "Ashok Gaikwad", village: "Bhadgaon", mobile: "9867543210" },
    { name: "Nitin Koli", village: "Erandol", mobile: "9812345678" },
    { name: "Bhaskar Borse", village: "Pimpalner", mobile: "9876012345" },
    { name: "Rohit Ahire", village: "Satana", mobile: "9829004567" },
    { name: "Anil Wagh", village: "Niphad", mobile: "9911223344" },
    { name: "Shankar Sonawane", village: "Deola", mobile: "9800123456" },
    { name: "Kiran Dabhade", village: "Lasalgaon", mobile: "9887654321" },
    { name: "Tushar Chaudhari", village: "Kalwan", mobile: "9845012345" },
    { name: "Sanjay Pawar", village: "Sinnar", mobile: "9812233445" },
    { name: "Dinesh Bhalerao", village: "Manmad", mobile: "9899001122" },
    { name: "Vikas Nikam", village: "Yeola", mobile: "9823456789" },
    { name: "Swapnil Shelke", village: "Ojhar", mobile: "9877701234" }
  ]);

    const merchants = [
  { id: 1, name: "Rajesh Agarwal", village: "Malegaon", mobile: "9823011122", businessName: "Agarwal Vegetables" },
  { id: 2, name: "Mahesh Jain", village: "Dhule", mobile: "9876542109", businessName: "FreshMart Traders" },
  { id: 3, name: "Pravin Mehta", village: "Nashik", mobile: "9812233445", businessName: "Mehta Veg Suppliers" },
  { id: 4, name: "Sanjay Patel", village: "Niphad", mobile: "9834512345", businessName: "Green Leaf Traders" },
  { id: 5, name: "Vikram Shah", village: "Yeola", mobile: "9898898898", businessName: "Shah Veg Distributors" },
  { id: 6, name: "Nilesh Bansal", village: "Satana", mobile: "9825678901", businessName: "Bansal AgroMart" },
  { id: 7, name: "Ravi Goyal", village: "Sinnar", mobile: "9911225566", businessName: "Goyal Fresh Supply" },
  { id: 8, name: "Anil Bhatt", village: "Pimpalgaon", mobile: "9845012345", businessName: "Bhatt Farm Produce" },
  { id: 9, name: "Deepak Trivedi", village: "Kalwan", mobile: "9822003344", businessName: "Trivedi Veg Wholesale" },
  { id: 10, name: "Sunil Agarwal", village: "Lasalgaon", mobile: "9876014567", businessName: "Agarwal Fruits & Veggies" },
  { id: 11, name: "Manoj Shah", village: "Deola", mobile: "9812348899", businessName: "Shah Agro Supply" },
  { id: 12, name: "Ashok Kothari", village: "Erandol", mobile: "9899007788", businessName: "Kothari Veg Mart" },
  { id: 13, name: "Naresh Singhal", village: "Jamner", mobile: "9887009988", businessName: "Singhal Veg Exporters" },
  { id: 14, name: "Kishor Mahajan", village: "Parola", mobile: "9811112233", businessName: "Mahajan Fresh Foods" },
  { id: 15, name: "Ramesh Patil", village: "Chalisgaon", mobile: "9823456677", businessName: "Patil Vegetable Traders" },
  { id: 16, name: "Rajiv Chauhan", village: "Bhadgaon", mobile: "9867543210", businessName: "Chauhan Farm Connect" },
  { id: 17, name: "Vikas Joshi", village: "Shirpur", mobile: "9800123456", businessName: "Joshi Agro Products" },
  { id: 18, name: "Paresh Modi", village: "Manmad", mobile: "9877701234", businessName: "Modi Veg Distributors" },
  { id: 19, name: "Harish Vora", village: "Ojhar", mobile: "9833322110", businessName: "Vora Agro Supply" },
  { id: 20, name: "Amit Doshi", village: "Nandgaon", mobile: "9845678901", businessName: "Doshi Vegetable Mart" },
  ];

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
      <form
        onSubmit={handleSubmit}
        className="bg-white border shadow-sm border-gray-200 rounded-md p-6 flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Broker */}
          <div className="flex items-center gap-2">
            <label className="text-sm min-w-[40%] font-medium text-gray-700 mb-1">दलाल</label>
              <select
                name="broker_id"
                value={formData.broker_id}
                className="select select-accent"
                required
                onChange={onChange}
              >
                <option value="Yogesh_Gotephode">Yogesh Gotephode</option>
                <option value="Bhushan_Bankar">Bhushan Bankar</option>
              </select>
          </div>

          {/* Bill User Type */}
          <div className="flex items-center gap-2">
            <label className="text-sm min-w-[40%] font-medium text-gray-700 mb-1">शेतकरी / व्यापारी</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={onChange}
              className="select select-accent"        
              required
            >
              <option value="" disabled>
                Select User
              </option>
              <option value="farmer">शेतकरी</option>
              <option value="merchant">व्यापारी</option>
            </select>
          </div>

          {/* Name Input + Suggestions */}
          <div className="flex items-center relative gap-2" ref={suggestionRef}>
            <label className="text-sm min-w-[40%] font-medium text-red-700 mb-1">
              {formData.user
                ? `${formData.user === "farmer" ? "शेतकरी" : "व्यापारी"} नाव`
                : "नाव"}
            </label>
            {showUser && (
              <>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={onChange}
                  placeholder={`${formData.user || "User"} नाव टाइप करा किंवा निवडा`}
                  className="input input-accent"      
                  onFocus={() => setShowSuggestions(true)}
                  autoComplete="off"
                  required
                />

                {/* Suggestion Dropdown */}
                {showSuggestions && formData.userName&& filteredUser.length > 0 && (
                  <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                    {filteredUser.map((user) => (
                      <li
                        key={user.mobile}
                        onClick={() => handleSelectUser(user)}
                        className="px-3 py-2 hover:bg-green-100 cursor-pointer"
                      >
                        {user.name}{" "}
                        <span className="text-gray-500 text-sm">
                          ({user.village})
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>

        {/* --- Row 2: Mobile, Date, Patti --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Mobile */}
          <div className="flex items-center gap-2">
            <label className="text-sm min-w-[40%] font-medium text-gray-700 mb-1">
              मोबाईल नंबर
            </label>
            <input
              type="number"
              name="userMobile"
              onKeyDown={(e)=>{if(["e","E","+","-"].includes(e.key) )e.preventDefault()}}
              value={formData.userMobile}
              // onChange={(e)=>{
              //   const cleaned = e.target.value.replace(/[eE+\-]/g,"");
              //   onChange(()=>cleaned)
              // }}
              onChange={onChange}
              placeholder="मोबाइल नंबर टाइप करा"
              className="input input-accent"      
              required
            />
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <label className="text-sm min-w-[40%] font-medium text-gray-700 mb-1">तारीख</label>
            <input
              type="date"
              name="billDate"
              value={formData.billDate}
              onChange={onChange}
              className="w-full px-3 py-2 border border-teal-400 rounded-md bg-gray-50 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Patti */}
          <div className="flex items-center gap-2">
            <label className="text-sm min-w-[40%] font-medium text-gray-700 mb-1">
              पट्टी
            </label>
            <select
              name="pattiCharges"
              value={formData.pattiCharges}
              onChange={onChange}
              className="select select-accent"      >
              <option value="" disabled>
                Select Patti
              </option>
              {[0, 10, 20, 30, 50, 100, 150, 200, 300, 500, 1000].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* --- Row 3: Advance, External Veg Cost --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Advance Paid */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium min-w-[40%]  text-gray-700 mb-1">
              नगदी दिलेली रक्कम
            </label>
            <input
              type="number"
              name="advancePaid"
              onKeyDown={(e)=>{if(["e","E","+","-"].includes(e.key)) e.preventDefault()}}
              value={formData.advancePaid}
              onChange={onChange}
              min="0"
              max="10000"
              placeholder="नगदी दिलेली रक्कम"
              className="input input-accent"      
            />
          </div>

          {/* External Veg Cost */}
          <div className="flex items-center gap-2">
            <label className="text-sm min-w-[40%] font-medium text-gray-700 mb-1">
              इतर शेतकऱ्यांच्या मालाचे पैसे
            </label>
            <input
              type="number"
              name="externalVegCost"
              onKeyDown={(e)=>{if(["e","E","+","-"].includes(e.key)) e.preventDefault()}}
              value={formData.externalVegCost}
              onChange={onChange}
              min="0"
              placeholder="इतर शेतकऱ्यांच्या मालाचे पैसे"
              className="input input-accent"      
            />
          </div>
        </div>

        {/* --- Submit Button --- */}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="w-full md:w-fit px-5 py-2 bg-[#16C79A] text-white font-normal rounded-md hover:bg-[#11D18C] hover:shadow-md transition duration-200 cursor-pointer"
          >
            Add Details
          </button>
        </div>
      </form>
  );
};

export default InfoForm;
