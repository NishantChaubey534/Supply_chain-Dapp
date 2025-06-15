import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../utils/contractAddress";
import ShipmentManagerABI from "../utils/ShipmentManagerABI.json";
import ShipmentABI from "../utils/ShipmentABI.json";
import { getProvider, getSigner, getContract, getUserShipments } from "../web3";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    try {
      const signer = await getSigner();
      const web3Provider = getProvider();
      const contractInstance = await getContract();

      setProvider(web3Provider);
      setContract(contractInstance);

      const address = await signer.getAddress();
      setAccount(address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const createNewShipment = async (
    receiver,
    pickupTime,
    distance,
    price,
    productName,
    destination
  ) => {
    try {
      if (!contract) {
        console.error("Contract not initialized.");
        throw new Error("Contract not initialized.");
      }
      const tx = await contract.createShipment(
        receiver,
        Math.floor(new Date(pickupTime).getTime() / 1000),
        distance,
        ethers.parseEther(price.toString()),
        productName,
        destination
      );
      await tx.wait();
      return tx;
    } catch (error) {
      console.error("Error in createNewShipment:", error);
      throw error;
    }
  };

  const fetchUserShipments = async () => {
    return getUserShipments();
  };

  const startUserShipment = async (shipmentAddress) => {
    return startShipment(shipmentAddress);
  };

  const completeUserShipment = async (shipmentAddress) => {
    return completeShipment(shipmentAddress);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        contract,
        provider,
        connectWallet,
        createNewShipment,
        fetchUserShipments,
        startUserShipment,
        completeUserShipment,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
