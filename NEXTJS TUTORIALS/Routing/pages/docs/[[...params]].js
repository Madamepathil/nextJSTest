import { useRouter } from "next/router";
import React from "react";

const Doc = () => {
  const router = useRouter();
  const { params } = router;
  console.log(params);
  return <div>Docs home page</div>;
};

export default Doc;
