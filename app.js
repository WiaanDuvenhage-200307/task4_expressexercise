const express = require('express');
const products = require('./products');
const obj = require('./products');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Get all products
app.get('/db/products', (req, res) => {
    res.json(obj);
})

// Get one product based on ID
app.get('/db/products/:id', (req, res) => {

    const selected = products.inventory.some(item => item.id === +req.params.id);

    if(selected){
        res.json(products.inventory.filter(item => item.id === +req.params.id));
    } else {
        res.status(400).json({msg: 'This guitar was not found'})
    }
})

// Add a new product
app.post('/db/addproduct/:id', (req, res) => {
    const newGuitar = {
        id: +req.params.id,
        brand: req.body.brand,
        model: req.body.model,
        type: req.body.type,
        price: +req.body.price,
        inStock: +req.body.inStock,
        desc: req.body.desc,
        availStock: req.body.availStock,
    }

    if (!newGuitar.id || !newGuitar.brand || !newGuitar.model || !newGuitar.type
        || !newGuitar.price || !newGuitar.inStock || !newGuitar.desc){
        return res.status(400).json({msg: "Jy is klipdom!"})
    }

    products.inventory.push(newGuitar);
    res.json(products);
})

//Delete a product
app.delete('/db/products/:id', (req, res) => {

    // decoupling
    const { id } = +req.params;

    const deleted = products.inventory.find(item => item.id === id);
    if(deleted){
        products = products.inventory.filter(item => item.id !== id);
        console.log(deleted);
    } else {
        res.status(404).json({msg: 'This does not exist'})
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server Started on port ${PORT}`)});