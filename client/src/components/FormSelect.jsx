import React, { useState } from 'react'; // 1. Importa useState
import './style/FormSelect.css';

const FormSelect = ({ name, option1, option2, option3 }) => {
  // 2. Crea una variabile di stato. Inizialmente è vuota ""
  const [valoreSelezionato, setValoreSelezionato] = useState("");

  // 3. Funzione per aggiornare lo stato quando l'utente cambia la tendina
  const handleChange = (e) => {
    setValoreSelezionato(e.target.value);
    
    // Se vuoi vedere in console cosa hai scelto:
    console.log("Hai selezionato:", e.target.value); 
  };

  return (
    <div class="form-group">
      
      <label>{name}</label>
      
      {/* 4. Collega il value allo stato e aggiungi l'onChange */}
      <select 
        id="opzioni" 
        value={valoreSelezionato} 
        onChange={handleChange}
      >
        <option value="">--Seleziona--</option>
        <option value="opzione1">{option1}</option>
        <option value="opzione2">{option2}</option>
        <option value="opzione3">{option3}</option>
      </select>
    </div>
  );
};

export default FormSelect;