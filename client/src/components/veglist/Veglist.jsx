import React, { useState, useEffect } from "react";
import Wrapper from "../constants/Wrapper";
import Loader from "../constants/Loader";


const Veglist = () => {
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
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">वांगे</td>
                  <td className="px-4 py-2">Vangi</td>
                  <td className="px-4 py-2">Brinjal</td>
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
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">टोमॅटो</td>
                  <td className="px-4 py-2">Tamatar</td>
                  <td className="px-4 py-2">Tomato</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
                      Update
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition">
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

export default Veglist;
