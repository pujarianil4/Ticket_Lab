// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Ticket is ERC1155, Ownable {

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

    mapping(uint256 => Buyer[]) private buyers;
    
    event EventCreated(uint256 indexed id, Event _event);
    event Buy(uint256 indexed token, Buyer buyer );
    
    constructor() ERC1155("") {}

     function CreateEvent(uint256 _tokenId, string memory _tokenURI,  uint256 _tickets, uint256 _price)
        public
    {
        require(_events[_tokenId].tokenId ==0, "ERC1155: eventAlready Exist with this token" );
         Event memory eventInstance = Event(_tokenId, _tokenURI, _tickets, _price, msg.sender);
         _events[_tokenId]= eventInstance;
        _mint(msg.sender, _tokenId, _tickets, "");
        emit EventCreated(_tokenId, eventInstance);
    }


    function buyTicket (uint256 _tickets, uint256 _tokenId) public payable{
        Event memory _event = _events[_tokenId];
        require(_events[_tokenId].tokenId !=0 , "ERC1155: event is not avaible with given token");
        require(checkAvailableTickets(_tokenId) != 0, "ERC1155: Tickets are sold out");
        require(_event.price *_tickets == msg.value, "ERC1155: Insufient fund to buy ticket");
        address payable addr = payable(_event.owner);
        addr.transfer(msg.value);
        _safeTransferFrom(addr, msg.sender, _tokenId, _tickets,"");
        Buyer memory _buyer = Buyer(_tokenId, msg.sender , _tickets);
        buyers[_tokenId].push(_buyer);
        emit Buy(_tokenId, _buyer);
    }

    function getEvent(uint256 _tokenId) public view returns (Event memory){
        return _events[_tokenId];
    }

    function getBuyers(uint256 _tokenId) public view returns(Buyer[] memory) {
        return buyers[_tokenId];
    }

    function checkAvailableTickets(uint256 _tokenId) public view returns(uint256) {
       uint256 available = _events[_tokenId].tickets - getBuyers(_tokenId).length;
        if(available > 0) {
            return available;
        } else {
            return 0;
        }
    }

}