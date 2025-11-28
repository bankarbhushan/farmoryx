import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const BillModal = ({editing, onClose, defaultUserType = 'Farmer'}) => {
  const [userType, setUserType] = useState(editing?.userType || defaultUserType)
  const [userList, setUserList] = useState([])
  const [form, setForm] = useState({
    userRef: editing?.userRef?._id || editing?.userRef || '',
    brokerId: editing?.brokerId || '',
    billDate: editing?.billDate
      ? editing.billDate.split('T')[0]
      : new Date().toISOString().slice(0, 10),
    weekday: editing?.weekday || '',
    items: editing?.items || [],
    totalAmount: editing?.totalAmount || 0,
    commissionAmount: editing?.commissionAmount || 0,
    pattiCharges: editing?.pattiCharges || 0,
    advancePaid: editing?.advancePaid || 0,
    externalVegCost: editing?.externalVegCost || 0,
    netTotal: editing?.netTotal || 0,
  })

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const url =
          userType === 'Farmer' ? '/api/v1/farmer/feed' : '/api/v1/merchant/list' // implement merchant route
        const res = await axios.get(url)
        setUserList(res.data.data || [])
      } catch (error) {
        toast.error('Failed to load users')
      }
    }
    loadUsers()
  }, [userType])

  const handleSubmit = async () => {
    try {
      if (editing) {
        await axios.patch(`/api/v1/bill/update/${editing._id}`, {...form, userType})
        toast.success('Bill updated')
      } else {
        await axios.post('/api/v1/bill/create', {...form, userType})
        toast.success('Bill created')
      }
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed')
    }
  }

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3>{editing ? 'Update Bill' : 'Create Bill'}</h3>
        <div>
          <label>User Type</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="Farmer">Farmer</option>
            <option value="Merchant">Merchant</option>
          </select>

          <label>Select {userType}</label>
          <select
            value={form.userRef}
            onChange={(e) => setForm({...form, userRef: e.target.value})}
          >
            <option value="">Select</option>
            {userList.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} — {u.village}
              </option>
            ))}
          </select>

          {/* items, totals inputs... keep simple for now */}
        </div>

        <div className="modal-action">
          <button onClick={handleSubmit}>{editing ? 'Save' : 'Create'}</button>
          <button onClick={() => onClose()}>Cancel</button>
        </div>
      </div>
    </dialog>
  )
}

export default BillModal
