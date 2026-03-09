import styles from "./style/index.module.css";

export const BoardPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.columns}>
        <section className={styles.column}>
          <h4 className={styles.columnTitle}>To Do</h4>
          <ul className={styles.list}>
            <li className={styles.card}>Task 1</li>
            <li className={styles.card}>Task 2</li>
          </ul>
        </section>

        <section className={styles.column}>
          <h4 className={styles.columnTitle}>In Progress</h4>
          <ul className={styles.list}>
            <li className={styles.card}>Task 3</li>
          </ul>
        </section>

        <section className={styles.column}>
          <h4 className={styles.columnTitle}>Done</h4>
          <ul className={styles.list}>
            <li className={styles.card}>Task 4</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
