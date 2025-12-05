import Navbar from '../Navbar'; // La tua Navbar parametrica!
import UserLogo from '../UserLogo';

function Home() {
  return (
    <div className="home-container">
      {/* 1. La barra di navigazione in alto */}
      <Navbar type="home" />

      {/* 2. Il blocco con foto e saluto subito sotto */}
      <UserLogo />

      {/* Qui in futuro metteremo le card delle esperienze (Politecnico, Auriga) */}
    </div>
  );
}

export default Home;