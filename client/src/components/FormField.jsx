import './style/FormField.css';

const FormField = ({label, type, placeholder, name, value, max, onChange}) => {
  
    return (
      
          <div className="form-group">
            <label>{label}</label>
            {type === 'file' ? ( <input type="file" name={name} onChange={onChange} placeholder={placeholder} />) 
                  : (<input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} max={max} />)}

          </div>
  
    );
  };
  
  export default FormField;