import e from 'express';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/client', {useNewUrlParser: true, useUnifiedTopology: true});

const clientsSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    enterprise: String,
    emails: Array,
    age: Number,
    category: String,
    orders: Array
});

const Clients = mongoose.model('client', clientsSchema);

// Productos

const productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
});

const Products = mongoose.model('product', productsSchema);

// PEDIDOS 
    const pedidosSchema = new mongoose.Schema({
        pedido: Array,
        total: Number,
        fecha: Date,
        cliente: String,
        estado: String
    })

    const Pedidos = mongoose.model('pedido', pedidosSchema)

export { Clients, Products, Pedidos};