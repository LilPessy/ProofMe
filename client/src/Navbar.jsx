import { useState } from 'react'
import './Navbar.css'

function Navbar({type}) {

  return (
    <>
      <nav>
        {type==='home'?(<img src='' className="logo" alt="ProofMe logo" />):null}
        <h1>ProofMe</h1>
        {type==='home'?(<img src='' className="logo" alt="hamburger logo" />):null}
      </nav>
    </>
  )
}

export default Navbar
