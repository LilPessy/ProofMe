// 1. IMPORTA GLI HOOKS DA REACT (Mancava questa riga!)
import { useState, useEffect } from 'react'; 
import './UserLogo.css'; 
import profilePic from './assets/danielephoto.png';

function UserLogo() {

  const [utente, setUtente] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      fetch(`/api/candidati/${userId}`)
        .then(response => {
          if (!response.ok) throw new Error("Errore fetch utente");
          return response.json();
        })
        .then(data => {
          setUtente(data);
        })
        .catch(error => console.error("Errore nel recupero dati utente:", error));
    }
  }, []);

  // Se vuoi mantenere il "Ciao, " davanti al nome:
  const nomeDaMostrare = utente ? `Ciao, ${utente.nome}` : "Caricamento...";
  
  // Controlla se utente esiste E se ha una foto valida (stringa non vuota)
  const fotoDaMostrare = (utente && utente.foto && utente.foto !== "") ? utente.foto : profilePic;


  return (
    <div className="profile-container">
      <div className="image-wrapper">
        <img 
            src={fotoDaMostrare} 
            alt="Profile" 
            className="profile-img"
            // Se l'immagine del DB non si carica (es. link rotto), usa quella di default
            onError={(e) => { e.target.src = profilePic; }} 
        />
      </div>
      <h2 className="greeting">{nomeDaMostrare}</h2>
    </div>
  );
}

export default UserLogo;