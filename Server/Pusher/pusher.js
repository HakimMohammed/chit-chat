import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1565001",
  key: "d43f0f1892e906321311",
  secret: "79e28b95af64b0c614d8",
  cluster: "eu",
  useTLS: true,
});

export default pusher;