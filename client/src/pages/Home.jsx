import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import UserLogo from '../UserLogo';
import ExperienceCard from '../ExperienceCard';
import downloadIcon from '../assets/download.svg';
// Importiamo un logo di fallback nel caso il DB non ne abbia uno 
import './Home.css';

function Home() {
  const [certificati, setCertificati] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch dei dati dal Backend
  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      // Chiamiamo l'API specifica per il wallet del candidato
      fetch(`/api/certificati/candidato/${userId}`)
        .then(res => {
          if (!res.ok) throw new Error("Errore network");
          return res.json();
        })
        .then(data => {
          setCertificati(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, []);

  // 2. Funzione helper per formattare le date (da "2023-09-20T..." a "20 Settembre 2023")
  const formatDate = (dateString) => {
    if (!dateString) return "In corso"; // Se data_fine è null
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  const handleDownload = () => {
    alert("Funzionalità di download PDF in arrivo!");
  };

  return (
    <div className="home-container">
      <Navbar type="home" />

      <UserLogo />

      {/* --- SEZIONE DINAMICA ESPERIENZE --- */}
      <div className="timeline-section">
        
        {loading && <p style={{textAlign:'center'}}>Caricamento certificazioni...</p>}

        {!loading && certificati.length === 0 && (
          <p style={{textAlign:'center'}}>Nessuna certificazione trovata.</p>
        )}

        {certificati.map((cert, index) => {
          // Logica per decidere cosa mostrare nel campo "Outcome" (Valutazione o Descrizione Extra)
          // Se c'è una valutazione (es. 110L), mostra quella. Altrimenti mostra competenze o altro.
          let outcomeData = { label: "Info", value: "Verificato" };
          
          if (cert.valutazione) {
            outcomeData = { label: "Valutazione", value: cert.valutazione };
          } else if (cert.tipo === 'Lavoro') {
             // Se è un lavoro e non ha voto, magari mostriamo "Competenze" se le hai nel DB, 
             // oppure usiamo una stringa generica
             outcomeData = { label: "Stato", value: "Verificato su Blockchain" };
          }

          return (
            <div key={cert.id} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              {/* LA CARD */}
              <ExperienceCard 
                logo={cert.emittente_logo || defaultLogo} // Usa il logo dal DB o fallback
                title={cert.emittente_nome}               // Es. Politecnico di Bari
                type={cert.denominazione}                 // Es. Laurea Triennale
                description={cert.descrizione}            // Es. Ing. Informatica
                startDate={formatDate(cert.data_inizio)}
                endDate={formatDate(cert.data_fine)}
                outcome={outcomeData}
                hash={cert.hash || "In attesa di mining..."}
              />

              {/* LA LINEA DI CONNESSIONE (Solo se NON è l'ultima card) */}
              {index < certificati.length - 1 && (
                <div className="timeline-connector"></div>
              )}

            </div>
          );
        })}

      </div>

      <div className="button-container">
        <button className="download-btn" onClick={handleDownload}>
          Scarica CV
          <img src={downloadIcon} alt="Download icon" className="btn-icon" />
        </button>
      </div>

      <div style={{ height: '50px' }}></div>
    </div>
  );
}

export default Home;