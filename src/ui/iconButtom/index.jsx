import styles from "./style/index.module.css";

export const IconButton = ({
  onClick,
  children,
  ariaLabel,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};
