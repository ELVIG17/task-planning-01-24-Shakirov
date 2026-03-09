// src/pages/BoardPage/index.jsx
import { useState } from "react";
import styles from "./style/index.module.css";

import { IconButton } from "../../ui/iconButtom/index.jsx"; // проверь: папка iconButton или iconButtom
import { DateRangeFilter } from "../../ui/dataRangeFilter/index.jsx";

export const BoardPage = () => {
  const [range, setRange] = useState("day"); // day | week | month

  return (
    <div className={styles.page}>
      {/* Верхняя строка над колонками */}
      <div className={styles.boardHeader}>
        <h2 className={styles.boardTitle}>Board</h2>
        <DateRangeFilter value={range} onChange={setRange} />
      </div>

      {/* 3 колонки */}
      <div className={styles.columns}>
        {/* TO DO */}
        <section className={styles.column}>
          <div className={styles.columnHeader}>
            <h4 className={styles.columnTitle}>To Do</h4>

            <div className={styles.columnActions}>
              <IconButton
                ariaLabel="Add task to To Do"
                onClick={() => console.log("add task: todo")}
              >
                +
              </IconButton>

              <IconButton
                ariaLabel="To Do column actions"
                onClick={() => console.log("open column menu: todo")}
              >
                ⋯
              </IconButton>
            </div>
          </div>

          <ul className={styles.list}>
            <li className={styles.card}>Task 1</li>
            <li className={styles.card}>Task 2</li>
          </ul>
        </section>

        {/* IN PROGRESS */}
        <section className={styles.column}>
          <div className={styles.columnHeader}>
            <h4 className={styles.columnTitle}>In Progress</h4>

            <div className={styles.columnActions}>
              <IconButton
                ariaLabel="Add task to In Progress"
                onClick={() => console.log("add task: in-progress")}
              >
                +
              </IconButton>

              <IconButton
                ariaLabel="In Progress column actions"
                onClick={() => console.log("open column menu: in-progress")}
              >
                ⋯
              </IconButton>
            </div>
          </div>

          <ul className={styles.list}>
            <li className={styles.card}>Task 3</li>
          </ul>
        </section>

        {/* DONE */}
        <section className={styles.column}>
          <div className={styles.columnHeader}>
            <h4 className={styles.columnTitle}>Done</h4>

            <div className={styles.columnActions}>
              <IconButton
                ariaLabel="Add task to Done"
                onClick={() => console.log("add task: done")}
              >
                +
              </IconButton>

              <IconButton
                ariaLabel="Done column actions"
                onClick={() => console.log("open column menu: done")}
              >
                ⋯
              </IconButton>
            </div>
          </div>

          <ul className={styles.list}>
            <li className={styles.card}>Task 4</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
