import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import EventDetailPage from "../Components/EventDetailPage";
import HomePage from "../Components/Home";
import Navbar from "../Components/Navbar";

const Router =() => {
   return(
    <>
    <Navbar/>
    <Switch>
        <Route exact path='/' element={<HomePage/>} />
        <Route exact path="/:eventID" element={<EventDetailPage/>}/>
    </Switch>
    </>
   )
}

export default Router;