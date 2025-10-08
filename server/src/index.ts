if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import Api from './app';


async function main() {
    const api = new Api(process.env.DB_URL || "", process.env.CLIENT_URL || "");
    api.start();
}

main();
