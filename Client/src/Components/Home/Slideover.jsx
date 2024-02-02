import React, { useState } from "react";

const Slideover = () => {
  const [isSlideoverVisible, setSlideoverVisible] = useState(false);

  const toggleSlideover = () => {
    setSlideoverVisible((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <button onClick={toggleSlideover}>
        Click me
      </button>
      <div id="slideover-container" className={`w-full h-full fixed inset-0 ${isSlideoverVisible ? "" : "invisible"}`}>
        <div onClick={toggleSlideover} id="slideover-bg" className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${ isSlideoverVisible ? "opacity-50" : "opacity-0" }`}></div>
        <div onClick={toggleSlideover} id="slideover" className={`w-96 bg-white h-full absolute right-0 duration-300 ease-out transition-all ${isSlideoverVisible ? "" : "translate-x-full"}`}>
          <div className="absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideover;
