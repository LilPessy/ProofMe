
import proofmeLogo from '../../public/Logo.svg'
import './HomeLogin.css'
import Navbar from '../components/Navbar';
import Button from '../components/Button';

function HomeLogin() {

  return (
    <div className='content'>
      <Navbar />
      <img src={proofmeLogo} />
      <h2 style={{ color: '#0B1E45', fontSize: '50px', marginBottom: '5px' }}>ProofMe</h2>
      <p style={{  color: '#0B1E45', fontSize: '28px', marginTop: '0' }}>Carriera senza dubbi.</p>
      <Button content="Login"/>
      <Button content="Registrati"/>
    </div>
  )
}

export default HomeLogin
