"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";

import ROUTES from "@/constants/route";
import { toast } from "@/hooks/use-toast";

import { Button } from "../ui/button";

function SocialAuth() {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      //   throw new Error("Not Implemented");
      await signIn(provider, { redirect: false, callbackUrl: ROUTES.HOME });
    } catch (error) {
      console.log(error);
      toast({
        title: "Sign-In Failed",
        description:
          error instanceof Error
            ? error.message
            : "An Error occcured during sign-in",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          width={20}
          height={20}
          alt="github-logo"
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Login with Github</span>
      </Button>

      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src="/icons/google.svg"
          width={20}
          height={20}
          alt="google-logo"
          className=" mr-2.5 object-contain"
        />

        <span>Login with Google</span>
      </Button>
    </div>
  );
}

export default SocialAuth;
