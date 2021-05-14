import e from 'express';
import mongoose from 'mongoose';
import bcrypt, { hash } from 'bcrypt'

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/client', {useNewUrlParser: true, useUnifiedTopology: true});

const clientsSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    enterprise: String,
    emails: Array,
    age: Number,
    category: String,
    orders: Array,
    vendedor: mongoose.Types.ObjectId
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
        cliente: mongoose.Types.ObjectId,
        estado: String
    })

    const Pedidos = mongoose.model('pedido', pedidosSchema)

//Usuario
    const usauriosSchema = new mongoose.Schema({
        usuario: String,
        nombre: String,
        password: String,
        rol: String
    })


    // Hashear los password antes de guardarlos en la DB
    usauriosSchema.pre('save', function(next){
        if(!this.isModified('password')){
            return next()
        }
        // usamos bcrypt para encriptar la contrasenha con valor de 10 rondas
        bcrypt.genSalt(10, (err, salt) => {
            if(err) return next(err)
            // let password = this.password.toString()

            bcrypt.hash(this.password, salt, (err, hash) =>{
                if(err) return next(err)
                this.password = hash
                next()
            })
        })
    })
    const Usuarios = mongoose.model('usuarios', usauriosSchema)

export { Clients, Products, Pedidos, Usuarios};