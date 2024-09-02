// index.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { initializeServer, generateTemperature } = require("./opcua-server"); 
const mqttClient = require("./mqtt-setup");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

// Store the last 20 temperature readings
const temperatureHistory = [];
const maxHistorySize = 20;

// Route for the main page
app.get("/", (req, res) => {
    res.render("index");
});

// Route for the history page
app.get("/history", (req, res) => {
    res.render("history"); 
});


// Handle Socket.IO connections
io.on("connection", (socket) => {
    console.log("Client connected");

    // Emit the current history to the new client
    socket.emit("temperatureHistory", { temperatures: temperatureHistory });

    // Handle request for current temperature
    socket.on("getCurrentTemperature", async () => {
        try {
            const temperature = await generateTemperature();
            socket.emit("temperatureUpdate", { temperature });
        } catch (error) {
            console.error("Error generating temperature:", error);
        }
    });

    // Handle disconnections
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

async function startServer() {
    try {
        const opcServer = await initializeServer();
        await opcServer.start();
        console.log("OPC UA Server started at", opcServer.getEndpointUrl());

        const temperatureNodeId = "ns=1;s=Temperature";

        setInterval(async () => {
            try {
                const temperatureValue = await generateTemperature();

                // Publish to MQTT
                mqttClient.publish("opcua/temperature", JSON.stringify({ temperature: temperatureValue }), { qos: 1 }, (err) => {
                    if (err) {
                        console.error("Error publishing to MQTT:", err);
                    }
                });

                // Add to temperature history and trim to last 20 entries
                temperatureHistory.push(temperatureValue);
                if (temperatureHistory.length > maxHistorySize) {
                    temperatureHistory.shift();
                }

                // Emit temperature update and history to all connected clients
                io.emit("temperatureUpdate", { temperature: temperatureValue });
                io.emit("temperatureHistory", { temperatures: temperatureHistory });
            } catch (error) {
                console.error("Error reading temperature value:", error);
            }
        }, 3000); // Publish every second

    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

startServer();

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
