"use client";
import React from "react";
import { UsersInterface } from "@/common.types";
import { fetchToken } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
type Props = {
  name: string;
  avatarUrl: string;
  id: string;
};

const UserCard = ({ name, avatarUrl, id }: Props) => {
  if (avatarUrl.includes("google"))
    return (
      <Link href={`profile/${id}`} className=" flexStart gap-2">
        <Image
          className=" rounded-full"
          src={avatarUrl}
          width={64}
          height={64}
          alt="profile pic"
        />
        <p className=" sm:text-122">{name}</p>
      </Link>
    );

  return <></>;
};

export default UserCard;
