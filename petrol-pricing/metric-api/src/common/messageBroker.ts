import { EvodoveClient } from "evodove";

const clientOptions = {
    host: "localhost",
    port: +(process.env.EVODOVE_SERVER_PORT || 45678),
    secureKey: process.env.EVODOVE_SECURE_KEY || "mySecureKey",
    reconnectInterval: 1000,
    doReconnectOnClose: true,
    requestTimeout: 5000,
};

const client = new EvodoveClient(clientOptions);
client.connect();
export { client as MessageBroker };
