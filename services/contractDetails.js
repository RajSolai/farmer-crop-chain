export const contractAddress = "0x4357393d785A5e6134507B5ee48B08bFB02DB85b";

export const contractAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "cropType",
        type: "string",
      },
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    name: "addCrops",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "cropType",
        type: "string",
      },
    ],
    name: "addCropType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "cropType",
        type: "string",
      },
      {
        internalType: "string",
        name: "fromId",
        type: "string",
      },
      {
        internalType: "string",
        name: "toId",
        type: "string",
      },
    ],
    name: "buyCrops",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userAccountNumber",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userPassword",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userType",
        type: "string",
      },
    ],
    name: "createUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "cropType",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "cropPrice",
        type: "uint256",
      },
    ],
    name: "setCropPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "cropType",
        type: "string",
      },
    ],
    name: "getCropPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCropTypes",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userAccountNumber",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userPassword",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userType",
        type: "string",
      },
    ],
    name: "loginUser",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "cropType",
        type: "string",
      },
    ],
    name: "showCropBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "showTransactions",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "cropType",
        type: "string",
      },
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    name: "showUserBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
