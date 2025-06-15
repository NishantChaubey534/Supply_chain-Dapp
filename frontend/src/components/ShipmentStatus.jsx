export default function ShipmentStatus({ status }) {
  const getStatusColor = () => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'InTransit':
        return 'bg-blue-500';
      case 'Delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <span className={`${getStatusColor()} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
      {status}
    </span>
  );
}