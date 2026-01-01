
import proofmeLogo from '../../public/Logo.svg'
import hamburgerMenu from '../assets/hamburgerMenu.svg'
import { useState } from 'react';
import './style/Navbar.css'

function Navbar({type}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    window.location.href = '/';
  }

  return (
    <>
      <nav>
        {type==='home'?(<img src={proofmeLogo} className="logo" alt="ProofMe logo" />):null}
        <h1>ProofMe</h1>
        {type==='home'?(<img src={hamburgerMenu} className="logo" alt="hamburger logo" onClick={toggleMenu} />):null}
        {isMenuOpen && (
          <div className="dropdown-menu">
            <p onClick={() => {alert('Funzionalità in arrivo')}}>Notifiche</p>
            <p onClick={logout}>Logout</p>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
