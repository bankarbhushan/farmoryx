import React, {useState, useEffect} from 'react'
import Wrapper from '../constants/Wrapper'
import Card from '../constants/Card'

import {
  FaUsers,
  FaMoneyBillWave,
  FaLeaf,
  FaClipboardList,
  FaChartLine,
  FaChartPie,
  FaExclamationTriangle,
  FaCrown,
  FaChartBar,
  FaShoppingCart,
  FaHandHoldingUsd,
} from 'react-icons/fa'

import {FiSend, FiArrowDownCircle} from 'react-icons/fi'

import Loader from '../constants/Loader'
import {
  getBills,
  getFarmer,
  getFarmerBills,
  getMerchantBills,
  getMerchants,
  getVeg,
} from '../../api/dashbord'

const Dashboard = () => {
  const [farmers, setFarmers] = useState([])
  const [merchants, setMerchants] = useState([])
  const [vegs, setVegs] = useState([])
  const [bills, setBills] = useState([])
  const [farmerBills, setFarmersBills] = useState([])
  const [merchantBills, setMerchantBills] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  // Today's Bills
  const todayFarmerBills = farmerBills.filter((bill) => bill.billDate === today)
  const todayMerchantBills = merchantBills.filter((bill) => bill.billDate === today)
  // -------------------------
  // A) Today Snapshot
  // -------------------------
  const todaysRevenue = todayFarmerBills.reduce(
    (s, b) => s + (b.commissionAmount || 0),
    0,
  )

  // -------------------------
  // B) Monthly Totals
  // -------------------------
  const currentMonth = new Date().getMonth() + 1
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1

  const thisMonthFarmerBills = farmerBills.filter(
    (b) => new Date(b.billDate).getMonth() + 1 === currentMonth,
  )
  const prevMonthFarmerBills = farmerBills.filter(
    (b) => new Date(b.billDate).getMonth() + 1 === previousMonth,
  )

  const thisMonthRevenue = thisMonthFarmerBills.reduce(
    (s, b) => s + (b.commissionAmount || 0),
    0,
  )
  const previousMonthRevenue = prevMonthFarmerBills.reduce(
    (s, b) => s + (b.commissionAmount || 0),
    0,
  )

  const growthPercent =
    previousMonthRevenue > 0
      ? (
          ((thisMonthRevenue - previousMonthRevenue) / previousMonthRevenue) *
          100
        ).toFixed(2)
      : 100

  // D) Analytics

  // Top 5 Farmers (based on amount)
  const topFarmers = [...farmerBills].sort((a, b) => b.netTotal - a.netTotal).slice(0, 5)

  console.log(topFarmers)

  // Top 5 Merchants
  const topMerchants = [...merchantBills]
    .sort((a, b) => b.netTotal - a.netTotal)
    .slice(0, 5)
  console.log(bills)
  // Most Selling Vegetables
  const vegCount = {}

  bills.forEach((bill) => {
    bill?.items?.forEach((item) => {
      vegCount[item.productName] = (vegCount[item.productName] || 0) + item.weight
    })
  })

  // Convert into array → sort → top 5
  const mostSelling = Object.entries(vegCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5) // top 5

  console.log('Most Selling:', mostSelling)
  // Example output: [["Carrot", 120], ["Potato", 95] ...]

  // 1. TOTAL VOLUME = farmer + merchant
  const totalVolume = bills.reduce((sum, b) => sum + (b.netTotal || 0), 0)

  // 2. TOTAL PAYOUT TO FARMERS
  const totalPayoutFarmers = farmerBills.reduce((sum, b) => sum + (b.netTotal || 0), 0)

  // 3. TOTAL COLLECTIONS FROM MERCHANTS
  const totalCollectionMerchants = merchantBills.reduce(
    (sum, b) => sum + (b.netTotal || 0),
    0,
  )
  const formatMoney = (amount) =>
    amount.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await getFarmer(setFarmers)
      await getMerchants(setMerchants)
      await getVeg(setVegs)
      await getBills(setBills)
      await getFarmerBills(setFarmersBills)
      await getMerchantBills(setMerchantBills)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return isLoading ? (
    <Loader />
  ) : (
    <Wrapper className="bg-white p-6 font-inter">
      {/* Title */}
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">
        Full overview of daily activity, totals, revenue and insights.
      </p>

      {/* TODAY SNAPSHOT */}
      <h2 className="text-lg font-medium text-gray-700 mb-3">Today’s Snapshot</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Card
          title="Today's Farmer Entries"
          value={todayFarmerBills.length}
          icon={<FaUsers />}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <Card
          title="Today's Merchant Entries"
          value={todayMerchantBills.length}
          icon={<FaUsers />}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <Card
          title="Today's Revenue"
          value={`₹ ${todaysRevenue.toLocaleString('en-IN')}`}
          icon={<FaMoneyBillWave />}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />

        <Card
          title="Today's Total Bills"
          value={todayFarmerBills.length + todayMerchantBills.length}
          icon={<FaClipboardList />}
          bgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
      </div>

      {/* ANALYTICS */}
      <h2 className="text-lg font-medium text-gray-700 mb-3">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <Card
          title="Top Farmers (Highest Business)"
          value={
            topFarmers.length > 0 ? (
              <div className="space-y-1">
                {topFarmers.map((tp, index) => (
                  <div
                    key={tp._id || index}
                    className="flex ml-8 mt-4 items-center gap-2"
                  >
                    <span className=" text-sm font-light text-purple-500">
                      {index + 1}.
                    </span>
                    <p className="text-sm font-light text-gray-500">{tp.userName}</p>
                  </div>
                ))}
              </div>
            ) : (
              '-'
            )
          }
          icon={<FaCrown />}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <Card
          title="Top Merchants (Highest Business)"
          value={
            topMerchants.length > 0 ? (
              <div className="space-y-1">
                {topMerchants.map((tp, index) => (
                  <div
                    key={tp._id || index}
                    className="flex ml-8 mt-4 items-center gap-2"
                  >
                    <span className="font-light text-sm text-purple-500">
                      {index + 1}.
                    </span>
                    <p className="text-sm font-light text-gray-500">{tp.userName}</p>
                  </div>
                ))}
              </div>
            ) : (
              '-'
            )
          }
          icon={<FaCrown />}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <Card
          title="Top 5 Most Selling Vegetables"
          value={
            mostSelling && mostSelling.length > 0 ? (
              <div className="flex flex-col mt-4 m-4 space-y-1">
                {mostSelling.map((veg, index) => (
                  <div key={index} className="flex gap-2 mb-4 text-sm">
                    <span className="font-light text-blue-700">{index + 1}.</span>
                    <span className="font-medium text-gray-500"> {veg[0]}</span>
                    <span className="text-gray-500 font-light">{veg[1]} kg</span>
                  </div>
                ))}
              </div>
            ) : (
              '-'
            )
          }
          icon={<FaShoppingCart />}
          bgColor="bg-indigo-100"
          iconColor="text-indigo-600"
        />
      </div>

      {/* OVERALL TOTALS */}
      <h2 className="text-lg font-medium text-gray-700 mb-3">Overall Totals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <Card
          title="Total Farmers"
          value={farmers.length}
          icon={<FaUsers />}
          bgColor="bg-orange-100"
          iconColor="text-orange-500"
        />
        <Card
          title="Total Merchants"
          value={merchants.length}
          icon={<FaUsers />}
          bgColor="bg-orange-100"
          iconColor="text-orange-500"
        />
        <Card
          title="Total Vegetables"
          value={vegs.length}
          icon={<FaLeaf />}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />

        <Card
          title="Total Bills"
          value={bills.length}
          icon={<FaClipboardList />}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <Card
          title="Farmer Bills"
          value={farmerBills.length}
          icon={<FaClipboardList />}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <Card
          title="Merchant Bills"
          value={merchantBills.length}
          icon={<FaClipboardList />}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* MONTHLY PERFORMANCE */}
      <h2 className="text-lg font-medium text-gray-700 mb-3">Monthly Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <Card
          title="This Month Revenue"
          value={`₹ ${thisMonthRevenue.toLocaleString('en-IN')}`}
          icon={<FaChartPie />}
          bgColor="bg-teal-100"
          iconColor="text-teal-600"
        />
        <Card
          title="Previous Month Revenue"
          value={`₹ ${previousMonthRevenue.toLocaleString('en-IN')}`}
          icon={<FaChartPie />}
          bgColor="bg-teal-100"
          iconColor="text-teal-600"
        />
        <Card
          title="Growth %"
          value={`${growthPercent}%`}
          icon={<FaChartLine />}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
      </div>
      
      {/*  Business Metrics */}
      <h2 className="text-lg font-medium text-gray-700 mb-3">Business Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <Card
          title="Total Volume"
          value={`₹ ${formatMoney(totalVolume)}`}
          icon={<FaChartBar />}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <Card
          title="Total Payout to Farmers"
          value={`₹ ${formatMoney(totalPayoutFarmers)}`}
          icon={<FiSend />}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />

        <Card
          title="Total Collections from Merchants"
          value={`₹ ${formatMoney(totalCollectionMerchants)}`}
          icon={<FiArrowDownCircle />}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>
    </Wrapper>
  )
}

export default Dashboard
