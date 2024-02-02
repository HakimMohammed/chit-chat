//const express = require("express");
import express from "express";
const router = express.Router();
import pusher from "../Pusher/pusher.js";
import auth from "../Firebase/configuration.js";

router.post("/pusher/auth", async (req, res) => {
  try {
    const user = auth.currentUser;
    let socketId = req.body.socket_id;
    let channel = req.body.channel_name;
    let presenceData = {
      user_id: user.uid,
      user_info: {
        username: user.displayName,
        thumbnail: user.photoURL,
      },
    };
    console.log("data : "+JSON.stringify(presenceData))
    let authenticated = pusher.authorizeChannel(
      socketId,
      channel,
      presenceData
    );
    res.send(authenticated);
  } catch (error) {
    console.log("error : \n" + error);
    res.send("This is an error : " + error);
  }
});

export default router;
