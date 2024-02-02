import express from "express";
const router = express.Router();
import pusher from "../Pusher/pusher.js";
import { db } from "../Firebase/configuration.js";
import { now } from "../Firebase/configuration.js";



router.post("/send-world-message", async (req, res) => {
  try {
    await db.collection("world-messages").add({
      message: req.body.message,
      sender_id: req.body.sender,
      sent_at: now.serverTimestamp(),
    });

    const message = { sender: req.body.sender, message: req.body.message };

    pusher.trigger("world-chat", "sendMessage", {
      message: message,
    });

    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.log("Database error: \n", error);
    res.status(500).send("Database error");
  }
});

router.get("/get-world-message", async (req, res) => {
  try {
    let messages = [];

    const querySnapshot = await db
      .collection("world-messages")
      .orderBy("sent_at" , "asc")
      .get();

    querySnapshot.forEach((doc) => {
      const message = {
        sender: doc.data().sender_id,
        message: doc.data().message,
      };
      messages.push(message);
    });

    res.status(200).send({ messages: messages});

  } catch (error) {
    console.log("Database error: \n", error);
    res.status(500).send("Database error");
  }
});

export default router;
