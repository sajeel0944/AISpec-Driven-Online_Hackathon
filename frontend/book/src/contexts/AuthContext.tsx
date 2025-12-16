import React, { useState, ReactNode, useEffect, use } from "react";
import { useLocation } from "@docusaurus/router";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isSignInPage = currentPath.includes("sign");
  const isHomePage = currentPath === "/";

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      if (!isSignInPage && !isHomePage) {
        window.location.href = "/signin";
      }
    }else{
      if (isSignInPage) {
        window.location.href = "/docs/intro";
      }
    }
  }, [isSignInPage, isHomePage]);

  return <div>{children}</div>;
};
