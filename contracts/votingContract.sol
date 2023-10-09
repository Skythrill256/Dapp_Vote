// SPDX-License-Identifier: UNLICENSED
//25.29
pragma solidity ^0.8.19;
import "./counters.sol";
import "hardhat/console.sol";
contract Create{
// Candidate data
using Counters for Counters.Counter;
Counters.Counter public _voterID;
Counters.Counter public _candidateID;

address public votingOrganizer;
uint256 private tokenIdCounter;

struct Candidate{
            uint256 candidateId;
            string name;
            string image;
            string age;
            uint256 voteCount;
            address _address;
            string ipfs;
}

event CandidateCreate (
uint256 indexed id,
string name,
string image,
string age,
uint256 voteCount,
address _address,
string ipfs
);
address [] public candidateAddress;
mapping (address => Candidate) public candidates;
// end of candidate data

//---VoterData-----
address [] public votedVoters;
address [] public votersAddress;
mapping (address=> Voter) public voters;
struct Voter {
    uint256 voter_voterId;
    uint256 voter_name;
    string voter_image;
    address voter_address;
    uint256 voter_allowed;
    bool voter_voted;
    uint256 voter_vote;
    string voter_ipfs;
}
event VoterCreated (
     uint256 voter_voterId,
    uint256 voter_name,
    string voter_image,
    address voter_address,
    uint256 voter_allowed,
    bool voter_voted,
    uint256 voter_vote,
    string voter_ipfs
);
// ---end of voters-----
    constructor() {
    votingOrganizer = msg.sender;
}

    function setCandidate(address _address, string memory _age, string memory _name, string memory _image , string memory _ipfs) public {
        require (votingOrganizer == msg.sender , "Only organizer can set candidates");
        _candidateId.increment();
        uint256 idNumber =_candidateId.current();
        Candidate storage candidate = candidate[_address]
        candidate.age = _age;
        candidate.name = _name;
        candidate.candidateId= idNumber;
        candidate.image = _image;
        candidate.voteCount = 0;
        candidate._address = _address;
        candidate.ipfs = _ipfs;

        candidateAddress.push(_address);
        emit CandidateCreate(
        idNumber,
        _name,
        _image,
        _age,
        _voteCount,
        _address,
        _ipfs
);}
function getCandidate() public view returns (address[] memory){
        return candidateAddress;
}
function getCandidateLength() public view returns (uint256){
        return candidateAddress.length;
}
function getCandidatedata(address _address) public view returns (string memory,string memory,uint256,string memory, uint256,string memory , address) {
    return (
            candidate[_address].age;
            candidate[_address].name;
            candidate[_address].candidateId;
            candidate[_address].image;
            candidate[_address].voteCount;
            candidate[_address].ipfs;
            candidate[_address]._address;
    );
}
// ------ Voters section --------------------

function getVoters() public{}


}