import { useWeb3 } from "../context/Web3Context";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserProfileModal from "./UserProfileModal";

export default function Navbar() {
  const { account, connectWallet } = useWeb3();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center">
          <div className="flex justify-between w-full">
            <div className="flex space-x-7 items-center">
              <img
                src="/supply.png"
                alt="SupplyChainX Logo"
                className="h-32 object-contain"
              />
              <div className="hidden md:flex items-center space-x-1">
                <Link to="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">
                  Dashboard
                </Link>
                <Link to="/all-shipments" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">
                  All Shipments
                </Link>
                <Link to="/my-shipments" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">
                  My Shipments
                </Link>
                <Link to="/create-shipment" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">
                  Create Shipment
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {account && (
                <button
                  onClick={() => setShowProfile(true)}
                  className="py-2 px-4 bg-green-500 text-white rounded-full text-sm hover:bg-green-600"
                >
                  Profile
                </button>
              )}
              {account ? (
                <button className="py-2 px-4 bg-gray-200 text-gray-700 rounded-full text-sm">
                  {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <UserProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
}
