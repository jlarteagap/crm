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
})

const Clients = mongoose.model('client', clientsSchema);

export { Clients };