# 🚚 Supply Chain DApp

A decentralized application (DApp) for registering, tracking, and managing shipments using Ethereum smart contracts, Ethers.js, MetaMask, and a React frontend.

---

## 📌 Features

- **Register Shipments**: Create a new shipment with receiver details, pickup time, distance, price, and a unique ID.
- **Track Shipments**: Retrieve shipment details by ID/index from the blockchain.
- **Live Dashboard**:
  - View all shipments created by the connected wallet.
  - Real-time status display (`Pending`, `In Transit`, `Delivered`).
  - **Start Shipment** button for the sender.
  - **Complete Shipment** button for the receiver.
- **MetaMask Integration**: Connect and sign transactions with your Ethereum wallet.
- **Sepolia Testnet Deployment**: Works on Sepolia Ethereum test network.

---

## 🛠 Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Blockchain**: Solidity smart contracts
- **Blockchain Framework**: Hardhat
- **Wallet Integration**: MetaMask
- **Library**: Ethers.js`

---

## 📂 Project Structure

```
supply-chain-dapp/
│
├── backend/                     # Hardhat project for smart contracts
│   ├── contracts/
│   │   ├── Shipment.sol
│   │   └── ShipmentManager.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── artifacts/               # Generated after compile
│   ├── hardhat.config.js
│   └── .env
│
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── abi/                 # ABI JSON files
│   │   ├── pages/               # UI pages
│   │   ├── components/          # Navbar, etc.
│   │   └── utils/contract.js    # Blockchain interaction functions
│   └── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/NishantChaubey534/Supply_chain-Dapp.git
cd Supply_chain-Dapp
```

---

### 2️⃣ Backend (Hardhat)

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure `.env`
Create a `.env` file in `backend/`:
```env
SEPOLIA_RPC=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
```

> Get an Infura RPC URL from [https://infura.io](https://infura.io) and export your MetaMask private key.

#### Compile Contracts
```bash
npx hardhat compile
```

#### Deploy Contracts
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Copy the deployed contract address and update it in:
```
frontend/src/utils/contract.js
```

---

### 3️⃣ Frontend (React)

#### Install Dependencies
```bash
cd frontend
npm install
npm install ethers
```

#### Copy ABI Files
From backend:
```
backend/artifacts/contracts/ShipmentManager.sol/ShipmentManager.json
backend/artifacts/contracts/Shipment.sol/Shipment.json
```
To frontend:
```
frontend/src/abi/
```

#### Start Development Server
```bash
npm run dev
```
Open: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Usage

### 1. Connect MetaMask
- Click **"Connect Wallet"** in the navbar.
- Ensure MetaMask is set to **Sepolia Testnet**.
- Make sure you have some test ETH (get it from [Sepolia Faucet](https://sepoliafaucet.com/)).

### 2. Register a Shipment
- Go to **Register** page.
- Fill in:
  - Receiver Address
  - Pickup Time (Unix Timestamp)
  - Distance (km)
  - Price (wei)
  - Unique ID
- Submit → Confirm the transaction in MetaMask.

### 3. Track a Shipment
- Go to **Track** page.
- Enter the shipment index.
- See details (status, sender, receiver, etc.).

### 4. Dashboard Actions
- View all your shipments.
- If **you are the sender** and status is `Pending` → Click **Start Shipment**.
- If **you are the receiver** and status is `In Transit` → Click **Complete Shipment**.

---

## 📜 Smart Contract Overview

### **Shipment.sol**
Handles:
- Storing shipment details
- Status management
- Start and complete functions

### **ShipmentManager.sol**
Handles:
- Creating shipments
- Storing references to shipment contracts
- Fetching shipments for a user

---

## 🔮 Future Improvements
- **IPFS Integration** for invoice/image uploads.
- **Live Event Listening** for real-time UI updates without refresh.
- **Admin Panel** to view all shipments across the network.
- **Geolocation Tracking** with Mapbox.
- **Multi-network Support** (Polygon, Binance Smart Chain, etc.).

---

## 📝 License
MIT License. Free to use and modify.

---

## 🤝 Contributing
1. Fork this repo
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push and create a pull request

---

## 👤 Author
**Nishant Chaubey**  
📧 chaubeynishant2@gmail.com  
🔗 [GitHub Profile](https://github.com/NishantChaubey534)
