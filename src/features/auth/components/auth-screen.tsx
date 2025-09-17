"use client";

import { useState } from "react";

import { SignInCard } from "./sign-in-card";
import { AuthFlow } from "../types";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
  const [mode, setMode] = useState<AuthFlow>("sign-in");

  return (
    <div className="w-full h-full md:w-[420px] border-none shadow-none">
      {mode === "sign-up" ? (
        <SignUpCard setMode={setMode} />
      ) : (
        <SignInCard setMode={setMode} />
      )}
    </div>
  );
};
