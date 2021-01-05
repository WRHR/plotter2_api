import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloWorld";
import {MyContext} from '../src/types'


const main = async () => {
  const connectDB = await createConnection({
    type: "postgres",
    database: "plotter2",
    username: "w",
    logging: true,
    synchronize: true,
    entities: [],
  });
  
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers:[HelloResolver],
      validate:false,
    }),
    context: ({req, res}): MyContext =>({req,res})
  })

  apolloServer.applyMiddleware({
    app,
    cors:false
  })


  const PORT = process.env.PORT || 5000
  app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`)
  })
};

main();
