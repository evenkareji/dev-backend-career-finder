import React from "react";
import { login, logout } from "../lib/auth";
import { useAuth } from "../context/auth";
const LoginPage = () => {
  const { user } = useAuth();
  return (
    <>
      {!user && <button onClick={login}>ログイン</button>}
      {user && <button onClick={logout}>ログアウト</button>}
    </>
  );
};

export default LoginPage;
