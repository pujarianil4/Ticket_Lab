import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import HomePage from "../Components/Home";
import Navbar from "../Components/Navbar";

const Router =() => {
   return(
    <>
    <Navbar/>
    <Switch>
        <Route exact path='/' element={<HomePage/>} />
       
    </Switch>
    </>
   )
}

export default Router;