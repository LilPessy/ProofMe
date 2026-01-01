
import proofmeLogo from '../../public/Logo.svg'
import './HomeLogin.css'
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function HomeLogin() {

  const navigate = useNavigate();

  const autoLogin = () => {
    if (localStorage.getItem('userId') && localStorage.getItem('userType')) {
      navigate('/home');
    }
  };

  return (
    <div className='content' onLoad={autoLogin}>
      <Navbar />
      <img src={proofmeLogo} />
      <h2 style={{ color: '#0B1E45', fontSize: '50px', marginBottom: '5px' }}>ProofMe</h2>
      <p style={{  color: '#0B1E45', fontSize: '28px', marginTop: '0' }}>Carriera senza dubbi.</p>
      <Button content="Login" callback={()=>navigate('/login')}/>
      <Button content="Registrati" callback={()=>navigate('/signin')}/>
    </div>
  )
}

export default HomeLogin
