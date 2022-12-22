const RequestedCandidate = ({ index, setIndex, accept, reject, candidate }) => {
  function acceptBtnClick() {
    setIndex(index);
    accept();
  }
  function rejectBtnClick() {
    setIndex(index);
    reject();
  }
  return (
    <div className="candidate">
      <div className="party">{candidate.party}</div>
      <div className="details">
        <div className="candidateName">{candidate.name}</div>
        <div className="candidateAddress">{candidate.candidateAddress}</div>
      </div>
      <div className="btnDiv">
        <button className="btn2-pushable accept" onClick={acceptBtnClick} role="button">
          <span className="btn2-shadow"></span>
          <span className="btn2-edge-accept"></span>
          <span className="btn2-front-accept text">Accept</span>
        </button>
        <button className="btn2-pushable" onClick={rejectBtnClick} role="button">
          <span className="btn2-shadow"></span>
          <span className="btn2-edge"></span>
          <span className="btn2-front text">Reject</span>
        </button>
      </div>
    </div>
  )
}

export default RequestedCandidate;
