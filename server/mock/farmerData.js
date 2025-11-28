import mongoose from 'mongoose'
import {Farmer} from '../src/models/farmer.model.js'

const farmers = [
  {
    name: 'mahesh jadhav',
    village: 'Nandgaon',
    mobile: '9834567890',
  },
  {
    name: 'ganesh shinde',
    village: 'Chalisgaon',
    mobile: '9811122233',
  },
  {
    name: 'prakash deshmukh',
    village: 'Parola',
    mobile: '9898989898',
  },
  {
    name: 'vijay more',
    village: 'Malegaon',
    mobile: '9765432109',
  },
  {
    name: 'santosh kale',
    village: 'Dhule',
    mobile: '9933445566',
  },
  {
    name: 'ravindra chavan',
    village: 'Jamner',
    mobile: '9822001122',
  },
  {
    name: 'ashok gaikwad',
    village: 'Bhadgaon',
    mobile: '9867543210',
  },
  {
    name: 'nitin koli',
    village: 'Erandol',
    mobile: '9812345678',
  },
  {
    name: 'bhaskar borse',
    village: 'Pimpalner',
    mobile: '9876012345',
  },
  {
    name: 'rohit ahire',
    village: 'Satana',
    mobile: '9829004567',
  },
  {
    name: 'anil wagh',
    village: 'myworld',
    mobile: '9911223344',
  },
  {
    name: 'shankar sonawane',
    village: 'Deola',
    mobile: '9800123456',
  },
  {
    name: 'kiran dabhade',
    village: 'Lasalgaon',
    mobile: '9887654321',
  },
  {
    name: 'tushar chaudhari',
    village: 'Kalwan',
    mobile: '9845012345',
  },
  {
    name: 'sanjay pawar',
    village: 'Sinnar',
    mobile: '9812233445',
  },
  {
    name: 'dinesh bhalerao',
    village: 'Manmad',
    mobile: '9899001122',
  },
  {
    name: 'vikas nikam',
    village: 'Yeola',
    mobile: '9823456789',
  },
  {
    name: 'swapnil shelke',
    village: 'Ojhar',
    mobile: '9877701234',
  },
  {
    name: 'vishakha',
    village: 'wagholi',
    mobile: '7889987887',
  },
  {
    name: 'bhushan',
    village: 'bhjnm',
    mobile: '9898989890',
  },
]

const MONGO_URI =
  'mongodb+srv://Bhushan:ZXhwmp3K7CISI2uz@cluster0.fxsvhhy.mongodb.net/famory_db'

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB')

    await Farmer.insertMany(farmers)

    console.log('Farmer Inserted Successfully!')
    mongoose.connection.close()
  })
  .catch((err) => console.error(err))
