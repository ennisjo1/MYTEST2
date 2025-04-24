import Logo from '/Logobg.png';
import './App.css';
import MemeGenerator from './memes';
import SpinningImage from './SpinningImage';


function App() {
  return (
    <>
      <div className="logo" onClick={() => window.location.reload()}>
        <img src={Logo} className="logo" alt="Logobg" />
      </div>
      <div className="title">
      <h1>How's your Mood Today?</h1>
      </div>

      <MemeGenerator />
      <SpinningImage />
    </>
  );
}

export default App;