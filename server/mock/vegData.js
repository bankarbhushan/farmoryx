import mongoose from 'mongoose'
import {Vegetable} from '../src/models/veg.model.js'

const vegetables = [
  {id: 1, marathiName: 'वांगे', hinglishName: 'Vangi', englishName: 'Brinjal'},
  {id: 2, marathiName: 'टोमॅटो', hinglishName: 'Tamatar', englishName: 'Tomato'},
  {id: 3, marathiName: 'बटाटा', hinglishName: 'Batata', englishName: 'Potato'},
  {id: 4, marathiName: 'कांदा', hinglishName: 'Kanda', englishName: 'Onion'},
  {
    id: 5,
    marathiName: 'भेंडी',
    hinglishName: 'Bhendi',
    englishName: 'Lady Finger (Okra)',
  },
  {id: 6, marathiName: 'दोडका', hinglishName: 'Doodka', englishName: 'Ridge Gourd'},
  {id: 7, marathiName: 'तोंडली', hinglishName: 'Tondali', englishName: 'Ivy Gourd'},
  {id: 8, marathiName: 'कोबी', hinglishName: 'Kobi', englishName: 'Cabbage'},
  {id: 9, marathiName: 'फुलकोबी', hinglishName: 'Phulkobi', englishName: 'Cauliflower'},
  {id: 10, marathiName: 'पालक', hinglishName: 'Palak', englishName: 'Spinach'},
  {id: 11, marathiName: 'गाजर', hinglishName: 'Gajar', englishName: 'Carrot'},
  {
    id: 12,
    marathiName: 'सिमला मिरची',
    hinglishName: 'Simla Mirchi',
    englishName: 'Capsicum',
  },
  {id: 13, marathiName: 'बीट', hinglishName: 'Beet', englishName: 'Beetroot'},
  {id: 14, marathiName: 'मुळा', hinglishName: 'Mula', englishName: 'Radish'},
  {id: 15, marathiName: 'लसूण', hinglishName: 'Lasun', englishName: 'Garlic'},
  {
    id: 16,
    marathiName: 'आल्याचे कंद',
    hinglishName: 'Alyache Kand',
    englishName: 'Ginger',
  },
  {id: 17, marathiName: 'काकडी', hinglishName: 'Kakdi', englishName: 'Cucumber'},
  {id: 18, marathiName: 'फणस', hinglishName: 'Phanas', englishName: 'Pumpkin'},
  {
    id: 19,
    marathiName: 'शिमला मिरची',
    hinglishName: 'Shimla Mirchi',
    englishName: 'Bell Pepper',
  },
  {
    id: 20,
    marathiName: 'कोबीची फुले',
    hinglishName: 'Kobi Chi Phule',
    englishName: 'Cauliflower Florets',
  },
  {
    id: 21,
    marathiName: 'पालकाची पाने',
    hinglishName: 'Palak Chi Pane',
    englishName: 'Spinach Leaves',
  },
  {id: 22, marathiName: 'गवार', hinglishName: 'Gawar', englishName: 'Cluster Beans'},
  {id: 23, marathiName: 'राजगिरा', hinglishName: 'Rajgira', englishName: 'Amaranth'},
  {id: 24, marathiName: 'सोयाबीन', hinglishName: 'Soyabean', englishName: 'Soybean'},
  {
    id: 25,
    marathiName: 'फुलकोबीची फुले',
    hinglishName: 'Phulkobi Chi Phule',
    englishName: 'Cauliflower Buds',
  },
  {id: 26, marathiName: 'भोपळा', hinglishName: 'Bhopala', englishName: 'Pumpkin'},
  {
    id: 27,
    marathiName: 'टिंडे',
    hinglishName: 'Tinde',
    englishName: 'Indian Round Gourd',
  },
  {id: 28, marathiName: 'शेंगदाणे', hinglishName: 'Shengdane', englishName: 'Peanuts'},
  {id: 29, marathiName: 'कांद्रकंद', hinglishName: 'Kandrakand', englishName: 'Yam'},
  {
    id: 30,
    marathiName: 'भेंडीची फुले',
    hinglishName: 'Bhendi Chi Phule',
    englishName: 'Okra Buds',
  },
  {
    id: 31,
    marathiName: 'गवाराची फुले',
    hinglishName: 'Gawar Chi Phule',
    englishName: 'Cluster Beans Buds',
  },
  {
    id: 32,
    marathiName: 'कांदा लसूण',
    hinglishName: 'Kanda Lasun',
    englishName: 'Onion-Garlic Mix',
  },
  {
    id: 33,
    marathiName: 'मुळ्याची पाने',
    hinglishName: 'Mulya Chi Pane',
    englishName: 'Radish Leaves',
  },
  {
    id: 34,
    marathiName: 'गाजराची फुले',
    hinglishName: 'Gajar Chi Phule',
    englishName: 'Carrot Tops',
  },
  {
    id: 35,
    marathiName: 'लसूणाची फुले',
    hinglishName: 'Lasun Chi Phule',
    englishName: 'Garlic Florets',
  },
  {
    id: 36,
    marathiName: 'आल्याची फुले',
    hinglishName: 'Alyachi Phule',
    englishName: 'Ginger Florets',
  },
  {
    id: 37,
    marathiName: 'कोबीची पाने',
    hinglishName: 'Kobi Chi Pane',
    englishName: 'Cabbage Leaves',
  },
  {
    id: 38,
    marathiName: 'भोपळ्याची फुले',
    hinglishName: 'Bhopalya Chi Phule',
    englishName: 'Pumpkin Buds',
  },
  {
    id: 39,
    marathiName: 'टोमॅटोची फुले',
    hinglishName: 'Tamatar Chi Phule',
    englishName: 'Tomato Buds',
  },
  {
    id: 40,
    marathiName: 'वांगेची फुले',
    hinglishName: 'Vangi Chi Phule',
    englishName: 'Brinjal Buds',
  },
  {
    id: 41,
    marathiName: 'काकडीची फुले',
    hinglishName: 'Kakdi Chi Phule',
    englishName: 'Cucumber Buds',
  },
  {
    id: 42,
    marathiName: 'सिमला मिरचीची फुले',
    hinglishName: 'Simla Mirchi Chi Phule',
    englishName: 'Capsicum Buds',
  },
  {
    id: 43,
    marathiName: 'बीटची फुले',
    hinglishName: 'Beet Chi Phule',
    englishName: 'Beet Buds',
  },
  {id: 44, marathiName: 'लिंबू', hinglishName: 'Limbu', englishName: 'Lemon'},
  {id: 45, marathiName: 'पपई', hinglishName: 'Papai', englishName: 'Papaya'},
  {id: 46, marathiName: 'सालक', hinglishName: 'Salak', englishName: 'Snake Fruit'},
  {id: 47, marathiName: 'द्राक्ष', hinglishName: 'Draksh', englishName: 'Grapes'},
  {id: 48, marathiName: 'सफरचंद', hinglishName: 'Safarchand', englishName: 'Apple'},
  {id: 49, marathiName: 'केळी', hinglishName: 'Keli', englishName: 'Banana'},
  {id: 50, marathiName: 'संत्रा', hinglishName: 'Santra', englishName: 'Orange'},
]

const MONGO_URI =
  'mongodb+srv://Bhushan:ZXhwmp3K7CISI2uz@cluster0.fxsvhhy.mongodb.net/famory_db'

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB')

    await Vegetable.insertMany(vegetables)

    console.log('vegetables Inserted Successfully!')
    mongoose.connection.close()
  })
  .catch((err) => console.error(err))
