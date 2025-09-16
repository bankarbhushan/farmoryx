import React, { useState, useEffect } from "react";
import Wrapper from "../constants/Wrapper";
import Loader from "../constants/Loader";


const MerchantList = () => {
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
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Pandu</td>
                  <td className="px-4 py-2">villa</td>
                  <td className="px-4 py-2">7620574692</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button className="px-3 py-1 bg-yellow-700 text-white text-sm rounded hover:bg-yellow-600 cursor-pointer  transition">
                      Update
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>

                    <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Bhushan</td>
                  <td className="px-4 py-2">Vihiragaon</td>
                  <td className="px-4 py-2">7620574692</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button className="px-3 py-1 bg-yellow-700 text-white text-sm rounded hover:bg-yellow-600 cursor-pointer  transition">
                      Update
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>

                    <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Bhushan</td>
                  <td className="px-4 py-2">Vihiragaon</td>
                  <td className="px-4 py-2">7620574692</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button className="px-3 py-1 bg-yellow-700 text-white text-sm rounded hover:bg-yellow-600 cursor-pointer  transition">
                      Update
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>

               
              </tbody>
            </table>
          </div>
        </Wrapper>
      )}
    </div>
  );
};

export default MerchantList;
