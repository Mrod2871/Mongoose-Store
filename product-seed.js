//Dependencies
const mongoose = require('mongoose')
const Product = require('./models/products.js')
require('dotenv').config()

//Mongoose Connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//Seed Data
const Products = [
  {
    name: 'Beans',
    description: 'A small pile of beans. Buy more beans for a big pile of beans.',
    img: 'https://imgur.com/LEHS8h3.png',
    price: 5,
    qty: 99
  }, {
    name: 'Bones',
    description: "It's just a bag of bones.",
    img: 'https://imgur.com/dalOqwk.png',
    price: 25,
    qty: 0
  }, {
    name: 'Bins',
    description: 'A stack of colorful bins for your beans and bones.',
    img: 'https://imgur.com/ptWDPO1.png',
    price: 7000,
    qty: 1
  }
]

//Seeding website
const seedDb = async () => {
  await Product.deleteMany({})
  await Product.insertMany(Products)
}
seedDb().then( () => {
  mongoose.connection.close()
})
