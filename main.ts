import {MongoClient} from "mongodb";
import {ApolloServer} from "@apollo/server";
import { schema } from "./schema.ts";
import {startStandaloneServer} from "@apollo/server/standalone";
import {resolvers} from "./resolvers.ts";
import { RestaurantModel } from "./types.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("BaseFinal");
const restaurantsCollection =  mongoDB.collection<RestaurantModel>("Restaurantes")


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const {url} = await startStandaloneServer(server, {
  context: async () => ({restaurantsCollection})
})

console.info(`Server at ${url}` );
