import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import {useRouter} from "next/router"
import { connect, getAllTransactions, getCropsAndPrices } from "../services/contractActions";
import Welcome from "./welcome";

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    const provider = window.ethereum;
    if (typeof provider != "undefined") {
      provider.request({ method: "eth_requestAccounts" }).then((acc) => {
        const sender = acc[0];
        localStorage.setItem("acc", sender);
        connect(provider, sender, () => {
          console.log("Wallet connected :)");
          getCropsAndPrices();
          setTimeout(() => {
            router.push("/welcome")
          }, 5000);
        });
      });
    } else {
      Swal.fire(
        "No Wallets Found",
        "Hey It seems you haven't installed Metamask extension",
        "warning"
      );
    }
  });

  return (
    <>
      <div className="loading-page">
        <h2>Loading</h2>
      </div>
    </>
  );
}
