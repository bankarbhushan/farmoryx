import React, {useState} from 'react'
import {LuEye} from 'react-icons/lu'
import {FaRegEyeSlash} from 'react-icons/fa6'
import Register_Image from '../../../assets/Images/Register_Image'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [role, setRole] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
  })

  const handleChange = (field, value) => {
    setUserData((prev) => ({...prev, [field]: value}))
  }

  const handleAdminRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/register', {
        admin: userData,
      })
      console.log('Admin registered successfully:', response.data)
    } catch (error) {
      console.error('Register user error:', error.message)
    }
  }

  const Input = ({label, type, placeholder, value, onChange}) => (
    <div className="flex gap-2.5 justify-start w-full">
      <label className="block text-gray-700 font-medium mb-2 w-[30%]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      />
    </div>
  )

  const PasswordInput = ({label, value, onChange}) => (
    <div className="flex gap-2.5 justify-start w-full">
      <label className="block w-[30%] text-gray-700 font-medium mb-2">{label}</label>
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-green-600"
        >
          {showPassword ? (
            <LuEye className="text-xl" />
          ) : (
            <FaRegEyeSlash className="text-xl" />
          )}
        </button>
      </div>
    </div>
  )

  const renderFields = () => {
    switch (role) {
      case 'admin':
        return (
          <>
            <Input
              label="Name"
              type="text"
              placeholder="Enter full name"
              value={userData.name}
              onChange={(val) => handleChange('name', val)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter email"
              value={userData.email}
              onChange={(val) => handleChange('email', val)}
            />
            <PasswordInput
              label="Password"
              value={userData.password}
              onChange={(val) => handleChange('password', val)}
            />
            <Input
              label="Mobile"
              type="tel"
              placeholder="Enter mobile number"
              value={userData.mobile}
              onChange={(val) => handleChange('mobile', val)}
            />
          </>
        )

      case 'farmer':
        return (
          <>
            <Input
              label="Name"
              type="text"
              placeholder="Enter farmer name"
              value={userData.name}
              onChange={(val) => handleChange('name', val)}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="Enter mobile number"
              value={userData.mobile}
              onChange={(val) => handleChange('mobile', val)}
            />
            <Input
              label="Village"
              type="text"
              placeholder="Enter village"
              value={userData.address || ''}
              onChange={(val) => handleChange('address', val)}
            />
          </>
        )

      case 'merchant':
      case 'broker':
        return (
          <>
            <Input
              label="Name"
              type="text"
              placeholder="Enter name"
              value={userData.name}
              onChange={(val) => handleChange('name', val)}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="Enter mobile number"
              value={userData.mobile}
              onChange={(val) => handleChange('mobile', val)}
            />
            <Input
              label="City"
              type="text"
              placeholder="Enter city"
              value={userData.city || ''}
              onChange={(val) => handleChange('city', val)}
            />
            <Input
              label="Business Name"
              type="text"
              placeholder="Enter business/shop name"
              value={userData.business || ''}
              onChange={(val) => handleChange('business', val)}
            />
          </>
        )

      default:
        return <p className="text-gray-500">Please select a role to continue.</p>
    }
  }

  return (
    <div className="flex flex-col-reverse md:flex-row min-w-full">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 bg-green-50">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
            Register as {role || 'User'}
          </h2>

          <div className="mb-6 flex gap-2.5 justify-start w-full">
            <label className="block text-gray-700 font-medium mb-2 w-[30%]">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value)
                handleChange('role', e.target.value)
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            >
              <option value="" disabled>
                -- Select Role --
              </option>
              <option value="admin">Admin</option>
              <option value="farmer">Farmer</option>
              <option value="merchant">Merchant</option>
              <option value="broker">Broker</option>
            </select>
          </div>

          <form className="space-y-5" onSubmit={handleAdminRegister}>
            {renderFields()}
            <button
              type="submit"
              className="mt-6 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <div className="pt-6 md:flex md:w-1/2 items-center md:items-start justify-center bg-green-50">
        <Register_Image />
      </div>
    </div>
  )
}

export default Register
