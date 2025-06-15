import { useEffect, useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import ShipmentCard from "../components/ShipmentCard";
import { getAllShipments } from "../web3";
import Loader from "../components/Loader";

export default function AllShipments() {
  const { contract, account } = useWeb3();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchShipments = async () => {
      if (contract) {
        try {
          setLoading(true);
          const allShipmentsData = await getAllShipments();
          setShipments(allShipmentsData);
        } catch (error) {
          setShipments([]);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchShipments();
  }, [contract]);

  if (!account) {
    return (
      <div className="mt-6">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700">
            Please connect your wallet to view your shipments.
          </p>
        </div>
      </div>
    );
  }

  const normalizedSearch = searchTerm.replace(/^0x/, "").toLowerCase();

  const filteredShipments =
    normalizedSearch === ""
      ? shipments
      : shipments.filter(
          (shipment) =>
            shipment?.uniqueId
              ?.replace(/^0x/, "")
              .toLowerCase()
              .includes(normalizedSearch)
        );

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold mb-4">All Shipments</h1>

      <input
        type="text"
        placeholder="Search by Shipment ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 mb-4 px-3 py-2 border border-gray-300 rounded"
      />

      {loading ? (
        <Loader message="Fetching all shipments..." />
      ) : (
        <>
          {filteredShipments.length === 0 ? (
            <p className="text-gray-500">No shipments found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredShipments.map((shipment, index) => (
                <ShipmentCard
                  key={shipment.uniqueId || index}
                  shipment={shipment}
                  isSender={
                    account?.toLowerCase() === shipment.sender.toLowerCase()
                  }
                  isReceiver={
                    account?.toLowerCase() === shipment.receiver.toLowerCase()
                  }
                  currentAccount={account}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
