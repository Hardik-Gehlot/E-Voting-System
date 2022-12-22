import RequestedCandidate from './RequestedCandidate';
const RequestedCandidates = ({setIndex,accept,reject,candidates}) => {
  var arr = [];
  candidates.forEach((value,k) => {
    console.info("value:",value,"key:",k);
    arr.push(<RequestedCandidate index={k} accept={accept} reject={reject} setIndex={setIndex} candidate={value}></RequestedCandidate>)
  });
  return (
    <>{arr}
    </>
  )
}
export default RequestedCandidates;
