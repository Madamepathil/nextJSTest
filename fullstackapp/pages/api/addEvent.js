// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import path from "path";
import fs from "fs";
function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}
export default function handler(req, res) {
  const { method } = req;

  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);
  console.log(allEvents);

  if (method === "POST") {
    const data = req.body;
    console.log(data);

    /*  const test = events_categories.map((item) => {
      return { ...item, data };
    }); */

    const newD = [...events_categories, data];

    /*  const newAllevents = allEvents.map((ev) => {
      if ((ev.id = eventId)) {
        if (ev.email === email) {
          res.status(200).json({ message: "email already exist" });
        }
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      }
      return ev;
    }); */
    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories: newD, allEvents })
    );

    /*  console.log(eventId); */
    res.status(200).json({ message: "sucesfully added:" });
  }
}
