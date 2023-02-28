import React from "react";
import { useRouter } from "next/router";

const PostDetail = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>loading...</h1>;
  }
  return <div>{post.title}</div>;
};

export default PostDetail;

export const getStaticProps = async (context) => {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post: data,
    },
  };
};

export const getStaticPaths = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  const paths = data.map((item) => {
    return { params: { postId: `${item.id}` } };
  });

  return {
    paths,
    fallback: true,
  };
};

/* Fallback true, sidor som inte generarts under build time kommer inte
få en 404 page, en fallback version av sidan kmr att visas... på initial request
kommer vi se en loading text, men sen visas sidan.

*/
