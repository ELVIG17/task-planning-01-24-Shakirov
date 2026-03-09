import styles from "./style/index.module.css";
import { SearchInput } from "../../ui/searchInput";

export const AppHeader = ({ query, setQuery }) => {
  return (
    <header className={styles.header}>
      <div className={styles.searchWrap}>
        <SearchInput value={query} onChange={setQuery} placeholder="Search" />
      </div>

      <div className={styles.actions}>
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
      </div>
    </header>
  );
};
