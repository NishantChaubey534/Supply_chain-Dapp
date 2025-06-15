import { useState } from "react";
import ShipmentStatus from "./ShipmentStatus";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export default function ShipmentCard({
  shipment,
  isSender,
  isReceiver,
  currentAccount,
}) {
  const [shipmentData, setShipmentData] = useState(shipment);
  const [loadingAction, setLoadingAction] = useState(null); 

  const handleStartShipment = async () => {
    setLoadingAction("start");
    try {
      await shipmentData.start();
      setShipmentData({ ...shipmentData, status: "InTransit" });
      toast.info("Shipment is now in transit.");
    } catch (error) {
      toast.error("Failed to start shipment.");
      console.error("Error starting shipment:", error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCompleteShipment = async () => {
    setLoadingAction("complete");
    try {
      await shipmentData.complete();
      setShipmentData({ ...shipmentData, status: "Delivered" });
      toast.success("Shipment has been delivered.");
    } catch (error) {
      toast.error("Failed to complete shipment.");
      console.error("Error completing shipment:", error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shipmentData.uniqueId);
    toast.success("Shipment ID copied!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold break-all">
              Shipment ID: {shipmentData.uniqueId}
            </h3>
            <button
              onClick={handleCopy}
              title="Copy ID"
              className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              <img
                src="/copy2.png" 
                alt="Copy"
                className="w-5 h-5 object-contain"
              />
            </button>
          </div>
          <p className="text-gray-600">From: {shipmentData.sender}</p>
          <p className="text-gray-600">To: {shipmentData.receiver}</p>
          <p className="text-gray-600">Distance: {shipmentData.distance} km</p>
          <p className="text-gray-600">
            Price: {ethers.formatEther(shipmentData.price)} ETH
          </p>
          <p className="text-gray-600">Product: {shipmentData.productName}</p>
          <p className="text-gray-600">
            Destination: {shipmentData.destination}
          </p>
        </div>
        <ShipmentStatus status={shipmentData.status} />
      </div>

      <div className="mt-4 flex space-x-2">
        {isSender && shipmentData.status === "Pending" && (
          <button
            onClick={handleStartShipment}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2 disabled:opacity-60"
            disabled={loadingAction === "start"}
          >
            {loadingAction === "start" ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Starting...
              </>
            ) : (
              "Start Shipment"
            )}
          </button>
        )}

        {isReceiver && shipmentData.status === "InTransit" && (
          <button
            onClick={handleCompleteShipment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center gap-2 disabled:opacity-60"
            disabled={loadingAction === "complete"}
          >
            {loadingAction === "complete" ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Completing...
              </>
            ) : (
              "Complete Shipment"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
