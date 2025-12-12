import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

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
    <>
        <Navbar/>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            
            <Button content="Entra come Candidato" callback={() => handleLogin('candidato')} />
            <Button content="Entra come Azienda" callback={() => handleLogin('azienda')} />
        </div>
        </div>
    </>    
  );
}

export default Login;