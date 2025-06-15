import { ethers } from "ethers";
import ShipmentManagerABI from "./utils/ShipmentManagerABI.json";
import ShipmentABI from "./utils/ShipmentABI.json";
import { contractAddress } from "./utils/contractAddress";

const SHIPMENT_STATUS_ENUM = ["Pending", "InTransit", "Delivered"];

export const getProvider = () => {
  if (!window.ethereum) throw new Error("MetaMask not found!");
  return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async () => {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
};

export const getContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(contractAddress, ShipmentManagerABI, signer);
};

export const getShipmentContract = async (address) => {
  const signer = await getSigner();
  return new ethers.Contract(address, ShipmentABI, signer);
};

export const createShipment = async (
  receiver,
  time,
  distance,
  price,
  productName,
  destination
) => {
  const contract = await getContract();
  const tx = await contract.createShipment(
    receiver,
    time,
    distance,
    price,
    productName,
    destination
  );
  await tx.wait();
};

export const getUserShipments = async (userAddress) => {
  if (!userAddress) {
    throw new Error("User address not provided to getUserShipments.");
  }
  const contract = await getContract();
  const shipmentAddresses = await contract.getMyShipments(userAddress);

  return Promise.all(
    shipmentAddresses.map(async (addr) => {
      const shipment = await getShipmentContract(addr);
      const data = await shipment.getShipment();

      const statusString = SHIPMENT_STATUS_ENUM[data.status];

      return {
        sender: data.sender,
        receiver: data.receiver,
        pickupTime: Number(data.pickupTime),
        distance: Number(data.distance),
        price: data.price,
        uniqueId: data.uniqueId,
        status: statusString,
        address: addr,
        productName: data.productName,
        destination: data.destination,
        getShipment: shipment.getShipment,
        start: shipment.start,
        complete: shipment.complete,
      };
    })
  );
};

export const getAllShipments = async () => {
  const contract = await getContract();
  const shipmentAddresses = await contract.getAllShipments();

  return Promise.all(
    shipmentAddresses.map(async (addr) => {
      const shipment = await getShipmentContract(addr);
      const data = await shipment.getShipment();
      console.log("Shipment contract data:", data);
      const statusString = SHIPMENT_STATUS_ENUM[data.status];

      return {
        sender: data.sender,
        receiver: data.receiver,
        pickupTime: Number(data.pickupTime),
        distance: Number(data.distance),
        price: data.price,
        uniqueId: data.uniqueId,
        status: statusString,
        productName: data.productName,      
        destination: data.destination,
        address: addr,
        getShipment: shipment.getShipment,
        start: shipment.start,
        complete: shipment.complete,
      };
    })
  );
};

export const startShipment = async (shipmentAddress) => {
  const shipment = await getShipmentContract(shipmentAddress);
  const tx = await shipment.start();
  await tx.wait();
};

export const completeShipment = async (shipmentAddress) => {
  const shipment = await getShipmentContract(shipmentAddress);
  const tx = await shipment.complete();
  await tx.wait();
};
