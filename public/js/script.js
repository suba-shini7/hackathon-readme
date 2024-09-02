// public/js/script.js
document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    // Request current temperature when the page loads
    socket.emit("getCurrentTemperature");

    // Listen for 'temperatureUpdate' events from the server
    socket.on("temperatureUpdate", (data) => {
        const temperatureElement = document.getElementById("temperature");
        temperatureElement.textContent = `${data.temperature.toFixed(2)} °C`;
    });
});
