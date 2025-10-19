import React, { useState, useEffect } from "react";
import Wrapper from "../constants/Wrapper";
import Loader from "../constants/Loader";


const FarmerList = () => {

  const farmers = [
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
  { name: "Swapnil Shelke", village: "Ojhar", mobile: "9877701234" },
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
              <thead className="bg-yellow-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Villge</th>
                  <th className="px-4 py-2 text-left">Mobile No</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {
                  farmers && farmers.map((farmer,index)=>
                  <tr className="hover:bg-gray-50" key={index}>
                   <td className="px-4 py-2">{index+1}</td>
                   <td className="px-4 py-2">{farmer.name}</td>
                   <td className="px-4 py-2">{farmer.village}</td>
                   <td className="px-4 py-2">{farmer.mobile}</td>
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

export default FarmerList;
