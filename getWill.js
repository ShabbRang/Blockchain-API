const Web3 = require('web3'); 
const web3 = new Web3('http://localhost:7545'); 

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
  ];  
const contractAddress = '0x65bD3B6d5C6461c18A6251FA4b25Dc1edCB4bc47';  
const contractABI = AbiContract;

// Initialize the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

const account = '0x672efDCE06529b407f619912be0585Eb55AABB54';  

// const getWillVersion = async (version) => {
//     try {
//       const will = await contract.methods.getWillVersion(version).call({ from: account });
//       console.log("Returned Will:", will);  // Log to check what is returned
  
//       if (!will || !will.fileHash) {
//         console.error("No data returned for this version");
//         return;
//       }
//       console.log("Will Version:", will);
//     } catch (error) {
//       console.error("Error getting will version:", error);
//       if (error.message.includes('Returned values aren\'t valid')) {
//         console.error("The contract might not be returning valid data. Ensure the contract and ABI match.");
//       }
//     }
//   };
  

// getWillVersion(1);

const storedWill = await contract.methods.getWillVersion(1).call();
console.log("Stored Will:", storedWill);

