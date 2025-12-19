import './style/RadioBtn.css'; 

function RadioBtn({icon, content, onChange, isSelected}) {


  return (
    <label className='radioWrap' htmlFor={content.toLowerCase()}>
    <div className="radioBtn"  >
        <img src={icon} alt="Icon" className="radio-icon" />
        {content}
    </div>
    <input id={content.toLowerCase()} type="radio" name="userType" value={content.toLowerCase()} className="radio-input" onChange={onChange} checked={isSelected}/>
    </label>
  );
}

export default RadioBtn;