"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const HelloWorld_1 = require("./resolvers/HelloWorld");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const connectDB = yield typeorm_1.createConnection({
        type: "postgres",
        database: "plotter2",
        username: "w",
        logging: true,
        synchronize: true,
        entities: [],
    });
    const app = express_1.default();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [HelloWorld_1.HelloResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({
        app,
        cors: false
    });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
    });
});
main();
//# sourceMappingURL=index.js.map