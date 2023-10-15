import { expect } from '@nomicfoundation/hardhat-toolbox';
import { ethers } from 'ethers';
import { VotingAddress, VottingAddressABI } from './abis';

describe('Voting Contract', () => {
  let contract;
  let signer;
  let otherSigner;
  let otherAddress;

  before(async () => {
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    [signer, otherSigner] = await provider.getSigners();

    
    contract = new ethers.Contract(VotingAddress, VottingAddressABI, signer);

    
    otherAddress = otherSigner.address;
  });

  describe('vote', () => {
    it('should allow a voter to vote once', async () => {
      
      const tx = await contract.vote(1, otherAddress);

      
      await expect(tx)
        .to.emit(contract, 'VoteCast')
        .withArgs(1, otherAddress, false);

    
      const count = await contract.voteCount(1);
      expect(count).to.equal(1);
    });

    it('should not allow a voter to vote twice', async () => {
      // cast vote
      await contract.vote(1, otherAddress);

      
      await expect(contract.vote(1, otherAddress)).to.be.reverted;
    });
  });
});
