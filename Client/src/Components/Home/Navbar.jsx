import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";
import axios from "axios";

export default function Navbar({ onValueChange, handleRequests, requests, me }) {
  const [selectedButton, setSelectedButton] = useState("World Chat");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Signout = async () => {
    await axios.post("http://localhost:7000/api/sign-out");
    sessionStorage.removeItem("token");
    dispatch({ type: "removed", payload: me }); // need to add the person
    navigate("/sign-in");
    window.location.reload(false);
  };

  return (
    <div className="flex flex-col w-full h-full max-w-12 py-8 space-y-8 bg-[#1f1f1f] outline outline-2 outline-[#2a2a2a] rounded-lg transition-width duration-300 hover:max-w-40 overflow-hidden">
      <div>
        <button
          onClick={() => {
            setSelectedButton("World Chat");
            onValueChange("World Chat");
            handleRequests(false)
          }}
          type="submit"
          className={
            "flex justify-center rounded-md px-3 mx-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm items-center transition-colors duration-300 " +
            (selectedButton == "World Chat"
              ? "bg-[#2c9c6a]"
              : "hover:bg-[#2c9c6a] hover:opacity-50 ")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-globe"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />{" "}
          </svg>
          <p className="text-nowrap px-5">World Chat</p>
        </button>
      </div>
      {/* Groups */}
      <div>
        <button
          onClick={() => {
            setSelectedButton("Groups");
            onValueChange("Groups");
            handleRequests(false)
          }}
          type="submit"
          className={
            "flex justify-center rounded-md px-3 mx-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm items-center transition-colors duration-300 " +
            (selectedButton == "Groups"
              ? "bg-[#2c9c6a]"
              : "hover:bg-[#2c9c6a] hover:opacity-50")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-people"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />{" "}
          </svg>
          <p className="text-nowrap px-5">Groups</p>
        </button>
      </div>
      {/* Friends */}
      <div className="grow">
        <button
          onClick={() => {
            setSelectedButton("Friends");
            onValueChange("Friends");
            handleRequests(false)
          }}
          type="submit"
          className={
            "flex justify-center rounded-md px-3 mx-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm items-center transition-colors duration-300 " +
            (selectedButton == "Friends"
              ? "bg-[#2c9c6a]"
              : "hover:bg-[#2c9c6a] hover:opacity-50")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chat-dots"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />{" "}
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />{" "}
          </svg>
          <p className="text-nowrap px-5">Friends</p>
        </button>
      </div>
      {/* Friend Request */}
      <div className="">
        <button
          onClick={() => {
            setSelectedButton("Friend Request");
            handleRequests(!requests)
          }}
          type="submit"
          className={
            "flex justify-center rounded-md px-3 mx-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm items-center transition-colors duration-300 " +
            (selectedButton == "Friend Request"
              ? "bg-[#2c9c6a]"
              : "hover:bg-[#2c9c6a] hover:opacity-50")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-plus"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />{" "}
            <path
              fill-rule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
            />{" "}
          </svg>
          <p className="text-nowrap px-5">Friend Request</p>
        </button>
      </div>
      {/* Account */}
      <div className="">
        <button
          onClick={() => {
            setSelectedButton("Account");
            onValueChange("Account");
            handleRequests(false)
          }}
          type="submit"
          className={
            "flex justify-center rounded-md px-3 mx-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm items-center transition-colors duration-300 " +
            (selectedButton == "Account"
              ? "bg-[#2c9c6a]"
              : "hover:bg-[#2c9c6a] hover:opacity-50")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />{" "}
          </svg>
          <p className="text-nowrap px-5">Account</p>
        </button>
      </div>
      {/* Logout */}
      <div>
        <button
          onClick={() => {
            Signout();
          }}
          type="submit"
          className={
            "flex justify-center rounded-md px-3 mx-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm items-center transition-colors duration-300 " +
            (selectedButton == "Log Out"
              ? "bg-[#2c9c6a]"
              : "hover:bg-[#2c9c6a] hover:opacity-50")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9-4-4m4 4-4 4m4-4H9"
            />
          </svg>
          <p className="text-nowrap px-5">Log Out</p>
        </button>
      </div>
    </div>
  );
}
