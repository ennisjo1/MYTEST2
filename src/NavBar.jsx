import Logo from './assets/Logobg.svg';
import './App.css';
import About from './assets/About.svg';


function NavBar() {
  return (
    <>    

      <div>
          <div class="HeadingBar" >
            <div ><a href="/index.html"><img class="HeadingItem" src={Logo} className="logo" alt="Logo" /></a></div>
            <div ><a href="./Extra/about.html"><img class="HeadingItem" src={About} className="logo" alt="Logo" /></a></div>
          </div>
      </div>

    </>
  );
}

export default NavBar;