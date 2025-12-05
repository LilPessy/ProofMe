import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Login() {
  const navigate = useNavigate(); // Questo è il gancio per cambiare pagina via codice

  const handleLogin = () => {
    // Qui faresti la fetch al backend... se va bene:
    navigate('/home'); // Ti porta alla home
  };

  return (
    <div>
      <Navbar type="login"/>
      <button onClick={handleLogin}>Entra</button>
    </div>
  );
}
export default Login;