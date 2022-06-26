import React from "react";
import { useParams } from "react-router-dom";
import { Tooltip, message } from 'antd';
import useAccount from "../../custom/useAccount";
import useProvider from "../../custom/useProvider";
import { BigIntToInt } from './../../utils/common'
import './index.scss'

const EventDetailPage =() => {
    const [ event , setEvent] = React.useState({})
    const [ buyers , setBuyers] = React.useState([])
    const [sold, setSold] = React.useState('')
    const [ availableTickets , setAvailableTickets] = React.useState("")
    const [ ticketsTobuy, setTicketsTobuy] = React.useState('1')
    const { eventID } = useParams();
    const [ contract ] = useProvider();
    const [account] = useAccount();

    const getDeatils = async () => {
        const evt = await contract.getEvent(`${eventID}`);
        const buyers_res = await contract.getBuyers(`${eventID}`)
        const available_res = await contract.checkAvailableTickets(`${eventID}`)

        const event_res = await fetch(evt.tokenURI); 
        const json = await event_res.json();
      setEvent(json);
      setBuyers(buyers_res);
      setAvailableTickets(BigIntToInt(available_res))
      let soldTickets =0;
       for (const iterator of buyers_res) {
         console.log("BigIntToInt( buyers_res[i].tickets)", BigIntToInt( iterator.tickets));
         soldTickets += Number(BigIntToInt( iterator.tickets))
       }
      setSold(soldTickets)
    }

    const buyTicket = async () => {
        const tx = await contract.buyTicket(ticketsTobuy, `${eventID}`, { value: `${Number(ticketsTobuy)* Number(event.price)}` });
        tx.wait();
        message.success(`Congratualtion !, You Purchased ${ticketsTobuy} ticket`)
        getDeatils();
    }

    React.useEffect(() => {
    if(eventID && contract) getDeatils();
    },[eventID, contract])

   return(
    <>
      <div className="event_container">
       <div className="event_head">
        <div className="img">
            <img src={event.image} alt="img" />
        </div>
        <div className="info">
            <h1>   {event.name}</h1>
            <h2>Price: <span>{event.price} WEI</span> </h2>
            <div className="tabs">
               <div>
               <p>Available Tickets</p>
                <h3>{availableTickets}</h3>
               </div>
               <div>
               <p>Sold Tickets</p>
                <h3>{sold}</h3>
               </div>
            </div>
            <div className="buy_btn">
                <select onChange={(e) => setTicketsTobuy(e.target.value)} defaultValue={ticketsTobuy}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <Tooltip title={ account ? "" : "Please Connect Your Wallet For Transation"}  > <button disabled={!account} onClick={buyTicket}>BUY TICKET</button> </Tooltip>
            </div>
        </div>
       </div>
       <div className="event_data">
        <div className="border">
            <h2>Description</h2>
     {
        event.description
     }
        </div>
        <div  className="border">
          <h2>Buyers</h2>
          <div className="buyers_item">
                <p>Buyer Address</p> 
                <p>No of Tickets Purchased</p>
             </div>
          {
            buyers.map((buyer, i) => {
                return(  <div key={i} className="buyers_item">
                <p>{buyer.addr}</p> 
                <p>{BigIntToInt(buyer.tickets)}</p>
             </div>
                )
            })
          }
        </div>
       </div>
      </div>
    </>
   )
}

export default EventDetailPage;