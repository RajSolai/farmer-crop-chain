import React, { useState, useEffect } from "react";
import { Stack, Autocomplete, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import fps from "../../styles/FarmerPortal.module.css";
import { Box } from "@mui/system";
import {
  callBuyCrops,
  getBalanceOf,
  getAllCrops,
} from "../../services/contractActions";

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

export default function BuyerPortal({ userType, buttonLabel, formLabel }) {
  const userName = useSelector((s) => s.userName);
  const [cropTypes, setCropTypes] = useState([]);

  const [addedCropQuantity, setCropQuantity] = useState(0);
  const [buyCropType, setCropType] = useState("");
  const [fromFarmer, setFarmer] = useState("");
  const [cropBalance, setCropBalance] = useState("0");

  const updateCropBalance = (_, val) => {
    if (!val) {
      console.log("No Value");
      return;
    }
    getBalanceOf(localStorage.getItem("acc"), val.toLowerCase(), (val) => {
      setCropBalance(val);
    });
  };

  const buyCrops = () => {
    console.log({
      fromFarmer,
      buyCropType,
      addedCropQuantity,
      fromFarmer,
      acc: localStorage.getItem("acc"),
    });
    callBuyCrops(
      fromFarmer.toLowerCase(),
      0,
      buyCropType,
      addedCropQuantity,
      fromFarmer.toLowerCase(),
      localStorage.getItem("acc")
    );
  };

  useEffect(() => {
    getAllCrops((crops) => {
      console.log(crops);
      setCropTypes(crops);
    });
  });

  return (
    <>
      <Stack direction={"column"} className={fps.mainStack}>
        <Stack direction={"row"} className={fps.headerStack}>
          <Stack direction={"column"} className={fps.welcomeStack}>
            <h2 className="welcome-header">Welcome {userType}</h2>
            <p>Your UserID is {userName || "NA"}</p>
          </Stack>
        </Stack>
        <Stack direction={"row"} className={fps.balanceStack}>
          <h4>Balances</h4>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cropTypes}
            className={fps.cropComboBox}
            onChange={updateCropBalance}
            renderInput={(params) => (
              <TextField {...params} label="Select Crop" />
            )}
          />
          <h4>Available balance : {cropBalance}</h4>
        </Stack>
        <div style={{ padding: "1rem" }}>
          <h2 style={{ margin: 0 }}>{formLabel}</h2>
        </div>
        <Box
          component={"form"}
          sx={{
            ...formStyle,
            alignItems: "center",
            justifyContent: "flex-start",
            margin: "0.2rem",
            flexDirection: "row",
          }}
        >
          <TextField
            id="crop-quantity"
            onChange={(e) => setCropQuantity(e.target.value)}
            sx={textFieldStyle}
            label="Crop Quantity"
            variant="outlined"
          />
          <TextField
            id="from-farmer"
            onChange={(e) => setFarmer(e.target.value)}
            sx={textFieldStyle}
            label={
              userType == "Customer" ? "Retailer Address" : "Farmer Address"
            }
            variant="outlined"
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cropTypes}
            sx={{ width: "300px", margin: "0.5rem" }}
            onChange={(_, val) => {
              if (val) setCropType(val);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Crop" />
            )}
          />
          <Button variant="contained" onClick={buyCrops}>
            {buttonLabel}
          </Button>
        </Box>
      </Stack>
    </>
  );
}
