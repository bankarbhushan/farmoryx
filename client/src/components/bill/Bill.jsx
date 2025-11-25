import React from "react";
import Wrapper from "../constants/Wrapper";
import InfoForm from "./components/InfoForm";
import VegForm from "./components/VegForm";
import BillForm from "./components/BillForm";
import { BillProvider } from "./context/BillContext";

const Bill = () => {
  return (
    <BillProvider>
      <Wrapper className="bg-[#FFFFFF] border border-[#E6E9EA] shadow-sm">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#12202E]">
            Billing
          </h1>
          <p className="text-sm text-gray-500 font-light">
            Create and manage bills for farmers & merchants.
          </p>
        </div>

        {/* Forms Section */}
        <div className="flex flex-col gap-6">
          <InfoForm />
          <VegForm />
        </div>

        {/* Final Bill */}
        <div className="mt-6">
          <BillForm />
        </div>

      </Wrapper>
    </BillProvider>
  );
};

export default Bill;
