import React from "react";
import { useSelector } from "react-redux";
import Home from "../components/home";
import Login from "../components/login";

export default function Index() {
  const isLogged = useSelector((s) => s.isLogged);

  if (isLogged) {
    return (
      <>
        <Home />
      </>
    );
  } else {
    return (
      <>
        <Login />
      </>
    );
  }
}
