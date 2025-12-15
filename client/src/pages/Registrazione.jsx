import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import FormField from '../components/FormField';
import RadioBtn from '../components/RadioBtn';
import './Registrazione.css'

function Registrazione(){
  const navigate = useNavigate();

  const handleRegistrazione = (tipoUtente) => {
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
    <div className='registrazione'>
        <Navbar/>

        <RadioBtn content="Azienda/Ente" />
        <RadioBtn content="Persona" />

        {type === 'candidato' ? (
            <form>
                <FormField type="text" name="Nome" placeholder="Inserisci il tuo nome" />
                <FormField type="text" name="Cognome" placeholder="Inserisci il tuo cognome" />
                <FormField type="date" name="Data di Nascita" placeholder="dd/mm/yyyy"/>
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