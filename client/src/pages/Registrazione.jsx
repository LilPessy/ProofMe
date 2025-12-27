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

  const [type, setType] = useState('candidato');

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
    nome: '',
    cf: '',
    tipo: '',
    indirizzo: '',
    tel: '',
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

  const handleCandidatoFileChange = (e) => {
    const { name, files } = e.target;

    setCandidatoData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleAziendaFileChange = (e) => {
    const { name, files } = e.target;

    setAziendaData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };


  const handleAziendaChange = (e) => {
    const { name, value } = e.target;
    setAziendaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (type === 'candidato') {
      Object.entries(candidatoData).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      await fetch(
        'http://localhost:3000/api/auth/register/candidato',
        {
          method: 'POST',
          body: formData
        }
      );

    } else {
      Object.entries(aziendaData).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      await fetch(
        'http://localhost:3000/api/auth/register/emittente',
        {
          method: 'POST',
          body: formData
        }
      );
    }
  };





  return (
    <div className='registrazione'>
        <Navbar/>
        
        <div className='radio-group'>
            <RadioBtn content="Azienda/Ente" icon={aziendaIcon} onChange={() => handleTypeSelection("azienda")}  isSelected={type==="azienda"}/>
            <RadioBtn content="Persona" icon={personaIcon} onChange={() => handleTypeSelection("candidato")}  isSelected={type==="candidato"}/>
        </div>
    
        {type === 'candidato' ? (
            <form onSubmit={handleSubmit}>
                <FormField label="Nome" type="text" name="nome" placeholder="Inserisci il tuo nome" onChange={handleCandidatoChange}/>
                <FormField label="Cognome" type="text" name="cognome" placeholder="Inserisci il tuo cognome" onChange={handleCandidatoChange}/>
                <FormField label="Data di Nascita" type="date" name="data_nascita" onChange={handleCandidatoChange}/>
                <FormField label="Email" type="email" name="email" placeholder="Inserisci la tua email" onChange={handleCandidatoChange}/>
                <FormField label="Telefono" type="number" name="tel" placeholder="Inserisci il tuo numero di telefono" onChange={handleCandidatoChange}/>
                <FormField label="Nazionalità" type="text" name="nazionalita" placeholder="Inserisci la tua nazionalità" onChange={handleCandidatoChange}/>
                <FormField label="Foto Profilo" type="file" name="foto" placeholder="Carica la tua foto profilo" onChange={handleCandidatoFileChange}/>
                <FormField label="Password" type="text" name="password" placeholder="Inserisci la tua password" onChange={handleCandidatoChange}/>
                <FormField label="Conferma Password" type="text" name="confermaPassword" placeholder="Conferma la tua password" onChange={handleCandidatoChange}/>
                <Button content="Registrati" type="submit"/>
                <div style={{ textAlign: 'center', marginTop: '20px' , marginBottom: '40px'}} onClick={()=>navigate('/')}>
                  Torna Indietro
                </div>
            </form>
        ):( 
            <form onSubmit={handleSubmit}>
                <FormField label="Nome Azienda" type="text" name="nome" placeholder="Inserisci il tuo nome" onChange={handleAziendaChange}/>
                <FormField label="Codice Fiscale / P.IVA" type="text" name="cf" placeholder="Inserisci codice fiscale / p.iva" onChange={handleAziendaChange}/>
                <FormSelect label="Tipo" name="tipo" value={aziendaData.tipo} onChange={handleAziendaChange} option1="Azienda" option2="Università" option3="Ente di Formazione"/>
                <FormField label="Marchio" type="file" name="logo" placeholder="Carica il tuo marchio" onChange={handleAziendaFileChange}/>
                <FormField label="Indirizzo" type="text" name="indirizzo" placeholder="Inserisci indirizzo" onChange={handleAziendaChange}/>
                <FormField label="Telefono" type="number" name="tel" placeholder="Inserisci numero di telefono" onChange={handleAziendaChange}/>
                <FormField label="Email" type="email" name="email" placeholder="Inserisci email" onChange={handleAziendaChange}/>
                <FormField label="Password" type="text" name="password" placeholder="Inserisci la tua password" onChange={handleAziendaChange}/>
                <FormField label="Conferma Password" type="text" name="confermaPassword" placeholder="Conferma la tua password" onChange={handleAziendaChange}/>

                <Button content="Registrati" type="submit"/>
                <div style={{ textAlign: 'center', marginTop: '20px' , marginBottom: '40px'}} onClick={()=>navigate('/')}>
                  Torna Indietro
                </div>
            </form>

            
        )}
        
    </div>    
  );
}

export default Registrazione;