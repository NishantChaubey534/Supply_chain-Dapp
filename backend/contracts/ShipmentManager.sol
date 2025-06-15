// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Shipment.sol";

contract ShipmentManager {
    Shipment[] public allShipments;
    mapping(address => Shipment[]) public userShipments;

    event ShipmentCreated(address shipmentAddress, address sender);

    function createShipment(    
        address _receiver,
        uint256 _pickupTime,
        uint256 _distance,
        uint256 _price,
        string memory _productName,
        string memory _destination
    ) external {
        Shipment newShipment = new Shipment(
            msg.sender,
            _receiver,
            _pickupTime,
            _distance,
            _price,
            _productName,
            _destination
        );
        allShipments.push(newShipment);
        userShipments[msg.sender].push(newShipment);
        emit ShipmentCreated(address(newShipment), msg.sender);
    }

    function getAllShipments() external view returns (Shipment[] memory) {
        return allShipments;
    }

    function getMyShipments(address _user) external view returns (Shipment[] memory) {
        return userShipments[_user];
    }
}
