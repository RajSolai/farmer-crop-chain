import { contractAbi, contractAddress } from "./contractDetails";
import Web3 from "web3";
import Swal from "sweetalert2";

let cropChain = null;
let sender = null;
let web3 = null;

const connectTrigger = () => {
  const provider = window.ethereum;
  if (typeof provider != "undefined") {
    provider.request({ method: "eth_requestAccounts" }).then((acc) => {
      const sender = acc[0];
      localStorage.setItem("acc", sender);
      connect(provider, sender);
    });
  } else {
    Swal.fire(
      "No Wallets Found",
      "Hey It seems you haven't installed Metamask extension",
      "warning"
    );
  }
};

export const connect = (provider, _sender) => {
  const _web3 = new Web3(provider);
  web3 = _web3;
  sender = _sender;
  cropChain = new _web3.eth.Contract(contractAbi, contractAddress);
  console.log("Connected to Web3 provider");
};

const sendETHToBuy = (toAddress, ethAmount, nextFunction) => {
  web3.eth.sendTransaction(
    {
      from: sender,
      to: toAddress,
      value: web3.utils.toWei(ethAmount.toString(), "ether"),
    },
    (err, res) => {
      nextFunction(err, res);
    }
  );
};

export const callAddCrops = (cropType, cropQuantity) => {
  cropChain.methods
    .addCrops(cropQuantity, cropType, sender)
    .send({ from: sender }, (err, res) => {
      if (err) {
        Swal.fire("Adding Crops Failed");
      }
      console.log(res);
      Swal.fire("Crops Added SuccessFully");
    });
};

export const getBalanceOf = (userId, cropType, nextFunction) => {
  cropChain.methods.showUserBalance(cropType, userId).call((err, res) => {
    if (err) console.error(err);
    nextFunction(res);
  });
};

export const callBuyCrops = (
  toAddress,
  ethAmount,
  cropType,
  cropQuantity,
  fromId,
  userId
) => {
  connectTrigger();
  cropType = cropType.toString().toLowerCase();
  Swal.fire("Please Complete the ETH Transaction");
  ethAmount = getCropPrice(cropType, (val) => {
    console.log("Crop price of and is ", cropType, val);
    sendETHToBuy(toAddress, val / 10000, (err, res) => {
      if (err) {
        Swal.fire("ETH Transaction Failed");
      } else {
        transferCrops(cropType, cropQuantity, fromId, userId);
      }
    });
  });
  console.log(toAddress, ethAmount, cropType, cropQuantity, fromId, userId);
};

export const transferCrops = (cropType, cropQuantity, fromId, userId) => {
  cropChain.methods
    .buyCrops(cropQuantity, cropType, fromId, userId)
    .send({ from: sender }, (err, res) => {
      if (err) console.error(err);
      Swal.fire("Crops Bought Successfully");
    });
};

export const setCropPriceInChain = (cropType, cropPrice) => {
  cropChain.methods
    .setCropPrice(cropType.toLowerCase(), cropPrice)
    .send({ from: sender }, (err, res) => {
      if (err) {
        Swal.fire("Crop Price Setting Failed");
        console.error(err);
      }
      Swal.fire("Crop Price Set Successfully");
    });
};

export const getCropPrice = (cropType, nextFunction) => {
  cropChain.methods.getCropPrice(cropType.toLowerCase()).call((err, res) => {
    if (!err) {
      console.log("Price of ", cropType.toLowerCase(), " is ", res);
      nextFunction(res);
    }
  });
};
