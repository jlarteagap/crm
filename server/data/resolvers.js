import express from 'express';
import mongoose from 'mongoose';
import { Clients, Pedidos, Products, Usuarios } from './db'
import bcrypt, { hash } from 'bcrypt'

// para filtrar por objetos id. 
const {ObjectId} = mongoose.Types

import dotenv from 'dotenv'
dotenv.config({path: '../variables.env'})

import jwt from 'jsonwebtoken'

const crearToken = (usuarioLogin, secreto, expiresIn) => {
    const {usuario} = usuarioLogin    
    return jwt.sign({usuario}, secreto, {expiresIn})
}


export const resolvers = {
    Query: {
        getClients : (root, {limit, offset, vendedor}) => {
            // filtramos por vendedor
            let filtro
            if(vendedor){
                filtro = {vendedor: new ObjectId(vendedor)}
            }
            console.log(filtro)
            return Clients.find(filtro).limit(limit).skip(offset)
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
        getProducts : (root, { limit, offset, stock}) => {
            // Agregamos un filto para filtrar productos que tengan mas de 0 en inventario
            let filtro;
            if(stock) {
                //$gt es una funcion de mongodb que filtra, en este caso los mayores a 0
                filtro = {stock : {$gt: 0}} 
            }
            return Products.find(filtro).limit(limit).skip(offset)
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
        },
        obtenerPedidos : (root, {cliente}) => {
            return new Promise((resolve, object) =>{
                Pedidos.find({cliente: cliente}, (error, pedido) => {
                    if(error) rejects(error)
                    else resolve(pedido)
                })
            })
        },
        topClientes: (root) => {
            return new Promise((resolve, object) => {
                Pedidos.aggregate([
                    {
                        $match: { estado: "APROBADO"}
                    },
                    {
                        $group: {
                            _id: "$cliente",
                            total: {$sum : "$total"}
                        }
                    },
                    {
                        $lookup: {
                            from: "clients",
                            localField: "_id",
                            foreignField : '_id',
                            as: 'cliente'
                        }
                    },
                    {
                        $sort: { total : -1 }
                    },
                    {
                        $limit: 10
                    }
                ], (error, resultado) => {
                    if(error) rejects(error); 
                    else resolve(resultado)
                })
            }) 
        },
        obtenerUsuario : ( root, args, {usuarioActual}) =>{
            if(!usuarioActual){
                return null
            }

            const usuario = Usuarios.findOne({ usuario: usuarioActual.usuario})
            return usuario
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
                orders : input.orders,
                vendedor: input.vendedor
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
        }, 

        actualizarEstado : (root, {input}) => {
            return new Promise((resolve, object) => {

                const {estado } = input

                // nos aseguramos que los cambios de stock se hagan dependiendo si se aprueban o no el pedido 
                let signo
                if(estado === "APROBADO"){
                    signo = '-'
                } else if( estado === "CANCELADO"){
                    signo = '+'
                }
                // recorrer pedidos y actualizar stock input.pedido es un array con la cantidad de pedidos que y el producto que se va a comprar.
                input.pedido.forEach(pedido => {
                       
                    Products.updateOne({_id: pedido.id},
                        // inc es un metodo de mongo lo que hace es incrementar o sumar aqui se lo usar para restar la cantidad de pedido.
                        {
                            "$inc": {"stock" : `${signo}${pedido.cantidad}`}
                        }, function(error) {
                            if(error) return new Error(error)
                        }
                        )
                });
                Pedidos.findOneAndUpdate({_id: input.id}, input, {new: true}, (error) =>{
                    if(error) rejects(error)
                    else resolve("Se actualizo correctamente.")
                })
            })
        },
        // Usuarios
        crearUsuario: async(root, {usuario, nombre, password, rol }) => {
            // revisar si existe el usuario 
            const existeUsuario = await  Usuarios.findOne({usuario})

            if(existeUsuario) {
                throw new Error('El usuario ya existe')
            }
            const nuevoUsuario = await new Usuarios({
                usuario,
                nombre,
                password,
                rol
            }).save()

            return "Creado correctamente"
        },
        autenticarUsuario: async (root, {usuario, password}) => {
            const nombreUsuario = await Usuarios.findOne({usuario})
            
            if(!nombreUsuario) {
                throw new Error('Usuario no encontrado')
            }
            const passwordUsuario = await bcrypt.compare(password, nombreUsuario.password)

            if(!passwordUsuario){
                throw new Error('Password incorrecto')
            }
            return {
                token: crearToken(nombreUsuario, process.env.SECRETO, '1hr')
            }
        },
    }
}
