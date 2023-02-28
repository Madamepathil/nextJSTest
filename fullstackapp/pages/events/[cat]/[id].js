import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const eventPage = ({ data }) => {
  const [text, setText] = useState("");
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    const eventId = router?.query.id;

    const res = await fetch("/api/email-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: text,
        eventId,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <Image src={data.image} width={300} height={300} alt={data.title} />
      <h2>{data.id}</h2>
      <p>{data.description}</p>

      <p>get registred for the event</p>
      <form action="" onSubmit={register}>
        <input type="email" onChange={(e) => setText(e.target.value)} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default eventPage;

export const getStaticPaths = async () => {
  const { allEvents } = await import("/data/data.json");
  const paths = allEvents.map((ev) => ({
    params: { cat: ev.city, id: ev.id.toString() },
  }));

  return {
    paths,
    fallback: false, // if route does not exist return 404
  };
};

export const getStaticProps = async (context) => {
  const id = context?.params.id;
  console.log(id);
  const { allEvents } = await import("/data/data.json");

  const data = allEvents.find((ev) => ev.id.toLowerCase() === id);
  console.log(data, "LOL");

  return { props: { data } };
};
