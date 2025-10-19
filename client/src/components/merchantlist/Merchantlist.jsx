import React, { useState, useEffect } from "react";
import Wrapper from "../constants/Wrapper";
import Loader from "../constants/Loader";


const MerchantList = () => {
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
             Farmer List
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-cyan-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Villge</th>
                  <th className="px-4 py-2 text-left">Mobile No</th>
                  <th className="px-4 py-2 text-left">Business Name</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {
                  merchants && merchants.map((marchant)=>
                    <tr className="hover:bg-gray-50">
                       <td className="px-4 py-2">{marchant.id}</td>
                       <td className="px-4 py-2">{marchant.name}</td>
                       <td className="px-4 py-2">{marchant.village}</td>
                       <td className="px-4 py-2">{marchant.mobile}</td>
                       <td className="px-4 py-2">{marchant.businessName}</td>
                      <td className="px-4 py-2 flex justify-center gap-2">
                        <button className="px-3 py-1 bg-yellow-700 text-white text-sm rounded hover:bg-yellow-600 cursor-pointer  transition">
                          Update
                        </button>
                        <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer">
                          Delete
                        </button>
                     </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </Wrapper>
      )}
    </div>
  );
};

export default MerchantList;
