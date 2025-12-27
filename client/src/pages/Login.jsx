import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import FormField from '../components/FormField';
import './Login.css'
import proofmeLogo from '../../public/Logo.svg'
import aziendaIcon from '../assets/azienda.svg';
import personaIcon from '../assets/persona.svg';
import RadioBtn from '../components/RadioBtn';

function Login() {
  const navigate = useNavigate();

  const [type, setType] = useState('candidato');

  const handleTypeSelection = (selectedType) => {
    setType(selectedType);
  }


  const [data, setData] = useState({
      email: '',
      password: ''
    });

  /*const handleLogin = (tipoUtente) => {
    // 1. HARDCODING: Simuliamo che sia l'utente Daniele (ID 1)
    // Nella realtà qui riceveresti un token dal backend dopo aver mandato email/password
    const mockUserId = '1'; 
    
    // 2. SALVATAGGIO: Scriviamo nella memoria del browser
    localStorage.setItem('userId', mockUserId);
    localStorage.setItem('userType', tipoUtente); // 'candidato' o 'azienda'

    // 3. REINDIRIZZAMENTO
    navigate('/home');
  };*/

  const handleChange = (e) => {
    const { name, value } = e.target;
      setData(prev => ({
        ...prev,
        [name]: value
      }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      type === 'candidato'
        ? 'http://localhost:3000/api/auth/login/candidato'
        : 'http://localhost:3000/api/auth/login/emittente',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || 'Errore di login');
      return;
    }

    // ✅ SALVATAGGIO
    localStorage.setItem('userId', result.user.id);
    localStorage.setItem('userType', type);

    // (facoltativo)
    localStorage.setItem('userName', result.user.nome);

    // ✅ NAVIGAZIONE
    navigate('/home');

  } catch (err) {
    console.error(err);
    alert('Errore di connessione al server');
  }
};



  return (
    <div className='login'>
        <Navbar/>
        <div className='radio-group'>
            <RadioBtn content="Azienda/Ente" icon={aziendaIcon} onChange={() => handleTypeSelection("azienda")}  isSelected={type==="azienda"}/>
            <RadioBtn content="Persona" icon={personaIcon} onChange={() => handleTypeSelection("candidato")}  isSelected={type==="candidato"}/>
        </div>
        <form onSubmit={handleSubmit}>
          <FormField label="Email" type="email" name="email" placeholder="Inserisci la tua email" onChange={handleChange}/>
          <FormField label="Password" type="password" name="password" placeholder="Inserisci la tua password" onChange={handleChange}/>
          <Button content="Accedi" type="submit"/>
          <div style={{ textAlign: 'center', marginTop: '20px' }} onClick={()=>navigate('/')}>
            Torna Indietro
          </div>
        </form>
    </div>    
  );
}

export default Login;