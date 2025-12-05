import { useState, useEffect } from 'react';

// Se non hai la cartella components e i file sono nella cartella superiore (src/), questo va bene:
import Navbar from '../Navbar';
import UserLogo from '../UserLogo';
import ExperienceCard from '../ExperienceCard';

import downloadIcon from '../assets/download.svg';
import './Home.css';

// Percorso per l'immagine di fallback
const defaultLogo = '/upload/polibalogo.png'; 

function Home() {
  const [certificati, setCertificati] = useState([]);
  const [candidato, setCandidato] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      // 1. Fetch Certificati
      fetch(`/api/certificati/candidato/${userId}`)
        .then(res => {
          if (!res.ok) throw new Error("Errore network certificati");
          return res.json();
        })
        .then(data => {
          setCertificati(data);
        })
        .catch(err => console.error(err));

      // 2. Fetch Candidato (CON CORREZIONE ARRAY)
      fetch(`/api/candidati/${userId}`)
        .then(res => {
          if (!res.ok) throw new Error("Errore network candidato");
          return res.json();
        })
        .then(data => {
          console.log("Dati ricevuti dal backend:", data); // <--- Guarda questo nella console del browser!
          
          // FIX: Se il backend mi dà un array (es. [{nome: 'Daniele'}]), prendo il primo elemento [0]
          if (Array.isArray(data)) {
             setCandidato(data[0]); 
          } else {
             setCandidato(data);
          }
        })
        .catch(err => console.error(err))
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "In corso"; 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  const handleDownload = () => {
    alert("Funzionalità di download PDF in arrivo!");
  };

  return (
    <div className="home-container">
      <Navbar type="home" />

      {/* UserLogo riceve i dati */}
      <UserLogo 
        nome={candidato?.nome} 
        foto={candidato?.foto} 
      />

      <div className="timeline-section">
        
        {loading && <p style={{textAlign:'center'}}>Caricamento...</p>}

        {!loading && certificati.length === 0 && (
          <p style={{textAlign:'center'}}>Nessuna certificazione trovata.</p>
        )}

        {certificati.map((cert, index) => {
          let outcomeData = { label: "Info", value: "Verificato" };
          
          if (cert.valutazione) {
            outcomeData = { label: "Valutazione", value: cert.valutazione };
          } else if (cert.tipo === 'Lavoro') {
             outcomeData = { label: "Stato", value: "Verificato su Blockchain" };
          }

          return (
            <div key={cert.id} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              <ExperienceCard 
                logo={cert.emittente_logo || defaultLogo}
                title={cert.emittente_nome}
                type={cert.denominazione}
                description={cert.descrizione}
                startDate={formatDate(cert.data_inizio)}
                endDate={formatDate(cert.data_fine)}
                outcome={outcomeData}
                hash={cert.hash || "In attesa di mining..."}
              />

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
          <img src={downloadIcon} alt="Download" className="btn-icon" />
        </button>
      </div>

      <div style={{ height: '50px' }}></div>
    </div>
  );
}

export default Home;