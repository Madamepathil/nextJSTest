import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1554793",
  key: "8b649a520023480cf9ca",
  secret: "18e94481173dd538ddde",
  cluster: "eu",
  useTLS: true,
});

export const clientPusher = new ClientPusher("8b649a520023480cf9ca", {
  cluster: "eu",
  forceTLS: true,
});
