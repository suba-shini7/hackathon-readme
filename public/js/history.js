// public/js/history.js
document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const temperatureList = document.getElementById("temperature-list");

    // Update the history list with new data
    function updateHistory(data) {
        temperatureList.innerHTML = ""; // Clear existing list
        data.temperatures.forEach((temp, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Reading ${index + 1}: ${temp.toFixed(2)} °C`;
            temperatureList.appendChild(listItem);
        });
    }

    // Listen for 'temperatureHistory' events from the server
    socket.on("temperatureHistory", (data) => {
        updateHistory(data);
    });
});
