"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

import { Input } from "../ui/input";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
  iconPosition?: "left" | "right";
}

function LocalSearch({
  route,
  imgSrc,
  placeholder,
  otherClasses,
  iconPosition = "left",
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParam = useSearchParams();
  const query = searchParam.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParam.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });

        //   console.log(newUrl);
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParam.toString(),
            keysToRemove: ["query"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, route, router, searchParam, pathname]);
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
      )}

      <Input
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
        placeholder={placeholder}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
}

export default LocalSearch;
