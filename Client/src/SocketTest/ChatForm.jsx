import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./SocketConfiguration"

export default function ChatForm() {

    useEffect(() => {
        try {
            const channel = window.Echo.channel('socket_test_channel');

            channel.listen('SendSocketEvent', (data) => {
                console.log('Socket Recieved !');
                console.log(data);
            });

            return () => {
                channel.stopListening('socket_test_channel');
            };
        } catch (error) {
            console.log("Error occured while trying to listen to channel 'SendSocketEvent:'");
            console.log(error);
        }
    }, []);

    const [message, setMessage] = useState("");
    const submitHandeler = async (e) => {
        e.preventDefault();
        console.log(`Message : ${message}`);

        // send message to server
        await axios.post('http://127.0.0.1:8000/api/socket-test', { message })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }
    return (
        <form onSubmit={submitHandeler}>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
            <input type="submit" value="Envoyer Message" />
        </form>
    )
}