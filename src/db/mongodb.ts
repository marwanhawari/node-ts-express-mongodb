import { MongoClient, ServerApiVersion } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = "node-ts-express-mongodb";

export const client = new MongoClient(MONGODB_URI ?? "", {
    serverApi: ServerApiVersion.v1,
});

export const db = client.db(MONGODB_DB_NAME);
