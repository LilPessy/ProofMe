import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import FormField from '../components/FormField';
import RadioBtn from '../components/RadioBtn';
import { useState } from 'react';
import aziendaIcon from '../assets/azienda.svg';
import personaIcon from '../assets/persona.svg';
import './Registrazione.css'

function Registrazione(){
  const navigate = useNavigate();

  const [type, setType] = useState('candidato');

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
            </form>
        ):(
            <form>
                <FormField type="text" name="Ragione Sociale" placeholder="Azienda SRL" />
                <FormField type="text" name="Partita IVA" placeholder="01234567890" />
                <FormField type="email" name="Email" placeholder=""/>
            </form>
        )}
    </div>    
  );
}

export default Registrazione;