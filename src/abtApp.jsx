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
      <h1 class="title">About Vibe Checker</h1>
      </div>
      <h2 className="bodyText">Our project is titled Vibe Checker. Our website is designed to humor those with different moods and preferences. Centering users-humor easily identified through feelings shown through emojis, users can choose the mood for amusement, curiosity, and novel interest.</h2>  
      <h2 className="title">User Vibes</h2>
      <div className="EmotionDataDiv">
       <EmotionData />
      </div>
      <SpinningImage />
    </>
  );
}

export default AbtApp;