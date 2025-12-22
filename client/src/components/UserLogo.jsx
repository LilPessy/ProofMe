import './style/UserLogo.css'; 
// Importiamo sempre l'immagine di default nel caso il DB non abbia la foto o l'URL sia rotto
import defaultPic from '../../public/default.png'; 

// 1. Aggiungiamo le props tra parentesi graffe
function UserLogo({ nome, foto, type}) {

  // Logica: Se 'foto' arriva dal padre, usala. Altrimenti usa defaultPic.

  return (
    <div className="profile-container">
      <div className="image-wrapper">
        <img 
            src={`http://localhost:3000${foto}`}
            alt="Profile Picture" 
            className="profile-img"
            onError={(e) => { e.target.src = defaultPic; }}
        />
      </div>
      <h2 className="greeting">{type === 'candidato' ? 'Ciao,' : null} {nome || '...'}</h2>
    </div>
  );
}

export default UserLogo;