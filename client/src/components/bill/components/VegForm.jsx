import React, {useState, useEffect} from 'react'
import {useBill} from '../context/BillContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import Loader from '../../constants/Loader'

const VegForm = () => {
  const [vegitables, setVegitables] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {addProduct, formData, setFormData} = useBill()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isVegSelected, setIsVegSelected] = useState(false)

  // Fetch vegetables
  const getVeg = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get('http://localhost:3000/api/v1/veg/feed')
      setVegitables(res.data.data || [])
      setIsLoading(false)
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong'
      toast.error(msg)
      setVegitables([])
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getVeg()
  }, [])

  // Handle input typing
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))

    if (name === 'productName') setShowSuggestions(true)
  }

  // Handle vegetable selection from suggestions
  const handleSelectVeg = (vegName) => {
    setFormData((prev) => ({...prev, productName: vegName}))
    setShowSuggestions(false)
    setIsVegSelected(true)
  }

  // Add product to context
  const handleAddProduct = (e) => {
    e.preventDefault()

    const {productName, weight, rate} = formData

    if (!productName || !weight || !rate) {
      toast.error('Please fill all fields!')
      return
    }

    if (Number(weight) <= 0 || Number(rate) <= 0) {
      toast.error('Weight and Rate must be greater than 0')
      return
    }

    addProduct(formData)
    setFormData((prev) => ({...prev, productName: '', weight: '', rate: ''}))
    setIsVegSelected(false)
    setShowSuggestions(false)

    toast.success(`Product ${productName} added successfully!`)
  }
  const handleClear = () => {
    setFormData((prev) => ({...prev, productName: '', weight: '', rate: ''}))
    setIsVegSelected(false)
  }

  // Filter vegetables dynamically
  const filteredVeggies = vegitables.filter(
    (veg) =>
      veg.marathiName.toLowerCase().includes(formData.productName.toLowerCase()) ||
      veg.hinglishName.toLowerCase().includes(formData.productName.toLowerCase()) ||
      veg.englishName.toLowerCase().includes(formData.productName.toLowerCase()),
  )

  if (isLoading) return <Loader />

  return (
    <div className="bg-white border shadow-sm border-gray-200 rounded-md p-6 flex flex-col gap-6">
      <form onSubmit={handleAddProduct} className="flex flex-col items-end">
        <div className="flex flex-col md:flex-row gap-3 w-full relative">
          {/* Product Name */}
          <div className="w-full md:w-1/3 relative">
            <label className="label text-sm">Product Name</label>
            <input
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="भाजीचे नाव टाइप करा किंवा निवडा"
              className="input input-accent w-full"
              autoComplete="off"
              disabled={isVegSelected}
            />
            {showSuggestions && filteredVeggies.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-teal-400 rounded-md shadow-md max-h-60 overflow-y-auto z-10">
                {filteredVeggies.map((veg) => (
                  <li
                    key={veg.id}
                    onClick={() => handleSelectVeg(veg.marathiName)}
                    className="px-3 py-2 w-full hover:bg-green-100 cursor-pointer"
                  >
                    {veg.marathiName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Weight */}
          <div className="w-full md:w-1/3">
            <label className="label text-sm">Weight (kg)</label>
            <input
              name="weight"
              type="number"
              min="0"
              value={formData.weight}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) =>
                ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
              }
              placeholder="Weight"
              className="input input-accent w-full"
            />
          </div>

          {/* Rate */}
          <div className="w-full md:w-1/3">
            <label className="label text-sm">Rate (₹/kg)</label>
            <input
              name="rate"
              type="number"
              min="0"
              value={formData.rate}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) =>
                ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
              }
              placeholder="Rate/kg"
              className="input input-accent w-full"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button type="button" className="btn rounded-md" onClick={handleClear}>
            Clear
          </button>
          <button
            type="submit"
            className="btn bg-[#16C79A] text-white rounded-md hover:bg-[#11D18C] shadow-sm transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default VegForm
