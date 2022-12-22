import Web3 from 'web3';
import VotingContract from './contracts/Voting.json';
let web = null;
async function connectWeb3Metamask() {
    const web3 = new Web3(Web3.givenProvider);
    web = web3;
    const accounts = await web3.eth.requestAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = VotingContract.networks[networkId];

    const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address
    );
    return { accounts, instance }
}
async function acceptCandidate(contractInstance,account,index){
    await contractInstance.methods.acceptCandidate(index).send({from:account});
}
async function register(contractInstance,account,candidateName,party){
    await contractInstance.methods.registerForCandidate(candidateName,party).send({from:account});
}
async function removeRequestedCandidate(contractInstance,account,index){
    await contractInstance.methods.removeRequestedCandidate(index).send({from:account});
}
async function startVoting(contractInstance,account,title){
    await contractInstance.methods.startVoting(title).send({from:account});
}
async function stopVoting(contractInstance,account){
    await contractInstance.methods.stopVoting().send({from:account});
}
async function vote(contractInstance,account,candidateAddress){
    const address = web.utils.toChecksumAddress(candidateAddress);
    await contractInstance.methods.vote(address).send({from:account});
}

async function getAllCandidates(contractInstance){
    const response = await contractInstance.methods.getAllCandidates().call();
    return response;
}
async function getLastWinner(contractInstance){
    const response = await contractInstance.methods.getLastWinner().call();
    return response;
}
async function getRequestedCandidates(contractInstance){
    const response = await contractInstance.methods.getRequestedCandidates().call();
    return response;
}
async function getStatus(contractInstance){
    const response = await contractInstance.methods.getStatus().call();
    return response;
}
async function isAdminOrNot(contractInstance){
    const response = await contractInstance.methods.isAdmin().call();
    return response;
}

export { connectWeb3Metamask, acceptCandidate, getAllCandidates, getLastWinner, getRequestedCandidates, getStatus, register, removeRequestedCandidate, startVoting, stopVoting, vote, isAdminOrNot}