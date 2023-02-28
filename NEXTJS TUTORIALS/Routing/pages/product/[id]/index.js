import { useRouter } from "next/router";
import React from "react";

const IndividualProduct = () => {
  const {
    query: { id },
  } = useRouter();
  return <div>Product detail {id}</div>;
};

export default IndividualProduct;
