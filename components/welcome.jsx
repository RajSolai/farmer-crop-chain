import { Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { connect, getCropsAndPrices } from "../services/contractActions";
import style from "../styles/welcome.module.scss";

export default function Welcome() {
  useEffect(() => {
    const provider = window.ethereum;
    if (typeof provider != "undefined") {
      provider.request({ method: "eth_requestAccounts" }).then((acc) => {
        const sender = acc[0];
        localStorage.setItem("acc", sender);
        connect(provider, sender,()=>{
          getCropsAndPrices();
        });
      });
    } else {
      Swal.fire(
        "No Wallets Found",
        "Hey It seems you haven't installed Metamask extension",
        "warning"
      );
    }
  }, []);

  return (
    <>
      <div className={style.welcomePage}>
        <div className={style.titleBox}>
          <h1>Title</h1>
          <div>
            <Button variant="contained">
              <Link href={"/register"}>Create User</Link>
            </Button>
            <Button variant="outline">
              <Link href={"/login"}>Login</Link>
            </Button>
          </div>
        </div>
        <div className={style.transactionBox}>
          <h2>All Transactions</h2>
          <div>
            <p>Party 1 bought 10 rice from party2</p>
            <p>Party 3 added 10 rice</p>
          </div>
        </div>
        <div className={style.pricesBox}>
          <h2>Crop Price Listing</h2>
          <p> Rice : 100 ETH </p>
        </div>
      </div>
    </>
  );
}
