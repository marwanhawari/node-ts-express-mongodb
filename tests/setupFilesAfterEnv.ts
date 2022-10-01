import { client } from "../src/db/mongodb";

global.afterAll(async () => {
    await client.close();
});
