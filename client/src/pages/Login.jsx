import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

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
            {/* Bottone per entrare come Candidato */}
            <button onClick={() => handleLogin('candidato')} style={{padding: '10px 20px'}}>
            Entra come Daniele (Candidato)
            </button>

            {/* Bottone per entrare come Azienda (Opzionale, per testare l'altra vista) */}
            <button onClick={() => handleLogin('azienda')} style={{padding: '10px 20px', backgroundColor: '#333'}}>
            Entra come Poliba (Azienda)
            </button>
        </div>
        </div>
    </>    
  );
}

export default Login;