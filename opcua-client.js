// opcua-client.js
const { initializeServer } = require("./opcua-server");

async function getTemperatureValue(server, temperatureNodeId) {
    const temperatureNode = server.engine.addressSpace.findNode(temperatureNodeId);
    if (temperatureNode) {
        const dataValue = temperatureNode.readValue();
        return dataValue.value.value;
    } else {
        throw new Error("Node not found: " + temperatureNodeId);
    }
}

module.exports = { getTemperatureValue };
