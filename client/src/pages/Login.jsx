import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import FormField from '../components/FormField';
import './Login.css'

function Login() {
  const navigate = useNavigate();

  const handleLogin = (tipoUtente) => {
    // 1. HARDCODING: Simuliamo che sia l'utente Daniele (ID 1)
    // Nella realtà qui riceveresti un token dal backend dopo aver mandato email/password
    const mockUserId = '1'; 
    
    // 2. SALVATAGGIO: Scriviamo nella memoria del browser
    localStorage.setItem('userId', mockUserId);
    localStorage.setItem('userType', tipoUtente); // 'candidato' o 'azienda'

    // 3. REINDIRIZZAMENTO
    navigate('/home');
  };

  return (
    <div className='login'>
        <Navbar/>
        <form>
          <FormField type="email" name="Email" placeholder="Inserisci la tua email" />
          
          <FormField type="password" name="Password" placeholder="Inserisci la tua password" />
          
        </form>

        <Button content="Accedi"/>
        <div style={{ textAlign: 'center', marginTop: '20px' }} onClick={()=>navigate('/home')}>
           Torna Indietro
        </div>
    </div>    
  );
}

export default Login;