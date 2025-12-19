import './style/FormField.css';

const FormField = ({label, type, placeholder, name, value, onChange}) => {
  
    return (
      
          <div className="form-group">
              <label>{label}</label>
              <input 
                type={type} placeholder={placeholder} 
                name={name}          
                value={value}
                onChange={onChange}/>
          </div>
  
    );
  };
  
  export default FormField;