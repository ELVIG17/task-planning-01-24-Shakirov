import styles from "../searchInput/style/index.module.css";

export const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};
