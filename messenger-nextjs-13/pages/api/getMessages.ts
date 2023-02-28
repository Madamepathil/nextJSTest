import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "../../typings";
interface Data {
  messages: Message[];
}

type ErrorData = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ name: "Method not allowed" });
  }

  //get data from redis
  const data = await redis.hvals("messages");
  const messages: Message[] = data
    .map((message) => JSON.parse(message))
    .sort((a, b) => b.created_at - a.created_at);

  return res.status(200).json({ messages });
}
