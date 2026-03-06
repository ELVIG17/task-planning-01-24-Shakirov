import styles from "../logoutButton/style/index.module.css";

export const LogoutButton = ({
  onClick,
  children = "Log out",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};
