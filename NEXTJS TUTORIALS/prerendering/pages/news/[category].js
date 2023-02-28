import React from "react";

const categoryPage = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          {item.title} - {item.category}
        </div>
      ))}
    </div>
  );
};

export default categoryPage;

export const getServerSideProps = async (context) => {
  const { params, req, res, query } = context;
  console.log(query);
  const { category } = params;
  const response = await fetch(
    `http://localhost:3004/posts?category=${category}`
  );
  const data = await response.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
