import { DefaultSession } from "next-auth";
import React from "react";

const UserCard = ({ user }: { user: DefaultSession["user"] }) => {
  return (
    <div>
      <div>
        <p>current logged in user</p>
        <h5>{user?.name}</h5>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
