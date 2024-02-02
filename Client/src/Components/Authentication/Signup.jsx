import { useState, useEffect } from "react";
import { storage } from "../../Firebase/FirebaseConfiguration";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [rePasswordValid, setRePasswordValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [username, setUsername] = useState("");
  const [shownpic, setShownPic] = useState(null);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [ usernmaeValid, setUsernameValid] = useState(true);

  const isUsernameValid =(username) =>{
    if( username !== "") {
      setUsernameValid(true)
    }else{
      setUsernameValid(false)
    }
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      if (image == null) {
        resolve("https://firebasestorage.googleapis.com/v0/b/chit-chat-92c50.appspot.com/o/users-images%2Fdefault.jpg?alt=media&token=3cc5065c-5e4c-4a5b-aa60-59984c8ec376")
      }
      const imageRef = ref(storage, `users-images/${image.name + v4()}`);
      uploadBytes(imageRef, image)
        .then(async (snapshot) => {
          const url = await getDownloadURL(snapshot.ref);
          console.log("url : " + url);
          resolve(url);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError("Email invalid");
    setEmailValid(emailRegex.test(email));
  }

  function doPasswordMatch(rePassword) {
    if (password === rePassword) {
      setRePasswordValid(true);
    } else {
      setRePasswordValid(false);
    }
  }

  function isValidPassword(password) {
    setPasswordError([]);
    let error = false;
    if (password.length < 8) {
      setPasswordError((prevError) => [...prevError, "Minimum 8 characters"]);
      error = true;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError((prevError) => [
        ...prevError,
        "At least one uppercase letter",
      ]);
      error = true;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError((prevError) => [
        ...prevError,
        "At least one lower letter",
      ]);
      error = true;
    }
    if (!/\d/.test(password)) {
      setPasswordError((prevError) => [...prevError, "At least one digit"]);
      error = true;
    }
    setPasswordValid(!error);
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setShownPic(URL.createObjectURL(event.target.files[0]));
    }
  };

  const submitHandeler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      let imageUrl = await uploadImage();
      if (emailValid === true && passwordValid === true && usernmaeValid) {
        var message = await axios.post("http://localhost:7000/api/sign-up" , {email : email,password : password,displayName: username, photoURL:imageUrl})
        console.log(message)
      }
      navigate("/");
    } catch (error) {
      console.log(error)
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        setEmailError("Email already exists");
        setEmailValid(false);
      }
      console.log(errorCode);
      const errorMessage = error.message;
      console.log("error message: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8 bg-[#181818]">
      <div className="absolute md:mx-auto my-20 md:w-full md:max-w-md inset-0 bg-[#27ac77] rounded-md z-10 overflow blur-lg"></div>
      <div className="relative sm:mx-auto sm:w-full sm:max-w-sm px-6 py-6 lg:px-8 bg-[#1f1f1f] outline outline-2 outline-[#2a2a2a] rounded-lg z-20">
        {/* inputs */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={submitHandeler}>
            {/* image */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center overflow-hidden justify-center w-1/2 h-40 rounded-full border-2 border-[#2a2a2a] hover:border-[#27ac77] border-dashed cursor-pointer bg-[#2a2a2a] hover:bg-[#1f1f1f]"
              >
                {(() => {
                  if (shownpic === null) {
                    return (
                      <div className="relative w-40 h-40 bg-[#2a2a2a] hover:bg-[#1f1f1f]">
                        <svg
                          className="absolute w-48 h-48 text-white -left-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    );
                  } else {
                    return (
                      <img
                        className="relative w-40 h-40 bg-[#2a2a2a] hover:bg-[#1f1f1f]"
                        src={shownpic}
                      />
                    );
                  }
                })()}
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onImageChange}
                />
              </label>
            </div>
            {/* username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2 relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  role="presentation"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    isUsernameValid(e.target.value)
                  }}
                  className={
                    "block w-full rounded-md bg-[#1f1f1f] border-0 py-1.5 text-white shadow-sm ring-2 ring-inset ring-[#2a2a2a] focus:ring-2 focus:ring-inset focus:ring-[#27ac77] sm:text-sm sm:leading-6 pl-10 " +
                    (!usernmaeValid ? "ring-red-600 focus:ring-red-600" : "")
                  }
                />
                <div className="flex items-center absolute top-0 bottom-0 left-0 pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="undefined"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>{" "}
                  </svg>
                </div>
              </div>
              {!usernmaeValid && (
                <p className="mt-1 text-left text-sm font-semibold text-red-600">
                  Username is required
                </p>
              )}
            </div>
            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2 relative">
                <input
                  id="email"
                  name="email"
                  type="text"
                  role="presentation"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    isValidEmail(email);
                  }}
                  className={
                    "block w-full rounded-md bg-[#1f1f1f] border-0 py-1.5 text-white shadow-sm ring-2 ring-inset ring-[#2a2a2a] focus:ring-2 focus:ring-inset focus:ring-[#27ac77] sm:text-sm sm:leading-6 pl-10 " +
                    (!emailValid ? "ring-red-600 focus:ring-red-600" : "")
                  }
                />
                <div className="flex items-center absolute top-0 bottom-0 left-0 pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="undefined"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </div>
              {!emailValid && (
                <p className="mt-1 text-left text-sm font-semibold text-red-600">
                  {emailError}
                </p>
              )}
            </div>
            {/* password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  role="presentation"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    isValidPassword(password);
                    doPasswordMatch(rePassword);
                  }}
                  className={
                    "block w-full rounded-md bg-[#1f1f1f] border-0 py-1.5 text-white shadow-sm ring-2 ring-inset ring-[#2a2a2a] focus:ring-2 focus:ring-inset focus:ring-[#27ac77] sm:text-sm sm:leading-6 pl-10 " +
                    (!passwordValid ? "ring-red-600 focus:ring-red-600" : "")
                  }
                />
                <div className="flex items-center absolute top-0 bottom-0 left-0 pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="undefined"
                  >
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                  </svg>
                </div>
                <div className="flex items-center absolute top-0 bottom-0 right-0 pr-3">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      setShow((current) => !current);
                    }}
                  >
                    {show && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 256 256"
                        fill="none"
                        stroke="#666666"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="undefined"
                      >
                        <line
                          x1="201.1"
                          y1="127.3"
                          x2="224"
                          y2="166.8"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                        <line
                          x1="154.2"
                          y1="149.3"
                          x2="161.3"
                          y2="189.6"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                        <line
                          x1="101.7"
                          y1="149.2"
                          x2="94.6"
                          y2="189.6"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                        <line
                          x1="54.8"
                          y1="127.3"
                          x2="31.9"
                          y2="167"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                        <path
                          d="M32,104.9C48.8,125.7,79.6,152,128,152s79.2-26.3,96-47.1"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                      </svg>
                    )}
                    {!show && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 256 256"
                        fill="none"
                        stroke="#666666"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="undefined"
                      >
                        <path
                          d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                        <circle
                          cx="128"
                          cy="128"
                          r="40"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {!passwordValid &&
                passwordError.map((error) => (
                  <p className="mt-1 text-left text-sm font-semibold text-red-600">
                    {error}
                  </p>
                ))}
            </div>
            {/* confitm password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="rePassword"
                  name="rePassword"
                  type={show ? "text" : "password"}
                  role="presentation"
                  autoComplete="off"
                  value={rePassword}
                  onChange={(e) => {
                    setRePassword(e.target.value);
                    doPasswordMatch(e.target.value);
                  }}
                  className={
                    "block w-full rounded-md bg-[#1f1f1f] border-0 py-1.5 text-white shadow-sm ring-2 ring-inset ring-[#2a2a2a] focus:ring-2 focus:ring-inset focus:ring-[#27ac77] sm:text-sm sm:leading-6 pl-10 " +
                    (!rePasswordValid ? "ring-red-600 focus:ring-red-600" : "")
                  }
                />
                <div className="flex items-center absolute top-0 bottom-0 left-0 pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="undefined"
                  >
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                  </svg>
                </div>
                <div className="flex items-center absolute top-0 bottom-0 right-0 pr-3">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      setShow((current) => !current);
                    }}
                  >
                    {show && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 256 256"
                        fill="none"
                        stroke="#666666"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="undefined"
                      >
                        <line
                          x1="201.1"
                          y1="127.3"
                          x2="224"
                          y2="166.8"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                        <line
                          x1="154.2"
                          y1="149.3"
                          x2="161.3"
                          y2="189.6"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                        <line
                          x1="101.7"
                          y1="149.2"
                          x2="94.6"
                          y2="189.6"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                        <line
                          x1="54.8"
                          y1="127.3"
                          x2="31.9"
                          y2="167"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                        <path
                          d="M32,104.9C48.8,125.7,79.6,152,128,152s79.2-26.3,96-47.1"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                      </svg>
                    )}
                    {!show && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 256 256"
                        fill="none"
                        stroke="#666666"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="undefined"
                      >
                        <path
                          d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                        <circle
                          cx="128"
                          cy="128"
                          r="40"
                          fill="none"
                          stroke="#666666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="8"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {!rePasswordValid && (
                <p className="mt-1 text-left text-sm font-semibold text-red-600">
                  Passwords don't match
                </p>
              )}
            </div>
            {/* submit button */}
            <div>
              {loading ? (
                <button
                  disabled
                  type="submit"
                  className="mt-6 flex w-full justify-center rounded-md bg-[#2c9c6a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2c9c6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27ac77] items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-spin ease-linear	"
                  >
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>{" "}
                  <span className="pl-2">Signing up ...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="mt-6 flex w-full justify-center rounded-md bg-[#27ac77] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2c9c6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27ac77] items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="undefined"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span className="pl-2">Sign up</span>
                </button>
              )}
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account ?{" "}
            <a
              href={`/sign-in`}
              className="font-semibold leading-6 text-[#27ac77] hover:text-[#2c9c6a]"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
