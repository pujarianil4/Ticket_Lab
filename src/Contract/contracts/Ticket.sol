// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Ticket is ERC1155 {
   using Counters for Counters.Counter;
    Counters.Counter public s_nftId;

    struct Buyer {
        uint256 tokenId;
        address addr;
        uint256 tickets;
    }
   
    struct Event {
        uint256 tokenId;
        string tokenURI;
        uint256 tickets;
        uint256 price;
        address owner;
        }

    mapping(uint256 => Event) private _events;

    Event[] eventArray;

    mapping(uint256 => Buyer[]) private buyers;

    mapping(uint256 => uint256) public sold;

    event EventCreated(uint256 indexed id, Event _event);

    event Buy(uint256 indexed token, Buyer buyer );
    
    constructor() ERC1155("") {}

    // CreateEvent is for creating your event campaign. Pass tokenURi , no of tickets you want to sell and price of that ticket.
    // This will mint the ERC1155 NFT with no of tickets.
     function CreateEvent(string memory _tokenURI,  uint256 _tickets, uint256 _price)
        external
    {
         s_nftId.increment();

        uint256 _tokenId = s_nftId.current();

        require(_events[_tokenId].tokenId ==0, "ERC1155: eventAlready Exist with this token" );

         Event memory eventInstance = Event(_tokenId, _tokenURI, _tickets, _price, msg.sender);

         _events[_tokenId]= eventInstance;

        _mint(msg.sender, _tokenId, _tickets, "");

        eventArray.push(eventInstance);

        emit EventCreated(_tokenId, eventInstance);
    }

   // buyTicket is use for buying tickets of created event.
   // No of tickets you want , That much NFTs will tranfer to your account.

    function buyTicket (uint256 _tickets, uint256 _tokenId) external payable{
        Event memory _event = _events[_tokenId];

        require(_events[_tokenId].tokenId !=0 , "ERC1155: event is not avaible with given token");

        require(checkAvailableTickets(_tokenId) != 0, "ERC1155: Tickets are sold out");

        require(_event.price *_tickets == msg.value, "ERC1155: Insufient fund to buy ticket");

        address payable addr = payable(_event.owner);
        addr.transfer(msg.value);

        _safeTransferFrom(addr, msg.sender, _tokenId, _tickets,"");

        Buyer memory _buyer = Buyer(_tokenId, msg.sender , _tickets);

        buyers[_tokenId].push(_buyer);

        sold[_tokenId] += _tickets;

        emit Buy(_tokenId, _buyer);
    }

    function getEvent(uint256 _tokenId) external view returns (Event memory){
        return _events[_tokenId];
    }

    function getBuyers(uint256 _tokenId) external view returns(Buyer[] memory) {
        return buyers[_tokenId];
    }

    function getAllEvents() external view returns(Event[] memory) {
       return eventArray;
    }
    
    // This function will help to see your NFT on opensea
    function uri( uint256 _tokenId ) override public view returns (string memory) {
      return _events[_tokenId].tokenURI;
    }

    function checkAvailableTickets(uint256 _tokenId) public view returns(uint256) {
       uint256 available = _events[_tokenId].tickets - sold[_tokenId];
        if(available > 0) {
            return available;
        } else {
            return 0;
        }
    }

}