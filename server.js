const express = require('express');
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const Product = require('./models/products')
const app = express();
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
// Body parser middleware: give us access to req.body
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'))



//Index /Get
app.get('/', async (req, res) => {
    const products = await Product.find({})
	res.render('index.ejs', {
        products: products,
    });
});

//New /Get
app.get('/new', (req, res) => {
    res.render('new.ejs')
})

// Destroy /Delete
app.delete('/:id', async (req, res) => {
    await Product.findByIdAndRemove(req.params.id,)
    res.redirect('/')
})

//Update /Put
app.put('/:id', async (req, res) => {
    let i = req.params.id
    const {name, description, img, price, qty} = req.body
    await Product.findByIdAndUpdate(req.params.id, req.body, {new:true}) 
    res.redirect('/')
})

//Create / Post
app.post('/', async (req, res) => {
    const {name, description, img, price, qty} = req.body
    await Product.create({name, description, img, price, qty})
    res.redirect('/')
})

//Edit /Get
app.get('/:id/edit', async(req,res) => {
    const editedProduct = await Product.findById(req.params.id).exec()
    res.render('edit.ejs', 
    {
        product: editedProduct,
    })
})

// Show /Get
app.get('/:id', async(req, res) => {
	const selectedProduct = await Product.findById(req.params.id).exec()
    res.render('show.ejs', 
    {
        product: selectedProduct,
        
    })
})

//Buy /Post
app.post('/:id/buy', async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product.stock > 0){
        product.stock--
    }else{
        res.status(400).send('Product out of Stock')
        return
    }
    await product.save()
})

//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))