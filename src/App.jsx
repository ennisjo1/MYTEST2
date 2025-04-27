import Logo from '/Logobg.png';
import './App.css';
import MemeGenerator from './memes';
import NavBar from './NavBar'


function App() {
  return (
    <>
      <NavBar />
      <div className="title">
      <h1>How's your Mood Today?</h1>
      </div>
      <MemeGenerator />
    </>
  );
}

export default App;