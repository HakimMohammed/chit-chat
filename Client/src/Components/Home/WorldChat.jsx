import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
import myPusher from "../../SocketTest/NodeSocketTest";
import axios from "axios";
import { initTE, PerfectScrollbar } from "tw-elements";
import Dropdown from "./Dropdown";

export default function WorldChat(props) {
  initTE({ PerfectScrollbar });
  const users = useSelector((state) => state);
  const [me, setMe] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("")
  const onOptionSelect = (item) => {
    setSelectedOption(item)
  }

  const options = ["Home","Ajouter","Modifier"]

  const dummy = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      setMe(props.me);
      // const messages = [
      //   { sender: "1", message: "Hello, world!" },
      //   { sender: "2", message: "Hi there!" },
      //   { sender: "3", message: "How's it going?" },
      //   { sender: "1", message: "I'm doing well, thanks!" },
      //   { sender: "2", message: "That's great to hear!" },
      //   { sender: "3", message: "What are you up to?" },
      //   { sender: "1", message: "Just working on some projects." },
      //   { sender: "2", message: "That's cool! What kind of projects?" },
      //   { sender: "3", message: "I'm interested in learning more!" },
      //   { sender: "1", message: "Hello, world!" },
      //   { sender: "2", message: "Hi there!" },
      //   { sender: "3", message: "How's it going?" },
      //   { sender: "1", message: "I'm doing well, thanks!" },
      //   { sender: "2", message: "That's great to hear!" },
      //   { sender: "3", message: "What are you up to?" },
      //   { sender: "1", message: "Just working on some projects." },
      //   { sender: "2", message: "That's cool! What kind of projects?" },
      //   { sender: "3", message: "I'm interested in learning more!" },
      //   { sender: "1", message: "Hello, world!" },
      //   { sender: "2", message: "Hi there!" },
      //   { sender: "3", message: "How's it going?" },
      //   { sender: "1", message: "I'm doing well, thanks!" },
      //   { sender: "2", message: "That's great to hear!" },
      //   { sender: "3", message: "What are you up to?" },
      //   { sender: "1", message: "Just working on some projects." },
      //   { sender: "2", message: "That's cool! What kind of projects?" },
      //   { sender: "3", message: "I'm interested in learning more!" },
      //   { sender: "1", message: "Hello, world!" },
      //   { sender: "2", message: "Hi there!" },
      //   { sender: "3", message: "How's it going?" },
      //   { sender: "1", message: "I'm doing well, thanks!" },
      //   { sender: "2", message: "That's great to hear!" },
      //   { sender: "3", message: "What are you up to?" },
      //   { sender: "1", message: "Just working on some projects." },
      //   { sender: "2", message: "That's cool! What kind of projects?" },
      //   { sender: "3", message: "I'm interested in learning more!" },
      //   { sender: "1", message: "Hello, world!" },
      //   { sender: "2", message: "Hi there!" },
      //   { sender: "3", message: "How's it going?" },
      //   { sender: "1", message: "I'm doing well, thanks!" },
      //   { sender: "2", message: "That's great to hear!" },
      //   { sender: "3", message: "What are you up to?" },
      //   { sender: "1", message: "Just working on some projects." },
      //   { sender: "2", message: "That's cool! What kind of projects?" },
      //   { sender: "3", message: "I'm interested in learning more!" },
      // ];
      // setMessages(messages);
      const response = await axios.get(
        "http://localhost:7000/api/get-world-message",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.log("Erroring data: ");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    try {
      var channel = myPusher.subscribe("world-chat");

      if (messages.length > 0) {
        channel.bind("sendMessage", (data) => {
          console.log("Message received:", data.message);
          setMessages((prevMessages) => [...prevMessages, data.message]);
        });
      }

      return () => {
        myPusher.unsubscribe("world-chat");
      };
    } catch (error) {
      console.log(
        "Error occurred while trying to listen to channel 'sendMessage:'"
      );
      console.log(error);
    }
  }, [myPusher, messages]);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollTop = dummy.current.scrollHeight;
    }
  }, [messages]);

  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:7000/api/send-world-message",
        {
          sender: me,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.redirectTo
      ) {
        window.location.href = error.response.data.redirectTo;
      } else {
        console.log(error);
      }
    } finally {
      setMessage("");
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full h-full sm:max-w-sm px-6 py-12 lg:px-8 bg-[#1f1f1f] outline outline-2 outline-[#2a2a2a] rounded-lg">
        {users.map((user) => {
          return (
            <>
              <div className="text-white flex items-center space-x-6 hover:outline hover:outline-2 hover:outline-[#2c9c6a] hover:rounded-lg hover:overflow-hidden hover:p-2 mt-2">
                <img src={user.thumbnail} className="w-10 h-10 rounded-full" />
                <h1 className="grow">{user.username}</h1>
                <Dropdown sender={me} reciever={user.id}/>
              </div>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-full h-px bg-gray-500 border-0"></hr>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="flex flex-col grow sm:mx-auto sm:w-full h-full space-y-3">
        <div
          ref={dummy}
          data-te-perfect-scrollbar-init
          className="sm:mx-auto sm:w-full h-full sm:max-w-full bg-[#1f1f1f] outline outline-2 outline-[#2a2a2a] rounded-lg flex flex-col py-2 space-y-2 overflow-hidden"
        >
          {messages.map((message) => {
            if (message.sender == me) {
              return (
                <div className="w-full ">
                  <div className="sm:mx-auto text-white flex justify-end">
                    <p className="bg-[#2c9c6a] outline outline-2 outline-[#2c9c6a] rounded-lg px-2 py-2 mx-2 ml-40">
                      {message.message}
                    </p>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="w-full ">
                  <div className="sm:mx-auto text-white flex justify-start">
                    <p className="bg-[#1f1f1f] outline outline-2 outline-[#2a2a2a] rounded-lg px-2 py-2 mx-2 mr-40">
                      {message.message}
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-full h-10 self-end rounded-lg overflow-hidden">
          <form className="flex space-x-2" onSubmit={submitHandeler}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message ..."
              type="text"
              className="placeholder:italic block w-full sm:max-w-full rounded-md bg-[#1f1f1f] border-0 py-1.5 text-white shadow-sm ring-2 ring-inset ring-[#2a2a2a] focus:ring-2 focus:ring-inset focus:ring-[#27ac77] sm:text-sm sm:leading-6 pl-10 "
            />
            <button
              disabled={message == ""}
              type="submit"
              className="flex justify-center rounded-md bg-[#2c9c6a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2c9c6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27ac77] items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-send"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
                  fill="white"
                ></path>{" "}
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
