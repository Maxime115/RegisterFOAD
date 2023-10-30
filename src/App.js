import { useState } from "react";
import Homepage from "./Homepage";
import Register from "./Register";
import Logo from "./images/logo192.png";
import styles from './app.scss';

function App() {
  const [location, setLocation] = useState("register");

  function changeView(view) {
    setLocation(view);
  }

  return (
    <div className={`mh100 d-flex flex-column justify-content-center align-items-center`}>
      <header>
      <img className={styles.Logo} src={Logo} alt="Logo" onClick={() => changeView('homepage')} />
        <button className="btn btn-primary" onClick={() => changeView('homepage')} id="homepageBtn">Login</button>
        <button className="btn btn-primary"onClick={() => changeView('register')} id="registerBtn">Register</button>
      </header>
      
      {location === "register" ? (
        <Register changeView={() => changeView('homepage')} />
      ) : (
        <Homepage />
      )}
    </div>
  );
}

export default App;