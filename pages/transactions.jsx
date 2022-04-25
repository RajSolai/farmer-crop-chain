import React, { useEffect, useState } from "react";
import { getAllTransactions } from "../services/contractActions";
import { Paper } from "@mui/material";
import pageStyle from "../styles/pages.module.scss";

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
      <div className={pageStyle.page}>
        <h2>All Transactions</h2>
        <div className={pageStyle.listBox}>
          {trans.map((tran) => (
            <>
              <Paper className={pageStyle.listItem}>
                <p>{tran}</p>
              </Paper>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
