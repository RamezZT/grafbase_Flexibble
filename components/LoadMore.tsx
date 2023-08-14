"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

type Props = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

const LoadMore = ({
  startCursor,
  endCursor,
  hasNextPage,
  hasPreviousPage,
}: Props) => {
  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (direction === "next" && hasNextPage) {
      currentParams.delete("startcursor");
      currentParams.set("endcursor", endCursor);
      currentParams.set("back", "false");
    } else if (direction === "back" && hasPreviousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
      currentParams.set("back", "true");
    }
    const newSearchParam = currentParams.toString();
    const newPathName = `${window.location.pathname}?${newSearchParam}`;

    router.push(newPathName);
    //
  };
  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          title="Previous Page"
          handleClick={() => handleNavigation("back")}
        />
      )}
      {hasNextPage && (
        <Button title="Next" handleClick={() => handleNavigation("next")} />
      )}
    </div>
  );
};

export default LoadMore;
