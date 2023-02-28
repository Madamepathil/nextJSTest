import { useRouter } from "next/dist/client/router";
import React from "react";

const article = ({ data }) => {
  /*   const router = useRouter();
  const { id } = router.query; */
  return <div>{data.id}</div>;
};

/* export const getServerSideProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}; */

export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  const data = await res.json();
  const ids = data.map((item) => item.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default article;
