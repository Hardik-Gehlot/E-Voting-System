const Candidate = ({index,setIndex,vote,candidate}) => {
  function voteBtnClick() {
    setIndex(index);
    vote();
  }
  return (
    <div className="candidate">
      <div className="party">{candidate.party}</div>
      <div className="details">
        <div className="candidateName">{candidate.name}</div>
        <div className="candidateAddress">{candidate.candidateAddress}</div>
      </div>
      <div className="btnDiv">
        <button className="btn2-pushable" onClick={voteBtnClick} role="button">
          <span className="btn2-shadow"></span>
          <span className="btn2-edge"></span>
          <span className="btn2-front text">Vote</span>
        </button>
      </div>
    </div>
  )
}
export default Candidate;
