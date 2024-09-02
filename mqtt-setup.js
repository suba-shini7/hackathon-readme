// mqtt-setup.js
const mqtt = require('mqtt');

const brokerUrl = "mqtt://broker.emqx.io:1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
console.log("MQTT Client ID:", clientId);

const client = mqtt.connect(brokerUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'dhatchan',
    password: 'public',
    reconnectPeriod: 1000
});

client.on('connect', () => {
    console.log('MQTT Client connected');
});

client.on('error', (err) => {
    // console.error('MQTT Client error:', err);
});
client.on('offline', function () {
    // console.log('MQTT client is offline');
});

client.on('reconnect', function () {
    // console.log('Reconnecting to MQTT broker...');
});

module.exports = client;
