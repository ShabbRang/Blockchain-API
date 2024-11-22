const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer, network, accounts) {
    const deployerAccount = '0x63347E7a5991B04dE2Ccb2da2E2f899AeD1Ff25B'; // Replace with your desired account address
    console.log("Deploying from account:", deployerAccount);

    // Pass only the address string to the constructor
    await deployer.deploy(Migrations, deployerAccount, { from: deployerAccount });
};
