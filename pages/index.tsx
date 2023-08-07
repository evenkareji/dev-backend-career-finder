import React from "react";
import LoginPage from "../components/login-page";
import { useAuth } from "../context/auth";

const index = () => {
  const { user } = useAuth();

  return (
    <>
      <div>
        {user ? (
          <>
            <p>login</p>
          </>
        ) : (
          <>
            <p>logout</p>
          </>
        )}
        <LoginPage />
        <p>{user?.name}</p>
      </div>
    </>
  );
};

export default index;
