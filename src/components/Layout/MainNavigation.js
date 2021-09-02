import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { firebase } from "../../firebase/firebase-config";
import { login, startLogout } from "../../actions/auth";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const dispatch = useDispatch();


  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      }

      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <h1>Espere.....</h1>
    )
  }


  const handleLogout =  () => {
    dispatch(startLogout())
  }
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Fintech App</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/auth">Login</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
