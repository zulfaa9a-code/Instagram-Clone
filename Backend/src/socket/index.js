const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { parse } = require("cookie");

let io;
// userId -> Set of socket ids (one user can have several tabs open)
const onlineUsers = new Map();

const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    // Authenticate every connection from the cookie
    io.use((socket, next) => {
        try {
            const cookies = parse(socket.handshake.headers.cookie || "");
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
            socket.userId = String(decoded.id); // <- match your JWT payload field
            next();
        } catch (err) {
            next(new Error("Unauthorized"));
        }
    });

    io.on("connection", (socket) => {
        const { userId } = socket;
        console.log("Socket connected:", userId);

        if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
        onlineUsers.get(userId).add(socket.id);

        io.emit("onlineUsers", [...onlineUsers.keys()]);

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", userId);

            const sockets = onlineUsers.get(userId);
            if (sockets) {
                sockets.delete(socket.id);
                if (sockets.size === 0) onlineUsers.delete(userId);
            }
            io.emit("onlineUsers", [...onlineUsers.keys()]);
        });
    });

    io.engine.on("connection_error", (err) => {
        console.log("Connection error:", err.message);
    });

    return io;
};

// Send an event to every open tab of a user
const emitToUser = (userId, event, payload) => {
    const sockets = onlineUsers.get(String(userId));
    if (!sockets) return;
    sockets.forEach((socketId) => io.to(socketId).emit(event, payload));
};

module.exports = { initSocket, emitToUser };