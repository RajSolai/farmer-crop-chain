import React, { useEffect, useState } from "react";
import { Stack, Autocomplete, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import fps from "../../styles/FarmerPortal.module.css";
import { Box } from "@mui/system";
import { userTypes } from "../../pages/login";

import {
  addANewCrop,
  getAllCrops,
  getCropPrice,
  registerUser,
  setCropPriceInChain,
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

export default function SuperUserPortal() {
  const userName = useSelector((s) => s.login.userName);
  const [cropTypes, setCropTypes] = useState([]);
  const [addCropType, setCropType] = useState("");
  const [addCropPrice, setAddCropPrice] = useState(0);
  const [cropPrice, setCropPrice] = useState(0);

  const [cUserName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userAccount, setUserAccount] = useState("");

  const [newCropName, setNewCropName] = useState("");

  const addNewUser = () => {
    console.log({ cUserName, userType, userAccount, userPass });
    registerUser(userAccount,userPass,userType)
  };

  const addNewCrop = () => {
    addANewCrop(newCropName.toLowerCase());
  };

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
          <h2 style={{ margin: 0 }}>Update Crop Prices</h2>
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
        <div style={{ padding: "1rem" }}>
          <h2 style={{ margin: 0 }}>Add New Crop</h2>
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
            id="s-user-name"
            onChange={(e) => setNewCropName(e.target.value)}
            sx={textFieldStyle}
            label="New Crop's Name"
            variant="outlined"
          />
          <Button variant="contained" onClick={addNewCrop}>
            Add New Crops
          </Button>
        </Box>
        <div style={{ padding: "1rem" }}>
          <h2 style={{ margin: 0 }}>Add New Users</h2>
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
            id="s-user-name"
            onChange={(e) => setUserName(e.target.value)}
            sx={textFieldStyle}
            label="New User's Username"
            variant="outlined"
          />
          <TextField
            id="s-user-account"
            onChange={(e) => setUserAccount(e.target.value)}
            sx={textFieldStyle}
            label="New User's Account Number"
            variant="outlined"
          />
          <TextField
            id="s-user-pass"
            onChange={(e) => setUserPass(e.target.value)}
            sx={textFieldStyle}
            label="New User's Password"
            variant="outlined"
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={userTypes}
            onChange={(_, val) => setUserType(val.label.toLowerCase() || "")}
            sx={{ width: 300, margin: "0.5rem" }}
            renderInput={(params) => (
              <TextField {...params} label="User Type" />
            )}
          />
          <Button variant="contained" onClick={addNewUser}>
            Add
          </Button>
        </Box>
      </Stack>
    </>
  );
}
