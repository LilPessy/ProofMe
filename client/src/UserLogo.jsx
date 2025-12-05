import './UserLogo.css'; 
// Importiamo sempre l'immagine di default nel caso il DB non abbia la foto o l'URL sia rotto
import defaultPic from '../public/upload/danielephoto.png'; 

// 1. Aggiungiamo le props tra parentesi graffe
function UserLogo({ nome, foto }) {

  // Logica: Se 'foto' arriva dal padre, usala. Altrimenti usa defaultPic.
  const imageSource = foto ? foto : defaultPic;

  return (
    <div className="profile-container">
      <div className="image-wrapper">
        <img 
            src={imageSource} 
            alt="Profile Picture" 
            className="profile-img"
            onError={(e) => { e.target.src = defaultPic; }}
        />
      </div>
      <h2 className="greeting">Ciao, {nome || '...'}</h2>
    </div>
  );
}

export default UserLogo;