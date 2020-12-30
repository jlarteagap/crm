import express from 'express';
import mongoose from 'mongoose';
import { Clients, Pedidos, Products } from './db'

export const resolvers = {
    Query: {
        getClients : (root, {limit, offset}) => {
            return Clients.find({}).limit(limit).skip(offset)
        },
        getClient : (root, { id }) => {
            return new Promise((resolve, object) => {
                Clients.findById(id, (error, client) =>{
                    if(error) rejects(error)
                    else resolve(client)
                });
            })
        },
        totalClients : (root) => {
            return new Promise((resolve, object) => {
                /* countDocument nos permite contar cuantos datos hay en la BD */ 
                Clients.countDocuments({}, (error, count) =>{
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        },
        getProducts : (root, { limit, offset}) => {
            return Products.find({}).limit(limit).skip(offset)
        },
        getProduct : (root, {id}) => {
            return new Promise((resolve, object) => {
                Products.findById(id, (error, product) =>{
                    if(error) rejects(error)
                    else resolve(product)
                })
            })
        },
        totalProducts : (root) => {
            return new Promise((resolve, object) => {
                /* countDocument nos permite contar cuantos datos hay en la BD */ 
                Products.countDocuments({}, (error, count) =>{
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        }
    },
    Mutation: {
        newClient : (root, { input }) => {
            const newClient = new Clients({
                id : input.id,
                name : input.name,
                lastname : input.lastname,
                enterprise : input.enterprise,
                emails : input.emails,
                age : input.age,
                category : input.category,
                orders : input.orders
            });

            newClient.id = newClient._id;

            return new Promise((resolve, object) => {
                newClient.save((error) => {
                    if(error) rejects(error)
                    else resolve(newClient)
                })
            });
        },
        updateClient: (root, {input}) => {
            return new Promise((resolve, object) =>{
                Clients.findOneAndUpdate({_id: input.id}, input, {new: true, upsert: true}, (error, client) => {
                    if(error) rejects("error cualqueira")
                    else resolve(client)
                });
            })
        },
        deleteClient: (root, {id}) => {
            return new Promise((resolve, object) =>{
                Clients.findOneAndDelete({_id : id}, (error) =>{
                    if(error) rejects(error)
                    else resolve("El Cliente se eliminó correctamente")
                })
            });
        },
        newProduct: (root, {input}) => {
            const newProduct = new Products({
                name: input.name,
                price: input.price,
                stock: input.stock
            });
            // mongodb creara un ID 
            newProduct.id = newProduct._id;

            return new Promise((resolve, object) => {
                //tratamos de guardar en la db
                newProduct.save((error) => {
                    if(error) rejects(error)
                    else resolve(newProduct)
                })
            })
        },
        updateProduct : ( root, { input}) => {
             return new Promise((resolve, object) => {
                 Products.findOneAndUpdate({_id: input.id}, input, {new: true, upsert: true}, (error, product) =>{
                     if(error) rejects(error)
                     else resolve(product)
                 })
             })
        },

 
        deleteProduct : (root, {id}) => {
            return new Promise((resolve, object) =>{
                Products.findOneAndDelete({_id : id}, (error) =>{
                    if(error) rejects(error)
                    else resolve("El producto se eliminó correctamente")
                })
            })
        },

        //Agregar nuevos pedidos
        nuevoPedido : (root, {input}) => {
            const nuevoPedido = new Pedidos({
                pedido: input.pedido,
                total: input.total,
                fecha: new Date(),
                cliente: input.cliente,
                estado: "PENDIENTE"
            })

            nuevoPedido.id = nuevoPedido._id;

            return new Promise((resolve, object) => {
                nuevoPedido.save((error) =>{
                    if(error) rejects(error)
                    else resolve(nuevoPedido)
                })
            })
        }
    }
}
