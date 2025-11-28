import mongoose from 'mongoose'
import {Merchant} from '../src/models/merchant.model.js'

const merchants = (merchants = [
  {
    id: 1,
    name: 'Rajesh Agarwal',
    village: 'Malegaon',
    mobile: '7878675667',
    shopName: 'Agarwal Vegetables',
  },
  {
    id: 2,
    name: 'Mahesh Jain',
    village: 'Dhule',
    mobile: '9876542167',
    shopName: 'FreshMart Traders',
  },
  {
    id: 3,
    name: 'Pravin Mehta',
    village: 'Nashik',
    mobile: '9812233467899',
    shopName: 'Mehta Veg Suppliers',
  },
  {
    id: 4,
    name: 'Sanjay Patel',
    village: 'Niphad',
    mobile: '9834512345',
    shopName: 'Green Leaf Traders',
  },
  {
    id: 5,
    name: 'Vikram Shah',
    village: 'Yeola',
    mobile: '9898898898',
    shopName: 'Shah Veg Distributors',
  },
  {
    id: 6,
    name: 'Nilesh Bansal',
    village: 'Satana',
    mobile: '9825678901',
    shopName: 'Bansal AgroMart',
  },
  {
    id: 7,
    name: 'Ravi Goyal',
    village: 'Sinnar',
    mobile: '9911225566',
    shopName: 'Goyal Fresh Supply',
  },
  {
    id: 8,
    name: 'Anil Bhatt',
    village: 'Pimpalgaon',
    mobile: '9845012345',
    shopName: 'Bhatt Farm Produce',
  },
  {
    id: 9,
    name: 'Deepak Trivedi',
    village: 'Kalwan',
    mobile: '9822003344',
    shopName: 'Trivedi Veg Wholesale',
  },
  {
    id: 10,
    name: 'Sunil Agarwal',
    village: 'Lasalgaon',
    mobile: '9876014567',
    shopName: 'Agarwal Fruits & Veggies',
  },
  {
    id: 11,
    name: 'Manoj Shah',
    village: 'Deola',
    mobile: '9812348899',
    shopName: 'Shah Agro Supply',
  },
  {
    id: 12,
    name: 'Ashok Kothari',
    village: 'Erandol',
    mobile: '9899007788',
    shopName: 'Kothari Veg Mart',
  },
  {
    id: 13,
    name: 'Naresh Singhal',
    village: 'Jamner',
    mobile: '9887009988',
    shopName: 'Singhal Veg Exporters',
  },
  {
    id: 14,
    name: 'Kishor Mahajan',
    village: 'Parola',
    mobile: '9811112233',
    shopName: 'Mahajan Fresh Foods',
  },
  {
    id: 15,
    name: 'Ramesh Patil',
    village: 'Chalisgaon',
    mobile: '9823456677',
    shopName: 'Patil Vegetable Traders',
  },
  {
    id: 16,
    name: 'Rajiv Chauhan',
    village: 'Bhadgaon',
    mobile: '9867543210',
    shopName: 'Chauhan Farm Connect',
  },
  {
    id: 17,
    name: 'Vikas Joshi',
    village: 'Shirpur',
    mobile: '9800123456',
    shopName: 'Joshi Agro Products',
  },
  {
    id: 18,
    name: 'Paresh Modi',
    village: 'Manmad',
    mobile: '9877701234',
    shopName: 'Modi Veg Distributors',
  },
  {
    id: 19,
    name: 'Harish Vora',
    village: 'Ojhar',
    mobile: '9833322110',
    shopName: 'Vora Agro Supply',
  },
  {
    id: 20,
    name: 'Amit Doshi',
    village: 'Nandgaon',
    mobile: '9845678901',
    shopName: 'Doshi Vegetable Mart',
  },
  {id: 21, name: 'Vishakha', village: 'Wagholi', mobile: '7878675667', shopName: 'Veg'},
])

const MONGO_URI =
  'mongodb+srv://Bhushan:ZXhwmp3K7CISI2uz@cluster0.fxsvhhy.mongodb.net/famory_db'

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB')

    await Merchant.insertMany(merchants)

    console.log('merchants Inserted Successfully!')
    mongoose.connection.close()
  })
  .catch((err) => console.error(err))
