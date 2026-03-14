import { NavLink } from "react-router";
import { ItemNavbar } from "../../ui/ItemNavbar/index.jsx"; // поправь путь/регистр под себя
import styles from "./style/index.module.css";

export const Navbar = ({ logo, items, logout }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo ?? "#"} alt="" />
      </div>

      <ul className={styles.menu}>
        {items.map(({ to, text, Icon }) => (
          <li key={to} className={styles.menuItem}>
            <NavLink to={to} className={styles.link}>
              <ItemNavbar Icon={Icon} text={text} />
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.logout}>{logout}</div>
    </aside>
  );
};  