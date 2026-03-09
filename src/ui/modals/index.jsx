import styles from "../modals/style/index.module.css";

export const Modals = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Простая проверка

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {children || "модальное окно"}
      </div>
    </div>
  );
};
