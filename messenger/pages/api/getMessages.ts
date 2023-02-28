import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "../../typings";

type Data = {
  messages: Message[];
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ body: "method not allowed" });
  }

  const data = await redis.hvals("messages");
  const messages: Message[] = data
    .map((message) => JSON.parse(message))
    .sort((a, b) => b.created_at - a.created_at);

  console.log(messages);

  res.status(200).json({ messages });
}
