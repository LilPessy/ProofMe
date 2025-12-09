
import proofmeLogo from '../../public/Logo.svg'
import hamburgerMenu from '../assets/hamburgerMenu.svg'
import './style/Navbar.css'

function Navbar({type}) {

  return (
    <>
      <nav>
        {type==='home'?(<img src={proofmeLogo} className="logo" alt="ProofMe logo" />):null}
        <h1>ProofMe</h1>
        {type==='home'?(<img src={hamburgerMenu} className="logo" alt="hamburger logo" />):null}
      </nav>
    </>
  )
}

export default Navbar
