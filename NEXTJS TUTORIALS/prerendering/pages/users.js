import React from "react";
import Users from "../components/Users";

const usersPage = ({ data }) => {
  return (
    <div>
      {data.map((item) => {
        return <Users key={item.id} user={item} />;
      })}
    </div>
  );
};

export default usersPage;

/* SSG med data från api som behövs på sidan...
körs bara på serverSidan, 
*/
export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}
