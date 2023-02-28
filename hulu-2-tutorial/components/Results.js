import React from "react";
import Thumbnail from "./Thumbnail";

const Results = ({ result }) => {
  return (
    <div
      className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3
        3xl:flex flex-wrap justify-center
    "
    >
      {result.results.map((item) => {
        return <Thumbnail key={item.id} result={item} />;
      })}
    </div>
  );
};

export default Results;
