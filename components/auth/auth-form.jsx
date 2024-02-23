"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export const AuthForm = () => {
  const [clickRegister, setClickRegister] = useState(false);

  return (
    <>
      {clickRegister ? (
        <RegisterForm
          clickRegister={clickRegister}
          setClickRegister={setClickRegister}
        />
      ) : (
        <LoginForm
          clickRegister={clickRegister}
          setClickRegister={setClickRegister}
        />
      )}
    </>
  );
};
