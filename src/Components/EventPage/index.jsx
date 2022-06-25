import React from "react";
import useProvider from "../../custom/useProvider";
import EventCard from "./EventCard";
import './index.scss';

const EventPage = () => {
   const arr = Array(10).fill(0);
   const [eventData, seEventData] = React.useState([]);
   const [contract] = useProvider();
   const getEvents = async () => {
    const events = await contract.getAllEvents();
    console.log("Events", events);
    seEventData(events)
  }
  React.useEffect(() => {
    console.log(contract);
    getEvents();
  },[contract])
    return(
        <div className="eventpage_container">
            <div className="title">
                <h1>Popular <span>Events</span></h1>
            </div>
            <div className="card_container">
            {
                eventData.map((event) => <EventCard key={event.id} eventData={event}/>)
            }
            </div>
        </div>
    )
}

export default EventPage;