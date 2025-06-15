import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AllShipments from './pages/AllShipments';
import MyShipments from './pages/MyShipments';
import CreateShipment from './pages/CreateShipment';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/all-shipments" element={<AllShipments />} />
            <Route path="/my-shipments" element={<MyShipments />} />
            <Route path="/create-shipment" element={<CreateShipment />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
