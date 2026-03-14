// src/pages/BoardPage/index.jsx
import { useEffect, useState } from "react";
import styles from "./style/index.module.css";
import { tasksApi } from "../../api/tasksApi.js";

import { IconButton } from "../../ui/iconButton/index.jsx"; // проверь название папки: iconButton vs iconButtom
import { DateRangeFilter } from "../../ui/dataRangeFilter/index.jsx";
import { CreateTaskModal } from "../../components/createTaskModal/index.jsx";
// import { handleCreateTask } from "../../components/createTaskModal/index.jsx";

export const BoardPage = () => {
  const [range, setRange] = useState("day"); // фильтр day/week/month (у тебя уже был)
  const [isCreateOpen, setIsCreateOpen] = useState(false); // открыта ли "модалка создания" (пока заглушка)
  const [createColumn, setCreateColumn] = useState(null); // в какой колонке нажали "+": todo/in-progress/done

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    let cancelled = false;

    async function loadTasks() {

      try{setLoading(true);
        setError(null)

        const data = await tasksApi.list()

        if(!cancelled) setTasks(data)


      }

      catch(e) {
        if(!cancelled) setError(e.message)
      }

      finally {
        if(!cancelled) setLoading(false)
              }
    }
    
    loadTasks()

    return () => {
      cancelled = true
    }
  }, [])

  {loading && <div>Loading tasks...</div>}
{error && <div style={{ color: "red" }}>{error}</div>}

  const handleCreateTask = async ({ topic, title, description }) => {
    if(!createColumn) return

    try{
      const created = await tasksApi.create({
        topic, 
        title, 
        description,  
        status: createColumn,
      })

      setTasks((prev) => [created, ...prev])
    
    }
    catch(e) {
      console.error("Created task failed: ", e  )
      alert(e.message)
    }



  };

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

      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={closeCreateTask}
        column={createColumn}
        onCreate={handleCreateTask}
      />

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
            {tasks
              .filter((t) => t.status === "todo")
                .map((t) => (
                   <li key={t.id} className={styles.card}>
                    <div className={styles.cardTopic}>{t.topic}</div>
                    <div className={styles.cardTitle}>{t.title}</div>
                    <div className={styles.cardDesc}>{t.description}</div>
                  </li>
                  ))}
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
            {tasks
              .filter((t) => t.status === "in-progress")
              .map((t) => (
                <li key={t.id} className={styles.card}>
                  {t.title}
                </li>
              ))}
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
            {tasks
              .filter((t) => t.status === "done")
              .map((t) => (
                <li key={t.id} className={styles.card}>
                  {t.title}
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
