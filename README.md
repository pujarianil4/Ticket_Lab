
# TicketLab

The TicketLab is Event management web app which is build on BlockChain technogies link SmartContract and NFTs.


## Demo



[YouTube](https://youtu.be/_8L_zvCXCnY)

[Deployed Link](https://ticketlab1.netlify.app)
## Run Locally

Clone the project

```bash
  git clone https://github.com/pujarianil4/Ticket_Lab.git
```

Go to the project directory

```bash
  cd ticketlab
```

Install dependencies

```bash
  npm install
```

Start the backend server

```bash
  npx hardhat node
```
```bash
  npx hardhat run src/Contract/scripts/deploy.js --network localhost
```

Start the frontend server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`REACT_APP_PRIVATE_KEY`

This is Pivate key of metamask wallet account.


## Running Tests

To run tests, run the following command

```bash
  npx hardhat test
```


## Screenshots
- Landing Page
![Landing Page](https://bafybeigvon4l7tseefqpteycozaqrjmmm36yhcekky2zzdy3dec3oe4f4q.ipfs.infura-ipfs.io/)

- Event Listing
![Event Listing](https://bafybeigrhyydzaazcrjgrct5sdhnsdmol3tybcicep236gioy4tbhkmiv4.ipfs.infura-ipfs.io/)

- Event Page
![Event Page](https://bafybeigxmf5esf5b5va2i65auypz3zttsh7kdqhgsb6yag2tsinjx2hifq.ipfs.infura-ipfs.io/)

## Features

- Connect to Wallet
- Create an Event with NFT
- See all Events
- Buy Ticket as NFT


## Tech Stack

**Client:** React, antd, sass, ipfs

**Server:**  BlockChain, SmartContract


## Feedback

If you have any feedback, please reach out to us at pujarianil4@gmail.com


## Authors

- [@Anil Pujari](https://www.linkedin.com/in/anil-pujari-644282112)

