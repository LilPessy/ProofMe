import Navbar from '../Navbar'; // La tua Navbar parametrica!
import UserLogo from '../UserLogo';

function Home() {
  return (
    <div>
      <Navbar type="home" />
      <UserLogo/>
    </div>
  );
}
export default Home;