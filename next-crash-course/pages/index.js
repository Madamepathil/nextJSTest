import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  console.log(data);
  return (
    <>
      {data.map((item, i) => (
        <Link key={i} href={`/articles/${item.id}`}>
          <h3>{item.title}</h3>
        </Link>
      ))}
    </>
  );
}

/* export const getStaticProps = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=6`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}; */

//own api
export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/articles`);

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
