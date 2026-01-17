import ReactPic from './assets/react.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
        <img src={ReactPic} alt="React Logo" className={styles.logo} />
        <p className={styles.text}>© {new Date().getFullYear()} Created by VladiSoft</p>
    </footer>
  );
}

export default Footer;