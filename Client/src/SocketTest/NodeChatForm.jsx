import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import pusher from "./NodeSocketTest";

export default function NodeChatForm() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      var channel = pusher.subscribe("socket_test_channel");
      channel.bind("SendSocketEvent", (data) => {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

      return () => {
        pusher.unsubscribe("socket_test_channel");
      };
    } catch (error) {
      console.log(
        "Error occured while trying to listen to channel 'SendSocketEvent:'"
      );
      console.log(error);
    }
  }, []);

  const [message, setMessage] = useState("");
  const submitHandeler = async (e) => {
    e.preventDefault();
    // send message to server
    await axios
      .post("http://127.0.0.1:7000/api/socket-test", { message })
      .then((res) => {
        console.log(
          "ReactJS (this is th response from the server): \n" +
            JSON.stringify(res)
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <form onSubmit={submitHandeler}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input type="submit" value="Envoyer Message" />
      <div>
        {messages.map((message) => {
          return <p>{message}</p>;
        })}
      </div>
    </form>
  );
}
