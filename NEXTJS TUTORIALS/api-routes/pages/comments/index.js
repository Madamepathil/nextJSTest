import React, { useState } from "react";

const commentsPage = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    const response = await fetch("api/comments");
    const data = await response.json();
    setComments(data);
  };

  const submitClick = async () => {
    const response = await fetch("api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    setComments((prev) => [...prev, data]);
  };

  const deleteComment = async (id) => {
    const response = await fetch(`api/comments/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);
    fetchComments();
  };
  return (
    <div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={submitClick}>submit</button>
      <button onClick={fetchComments}>load comments</button>
      {comments.map((item) => (
        <div onClick={() => deleteComment(item.id)} key={item.id}>
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default commentsPage;
