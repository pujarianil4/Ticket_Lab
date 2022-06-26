import React from "react";
import { useNavigate } from "react-router-dom";
import { BigIntToInt } from "../../../utils/common";

import './index.scss';

const EventCard = ({eventData}) => {
   const [event, setEvent] = React.useState({});
   const navigate = useNavigate();
   const handleNavigate = () => {
    navigate(`/${BigIntToInt(eventData.tokenId)}`);
  };



    React.useEffect(() => {
   fetch(eventData.tokenURI)
   .then((res) => {
     return res.json();
   })
   .then((res) => {
    console.log("Response", res);
     setEvent(res);
   })
console.log(eventData, "data");
    },[eventData])

    return(
        <div onClick={handleNavigate} className="card_box">
            <span>Event</span>
          <div className="img">
            <img src={event.image} alt="image" />
            <div className="overlay">
              <h1> {event.name} </h1>
              <p>  Tickets to Sell: {event.ticket} Tickets </p>
              <p>  Ticket Price: {event.price} WEI</p>
              <p> Description: {event.description}</p>
            </div>
          </div>
        </div>
    )
}

export default EventCard;