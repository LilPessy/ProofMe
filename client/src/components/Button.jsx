import './style/Button.css'; 

function Button({content, callback, icon}) {


  return (
    <div className="button-container">
        <button className="btn" onClick={callback}>
            {content}
            {icon ? <img src={icon} alt="Icon" className="btn-icon" />: null}
        </button>
    </div>
  );
}

export default Button;