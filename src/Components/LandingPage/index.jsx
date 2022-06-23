import React from "react";
import { create as ipfsHttpClient } from 'ipfs-http-client';
import './index.scss'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const Landing = () => {
const [name, setName ] = React.useState('')
const [ticket, setTicket ] = React.useState('')
const [price, setPrice ] = React.useState('')
const [description, setDescription ] = React.useState('')
const [ image, setImage ] = React.useState('');

const upload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file);
        console.log(result);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
        console.log(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

    return(
        <div className="landing_container">
          <div className="title_container">
            <h1>Discover <span>Events</span> around you</h1>
            <button>Show Events</button>
          </div>
          <div className="form_container">
            <div className="form">
               <input type="text" placeholder="Event Name" onChange={(e) => setName(e.target.value)} />
               <input type="text" placeholder="No of Tickets to Sell" onChange={(e) => setTicket(e.target.value)}/>
               <input type="text" placeholder="Price per Ticket" onChange={(e) => setPrice(e.target.value)}/>
                <textarea rows="4" onChange={(e) => setDescription(e.target.value)}/>
                <div >
                <input type="file" className="file_input" onChange={upload}/>
                <button>CREATE EVENT</button>
               </div>
            </div>
          </div>
        </div>
    )
}

export default Landing;