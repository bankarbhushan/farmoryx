import React from "react";
import BillHeader from "./BillHeader";
import BillTable from "./BillTable";
import Total from "./Total";

const Bill= () => {
  return (
    <div className=" min-h-screen flex  justify-center">
      <div className="rounded-xl border p-6 m-2 w-full ">
        <BillHeader/>   

        <BillTable/>

        <Total/>
      </div>
    </div>
  );
};

export default Bill;
