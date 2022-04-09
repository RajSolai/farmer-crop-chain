export const contractAddress = "0xa81eBB36D9De367Cb1072e1Bb7884307A9E78B43";

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
        name: "userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "userType",
        type: "string",
      },
      {
        internalType: "string",
        name: "userName",
        type: "string",
      },
    ],
    name: "login",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
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
