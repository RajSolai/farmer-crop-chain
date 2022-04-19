import { contractAbi, contractAddress } from "./contractDetails";
import Web3 from "web3";
import { store } from "../pages/_app";
import { savePrices } from "../redux/actions/savePrices";
import Swal from "sweetalert2";
import { saveTransactions } from "../redux/actions/saveTransactions";

let cropChain = null;
let sender = null;
let web3 = null;

export const connect = (provider, _sender, nextFunction) => {
  const _web3 = new Web3(provider);
  web3 = _web3;
  sender = _sender;
  cropChain = new _web3.eth.Contract(contractAbi, contractAddress);
  nextFunction();
  console.log("Connected to Web3 provider");
};

const sendETHToBuy = (toAddress, ethAmount) => {
  web3.eth.sendTransaction({
    from: sender,
    to: toAddress,
    value: web3.utils.toWei(ethAmount.toString(), "ether"),
  });
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
    console.log("Balance of ", userId, " is ", res);
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
  cropType = cropType.toString().toLowerCase();
  Swal.fire("Please Complete the ETH Transaction");
  ethAmount = getCropPrice(cropType, (val) => {
    console.log("Crop price of and is ", cropType, val);
    sendETHToBuy(toAddress, val / 10000);
    transferCrops(cropType, cropQuantity, fromId, userId);
  });
  console.log({ toAddress, ethAmount, cropType, cropQuantity, fromId, userId });
};

export const transferCrops = (cropType, cropQuantity, fromId, userId) => {
  console.log({ cropType, cropQuantity, fromId, userId });
  cropChain.methods
    .buyCrops(cropQuantity, cropType, fromId, userId)
    .send({ from: sender }, (err, res) => {
      if (err) console.error(err);
      console.log(res);
      Swal.fire(
        "Crops Bought Successfully",
        "Please wait until the transaction is completed"
      );
    });
};

export const setCropPriceInChain = (cropType, cropPrice) => {
  cropChain.methods
    .setCropPrice(cropType.toLowerCase(), cropPrice)
    .send({ from: sender }, (err, _) => {
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

export const loginUser = (userPassword, userType, nextFunction) => {
  cropChain.methods
    .loginUser(localStorage.getItem("acc"), userPassword, userType)
    .call((err, res) => {
      if (!err) {
        console.log(res);
        if (res === "login-success") nextFunction(res);
      }
    });
};

export const getAllCrops = (nextFunction) => {
  cropChain.methods.getCropTypes().call((_, res) => {
    if (res) nextFunction(res);
  });
};

export const addANewCrop = (cropType) => {
  cropChain.methods.addCropType(cropType).send({ from: sender }, (err, _) => {
    if (!err)
      Swal.fire("CropType Added", "Please wait until Transaction is confirmed");
  });
};

export const registerUser = (userAccount, userPassword, userType) => {
  cropChain.methods
    .createUser(
      userAccount.toLowerCase() || localStorage.getItem("acc"),
      userPassword,
      userType
    )
    .send({ from: sender }, (err, _) => {
      if (!err)
        Swal.fire(
          "Thanks for Registering",
          "Please Login after the Transaction is confirmed"
        );
    });
};

export const getAllTransactions = () => {
  cropChain.methods.showTransactions().call((err, res) => {
    console.log(res);
    store.dispatch(saveTransactions({ transactions: res }));
  });
};

export const getCropsAndPrices = () => {
  var out = [];
  getAllCrops((crops) => {
    crops.forEach((crop) => {
      getCropPrice(crop, (price) => {
        out.push({ cropName: crop, cropPrice: price });
      });
    });
  });
  store.dispatch(savePrices({ price: out }));
};
