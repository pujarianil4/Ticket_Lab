import React from "react";
import useAccount from './../../custom/useAccount';
import { Tooltip, message } from 'antd';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import useProvider from "../../custom/useProvider";

import './index.scss'
import EventPage from "../EventPage";


  
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const Landing = () => {
const [name, setName ] = React.useState('')
const [ticket, setTicket ] = React.useState('')
const [price, setPrice ] = React.useState('')
const [description, setDescription ] = React.useState('')
const [image, setImage ] = React.useState('');
const [minted, setMinted] = React.useState(false);
const [isLoading, setIsLoading] = React.useState(false);
const [account] = useAccount();
const [contract] = useProvider();

const isDisable =() => {
  let isDisable = true
 if( name.length > 0 && ticket.length > 0 && price.length >0 && description.length >0 && image.length > 0){
   return isDisable = false;
 } 
 return isDisable;
}

const upload = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const file = event.target.files[0];
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
        message.success("Image Uploaded..")
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  }; 

  const createNft = async () => {
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description, ticket })
      );
      mint(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  }

  const mint = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    const tx = await contract.CreateEvent(uri, ticket, price);

    await tx.wait();
     message.success("Event Create..")
     setMinted(!minted)
     setDescription("");
     setImage("");
     setName("");
     setPrice("");
     setTicket("")
  };


    return(
      <>
        <div className="landing_container">
          <div className="title_container">
            <h1>Discover <span>Events</span> Around You And Buy Tickets As <span>NFTs</span></h1>
            <button onClick={handleSroll}>Show Events</button>
          </div>
          <div className="form_container">
            <div className="form">
               <input type="text" value={name} placeholder="Event Name" onChange={(e) => setName(e.target.value)} />
               <input type="text" value={ticket} placeholder="No of Tickets to Sell" onChange={(e) => setTicket(e.target.value)}/>
               <input type="text" value={price} placeholder="Price per Ticket" onChange={(e) => setPrice(e.target.value)}/>
                <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <div >
                <input disabled={!account} type="file" className="file_input" onChange={upload}/>
               {isLoading && <span className="msg"> File is Uploading...</span>}
               {image && <span className="msg_success"> File is Uploaded </span>}
               <Tooltip title={ account ? "" : "Please Connect Your Wallet For Transation"}  > <button  disabled={!account || isDisable()} onClick={createNft}>CREATE EVENT</button> </Tooltip>
               </div>
            </div>
          </div>
        </div>
        <div>
          <EventPage minted={minted}/>
        </div>
        </>
    )
}

export default Landing;