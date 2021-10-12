import Link from "next/link";
import styles from "../styles/navigation.module.css";

function Navigation() {
  return (
    <nav>
      <Link href="/">
        <a className={styles.a}>Home</a>
      </Link>
    </nav>
  );
}

export default Navigation;
