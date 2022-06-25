import React from "react";
import './index.scss';

const EventCard = ({eventData}) => {
   const [event, setEvent] = React.useState({});

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
        <div className="card_box">
            <span>Event</span>
          <div className="img">
            <img src={event.image} alt="image" />
            <div className="overlay">
              <h1>  Event Name: {event.name} </h1>
              <p>  Tickets to Sell: {event.ticket} Tickets </p>
              <p>  Ticket Price: {event.price} WEI</p>
              <p> Description: {event.description}</p>
            </div>
          </div>
        </div>
    )
}

export default EventCard;