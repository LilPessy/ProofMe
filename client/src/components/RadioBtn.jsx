import './style/Button.css'; 

function RadioBtn({icon, content, callback}) {


  return (
    <div className="radioBtn" onClick={callback}>
        {content}
    </div>
  );
}

export default RadioBtn;