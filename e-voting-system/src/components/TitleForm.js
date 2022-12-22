import Button from './Button';
const TitleForm = ({title,onClick}) => {
  function handleForm(e){
    e.preventDefault();
    const titleField = document.getElementsByName("title");
    const t = titleField[0].value;
    title(t);
    onClick();
    titleField[0].value = "";
  }
  return (
    <div>
      <input className="input" name="title" placeholder="Title"></input><br></br>
      <Button text="Start" onClick={handleForm}></Button>
    </div>
  )
}
export default TitleForm;
