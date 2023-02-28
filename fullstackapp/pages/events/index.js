import Image from "next/image";
import Link from "next/link";
import React from "react";

const eventsPage = ({ data }) => {
  return (
    <div>
      <h1>events page</h1>
      {data.map((item) => (
        <Link key={item.id} href={`/events/${item.id}`}>
          <Image src={item.image} width={200} height={300} alt={item.title} />
          <h2>{item.title}</h2>
        </Link>
      ))}
    </div>
  );
};

export default eventsPage;
export const getStaticProps = async () => {
  const { events_categories } = await import("/data/data.json");
  console.log(events_categories);
  return {
    props: {
      data: events_categories,
    },
  };
};
