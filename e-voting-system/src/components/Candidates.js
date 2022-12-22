import Candidate from "./Candidate";
const Candidates = ({candidates,vote,setIndex}) => {
  var arr = [];
  candidates.forEach((value,k,i) => {
    arr.push(<Candidate index={k} key={i} vote={vote} setIndex={setIndex} candidate={value}></Candidate>)
  });
  return (
    <>{arr}
    </>
  )
}

export default Candidates;
