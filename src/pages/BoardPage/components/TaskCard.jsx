import styles from "../style/index.module.css";
import { IconButton } from "../../../ui/iconButton/index.jsx";

export function TaskCard({ task, openMenuId, setOpenMenuId, onEdit, onDelete }) {
  const isMenuOpen = openMenuId === task.id;

  return (
    <li className={styles.card} onClick={(e) => e.stopPropagation()}>
      <div className={styles.cardTop}>
        <div className={styles.cardTopic}>{task.topic}</div>

        <div className={styles.cardActions}>
          <IconButton
            ariaLabel="Task actions"
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId((prev) => (prev === task.id ? null : task.id));
            }}
          >
            ⋯
          </IconButton>

          {isMenuOpen && (
            <div className={styles.cardMenu} onClick={(e) => e.stopPropagation()}>
              <button className={styles.cardMenuItem} onClick={() => onEdit(task)}>
                Edit
              </button>

              <button
                className={styles.cardMenuItemDanger}
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.cardTitle}>{task.title}</div>
      <div className={styles.cardDesc}>{task.description}</div>
    </li>
  );
}