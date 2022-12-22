const LastWinner = ({candidate})=>{

    return(
        <>
        <div className="partyName">{candidate.title}</div>
            <div className="partyName">{candidate.candidate.party}</div>
            <div className="candidateName">{candidate.candidate.name}</div>
            <div className="candidateAddress">{candidate.candidate.candidateAddress}</div>
        </>
    );
}
export default LastWinner;