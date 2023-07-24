import React from "react";
import { login, logout } from "../lib/auth";
import { UseAuth } from "../context/auth";
const LoginPage = () => {
  const { user } = UseAuth();
  return (
    <>
      {!user && <button onClick={login}>ログイン</button>}
      {user && <button onClick={logout}>ログアウト</button>}
    </>
  );
};

export default LoginPage;
