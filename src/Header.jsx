import { useState } from "react";
import styles from './Header.module.css';


function Header() {

  let[Navigation, setNavigation] = useState(['Home',
  'About',
  'Services',
  'Contact']);

  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>Welcome to My React Project</h1>

      <nav className={styles.nav}>
        <ul className={styles.ul}>
          {Navigation.map(Nav => (
            <li key={Nav}><a href={`#${Nav}`} className={styles.a}>{Nav}</a></li>
          ))}
        </ul>
        <button onClick={() => setNavigation([])}>Delete Nav</button>

      </nav>
    </header>
  );
}

export default Header;