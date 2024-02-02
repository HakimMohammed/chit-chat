import React, { useState } from "react";
import axios from "axios";

const Dropdown = ({ sender, reciever }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    setIsOpen(false);
    await axios.post(
      "http://localhost:7000/api/send-friend-request",
      { 
        sender: sender,
        reciever: reciever },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div>
      <button className="self-end" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute mr-20 mt-2 w-42 bg-[#1f1f1f] outline outline-2 outline-[#2a2a2a] text-white rounded-md shadow-lg">
          <li className="cursor-pointer py-2 px-4" onClick={handleClick}>
            Send Friend Request
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
