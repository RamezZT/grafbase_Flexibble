"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
type Props = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {
  // RANDOM SHIT CODE TO GENERATE LIKES AND COMEMENTS
  // **
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    // Function to generate a random number between min and max (inclusive)
    const getRandomNumber = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    // Generate random likes and views between 0 and 1000
    const randomLikes = getRandomNumber(0, 1000);
    const randomViews = getRandomNumber(0, 1000);

    // Set the random likes and views in the state
    setLikes(randomLikes);
    setViews(randomViews);
  }, []);
  // **

  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          width={414}
          height={314}
          className="w-full h-full object-cover rounded-2xl"
          alt="Project Image"
        />
        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              alt="avatar"
              className="rounded-full"
            />
            <p>{name}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3 ">
          <div className="flexCenter gap-2">
            <Image src="/hearth.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">{likes}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="/eye.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">{views}k</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
