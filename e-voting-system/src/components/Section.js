import Button from './Button';
import Form from './RegisterForm';
import TitleForm from './TitleForm';
import Candidates from './Candidates';
import LastWinner from './LastWinner';
import RequestedCandidates from './RequestedCandidates';
import { useEffect, useState } from 'react';
import { acceptCandidate, getAllCandidates, getLastWinner, getRequestedCandidates, getStatus, register, removeRequestedCandidate, startVoting, stopVoting, vote, isAdminOrNot} from '../web3-functions';
const Section = ({ contractInstance, accounts }) => {
  const [isAdmin, setIsAdmin] = new useState(true);
  const [status, setStatus] = new useState(false);
  const [index, setIndex] = new useState(null);
  const [rcAction, setRCAction] = new useState(null);
  const [candidate_name, setCandidateName] = new useState(null);
  const [party, setParty] = new useState(null);
  const [title,setTitle]=new useState(null);
  const [showCandidates, setshowCandidates] = new useState("hide");
  const [showRequestedCandidates, setshowRequestedCandidates] = new useState("hide");
  const [showLastWinner, setshowLastWinner] = new useState("hide");
  const [showForm, setShowForm] = useState("hide");
  const [showTitleForm, setShowTitleForm] = useState("hide");
  const [candidateArray, setCandidateArray] = useState(null);
  const [requestedCandidateArray, setRequestedCandidateArray] = useState(null);
  const [lastCandidate, setLastCandidate] = useState(null);
  useEffect(() => {
    validateAdmin();
    votingStatus();
    if (index != null) {
      if (rcAction == "accept") {
        acceptRequest(index);
      } else if(rcAction=="vote"){
        voteCandidate(candidateArray[index].candidateAddress);
      }else if(rcAction == "reject"){
        rejectRequest(index);
      }
      requestedCandidates();
      setIndex(null);
      setRCAction(null);
    }
  }, [index, rcAction]);
  function register_yourself() {
    if (candidate_name != null || party != null) {
      console.log("registering");
      register(contractInstance, accounts[0], candidate_name, party);
    }
  }
  function acceptRequest(index) {
    acceptCandidate(contractInstance, accounts[0], index);
  }
  function rejectRequest(index) {
    removeRequestedCandidate(contractInstance, accounts[0], index);
  }
  async function candidates() {
    const response = await getAllCandidates(contractInstance);
    setCandidateArray(response);
  }
  async function requestedCandidates() {
    const c = await getRequestedCandidates(contractInstance);
    setRequestedCandidateArray(c);
  }
  async function votingStatus() {
    const c = await getStatus(contractInstance);
    setStatus(c);
  }
  async function validateAdmin(){
    const c = await isAdminOrNot(contractInstance);
    // setIsAdmin(c);
    console.log(c);
  }
  function start() {
    if(title != null){
      startVoting(contractInstance, accounts[0], title);
    }
  }
  function stop() {
    stopVoting(contractInstance, accounts[0]);
  }
  function voteCandidate(candidateAddress) {
    vote(contractInstance, accounts[0],candidateAddress);
  }
  async function lastWinner() {
    const c = await getLastWinner(contractInstance);
    setLastCandidate(c);
  }
  function handleRegisterClick() {
    setShowForm(showForm === "hide" ? "form-container" : "hide");
    setshowLastWinner("hide");
    setshowCandidates("hide");
    setshowRequestedCandidates("hide");
    setShowTitleForm("hide");
  }
  function handleStartClick() {
    setShowTitleForm(showTitleForm === "hide" ? "form-container" : "hide");
    setShowForm("hide");
    setshowLastWinner("hide");
    setshowCandidates("hide");
    setshowRequestedCandidates("hide");
  }
  function handleVoteClick() {
    setshowCandidates(showCandidates === "showCandidates" ? "hide" : "showCandidates");
    setShowForm("hide");
    setshowLastWinner("hide");
    setshowRequestedCandidates("hide");
    setShowTitleForm("hide");
    candidates();
  }
  function handleRequestedCandidatesClick() {
    setshowRequestedCandidates(showRequestedCandidates === "showCandidates" ? "hide" : "showCandidates");
    setShowForm("hide");
    setshowCandidates("hide");
    setshowLastWinner("hide");
    setShowTitleForm("hide");
    requestedCandidates();
  }
  function handleCandidatesClick() {
    setshowCandidates(showCandidates === "showCandidates" ? "hide" : "showCandidates");
    setShowForm("hide");
    setshowLastWinner("hide");
    setshowRequestedCandidates("hide");
    setShowTitleForm("hide");
    candidates();
  }
  function handleLastWinnerClick() {
    setshowLastWinner(showLastWinner === "showLastWinner" ? "hide" : "showLastWinner");
    setShowForm("hide");
    setshowCandidates("hide");
    setshowRequestedCandidates("hide");
    setShowTitleForm("hide");
    lastWinner();
  }
  function acceptCandidateRequest() {
    setRCAction("accept");
  }
  function rejectCandidateRequest() {
    setRCAction("reject");
  }
  function voteClick(){
    setRCAction("vote");
  }
  var candi = [{candidateName:"Hardik",party:"bjp",candidateAddress:"0xddD7B9dF8579E8Ed997a12c02E16AFED008E6522"}];
  return (
    <div className='container'>
      <div className='sidebar'>
        <>
          {isAdmin ? <>
            <Button text="Candidates" onClick={handleCandidatesClick}></Button>
            
            <>
              {status ?
                <Button text="Stop" onClick={stop}></Button>
                :
                <>
                <Button text="Register as Candidate" onClick={handleRegisterClick}></Button>
                <Button text="Start" onClick={handleStartClick}></Button>
                <Button text="Requested Candidates" onClick={handleRequestedCandidatesClick}></Button>
                </>}
            </>

            <Button text="LastWinner" onClick={handleLastWinnerClick}></Button>
            
          </>
            :
            <>{!status ?
              <>
                <Button text="Register as Candidate" onClick={handleRegisterClick}></Button>
                <Button text="LastWinner" onClick={handleLastWinnerClick}></Button>

              </>
              : <>
                <Button text="Vote" onClick={handleVoteClick}></Button>
                <Button text="LastWinner" onClick={handleLastWinnerClick}></Button>
              </>

            }</>
          }
        </>

      </div>
      <div className='main-section'>
      <div className={showRequestedCandidates}>
        {requestedCandidateArray == null ? "" :
          <RequestedCandidates setIndex={setIndex} candidates={requestedCandidateArray} accept={acceptCandidateRequest} reject={rejectCandidateRequest}></RequestedCandidates>}
      </div>
      <div className={showForm}>
        <Form  candidate={setCandidateName} party={setParty} onClick={register_yourself}></Form>
      </div>
      <div className={showTitleForm}>
        <TitleForm title={setTitle} onClick={start}></TitleForm>
      </div>
      <div className={showCandidates}>
        {candidateArray == null ? "" :
          <Candidates setIndex={setIndex} vote={voteClick} candidates={candidateArray}></Candidates>}
      </div>
      <div className={showLastWinner}>
        {lastCandidate == null ? "" :
          <LastWinner candidate={lastCandidate} />}
      </div>
      </div>
    </div>
  );
}
export default Section;