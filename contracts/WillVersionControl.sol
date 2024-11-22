// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WillVersionControl {
    struct Will {
        string fileHash; // The IPFS or off-chain file hash
        uint256 version;
        uint256 timestamp;
        address uploader;
    }
    
    mapping(uint256 => Will) public willVersions;
    uint256 public currentVersion;
    
    // Event to notify about new will versions
    event NewWillVersion(uint256 version, address uploader, uint256 timestamp);

    // Function to upload or update the will
    function uploadWill(string memory fileHash) public {
        uint256 version = currentVersion + 1;
        currentVersion = version;

        Will memory newWill = Will({
            fileHash: fileHash,
            version: version,
            timestamp: block.timestamp,
            uploader: msg.sender
        });
        
        willVersions[version] = newWill;
        
        emit NewWillVersion(version, msg.sender, block.timestamp);
    }

    // Function to retrieve the will's metadata
    function getWillVersion(uint256 version) public view returns (Will memory) {
        require(version <= currentVersion, "Invalid version");
        return willVersions[version];
    }
}
