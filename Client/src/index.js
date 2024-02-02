import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// router
import Router from "./Routes/Router";
// redux
import store from "./Redux/store";
import { Provider } from "react-redux";

//import NodeChatForm from "./SocketTest/NodeChatForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />{" "}
      {/* <NodeChatForm /> */}
      {/* <TestRedux /> */}
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
