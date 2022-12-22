// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate{
        address candidateAddress;
        string name;
        uint numberOfVotes;
        string party;
    }
    struct Voter{
        address voterAddress;
        bool isVoted; 
    }
    struct LastWinner{
        Candidate candidate;
        string title;
    }
    string title;
    bool status;
    uint256 maxVote;
    uint256 votingCount;
    address public owner;
    mapping (address => Candidate) candidates;
    mapping (address => Voter) voters;
    address[] public candidateArray;
    address[] public votersArray;
    Candidate[] public requestedCandidate;
    LastWinner[] public lastWinners;
    address public leadingCandidate;
    
    constructor(){
        owner = msg.sender;
        status = false;
        votingCount =0;

        //delete following lines
        // votingCount=2;
        // Candidate memory c;
        // c.name = "Hardik Gehlot";
        // c.party = "Bhartiya Janta Party";
        // c.numberOfVotes = 10;
        // c.candidateAddress = 0xC7E748a7b9ef9238aCdC89FD2912100ae517BcA0;
        // requestedCandidate.push(c);
        // candidates[c.candidateAddress] = c;
        // candidateArray.push(c.candidateAddress);
        // LastWinner memory lw;
        // lw.candidate = c;
        // lw.title = "PM 2020";
        // lastWinners.push(lw);
    }
    function isAdmin() public view returns(bool){
        if(msg.sender==owner){
            return true;
        }
        return false;
    }
    function getVotingCount() public view returns(uint256){
        return votingCount;
    }
    function getStatus() public view returns(bool){
        return status;
    }
    function getLastWinners() public view returns(LastWinner[] memory){
        require(votingCount>0,"There is no last Winner");
        return lastWinners;
    }
    function getLastWinner() public view returns(LastWinner memory){
        require(votingCount>0,"There is no last Winner");
        return lastWinners[lastWinners.length -1];
    }
    function startVoting(string memory _title) public{
        require(msg.sender==owner,"This action can only be performed by Owner");
        require(candidateArray.length>=2,"There is no candidate to start vote");
        require(!status,"Stop current voting");
        status=true;
        title = _title;
        maxVote = 0;
        votingCount++;
    }
    function stopVoting() public{
        require(msg.sender==owner,"This action can only be performed by Owner");
        require(status,"Voting is not yet started");
        status=false;
        if(maxVote >= 1){
            LastWinner memory last;
            last.candidate = candidates[leadingCandidate];
            last.title = title;
            lastWinners.push(last);
        }
        title = "";
        for(uint256 i=0;i<candidateArray.length;i++){
            delete candidates[candidateArray[i]];
        }
        for(uint256 i=0;i<votersArray.length;i++){
            delete voters[votersArray[i]];
        }
        candidateArray = new address[](0);
        votersArray = new address[](0);
    }
    function addCandidate(string memory _name,string memory _party,address _candidateAddress) public{
        require(msg.sender==owner,"This operation can only be performed by owner");
        require(!status,"You can't add candidate in running voting");
        Candidate memory c;
        c.name = _name;
        c.numberOfVotes = 0;
        c.party=_party;
        c.candidateAddress = _candidateAddress;
        candidates[_candidateAddress]=c;
        candidateArray.push(_candidateAddress);
    }
    function getAllCandidates() public view returns(Candidate[] memory){
        Candidate[] memory result = new Candidate[](candidateArray.length);
        uint256 i = 0;
        for(i=0;i<candidateArray.length;i++){
            result[i]=candidates[candidateArray[i]];
        }
        return result;
    }
    function vote(address _candidate) public{
        bool isVoted = voters[msg.sender].isVoted;
        require(!isVoted ,"You have already vote");
        require(status,"Voting is not started yet");
        require(msg.sender!=owner,"Owner cannot vote");
        require(_candidate!=msg.sender,"You cannot vote yourself");
        Voter memory v;
        v.voterAddress = msg.sender;
        v.isVoted = true;
        voters[msg.sender] = v;
        if(candidates[_candidate].numberOfVotes++ >= maxVote){
            leadingCandidate = _candidate;
            maxVote = candidates[_candidate].numberOfVotes;
        }
    }
    function registerForCandidate(string memory _name,string memory _party) public{
        require(!status,"You can't register now.");
        require(msg.sender != owner,"Owner cannot be registered");
        Candidate memory c;
        c.name = _name;
        c.party = _party;
        c.numberOfVotes = 0;
        c.candidateAddress = msg.sender;
        requestedCandidate.push(c);
    }
    function getRequestedCandidates() public view returns (Candidate[] memory) {
        return requestedCandidate;
    }
    function acceptCandidate(uint index) public {
        require(!status,"You can't add candidate in running voting");
        require(index < requestedCandidate.length || index >= 0, "Invalid index");
        require(msg.sender == owner,"This action can only be performed by owner"
        );
        Candidate memory c = requestedCandidate[index];
        candidates[c.candidateAddress]=c;
        candidateArray.push(c.candidateAddress);
        removeRequestedCandidate(index);
    }
    function removeRequestedCandidate(uint index) public {
        require(msg.sender == owner,"This action can only be performed by owner");
        requestedCandidate[index] = requestedCandidate[requestedCandidate.length - 1];
        requestedCandidate.pop();
    }
}
