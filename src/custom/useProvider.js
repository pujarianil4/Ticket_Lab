import React from "react";
import { ethers } from 'ethers';

import ticketAddr from './../Contract/deployedData/Ticket-address.json';
import Artifact from './../Contract/deployedData/Ticket.json';


export default function useProvider (){
 const [contract, setContract] = React.useState('');

 const provider = new ethers.providers.Web3Provider(window.ethereum);

 const getContract = async () => {
    const signer = await provider.getSigner();
    const ticketContract = new ethers.Contract(
        ticketAddr.address,
        Artifact.abi,
        signer || provider
      );
      setContract(ticketContract);
 }

 React.useEffect(() => {
    if(!contract) getContract();
    console.log("Deployed to" , ticketAddr);
 }, [])

  return [contract];

}