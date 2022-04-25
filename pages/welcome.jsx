import { Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  connect,
  getCropsAndPrices,
  getAllTransactions,
} from "../services/contractActions";
import style from "../styles/welcome.module.scss";

export default function Welcome() {
  const { price } = useSelector((s) => s.price);
  return (
    <>
      <div className={style.welcomePage}>
        <div className={style.titleBox}>
          <h1>Farmer Blockchain </h1>
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
          <Link href={"/transactions"}>Get all transactions</Link>
        </div>
        <div className={style.pricesBox}>
          <h2>Prices of Crops</h2>
          <div>
            {price.map((pr) => (
              <>
                <p>
                  {pr.cropName} Sells for {pr.cropPrice} ETH
                </p>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
