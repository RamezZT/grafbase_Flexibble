"use client";
import React from "react";
import { signOut } from "next-auth/react";
const FAKK = () => {
  return (
    <h1 onClick={() => signOut()}>
      <div className="w-[800px] bg-red-700 text-blue-700"></div>
    </h1>
  );
};

export default FAKK;
