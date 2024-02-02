import Pusher from "pusher-js";

var pusher = new Pusher("d43f0f1892e906321311", {
  authEndpoint: "http://localhost:7000/api/pusher/auth",
  cluster: "eu",
});

pusher.connection.bind("error", function (err) {
  if (err.error.data.code === 404) {
    console.log(">>> detected limit error");
  }
});

export default pusher;
