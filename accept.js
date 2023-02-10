import { ethers } from 'ethers';
import Terms from '../../artifacts/contracts/Terms.sol/Terms';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export default async function acceptOffer(contractAddr){
    await provider.send('eth_requestAccounts', []);
    const cSigner = provider.getSigner()
    const toAccept = await new ethers.Contract(contractAddr, Terms.abi, cSigner);
    const acceptedOffer = await toAccept.acceptOffer();
    const receipt = await acceptedOffer.wait();
    console.log(receipt);
}