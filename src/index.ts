import app from "./api/app";
import { client } from "./db/mongodb";
const PORT = process.env.PORT || 5050;

async function main() {
    await client.connect();

    app.listen(PORT, () =>
        console.log(`Started API server at http://localhost:${PORT}`)
    );
}

main();
