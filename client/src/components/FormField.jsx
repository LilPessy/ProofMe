import './style/FormField.css';

const FormField = ({name, type, placeholder}) => {
  
    return (
      
          <div className="form-group">
              <label>{name}</label>
              <input type={type} placeholder={placeholder} />
          </div>
  
    );
  };
  
  export default FormField;