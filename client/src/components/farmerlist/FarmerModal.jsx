import React from "react";
const FarmerModal=({showForm,newFarmer,setNewFarmer,handleAddFarmer})=>{
   
    return(
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <h2 className="text-lg font-bold text-gray-1200 mb-4">Add new Farmer</h2>
            
              {
              showForm && (
             <div className="mb-6 p-4 ">
              <h2 className="text-lg font-semibold text-gray-700 mb-2"></h2>
              <div className="flex flex-wrap gap-2">
                <div  className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={newFarmer.name}
                  onChange={(e) =>
                    setNewFarmer({ ...newFarmer, name: e.target.value })
                  }
                  className="px-3 py-1 border rounded w-full max-w-sm"
                />
                </div>
                <div className="flex items-center gap-4">
                 <label className="w-24 text-sm font-medium text-gray-700">Village:</label>
                <input
                  type="text"
                  placeholder="Village"
                  value={newFarmer.village}
                  onChange={(e) =>
                    setNewFarmer({ ...newFarmer, village: e.target.value })
                  }
                  className="px-3 py-1 border rounded w-full max-w-sm"
                />
                </div>
                <div className="flex items-center gap-4 mb-4">
                 <label className="w-24 text-sm font-medium text-gray-700">Mobile:</label>
                <input 
                  type="text"
                  placeholder="Mobile"
                  value={newFarmer.mobile}
                  onChange={(e) =>
                    setNewFarmer({ ...newFarmer, mobile: e.target.value })
                  }
                 className="px-3 py-1 border rounded w-full max-w-sm"
                />
               </div>
              </div>
                <div className="flex justify-center">
                <button
                  onClick={handleAddFarmer}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                >
                  Save
                </button>
                </div>
              </div>
           
          )}
                <button className="w-8 h-8 border-gray-300 text-center text-lg font-bold hover:bg-red-600  hover:text-white absolute right-2 top-2"> ✕ </button>
              </form>
                <h3 className="font-bold text-lg"></h3>
                  <p className="py-4"></p>
            </div>
        </dialog>
    )
}
export default FarmerModal