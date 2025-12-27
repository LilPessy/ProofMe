import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import FormField from '../components/FormField';
import './Login.css'
import proofmeLogo from '../../public/Logo.svg'

function Login() {
  const navigate = useNavigate();

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
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      await fetch(
        'http://localhost:3000/api/auth/login',
        {
          method: 'POST',
          body: formData
        }
      );
};


  return (
    <div className='login'>
        <Navbar/>
        <img src={proofmeLogo} />
      <h2 style={{ color: '#0B1E45', fontSize: '50px', marginBottom: '5px' }}>ProofMe</h2>
      <p style={{  color: '#0B1E45', fontSize: '28px', marginTop: '0' }}>Carriera senza dubbi.</p>
      
        <form onSubmit={handleSubmit}>
          <FormField label="Email" type="email" name="email" placeholder="Inserisci la tua email" onChange={handleChange}/>
          <FormField label="Password" type="text" name="password" placeholder="Inserisci la tua password" onChange={handleChange}/>
          <Button content="Accedi" type="submit"/>
          <div style={{ textAlign: 'center', marginTop: '20px' }} onClick={()=>navigate('/')}>
            Torna Indietro
          </div>
        </form>
    </div>    
  );
}

export default Login;