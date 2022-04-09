import React, { useState } from "react";
import { Stack, Autocomplete, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { cropTypes } from "../../services/constants";
import fps from "../../styles/FarmerPortal.module.css";
import { Box } from "@mui/system";
import { formStyle, textFieldStyle } from "../login";
import {
  getBalanceOf,
  callAddCrops,
  setCropPrice
} from "../../services/contractActions";

export default function FarmerPortal() {
  const userName = useSelector((s) => s.userName);
  const [addedCropQuantity, setCropQuantity] = useState(0);
  const [addCropType, setCropType] = useState("");
  const [cropBalance, setCropBalance] = useState(0);

  const updateCropBalance = (_, val) => {
    if (!val) {
      console.log("No Value");
      return;
    }
    getBalanceOf(localStorage.getItem("acc"), val.toLowerCase(), (val) => {
      setCropBalance(val);
    });
  };

  const addCropsToChain = () => {
    callAddCrops(addCropType.toLowerCase(), addedCropQuantity);
  };

  return (
    <>
      <Stack direction={"column"} className={fps.mainStack}>
        <Stack direction={"row"} className={fps.headerStack}>
          <Stack direction={"column"} className={fps.welcomeStack}>
            <h2 className="welcome-header">Welcome Farmer</h2>
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
          <h2 style={{ margin: 0 }}>Add Crops</h2>
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
          <Button variant="contained" onClick={addCropsToChain}>
            Add Crops
          </Button>
        </Box>
      </Stack>
    </>
  );
}
