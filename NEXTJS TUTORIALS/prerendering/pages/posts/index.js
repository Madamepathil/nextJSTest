import React from "react";
import Link from "next/link";

const PostList = ({ data }) => {
  return (
    <div>
      {data.map((item) => {
        return (
          <Link key={item.id} href={`/posts/${item.id}`}>
            <div>
              <p>{item.title}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostList;

export const getStaticProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
};
