import React from "react";
import { useSelector } from "react-redux";
import BuyerPortal from "../components/UserPortals/BuyerPortal";
import FarmerPortal from "../components/UserPortals/FarmerPortal";
import SuperUserPortal from "../components/UserPortals/SuperUserPortal";

export default function Home() {
  const userType = useSelector((s) => s.login.userType);

  if (userType == "farmer") {
    return <FarmerPortal />;
  } else if (userType == "superuser") {
    return <SuperUserPortal />;
  } else if (userType == "customer") {
    return (
      <BuyerPortal
        formLabel={"Buy Crops from Retailers"}
        buttonLabel={"Buy Crops"}
        userType={"Customer"}
      />
    );
  } else {
    return (
      <BuyerPortal
        formLabel={"Buy Crops from Farmers"}
        buttonLabel={"Buy Crops"}
        userType={"Retailer"}
      />
    );
  }
}
