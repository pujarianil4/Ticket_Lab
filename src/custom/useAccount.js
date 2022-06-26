import React from "react";

export default function useAccount (){
 const [account, setAccount] = React.useState('');

 const connect = () => {
    if(window.ethereum){
        window.ethereum.request({method: "eth_requestAccounts"}).then(async (accounts) => {
            setAccount(accounts[0]);
            // console.log(accounts);
        })
      } else {
          alert('Please Install MetaMask')
      }
 }

 window.ethereum.on('accountsChanged', (acc) => {
    setAccount(acc[0]);
    window.location.reload();
  })

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  })

  React.useEffect(() => {
     window.ethereum.request({
        method: 'eth_accounts',
      }).then((accounts) => {
        setAccount(accounts[0]);
        console.log("Accounts", accounts);
        if(accounts.length == 0){
          connect();
        }
      })
      
  },[])

  return [account, connect];

}