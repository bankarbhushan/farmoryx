import React, {createContext, useContext, useState, useCallback} from 'react'

const BillContext = createContext()
export const useBill = () => useContext(BillContext)

export const BillProvider = ({children}) => {
  const [generalInfo, setGeneralInfo] = useState({})
  const [products, setProducts] = useState([])
  const [calulation, setCalulation] = useState([])
  // const [billData, setBillData] = useState({ generalInfo: {}, products: [] });
  const [editIndex, setEditIndex] = useState(null)

  // 🔹 Shared form data for product editing
  const [formData, setFormData] = useState({
    productName: '',
    weight: '',
    rate: '',
  })

  // Add product
  const addProduct = useCallback(
    (product) => {
      if (editIndex !== null) {
        const updated = [...products]
        updated[editIndex] = product
        setProducts(updated)
        setEditIndex(null)
      } else {
        setProducts((prev) => [...prev, product])
      }
    },
    [products, editIndex],
  )

  // Add general info
  const addGeneralInfo = useCallback((info) => {
    setGeneralInfo(info)
  }, [])

  // Reset all
  const resetBill = useCallback(() => {
    setGeneralInfo({})
    setProducts([])
  }, [])

  return (
    <BillContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        addGeneralInfo,
        products,
        addProduct,
        resetBill,
        calulation,
        setCalulation,
        editIndex,
        setEditIndex,
        formData,
        setFormData,
      }}
    >
      {children}
    </BillContext.Provider>
  )
}
