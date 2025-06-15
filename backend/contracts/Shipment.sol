// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Shipment {
    enum Status { Pending, InTransit, Delivered }

    struct Data {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 distance;
        uint256 price;
        Status status;
        string uniqueId;
        string productName;
        string destination;
    }

    Data public shipment;

    constructor(
        address _sender,
        address _receiver,
        uint256 _pickupTime,
        uint256 _distance,
        uint256 _price,
        string memory _productName,
        string memory _destination
    ) {
        shipment.sender = _sender;
        shipment.receiver = _receiver;
        shipment.pickupTime = _pickupTime;
        shipment.distance = _distance;
        shipment.price = _price;
        shipment.status = Status.Pending;
        shipment.uniqueId = generateUniqueId(_sender, _receiver, _pickupTime);
        shipment.productName = _productName;
        shipment.destination = _destination;

    }

    function generateUniqueId(address _sender, address _receiver, uint256 _pickupTime) internal view returns (string memory) {
        bytes32 hash = keccak256(
            abi.encodePacked(_sender, _receiver, _pickupTime, block.timestamp, blockhash(block.number - 1))
        );
        return toHexString(hash);
    }

    function toHexString(bytes32 data) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(64);
        for (uint i = 0; i < 32; i++) {
            str[i*2] = alphabet[uint(uint8(data[i] >> 4))];
            str[1+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }

    function getShipment() public view returns (Data memory) {
        return shipment;
    }

    function start() public {
        require(shipment.status == Status.Pending, "Shipment already started");
        shipment.status = Status.InTransit;
    }

    function complete() public {
        require(shipment.status == Status.InTransit, "Shipment not in transit");
        shipment.status = Status.Delivered;
    }
}
