import Button from "./Button";

const Form = ({candidate,party,onClick}) => {
  function handleForm(e){
    e.preventDefault();
    const nameField = document.getElementsByName("candidateName");
    const n = nameField[0].value;
    const partyField = document.getElementsByName("party");
    const p = partyField[0].value;
    candidate(n);
    party(p);
    onClick();
    nameField[0].value = "";
    partyField[0].value = "";
  }
  return (
    <div>
      <input className="input" name="candidateName" placeholder="Candidate Name"></input><br></br>
      <input className="input" name="party" placeholder="Party Name"></input><br></br>
      <Button text="Register" onClick={handleForm}></Button>
    </div>
  )
}
export default Form;
