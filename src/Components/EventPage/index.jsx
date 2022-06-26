import React from "react";
import useAccount from "../../custom/useAccount";
import useProvider from "../../custom/useProvider";
import EventCard from "./EventCard";
import './index.scss';

const EventPage = ({minted}) => {
   const [eventData, seEventData] = React.useState([]);
   const [contract] = useProvider();
   const [account] = useAccount();


  React.useEffect(() => {

    const getEvents = async () => {
        const events = await contract.getAllEvents();
        console.log("Events", events);
        seEventData(events)
      }

    getEvents();
  },[contract, minted])
    return(
        <div className="eventpage_container">
            <div className="title">
                <h1>Popular <span>Events</span></h1>
            </div>
            {
                eventData.length === 0 && account && <h1>Opps! No Event For Now 🥺 </h1>
            }
            {
                 !account && <h1>Opps! You Are Not Connected To Wallet Yet 🥺 </h1>
            }
            <div className="card_container">
            {
                eventData.map((event) => <EventCard key={event.id} eventData={event}/>)
            }
            </div>
        </div>
    )
}

export default EventPage;