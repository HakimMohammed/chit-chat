//const socket = require("./Routes/sockets.js")
import socket from "./Routes/sockets.js";
//const presence = require("./Routes/Presence.js")
import presence from "./Routes/Presence.js";
//const authentication = require("./Authentication/authentication.js")
import authentication from "./Authentication/authentication.js"

import messaging from "./Routes/Messaging.js"

//const express = require("express");
import express from "express"
//const bodyParser = require('body-parser');
import bodyParser from "body-parser";
//const Pusher = require('pusher');
import { myFirebase } from "./Firebase/configuration.js";

const app = express();

app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// to Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use("/api", socket)
app.use("/api", authentication)
app.use("/api", presence)
app.use("/api", messaging)

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Serveur lancé sur le port ${port}...`));
