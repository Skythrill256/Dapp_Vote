// SPDX-License-Identifier: UNLICENSED
//25.29
pragma solidity ^0.8.19;
import "./counters.sol";
import "hardhat/console.sol";
contract votingContract{
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
uint256 indexed candidateId,
string name,
string image,
string age,
uint256 voteCount,
address _address,
string ipfs
);
address [] public candidateAddress;
mapping (address => Candidate) public _candidates;
// end of candidate data

//---VoterData-----
address [] public votedVoters;
address [] public votersAddress;
mapping (address=> Voter) public voters;
struct Voter {
    uint256 voter_voterId;
    string voter_name;
    string voter_image;
    address voter_address;
    uint256 voter_allowed;
    bool voter_voted;
    uint256 voter_vote;
    string voter_ipfs;
}
event VoterCreated (
     uint256 voter_voterId,
    string voter_name,
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
        _candidateID.increment();
        uint256 idNumber =_candidateID.current();
        Candidate storage candidate = _candidates[_address];
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
        idNumber,
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
            _candidates[_address].age,
            _candidates[_address].name,
            _candidates[_address].candidateId,
            _candidates[_address].image,
            _candidates[_address].voteCount,
            _candidates[_address].ipfs,
            _candidates[_address]._address
    );
}
// ------ Voters section --------------------

function voterRight(address _address, string memory _name , string memory _image , string memory _ipfs) public{
    require(votingOrganizer == msg.sender, "only organizer can create voters");
    _voterID.increment();
    uint256 _idNumber = _voterID.current();
    Voter storage voter = voters[_address];
    require(voter.voter_allowed == 0);
    voter.voter_allowed = 1;
    voter.voter_name = _name;
    voter.voter_image = _image;
    voter.voter_address = _address;
    voter.voter_voterId = _idNumber;
    voter.voter_vote = 10000;
    voter.voter_ipfs=_ipfs;
    voter.voter_voted = false;
    
    votersAddress.push(_address);

    emit VoterCreated(
     _idNumber,
     _name,
     _image,
     _address,
    voter.voter_allowed,
    voter.voter_voted,
    voter.voter_vote,
    _ipfs

);}
function vote(address _candidateAddress, uint256 _candidateVoteId) external{
    
    Voter storage voter = voters[msg.sender];
    require(!voter.voter_voted,"You have already voted");
    require(voter.voter_allowed != 0,"You are not allowed to vote");
    voter.voter_voted = true;
    voter.voter_vote = _candidateVoteId;
    votedVoters.push(msg.sender);
    _candidates[_candidateAddress].voteCount += voter.voter_allowed;
}
    function getvoterLength() public view returns(uint256){
    return votersAddress.length;
}
    function getVoterdata (address _address) public view returns(uint256, string memory, string memory,address, string memory ,uint256,bool){
    return (
    voters[_address].voter_voterId,
    voters[_address].voter_name,
    voters[_address].voter_image,
    voters[_address].voter_address,
    voters[_address].voter_ipfs,
    voters[_address].voter_allowed,
    voters[_address].voter_voted
);
}
function getVotedVoterList () public view returns (address[] memory){
    return votedVoters;
}
function getVoterList() public view returns (address [] memory){
    return votersAddress;
}


}