import './style/Button.css'; 

function Button({content, callback, icon, type}) {


  return (
    <div className="button-container">
        <button className="btn" onClick={callback} type={type || "button"}>
            {content}
            {icon ? <img src={icon} alt="Icon" className="btn-icon" />: null}
        </button>
    </div>
  );
}

export default Button;