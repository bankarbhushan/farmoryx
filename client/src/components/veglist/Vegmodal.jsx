import React from "react";
const Vegmodal=({showForm,newVegitables,setNewVegitables,handleAddVegitable})=>{
   
    return(
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <h2 className="text-lg font-bold text-gray-1200 mb-4">Add new Farmer</h2>
            
              {
              showForm && (
             <div className="mb-6 p-4 ">
              <h2 className="text-lg font-semibold text-gray-700 mb-2"></h2>
              <div className="flex flex-wrap gap-2">
                <div  className="flex items-center gap-4">
                  <label className="w-23 text-sm font-medium text-gray-700">ID:</label>
                  <input 
                  type="number"
                  placeholder="ID"
                  value={newVegitables.id}
                  onChange={(e) =>setNewVegitables({ ...newVegitables, id:e.target.value})}
                  className="px-1 py-1 border rounded w-53 max-w-sm"
                  />
                  </div>
                <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium text-gray-700">marathiName:</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={newVegitables.marathiName}
                  onChange={(e) =>
                    setNewVegitables({ ...newVegitables, marathiName: e.target.value })
                  }
                  className="px-3 py-1 border rounded w-full max-w-sm"
                />
                </div>
                
                <div className="flex items-center gap-4">
                 <label className="w-24 text-sm font-medium text-gray-700">hinglishName:</label>
                <input
                  type="text"
                  placeholder="hinglishName"
                  value={newVegitables.hinglishName}
                  onChange={(e) =>
                    setNewVegitables({ ...newVegitables, hinglishName: e.target.value })
                  }
                  className="px-3 py-1 border rounded w-full max-w-sm"
                />
                </div>
                <div className="flex items-center gap-4 mb-4">
                 <label className="w-24 text-sm font-medium text-gray-700">englishName:</label>
                <input 
                  type="text"
                  placeholder="englishName"
                  value={newVegitables.englishName}
                  onChange={(e) =>
                    setNewVegitables({ ...newVegitables, englishName: e.target.value })
                  }
                 className="px-3 py-1 border rounded w-full max-w-sm"
                />
                 </div>
              </div>
                <div className="flex justify-center">
                <button
                  onClick={handleAddVegitable}
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
export default Vegmodal