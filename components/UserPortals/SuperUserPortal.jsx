import React, { useState } from "react";
import { Stack, Autocomplete, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { cropTypes } from "../../services/constants";
import fps from "../../styles/FarmerPortal.module.css";
import { Box } from "@mui/system";
import { formStyle, textFieldStyle } from "../login";
import {
  getCropPrice,
  setCropPriceInChain,
} from "../../services/contractActions";

export default function SuperUserPortal() {
  const userName = useSelector((s) => s.userName);
  const [addCropType, setCropType] = useState("");
  const [addCropPrice, setAddCropPrice] = useState(0);
  const [cropPrice, setCropPrice] = useState(0);

  const updateCropPrice = (_, val) => {
    if (!val) {
      console.log("No Value");
      return;
    }
    getCropPrice(val.toLowerCase(), (val) => {
      setCropPrice(val);
    });
  };

  const changeCropPriceInChain = () => {
    setCropPriceInChain(addCropType, addCropPrice);
  };

  return (
    <>
      <Stack direction={"column"} className={fps.mainStack}>
        <Stack direction={"row"} className={fps.headerStack}>
          <Stack direction={"column"} className={fps.welcomeStack}>
            <h2 className="welcome-header">Welcome SuperUser</h2>
            <p>Your UserID is {userName || "NA"}</p>
          </Stack>
        </Stack>
        <Stack direction={"row"} className={fps.balanceStack}>
          <h4>Current Crop Prices</h4>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cropTypes}
            className={fps.cropComboBox}
            onChange={updateCropPrice}
            renderInput={(params) => (
              <TextField {...params} label="Select Crop" />
            )}
          />
          <h4>Current Price : {cropPrice}</h4>
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
            id="crop-price"
            onChange={(e) => setAddCropPrice(e.target.value)}
            sx={textFieldStyle}
            label="Crop Price"
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
          <Button variant="contained" onClick={changeCropPriceInChain}>
            Update Price
          </Button>
        </Box>
      </Stack>
    </>
  );
}
