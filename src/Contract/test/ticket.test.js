
const { expect } = require("chai");
const { ethers } = require("hardhat");

function BigIntToInt(number) {
    return ethers.utils.formatUnits(number, 0)
}

const event = {
    id: "1",
    uri: "urilink",
    tickets: "50",
    price: "50"
}


describe("Ticket", function () {
    let contract, owner, addr1;

    beforeEach(async () => {
        [owner, addr1] = await ethers.getSigners();
        const Ticket = await ethers.getContractFactory("Ticket");
        contract = await Ticket.deploy();
        await contract.deployed();

    });

    it("Should Create Event with NFT minting", async function () {

        await contract.CreateEvent(event.id, event.uri, event.tickets, event.price);

        const eventAfterCreation = await contract.getEvent(event.id);

        expect(event.id).to.equal(BigIntToInt(eventAfterCreation.tokenId));
        expect(event.uri).to.equal(eventAfterCreation.tokenURI);
        expect(event.tickets).to.equal(BigIntToInt(eventAfterCreation.tickets));
        expect(event.price).to.equal(BigIntToInt(eventAfterCreation.price));
        expect(owner.address).to.equal(eventAfterCreation.owner);

        const balanceOf = await contract.balanceOf(owner.address, event.id);
        expect(event.tickets).to.equal(BigIntToInt(balanceOf));
    });

    it("should ticket buy", async function () {
        await contract.CreateEvent(event.id, event.uri, event.tickets, event.price);
        const ownerNFTBalanceBeforeSell = await contract.balanceOf(owner.address, event.id);

        const ticketsToBuy = 10;
        await contract.connect(addr1).buyTicket(ticketsToBuy, "1", { value: Number(event.price) * ticketsToBuy })

        const ownerNFTBalanceAfterSell = await contract.balanceOf(owner.address, event.id);
        const buyerBalance = await contract.balanceOf(addr1.address, event.id);
        expect(Number(BigIntToInt(ownerNFTBalanceBeforeSell))).to.equal(Number(BigIntToInt(ownerNFTBalanceAfterSell)) + Number(BigIntToInt(buyerBalance)));

    })

});
