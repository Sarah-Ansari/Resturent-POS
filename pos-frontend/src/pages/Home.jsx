import { Nav } from "../components/Nav";
import { MenuPanel } from "../components/menuPanel";
import styles from "../styles/Home.module.scss"
import { MenuItemForm } from "../components/MenuItems/MenuItemForm";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Nav className={styles.nav}/>
      <MenuPanel />
      
      <div className={styles.Hero}>
        <h1>AL-ARABIAN EXPRESS</h1>
        <h2>"THE TASTE OF ARABIA"</h2>
      </div>
      
    </div>
  );
};
