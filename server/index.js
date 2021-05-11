import express from 'express';
import jwt from 'jsonwebtoken'
import dotenv, { config } from 'dotenv'
dotenv.config({path: './varibles.env'})

import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers'

const app = express();
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    // Context recibe los datos desde Apollo Client 
    context: async ({req}) =>{
        const token = req.headers['authorization']

        if(token !== "null") {
            try{
                const usuarioActual = await jwt.verify(token, process.env.SECRETO)
                req.usuarioActual = usuarioActual
                return {
                    usuarioActual
                }                    
            } catch(err) {
                console.error(err)
            }
        }

    }
});
server.applyMiddleware({app});

app.listen({port: 4000}, () => console.log(`El servidor esta corriendo en ${server.graphqlPath}`))