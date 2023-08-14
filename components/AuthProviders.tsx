"use client";
import { SessionInterface } from "@/common.types";
import { authOpitions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { useSession, getProviders, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Button from "./Button";
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
            handleClick={() => signIn(provider?.id)}
          />
        ))}
      </div>
    );
  }
  return <></>;
};

export default AuthProviders;
