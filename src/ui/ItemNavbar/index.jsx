// ItemNavbar.jsx
import styles from "../ItemNavbar/styles/index.module.css";

export const ItemNavbar = ({ Icon, text }) => {
  return (
    <div className={styles.item}>
      <Icon />
      <p className={styles.text}>{text}</p>
    </div>
  );
};
