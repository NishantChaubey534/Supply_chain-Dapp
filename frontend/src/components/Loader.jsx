export default function Loader({ message = "Fetching shipments..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 w-full">
      <div className="border-4 border-blue-300 border-t-blue-600 rounded-full w-10 h-10 animate-spin"></div>
      <p className="mt-4 text-gray-600 text-sm animate-pulse">
        {message}
      </p>
    </div>
  );
}