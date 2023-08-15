import React from "react";
import { getAllUsers } from "@/lib/actions";
import UserCard from "@/components/UserCard";
import { UsersInterface } from "@/common.types";
import { makeGraphQLRequest } from "@/lib/actions";
const page = async () => {
  const {
    userCollection: { edges: users },
  } = (await getAllUsers()) as UsersInterface;
  console.log(users);
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard
            name={user.node.name}
            avatarUrl={user.node.avatarUrl}
            id={user.node.id}
            key={user.node.id}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
