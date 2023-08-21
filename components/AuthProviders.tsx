"use client";
import { getProviders, signIn } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/session";
import Button from "./Button";
import { useRouter } from "next/navigation";
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;
const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);
  const router = useRouter();
  const signInHandler = async (provider: Provider) => {
    await signIn(provider?.id);
    const session = await getCurrentUser();
    console.log(session);
  };
  useEffect(() => {
    const fetchProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProvider();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <Button
            key={i}
            title="Sign In"
            handleClick={() => signInHandler(provider)}
          />
        ))}
      </div>
    );
  }
  return <></>;
};

export default AuthProviders;
