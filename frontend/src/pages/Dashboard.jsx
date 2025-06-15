import { useWeb3 } from "../context/Web3Context";

export default function Dashboard() {
  const { account } = useWeb3();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 tracking-wide">
          Decentralized Logistics Platform
        </h1>
        <p className="text-center text-gray-600 text-sm mt-2">
          Track, verify, and manage shipments on a decentralized network.
        </p>
      </div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {!account ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700">
            Please connect your wallet to interact with the application.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Welcome</h2>
            <p>Your connected wallet: {account}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <div className="flex space-x-4">
              <a
                href="/create-shipment"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Create Shipment
              </a>
              <a
                href="/my-shipments"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                View My Shipments
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
