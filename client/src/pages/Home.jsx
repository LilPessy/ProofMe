import { useState, useEffect } from 'react';

// Percorsi ai componenti (adatta se necessario)
import Navbar from '../Navbar';
import UserLogo from '../UserLogo';
import ExperienceCard from '../ExperienceCard';
import Button from '../Button';

import downloadIcon from '../assets/download.svg';
import './Home.css';

// Logo di fallback (percorso stringa dalla cartella public)
const defaultLogo = '/uploads/polibalogo.png'; 

function Home() {
  const [certificati, setCertificati] = useState([]);
  const [utente, setUtente] = useState(null); // Dati profilo (Candidato o Azienda)
  const [userType, setUserType] = useState('candidato'); // Default
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Recupera credenziali dal LocalStorage
    const userId = localStorage.getItem('userId');
    const storedType = localStorage.getItem('userType'); // 'candidato' o 'azienda'

    if (userId && storedType) {
      setUserType(storedType);

      // 2. Imposta URL dinamici in base al tipo
      let urlCertificati = '';
      let urlProfilo = '';

      if (storedType === 'candidato') {
        // Se sono CANDIDATO: voglio i miei certificati e il mio profilo
        urlCertificati = `/api/certificati/candidato/${userId}`;
        urlProfilo = `/api/candidati/${userId}`;
      } else {
        // Se sono AZIENDA: voglio i certificati che ho emesso e il mio profilo aziendale
        urlCertificati = `/api/certificati/emittente/${userId}`;
        urlProfilo = `/api/emittenti/${userId}`;
      }

      // 3. Esegui le chiamate
      const fetchData = async () => {
        try {
          // Fetch Certificati
          const resCert = await fetch(urlCertificati);
          const dataCert = await resCert.json();
          setCertificati(dataCert);

          // Fetch Profilo
          const resProf = await fetch(urlProfilo);
          const dataProf = await resProf.json();
          
          // Gestione array vs oggetto (per sicurezza)
          if (Array.isArray(dataProf)) {
             setUtente(dataProf[0]);
          } else {
             setUtente(dataProf);
          }

        } catch (error) {
          console.error("Errore caricamento dati:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "In corso"; 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  const handleDownload = () => alert("Funzionalità in arrivo!");
  const handleAction = () => alert("Funzionalità in arrivo!");
  return (
    <div className="home-container">
      <Navbar type='home' />

      {/* UserLogo mostra foto candidato o logo azienda */}
      <UserLogo 
        nome={utente?.nome} 
        foto={userType === 'candidato' ? utente?.foto : utente?.logo} 
        type={userType}
      />

      {userType === 'azienda' && (
        <Button 
          content="Aggiungi Certificato" 
          callback={handleAction} 
          icon={downloadIcon}
        />
      )}

      <div className="timeline-section">
        
        {loading && <p style={{textAlign:'center'}}>Caricamento...</p>}

        {!loading && certificati.length === 0 && (
          <p style={{textAlign:'center'}}>Nessuna certificazione trovata.</p>
        )}

        {certificati.map((cert, index) => {
          // --- LOGICA CARD DINAMICA ---
          let cardImage = defaultLogo;
          let cardTitle = "Sconosciuto";

          if (userType === 'candidato') {
            // VISTA CANDIDATO: Vedo Chi mi ha dato il certificato
            cardImage = cert.emittente_logo;
            cardTitle = cert.emittente_nome;
          } else {
            // VISTA AZIENDA: Vedo A Chi ho dato il certificato
            // (Nota: assicurati che la query SQL in certificatiRoutes.js restituisca questi campi alias)
            cardImage = cert.candidato_foto; 
            cardTitle = `${cert.candidato_nome} ${cert.candidato_cognome}`;
          }

          let outcomeData = { label: "Info", value: "Verificato" };
          if (cert.valutazione) outcomeData = { label: "Valutazione", value: cert.valutazione };


          
          return (

            

            <div key={cert.id} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              

              <ExperienceCard 
                logo={cardImage || defaultLogo}
                title={cardTitle}
                type={cert.denominazione}
                description={cert.descrizione || cert.tipo}
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

      {/* Nascondi bottone download se sei un'azienda */}
      {userType === 'candidato' && (
        <Button 
          content="Scarica Certificati" 
          callback={handleDownload} 
          icon={downloadIcon}
        />
      )}

      <div style={{ height: '50px' }}></div>
    </div>
  );
}

export default Home;