const WillVersionControl = artifacts.require("WillVersionControl");

module.exports = function (deployer) {
  deployer.deploy(WillVersionControl);
};
