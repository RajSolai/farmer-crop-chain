import React, { useEffect, useState } from "react";
import { getAllTransactions } from "../services/contractActions";

export default function Transactions() {
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    getAllTransactions((val) => {
      console.log("val got is ", val);
      setTrans(val);
    });
  });

  return (
    <>
      <div className="transaction-page">
        <h2>All Transactions</h2>
        <div className="transaction-box">{JSON.stringify(trans)}</div>
      </div>
    </>
  );
}
