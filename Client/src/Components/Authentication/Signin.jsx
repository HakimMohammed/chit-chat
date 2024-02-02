import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, googleProvider } from "../../Firebase/FirebaseConfiguration";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [signinValid, setSigninValid] = useState(true);
  const [signinError, setSigninError] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError("Email invalid");
    setEmailValid(emailRegex.test(email));
  }

  function isValidPassword(password) {
    if (password.length === 0) {
      setPasswordError("Password required");
      setPasswordValid(false);
      return false;
    }
    setPasswordValid(true);
    return true;
  }

  const googleHandler = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      const response = await axios.post("http://localhost:7000/api/sign-in-google" , {user : user})
      const {token} = response.data;
      sessionStorage.setItem('token', token);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      console.log("errorCode :" + errorCode);

      const errorMessage = error.message;
      console.log("errorMessage :" + errorMessage);

      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("credential :" + credential);
    } finally {
      setLoading(false);
    }
  };

  const submitHandeler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      isValidPassword(password);
      if (emailValid === true && passwordValid === true) {
        const response = await axios.post("http://localhost:7000/api/sign-in" , {email : email,password : password})
        const {token} = response.data;
        sessionStorage.setItem('token', token);
      }
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/invalid-credential":
          setSigninError("Email or Password invalid");
          setSigninValid(false);
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
      <div className="absolute md:mx-auto my-44 md:w-full md:max-w-md inset-0 bg-[#27ac77] rounded-md z-10 overflow blur-lg"></div>
      <div className="relative sm:mx-auto sm:w-full sm:max-w-sm px-6 py-12 lg:px-8 bg-[#1f1f1f] outline outline-2 outline-[#2a2a2a] rounded-lg z-20">
        <div className="flex justify-around	 sm:mx-auto sm:w-full sm:max-w-sm">
          <button
            onClick={googleHandler}
            type="button"
            className="text-white bg-[#2a2a2a] hover:bg-[#1f1f1f] outline outline-2 outline-[#2a2a2a] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-2"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            className="text-white bg-[#2a2a2a] hover:bg-[#1f1f1f] outline outline-2 outline-[#2a2a2a] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-2"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            className="text-white bg-[#2a2a2a] hover:bg-[#1f1f1f] outline outline-2 outline-[#2a2a2a] font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mb-2"
          >
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px bg-gray-500 border-0"></hr>
            <span className="absolute px-3 font-medium text-sm text-gray-500 bg-[#1f1f1f] ">
              or sign in with
            </span>
          </div>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandeler}>
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
                    setSigninValid(true);
                  }}
                  className={
                    "block w-full rounded-md bg-[#1f1f1f] border-0 py-1.5 text-white shadow-sm ring-2 ring-inset ring-[#2a2a2a] focus:ring-2 focus:ring-inset focus:ring-[#27ac77] sm:text-sm sm:leading-6 pl-10 " +
                    (!emailValid || !signinValid
                      ? "ring-red-600 focus:ring-red-600"
                      : "")
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
            </div>

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
                    isValidPassword(e.target.value);
                    setSigninValid(true);
                  }}
                  className={
                    "block w-full rounded-md bg-[#1f1f1f] border-0 py-1.5 text-white shadow-sm ring-2 ring-inset ring-[#2a2a2a] focus:ring-2 focus:ring-inset focus:ring-[#27ac77] sm:text-sm sm:leading-6 pl-10 " +
                    (!passwordValid || !signinValid
                      ? "ring-red-600 focus:ring-red-600"
                      : "")
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
            </div>
            <div>
              {!emailValid && (
                <p className="mt-1 text-left text-sm font-semibold text-red-600">
                  {emailError}
                </p>
              )}
              {!passwordValid && (
                <p className="mt-1 text-left text-sm font-semibold text-red-600">
                  {passwordError}
                </p>
              )}
              {!signinValid && (
                <p className="mt-1 text-left text-sm font-semibold text-red-600">
                  {signinError}
                </p>
              )}
            </div>
            <div>
              {loading ? (
                <button
                  disabled
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#2c9c6a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2c9c6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27ac77] items-center"
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
                  <span className="pl-2">Signing in ...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#27ac77] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2c9c6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27ac77] items-center"
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
                  <span className="pl-2">Sign in</span>
                </button>
              )}
            </div>
          </form>
          <p className="mt-5 text-center text-sm">
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-[#27ac77] hover:text-[#2c9c6a]"
              >
                Forgot password ?
              </a>
            </div>
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            Don't have an account ?{" "}
            <a
              href={`sign-up`}
              className="font-semibold leading-6 text-[#27ac77] hover:text-[#2c9c6a]"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
