import './style/RadioBtn.css'; 

function RadioBtn({icon, content, callback, isSelected}) {


  return (
    <div className='radioWrap'>
    <div className="radioBtn" onClick={callback}>
        <img src={icon} alt="Icon" className="radio-icon" />
        {content}
    </div>
    <input type="radio" name="userType" value={content.toLowerCase()} className="radio-input" checked={isSelected}/>
    </div>
  );
}

export default RadioBtn;