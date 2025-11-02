import React, { createContext,useEffect, useContext, useState, useCallback } from 'react';

const BillContext = createContext();

export const useBill = () => useContext(BillContext);

export const BillProvider = ({ children }) => {
  const [generalInfo, setGeneralInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [calulation,setCalulation]= useState([]);
  const [billData, setBillData] = useState({ generalInfo: {}, products: [] });



  useEffect(() => {
    setBillData({ generalInfo, products });
  }, [generalInfo, products]);

  // Add product
  const addProduct = useCallback((product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  // Add general info
  const addGeneralInfo = useCallback((info) => {
    setGeneralInfo(info);
  }, []);

  // Reset all
  const resetBill = useCallback(() => {
    setGeneralInfo({});
    setProducts([]);
    setBillData({});
  }, []);

  return (
    <BillContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        addGeneralInfo,
        products,
        addProduct,
        billData,
        setBillData,
        resetBill,
        calulation,
        setCalulation
      }}
    >
      {children}
    </BillContext.Provider>
  );
};
