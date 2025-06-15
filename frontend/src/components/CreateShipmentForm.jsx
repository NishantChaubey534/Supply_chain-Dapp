import { useState } from "react";
import { toast } from "react-toastify";
import { useWeb3 } from "../context/Web3Context";
import { ethers } from "ethers";

export default function CreateShipmentForm() {
  const { createNewShipment } = useWeb3();
  const [formData, setFormData] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: "",
    productName: "",
    destination: "",
  });
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await createNewShipment(
        formData.receiver,
        formData.pickupTime,
        formData.distance,
        formData.price,
        formData.productName,
        formData.destination
      );
      toast.success("Shipment created successfully!");
      setFormData({
        receiver: "",
        pickupTime: "",
        distance: "",
        price: "",
      });
    } catch (error) {
      toast.error("Failed to create shipment");
      console.error("Error creating shipment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Shipment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Receiver Address</label>
          <input
            type="text"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Pickup Time</label>
          <input
            type="datetime-local"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Distance (km)</label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Price (ETH)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2 disabled:opacity-60"
      >
        {loading ? (
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
            Creating...
          </>
        ) : (
          "Create Shipment"
        )}
      </button>
    </form>
  );
}
