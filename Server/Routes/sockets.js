//const express = require("express");
import express from "express";
const router = express.Router();
import pusher from "../Pusher/pusher.js";
//const pusher = require("../Pusher/pusher.js")

router.post("/socket-test" , async(req,res)=> {
    try {
        pusher.trigger("socket_test_channel", "SendSocketEvent", {
            message: req.body.message,
        });
    }catch(error) {
        res.send("this is an error :"+error)
    }
})

export default router;