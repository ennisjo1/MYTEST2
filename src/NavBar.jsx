import Logo from '/Logobg.png';
import './App.css';


function NavBar() {
  return (
    <>    
      <header>
      <div className="navTitle">
      <h1>Vibe Checker</h1>
      </div>
      <div>
        <nav>
            <ul>
                <li><a title="Home Page" href="/index.html">Home</a></li>
                <li><a title="About Page" href="/about.html">About</a></li>
            </ul>
        </nav>
        </div>
    </header>
    </>
  );
}

export default NavBar;