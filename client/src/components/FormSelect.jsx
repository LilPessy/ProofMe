import './style/FormSelect.css';

const FormSelect = ({ label, name, value, onChange, option1, option2, option3 }) => {
  return (
    <div className="form-group">
      <label>{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">-- Seleziona --</option>
        <option value={option1}>{option1}</option>
        <option value={option2}>{option2}</option>
        <option value={option3}>{option3}</option>
      </select>
    </div>
  );
};

export default FormSelect;
