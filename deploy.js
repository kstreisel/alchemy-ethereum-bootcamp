import { ethers } from 'ethers';
import Terms from '../../artifacts/contracts/Terms.sol/Terms';

export default async function deploy(signer, customer, orderTerms, expiration) {
  const factory = new ethers.ContractFactory(
    Terms.abi,
    Terms.bytecode,
    signer
  );

  return factory.deploy(customer, orderTerms, expiration);
}
  