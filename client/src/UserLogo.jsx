import './UserLogo.css'; 
import danielephoto from './assets/danielephoto.png'

function UserLogo() {
  return (
    <div className="profile-container">
      <div className="image-wrapper">
        <img src={danielephoto} alt="Daniele Profile" className="profile-img" />
      </div>
      <h2 className="greeting">Ciao, Daniele</h2>
    </div>
  );
}

export default UserLogo;