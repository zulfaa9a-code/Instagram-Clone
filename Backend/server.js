require('dotenv').config();

const http = require("http");

const app = require("./src/app");
const connectToDB = require('./src/config/database');
const { initSocket } = require('./src/socket');

const server = http.createServer(app);

// Socket.IO setup (auth, online users, events) lives in src/socket/index.js
initSocket(server);

async function startServer() {
    try {
        await connectToDB();

        server.listen(3000, () => {
            console.log("Server running on port 3000");
        });

    } catch (err) {
        console.error("Failed to connect to database:", err.message);
    }
}

startServer();