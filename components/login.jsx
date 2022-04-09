import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "../services/contractActions";
import Swal from "sweetalert2";
import { TextField, Box, Button, Autocomplete } from "@mui/material";
import { loginAction } from "../redux/actions/login";

export const formStyle = {
  display: "flex",
  marginTop: "5rem",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
};

export const textFieldStyle = {
  width: 300,
  margin: "0.5rem",
};

const userTypes = [
  { label: "Customer" },
  { label: "SuperUser" },
  { label: "Farmer" },
  { label: "Retailer" },
];

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userPass, setUserPass] = useState("");
  const dispatch = useDispatch();

  const login = () => {
    const provider = window.ethereum;
    if (typeof provider != "undefined") {
      provider.request({ method: "eth_requestAccounts" }).then((acc) => {
        const sender = acc[0];
        localStorage.setItem("acc",sender);
        connect(provider, sender);
      });
    } else {
      Swal.fire(
        "No Wallets Found",
        "Hey It seems you haven't installed Metamask extension",
        "warning"
      );
    }
    console.log(userName, userType);
    const loginData = {
      userName,
      userType,
      isLogged: true,
    };
    if (userName == "user1" && userPass == "user1" && userType == "farmer") {
      dispatch(loginAction(loginData));
    } else if (
      userName == "user2" &&
      userPass == "user2" &&
      userType == "customer"
    ) {
      dispatch(loginAction(loginData));
    } else if (
      userName == "super" &&
      userPass == "super" &&
      userType == "superuser"
    ) {
      dispatch(loginAction(loginData));
    } else if (
      userName == "user3" &&
      userPass == "user3" &&
      userType == "retailer"
    ) {
      dispatch(loginAction(loginData));
    } else {
      console.log("Incorrect login details");
    }
  };

  return (
    <div>
      <Box component="form" sx={formStyle}>
        <h2>Register / Login</h2>
        <TextField
          id="user-name"
          onChange={(e) => setUserName(e.target.value)}
          sx={textFieldStyle}
          label="UserName"
          variant="outlined"
        />
        <TextField
          id="user-pass"
          onChange={(e) => setUserPass(e.target.value)}
          sx={textFieldStyle}
          label="Password"
          type={"password"}
          variant="outlined"
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={userTypes}
          onChange={(_, val) => setUserType(val.label.toLowerCase() || "")}
          sx={{ width: 300, margin: "0.5rem" }}
          renderInput={(params) => <TextField {...params} label="User Type" />}
        />
        <Button variant="contained" onClick={login}>
          Enter
        </Button>
      </Box>
    </div>
  );
}
