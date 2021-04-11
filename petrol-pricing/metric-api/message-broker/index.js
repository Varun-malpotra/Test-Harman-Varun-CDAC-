/* eslint-disable @typescript-eslint/no-var-requires */
if (!process.env.EVODOVE_SERVER_PORT) {
    throw new Error("Please check env.example and copy to .env file");
}
const { Evodove } = require("evodove");
new Evodove().start();
console.log(
    "Evodove Broker service is running successfully on port " +
        process.env.EVODOVE_SERVER_PORT,
);
