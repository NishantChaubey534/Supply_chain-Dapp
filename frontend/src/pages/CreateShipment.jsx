import CreateShipmentForm from '../components/CreateShipmentForm';
import { useWeb3 } from '../context/Web3Context';

export default function CreateShipment() {
  const { account } = useWeb3();

  if (!account) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
        <p className="text-yellow-700">Please connect your wallet to create a shipment.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Shipment</h1>
      <CreateShipmentForm />
    </div>
  );
}