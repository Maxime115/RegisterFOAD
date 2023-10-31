import { useState } from "react";
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";
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
        <button className="btn btn-primary" onClick={() => changeView('login')} id="loginBtn">Login</button>
        <button className="btn btn-primary"onClick={() => changeView('register')} id="registerBtn">Register</button>
      </header>
      
      {location === "homepage" ? <Homepage changeView={changeView} /> : ""}
      {location === "login" ? <Login changeView={changeView} /> : ""}
      {location === "register" ? <Register changeView={changeView} /> : ""}
      {location === "profile" ? "" : ""}
    </div>
  );
}

export default App;