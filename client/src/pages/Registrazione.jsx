import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import FormField from '../components/FormField';
import RadioBtn from '../components/RadioBtn';
import { useState } from 'react';
import './Registrazione.css'

function Registrazione(){
  const navigate = useNavigate();

  const [type, setType] = useState('candidato');

  return (
    <div className='registrazione'>
        <Navbar/>

        <RadioBtn content="Azienda/Ente" />
        <RadioBtn content="Persona" />

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