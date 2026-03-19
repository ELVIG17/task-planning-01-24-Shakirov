import styles from "../BoardColumn/style/index.module.css";
import { IconButton } from "../../../../ui/iconButton/index.jsx";

export function BoardColumn({ title, status, onAdd, children }) {
  return (
    <section className={styles.column}>
      <div className={styles.columnHeader}>
        <h4 className={styles.columnTitle}>{title}</h4>

        <div className={styles.columnActions}>
          <IconButton ariaLabel={`Add task to ${title}`} onClick={() => onAdd(status)}>
            +
          </IconButton>

          <IconButton
            ariaLabel={`${title} column actions`}
            onClick={() => console.log("open column menu:", status)}
          >
            ⋯
          </IconButton>
        </div>
      </div>

      <ul className={styles.list}>{children}</ul>
    </section>
  );
}