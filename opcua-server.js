// opcua-server.js
const { OPCUAServer, DataType } = require("node-opcua");

let serverInstance; // To hold the instance of the server

async function initializeServer() {
    const server = new OPCUAServer({
        port: 26543
    });

    await server.initialize();
    serverInstance = server; // Store server instance for later use

    const namespace = server.engine.addressSpace.getOwnNamespace();
    const sensor = namespace.addObject({
        browseName: "MySensor",
        organizedBy: server.engine.addressSpace.rootFolder.objects
    });

    // Add Temperature variable
    namespace.addVariable({
        browseName: "Temperature",
        nodeId: "s=Temperature",
        componentOf: sensor,
        dataType: "Double",
        value: { dataType: DataType.Double, value: 0 }
    });

    console.log("OPC UA Server initialized");
    return server;
}

// Function to generate temperature data
async function generateTemperature() {
    if (!serverInstance) {
        throw new Error("OPC UA Server not initialized");
    }
    const temperatureNodeId = "ns=1;s=Temperature";
    const temperatureNode = serverInstance.engine.addressSpace.findNode(temperatureNodeId);

    if (temperatureNode) {
        const tempValue = 19 + 5 * Math.sin(Date.now() / 10000) + Math.random() * 0.2;
        temperatureNode.setValueFromSource({ dataType: "Double", value: tempValue });
        return tempValue;
    } else {
        throw new Error("Temperature node not found");
    }
}

module.exports = { initializeServer, generateTemperature };
