import React from "react";
import './index.scss';
const Navbar = () => {
  
    return(
        <div className="navbar">
            <div className="icon">
                <h1>Ticket <span>Lab</span> </h1>
            </div>
            <div className="wallet_connect">
            <button>CONNECT</button>
            </div>
        </div>
    )
}

export default Navbar;