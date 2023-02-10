import { ethers } from 'ethers';
import Terms from '../../artifacts/contracts/Terms.sol/Terms';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export default async function redline(contractAddr, nine, ten){
    await provider.send('eth_requestAccounts', []);
    const cSigner = provider.getSigner()
    const toRedline = await new ethers.Contract(contractAddr, Terms.abi, cSigner);
    const redlines = await toRedline.offerRedlines(nine, ten);
    const receipt = await redlines.wait();
    console.log(receipt);
}