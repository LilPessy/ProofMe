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

  const [type, setType] = useState('azienda');

  const handleTypeSelection = (selectedType) => {
    setType(selectedType);
  }


  const [candidatoData, setCandidatoData] = useState({
    nome: '',
    cognome: '',
    dataNascita: '',
    email: '',
    telefono: '',
    nazionalita: '',
    password: '',
    confermaPassword: ''
  });

  const [aziendaData, setAziendaData] = useState({
    nomeAzienda: '',
    cfiva: '',
    tipo: '',
    indirizzo: '',
    telefono: '',
    email: '',
    password: '',
    confermaPassword: ''
  });


  const handleCandidatoChange = (e) => {
    const { name, value } = e.target;
      setCandidatoData(prev => ({
        ...prev,
        [name]: value
      }));
  };

  const handleAziendaChange = (e) => {
    const { name, value } = e.target;
    setAziendaData(prev => ({
      ...prev,
      [name]: value
    }));
  };




  return (
    <div className='registrazione'>
        <Navbar/>
        
        <div className='radio-group'>
            <RadioBtn content="Azienda/Ente" icon={aziendaIcon} onChange={() => handleTypeSelection("azienda")}  isSelected={type==="azienda"}/>
            <RadioBtn content="Persona" icon={personaIcon} onChange={() => handleTypeSelection("candidato")}  isSelected={type==="candidato"}/>
        </div>
    
        {type === 'candidato' ? (
            <form>
                <FormField label="Nome" type="text" name="nome" placeholder="Inserisci il tuo nome" onChange={handleCandidatoChange}/>
                <FormField label="Cognome" type="text" name="cognome" placeholder="Inserisci il tuo cognome" onChange={handleCandidatoChange}/>
                <FormField label="Data di Nascita" type="date" name="dataNascita" onChange={handleCandidatoChange}/>
                <FormField label="Email" type="email" name="email" placeholder="Inserisci la tua email" onChange={handleCandidatoChange}/>
                <FormField label="Telefono" type="number" name="telefono" placeholder="Inserisci il tuo numero di telefono" onChange={handleCandidatoChange}/>
                <FormField label="Nazionalità" type="text" name="nazionalita" placeholder="Inserisci la tua nazionalità" onChange={handleCandidatoChange}/>
                <FormField label="Foto Profilo" type="file" name="profPic" placeholder="Carica la tua foto profilo" onChange={handleCandidatoChange}/>
                <FormField label="Password" type="text" name="password" placeholder="Inserisci la tua password" onChange={handleCandidatoChange}/>
                <FormField label="Conferma Password" type="text" name="confermaPassword" placeholder="Conferma la tua password" onChange={handleCandidatoChange}/>
            </form>
        ):( 
            <form>
                <FormField label="Nome Azienda" type="text" name="nomeAzienda" placeholder="Inserisci il tuo nome" onChange={handleAziendaChange}/>
                <FormField label="Codice Fiscale / P.IVA" type="text" name="cfiva" placeholder="Inserisci codice fiscale / p.iva" onChange={handleAziendaChange}/>
                <FormSelect label="Tipo" name="tipo" value={aziendaData.tipo} onChange={handleAziendaChange} option1="Azienda" option2="Università" option3="Ente di Formazione"/>
                <FormField label="Marchio" type="File" name="marchio" placeholder="Carica il tuo marchio" onChange={handleAziendaChange}/>
                <FormField label="Indirizzo" type="text" name="indirizzo" placeholder="Inserisci indirizzo" onChange={handleAziendaChange}/>
                <FormField label="Telefono" type="number" name="telefono" placeholder="Inserisci numero di telefono" onChange={handleAziendaChange}/>
                <FormField label="Email" type="email" name="email" placeholder="Inserisci email" onChange={handleAziendaChange}/>
                <FormField label="Password" type="text" name="password" placeholder="Inserisci la tua password" onChange={handleAziendaChange}/>
                <FormField label="Conferma Password" type="text" name="confermaPassword" placeholder="Conferma la tua password" onChange={handleAziendaChange}/>

            </form>

            
        )}
        <Button content="Registrati"/>
        <div style={{ textAlign: 'center', marginTop: '20px' , marginBottom: '40px'}} onClick={()=>navigate('/')}>
           Torna Indietro
        </div>
    </div>    
  );
}

export default Registrazione;