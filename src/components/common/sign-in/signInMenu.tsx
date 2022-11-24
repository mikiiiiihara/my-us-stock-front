import React from "react";
import { signIn } from "next-auth/react";

export const SignInMenu = () => {
  return (
    <div className="sign-in-menu">
      Please Sign in <br />
      <button className="btn btn-primary" onClick={() => signIn("google")}>
        Sign in
      </button>
    </div>
  );
};
