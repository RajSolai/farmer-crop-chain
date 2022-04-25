import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connect, registerUser } from "../services/contractActions";
import style from "../styles/login.module.scss";
import { Box, TextField, Autocomplete, Button } from "@mui/material";

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

const userTypes = [{ label: "Customer" }];

export default function Register() {
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userPass, setUserPass] = useState("");
  const dispatch = useDispatch();

  const handleRegister = () => {
    const provider = window.ethereum;
    if (typeof provider != "undefined") {
      provider.request({ method: "eth_requestAccounts" }).then((acc) => {
        const sender = acc[0];
        localStorage.setItem("acc", sender);
        connect(provider, sender, () => {
          registerUser(sender, userPass, userType);
        });
      });
    } else {
      Swal.fire(
        "No Wallets Found",
        "Hey It seems you haven't installed Metamask extension",
        "warning"
      );
    }

    console.log(userName, userType, userPass);
  };

  return (
    <>
      <div className="register-page">
        <h1>Register</h1>
        <Box component="form" sx={formStyle}>
          <div className={style.formElement}>
            <p>User Name</p>
            <TextField
              id="user-name"
              onChange={(e) => setUserName(e.target.value)}
              sx={textFieldStyle}
              label="UserName"
              variant="outlined"
            />
          </div>
          <div className={style.formElement}>
            <p>Password</p>
            <TextField
              id="user-pass"
              onChange={(e) => setUserPass(e.target.value)}
              sx={textFieldStyle}
              label="Password"
              type={"password"}
              variant="outlined"
            />
          </div>
          <div className={style.formElement}>
            <p>User Type</p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={userTypes}
              onChange={(_, val) => setUserType("customer")}
              sx={{ width: 300, margin: "0.5rem" }}
              renderInput={(params) => (
                <TextField {...params} label="User Type" />
              )}
            />
          </div>
          <p>
            NOTE: It is Must to Install Metamask and Have enough ETH for Gas.
          </p>
          <Button variant="contained" onClick={handleRegister}>
            Create User
          </Button>
        </Box>
      </div>
    </>
  );
}
