import React from "react";
import { Tooltip } from "antd";
import useAccount from './../../custom/useAccount';
import './index.scss';
const Navbar = () => {
    const [account , connect ] = useAccount();

    React.useEffect(() => {
  console.log('account', account);
    }, [account])
    return(
        <div className="navbar">
            <div className="icon">
                <h1>Ticket <span>Lab</span> </h1>
            </div>
            <div className="wallet_connect">
            {
               account ? <Tooltip title ={account}> <button>CONNECTED</button></Tooltip> : <button onClick={connect}>CONNECT</button>
            }
            </div>
        </div>
    )
}

export default Navbar;