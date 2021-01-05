import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";

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
  const PORT = process.env.PORT || 4000
  app.listen(4000, ()=>{
    console.log(`server started on port ${PORT}`)
  })
};

main();
