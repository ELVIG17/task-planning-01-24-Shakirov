// src/pages/BoardPage/index.jsx
import { useState } from "react";
import styles from "./style/index.module.css";

import { IconButton } from "../../ui/iconButtom/index.jsx"; // проверь название папки: iconButton vs iconButtom
import { DateRangeFilter } from "../../ui/dataRangeFilter/index.jsx";
import { Modals } from "../../ui/modals/index.jsx";

export const BoardPage = () => {
  const [range, setRange] = useState("day"); // фильтр day/week/month (у тебя уже был)
  const [isCreateOpen, setIsCreateOpen] = useState(false); // открыта ли "модалка создания" (пока заглушка)
  const [createColumn, setCreateColumn] = useState(null); // в какой колонке нажали "+": todo/in-progress/done

  const openCreateTask = (column) => {
    setCreateColumn(column);
    setIsCreateOpen(true);
  };

  const closeCreateTask = () => {
    setIsCreateOpen(false);
    setCreateColumn(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.boardHeader}>
        <h2 className={styles.boardTitle}>Board</h2>
        <DateRangeFilter value={range} onChange={setRange} />
      </div>

      <Modals isOpen={isCreateOpen} onClose={closeCreateTask}>
        <div>
          Create Task. Column: <b>{createColumn}</b>
        </div>
      </Modals>

      <div className={styles.columns}>
        {/* TO DO */}
        <section className={styles.column}>
          <div className={styles.columnHeader}>
            <h4 className={styles.columnTitle}>To Do</h4>

            <div className={styles.columnActions}>
              <IconButton
                ariaLabel="Add task to To Do"
                onClick={() => openCreateTask("todo")}
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
                onClick={() => openCreateTask("in-progress")}
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
                onClick={() => openCreateTask("done")}
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
