import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <Link key={item.id} href={`/events/${item.id}`}>
          <Image src={item.image} alt={item.title} width={200} height={400} />
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </Link>
      ))}
    </>
  );
};

export default HomePage;
