const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

const metadataURL = "https://minter-bay.vercel.app/api";

async function main() {
  const voidNerdContract = await ethers.getContractFactory("VoidNerd");
  const deployedVoidNerdContract = await voidNerdContract.deploy("VoidNerd","VN");
  console.log("VoidNerd Contract Address:", deployedVoidNerdContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
