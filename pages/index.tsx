import React from "react";
import LoginPage from "../components/loginPage";
import { UseAuth } from "../context/auth";

const index = () => {
  const { user } = UseAuth();

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
