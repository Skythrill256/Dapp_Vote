const hre = require("hardhat");

async function main() {
  const VotingContract = await hre.ethers.getContractFactory("votingContract")
  console.log("Deploying.....")
  const contract = await VotingContract.deploy()
  await contract.waitForDeployment()
  const contractAddress = await contract.getAddress();
  console.log("Contract deployed to " , contractAddress)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exit(1);
});
