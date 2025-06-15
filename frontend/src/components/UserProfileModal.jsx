import { useEffect, useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { ethers } from "ethers";
import { getUserShipments } from "../web3";

export default function UserProfileModal({ isOpen, onClose }) {
  const { account, provider } = useWeb3();
  const [balance, setBalance] = useState("0");
  const [shipmentCount, setShipmentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (provider && account) {
        const balanceWei = await provider.getBalance(account);
        setBalance(ethers.formatEther(balanceWei));
        const shipments = await getUserShipments(account);
        setShipmentCount(shipments.length);
      }
    };
    fetchData();
  }, [provider, account]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
      <div className="bg-white w-11/12 max-w-md mx-auto p-6 rounded-xl shadow-xl relative animate-fade-in pointer-events-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-2xl"
        >
          ×
        </button>
        <div className="flex flex-col items-center">
          <img
            src="/user-avatar.png"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
          />
          <h2 className="text-xl font-bold mt-4 text-center">Wallet Address</h2>
          <p className="text-sm text-gray-600 text-center break-words">
            {account}
          </p>
          <div className="mt-4 w-full text-center">
            <p className="text-gray-800">
              <strong>Total Shipments:</strong> {shipmentCount}
            </p>
            <p className="text-gray-800 mt-2">
              <strong>Balance:</strong> {parseFloat(balance).toFixed(4)} ETH
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
