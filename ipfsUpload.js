const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config(); // To load environment variables from a .env file

const uploadToIPFS = async (filePath) => {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
      headers: {
        ...form.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
    });

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;  // Propagate the error for further handling
  }
};

module.exports = { uploadToIPFS };
