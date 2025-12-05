import Navbar from '../Navbar'; // La tua Navbar parametrica!
import UserLogo from '../UserLogo';
import ExperienceCard from '../ExperienceCard';
import polibalogo from '../assets/polibalogo.png';
import aurigaLogo from '../assets/aurigalogo.png';
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      {/* 1. La barra di navigazione in alto */}
      <Navbar type="home" />

      {/* 2. Il blocco con foto e saluto subito sotto */}
      <UserLogo />

     {/* --- INIZIO SEZIONE ESPERIENZE --- */}
      <div className="timeline-section">
        
        {/* Card 1: Politecnico */}
        <ExperienceCard 
          logo={polibalogo}
          title="Politecnico di Bari"
          type="Laurea Triennale"
          description="Ing. Informatica"
          startDate="20 Settembre 2023"
          endDate="12 Novembre 2026"
          outcome={{ label: "Valutazione", value: "110L/110" }}
          hash="011F7AD1ECD8E5A4CC8533D1ECD497DC5D95E848B14F8BCFD56A73D7F41843E2"
        />

        {/* La linea verticale di connessione */}
        <div className="timeline-connector"></div>

        {/* Card 2: Auriga */}
        <ExperienceCard 
          logo={aurigaLogo}
          title="Auriga"
          type="Sviluppo Web"
          description="Junior Developer"
          startDate="13 Novembre 2026"
          endDate="11 Giugno 2029"
          outcome={{ label: "Descrizione", value: "Competenze in React, Node.js e mySQL" }}
          hash="011F7AD1ECD8E5A4CC8533D1ECD497DC5D95E848B14F8BCFD56A73D7F41843E2"
        />

      </div>
      
      {/* Spazio vuoto o bottone download in futuro */}
      <div style={{ height: '50px' }}></div>
    </div>
  );
}

export default Home;