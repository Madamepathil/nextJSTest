import React from "react";

const NewsPage = ({ data }) => {
  return (
    <div>
      {data?.map((item) => (
        <div key={item.ids}>
          {item.title} - {item.category}
        </div>
      ))}
    </div>
  );
};

export default NewsPage;

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3004/posts");
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};
