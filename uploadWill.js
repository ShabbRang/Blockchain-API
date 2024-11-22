const Web3 = require('web3');
const { uploadToIPFS } = require("./ipfsUpload");

const AbiContract = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "version",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "uploader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "NewWillVersion",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "currentVersion",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "willVersions",
    "outputs": [
      {
        "internalType": "string",
        "name": "fileHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "version",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "uploader",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "fileHash",
        "type": "string"
      }
    ],
    "name": "uploadWill",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "version",
        "type": "uint256"
      }
    ],
    "name": "getWillVersion",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "fileHash",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "version",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "uploader",
            "type": "address"
          }
        ],
        "internalType": "struct WillVersionControl.Will",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

// Connect to Ganache
const web3 = new Web3('http://localhost:7545'); // Ganache RPC URL
const account = "0x63347E7a5991B04dE2Ccb2da2E2f899AeD1Ff25B"; // Replace with your account from Ganache

// Set up contract
const contractABI = AbiContract; // Use ABI directly without wrapping it in another array
const contractAddress = "0x63347E7a5991B04dE2Ccb2da2E2f899AeD1Ff25B"; // Replace with your deployed contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to upload the will to blockchain
const uploadWillToBlockchain = async (filePath) => {
  try {
    const ipfsHash = await uploadToIPFS(filePath); // Upload file to IPFS
    console.log("IPFS Hash:", ipfsHash);

    // Send the IPFS hash to the smart contract
    const receipt = await contract.methods
      .uploadWill(ipfsHash)
      .send({ from: account });
    console.log("Transaction receipt:", receipt);
  } catch (error) {
    console.error("Error uploading to blockchain:", error);
  }
};

uploadWillToBlockchain("C:/Shabbir/Projects/Final_Year_Project/Will_Project/AdmitCard.pdf");

// Function to get the will version
// const getWillVersion = async (version) => {
//   try {
//     const will = await contract.methods.getWillVersion(version).call({ from: account });
//     if (!will || !will.fileHash) {
//       console.error("No data returned for this version");
//       return;
//     }
//     console.log("Will Version:", will);
//   } catch (error) {
//     console.error("Error getting will version:", error);
//     if (error.message.includes('Returned values aren\'t valid')) {
//       console.error("The contract might not be returning valid data. Ensure the contract and ABI match.");
//     }
//   }
// };

// getWillVersion(1); 
