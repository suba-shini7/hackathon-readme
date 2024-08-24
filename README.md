# OPC UA to MQTT Bridge with EJS Frontend

This project is a Proof of Concept (POC) to demonstrate how to connect to an OPC UA server, collect data, and push it to an MQTT broker. The MQTT broker then distributes the data to MQTT clients. The collected data, such as temperature, is displayed using EJS templates in a simple web interface.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)

## Overview

This project connects to an OPC UA server, collects data, publishes it to an MQTT broker, and displays the data (e.g., temperature) on a web page using EJS templates. It is designed for industrial IoT applications where machine data needs to be monitored in real-time.

## Architecture

### High-Level Architecture

```plaintext
+-----------------------+       +--------------------+       +----------------------+
|                       |       |                    |       |                      |
|    OPC UA Server      | <---> |    OPC UA Client   | <---> |    MQTT Broker        |
| (Industrial Machines, |       |  (Data Collector)  |       |  (Message Distributor)|
|   Sensors, etc.)      |       |                    |       |                      |
+-----------------------+       +--------------------+       +----------------------+
                                                            |
                                                            |
                                                            v
                                                   +--------------------+
                                                   |    MQTT Client     |
                                                   |  (Data Receiver,   |
                                                   |   EJS Frontend)    |
                                                   +--------------------+
```

## Components

OPC UA Server: Provides industrial data like temperature, pressure, etc.
OPC UA Client: Connects to the OPC UA server, collects data, and sends it to the MQTT broker.
MQTT Broker: Distributes data to subscribed clients.
MQTT Client: Receives data from the MQTT broker and displays it on a web page using EJS templates.

## Data Flow

The OPC UA Client connects to the OPC UA Server, collects data, and sends it to the MQTT Broker.
The MQTT Broker receives this data and forwards it to the MQTT Client.
The MQTT Client uses EJS templates to render the received data (e.g., temperature) on a web page.

## Features

OPC UA Data Collection: Connect to OPC UA servers and collect data.
MQTT Communication: Publish collected data to an MQTT broker.
Web Interface: Display collected data using EJS templates.

## Prerequisites

Node.js (version 14.x or higher)
npm (Node Package Manager)
Access to an OPC UA server
Access to an MQTT broker

## Installation

Step 1: Extract the Zip File
Download the project in a zip format and extract it to your desired location.

Step 2: Navigate to the Project Directory
Open a terminal or command prompt and navigate to the project directory

### `cd path-to-extracted-folder`

Step 3: Install Dependencies
Install the required dependencies by running the following command

### `npm install`

## Running the Project

Step 1: Start the OPC UA Client
Run the following command to start the OPC UA client, which will collect data and publish it to the MQTT broker:

### `node index.js`

Step 2: View the Data in a Web Browser
Open your web browser and navigate to http://localhost:3000. You should see the temperature or other data displayed in real-time.

## Project Structure

```opcua-to-mqtt/
│
├── index.js # Main script for connecting to OPC UA and pushing data to MQTT
├── server.js # Server script for handling EJS templates and displaying data
├── views/
│ ├── index.ejs # EJS template for displaying current data
│ └── history.ejs # EJS template for displaying history of data
├── public/
│ ├── history.js # JavaScript for handling history page interactions
│ └── scripts.js # JavaScript for main page interactions
├── package.json # Project metadata and dependencies
├── package-lock.json # Lockfile for npm dependencies
└── README.md # Installation guide and project documentation
```
## Explanation of Key Files

index.js: Contains the logic for connecting to the OPC UA server and publishing data to the MQTT broker.
index.ejs: The EJS template that renders the current data on the web page.
history.ejs: The EJS template that renders the history of collected data.
history.js: JavaScript file for handling interactions on the history page.
scripts.js: JavaScript file for handling interactions on the main page.
