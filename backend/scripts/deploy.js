const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const ShipmentManager = await hre.ethers.getContractFactory("ShipmentManager");
  const manager = await ShipmentManager.deploy();
  await manager.waitForDeployment(); 

  const managerAddress = await manager.getAddress(); 
  console.log(`ShipmentManager deployed to: ${managerAddress}`);


  const frontendPath = "../frontend/src/utils";
  if (!fs.existsSync(frontendPath)) fs.mkdirSync(frontendPath, { recursive: true });

  fs.writeFileSync(`${frontendPath}/contractAddress.js`, `export const contractAddress = "${managerAddress}";`);

  const managerArtifact = await hre.artifacts.readArtifact("ShipmentManager");
  fs.writeFileSync(`${frontendPath}/ShipmentManagerABI.json`, JSON.stringify(managerArtifact.abi, null, 2));

  const shipmentArtifact = await hre.artifacts.readArtifact("Shipment");
  fs.writeFileSync(`${frontendPath}/ShipmentABI.json`, JSON.stringify(shipmentArtifact.abi, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
