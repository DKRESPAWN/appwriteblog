import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  //   we will ask the the store if logged in or not
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login"); //If authentication is true but authStatus does not match it, the user is redirected to the login page (/login).
    } else if (!authentication && authStatus !== authentication) {
      navigate("/"); //If authentication is false (meaning no authentication is needed), but authStatus doesn’t match it, the user is redirected to the home page (/).
    }
  }, [authStatus, navigate, authentication]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
