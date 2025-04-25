import Logo from '/Logobg.png';
import './App.css';
import SpinningImage from './SpinningImage';
import NavBar from './NavBar'


function AbtApp() {
  return (
    <>
        <NavBar />

      <div className="logo" onClick={() => window.location.reload()}>
        <img src={Logo} className="logo" alt="Logobg" />
      </div>
      <div className="title">
      <h1>About Vibe Checker</h1>
      </div>

      <SpinningImage />
    </>
  );
}

export default AbtApp;