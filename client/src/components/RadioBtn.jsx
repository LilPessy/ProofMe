import './style/RadioBtn.css'; 

function RadioBtn({icon, content, callback}) {


  return (
    <div className="radioBtn" onClick={callback}>
        <img src={icon} alt="Icon" className="radio-icon" />
        {content}
    </div>
  );
}

export default RadioBtn;