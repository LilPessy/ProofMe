import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import FormField from '../components/FormField';
import RadioBtn from '../components/RadioBtn';
import { useState } from 'react';
import aziendaIcon from '../assets/azienda.svg';
import personaIcon from '../assets/persona.svg';
import './Registrazione.css'
import FormSelect from '../components/FormSelect';

function Registrazione(){
  const navigate = useNavigate();

  const [type, setType] = useState('Azienda/Ente');

  const handleTypeSelection = (selectedType) => {
    setType(selectedType);
  }

  return (
    <div className='registrazione'>
        <Navbar/>
        
        <div className='radio-group'>
            <RadioBtn content="Azienda/Ente" icon={aziendaIcon} callback={() => handleTypeSelection("azienda")}  isSelected={type==="azienda"}/>
            <RadioBtn content="Persona" icon={personaIcon} callback={() => handleTypeSelection("candidato")}  isSelected={type==="candidato"}/>
        </div>
    
        {type === 'candidato' ? (
            <form>
                <FormField type="text" name="Nome" placeholder="Inserisci il tuo nome" />
                <FormField type="text" name="Cognome" placeholder="Inserisci il tuo cognome" />
                <FormField type="date" name="Data di Nascita"/>
                <FormField type="email" name="Email" placeholder="Inserisci la tua email"/>
                <FormField type="number" name="Telefono" placeholder="Inserisci il tuo numero di telefono"/>
                <FormField type="text" name="Nazionalita" placeholder="Inserisci la tua nazionalità"/>
                <FormField type="file" name="FotoProfilo" placeholder="Carica la tua foto profilo"/>
                <FormField type="text" name="Password" placeholder="Inserisci la tua password"/>
                <FormField type="text" name="Conferma Password" placeholder="Conferma la tua password"/>
            </form>
        ):( 
            <form>
                <FormField type="text" name="NomeAzienda" placeholder="Inserisci il tuo nome"/>
                <FormField type="text" name="CFIVA" placeholder="Inserisci codice fiscale / p.iva"/>
                <FormSelect name="Tipo" option1="Azienda" option2="Università" option3="Ente di Formazione" />
                <FormField type="File" name="Marchio" placeholder="Carica il tuo marchio"/>
                <FormField type="text" name="Indirizzo" placeholder="Inserisci indirizzo"/>
                <FormField type="number" name="Telefono" placeholder="Inserisci numero di telefono"/>
                <FormField type="email" name="Email" placeholder="Inserisci email"/>
                <FormField type="text" name="Password" placeholder="Inserisci la tua password"/>
                <FormField type="text" name="Conferma Password" placeholder="Conferma la tua password"/>

            </form>

            
        )}
        <Button content="Registrati"/>
    </div>    
  );
}

export default Registrazione;