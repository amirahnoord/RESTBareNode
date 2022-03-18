const { getPostData } = require('../helpers/DataAccess');
const Product = require('../models/ProductModel');

// @desc    Gets all products
// @route   GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

// @desc    Gets All Products
// @route   GET /api/products
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc    Create New Product
// @route   POST /api/products
async function createProduct(req, res) {
    try {
        const body = await getPostData(req);
        const {title, description, price} = JSON.parse(body);
        const productData = {
            title,
            description,
            price
        }
        const newProduct = await Product.create(productData);

        res.writeHead(201, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error)   
    }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            const body = await getPostData(req);
            const {title, description, price} = JSON.parse(body);
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            const updatedProduct = await Product.update(id, productData);

            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(updatedProduct));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc    Create New Product
// @route   POST /api/products
async function createProduct(req, res) {
    try {
        const body = await getPostData(req);
        const {title, description, price} = JSON.parse(body);
        const productData = {
            title,
            description,
            price
        }
        const newProduct = await Product.create(productData);

        res.writeHead(201, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error)   
    }
}

// @desc    Delete a Product
// @route   DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            await Product.remove(id);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: `Product ${id} removed`}));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}