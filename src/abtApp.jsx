import Logo from '/Logobg.png';
import './App.css';
import SpinningImage from './SpinningImage';
import NavBar from './NavBar'
import EmotionData from './emotionData';


function AbtApp() {
  return (
    <>
      <NavBar />
      
      <div className="title">
      <h1>About Vibe Checker</h1>
      </div>

      <EmotionData />
      <SpinningImage />
    </>
  );
}

export default AbtApp;