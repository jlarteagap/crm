import express from 'express';
import mongoose from 'mongoose';
import { Clients } from './db'

export const resolvers = {
    Query: {
        getClients : (root, {limit}) => {
            return Clients.find({}).limit(limit)
        },
        getClient : (root, { id }) => {
            return new Promise((resolve, object) => {
                Clients.findById(id, (error, client) =>{
                    if(error) rejects(error)
                    else resolve(client)
                });
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
                Clients.findOneAndRemove({_id : id}, (error) =>{
                    if(error) rejects(error)
                    else resolve("Se eliminó correctamente")
                })
            });
        }
    }
}
