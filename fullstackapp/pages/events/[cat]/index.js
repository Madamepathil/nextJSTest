import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const catPage = ({ data }) => {
  const router = useRouter();
  const event = router.query.cat;
  console.log(data);
  return (
    <div>
      <h1> events in {event}</h1>
      {data.map((ev) => (
        <Link href={`/events/${event}/${ev.id}`} key={ev.id}>
          <Image src={ev.image} width={300} height={300} alt={ev.title} />
          <h2>{ev.id}</h2>
          <p>{ev.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default catPage;

export const getStaticPaths = async () => {
  const { events_categories } = await import("/data/data.json");
  const paths = events_categories.map((ev) => ({
    params: { cat: ev.id.toString() },
  }));

  return {
    paths,
    fallback: false, // if route does not exist return 404
  };
};

export const getStaticProps = async (context) => {
  const id = context?.params.cat;
  console.log(id);
  const { allEvents } = await import("/data/data.json");

  const data = allEvents.filter((ev) => ev.city.toLowerCase() === id);
  console.log(data);

  return { props: { data } };
};
