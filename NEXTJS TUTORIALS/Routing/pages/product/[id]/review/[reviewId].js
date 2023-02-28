import { useRouter } from "next/router";
import React from "react";

const ReviewPage = () => {
  const router = useRouter();

  const { id, reviewId } = router.query;
  return (
    <div>
      product id: {id} - review id: {reviewId}
    </div>
  );
};

export default ReviewPage;
