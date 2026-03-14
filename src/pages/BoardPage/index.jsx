// src/pages/BoardPage/index.jsx
import { useEffect, useState } from "react";
import styles from "./style/index.module.css";
import { tasksApi } from "../../api/tasksApi.js";

import { IconButton } from "../../ui/iconButton/index.jsx";
import { DateRangeFilter } from "../../ui/dataRangeFilter/index.jsx";

import { CreateTaskModal } from "../../components/createTaskModal/index.jsx";
import { EditTaskModal } from "../../components/editTaskModal/index.jsx";

export const BoardPage = () => {
  const [range, setRange] = useState("day");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createColumn, setCreateColumn] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTasks() {
      try {
        setLoading(true);
        setError(null);

        const data = await tasksApi.list();
        if (!cancelled) setTasks(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load tasks");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadTasks();

    return () => {
      cancelled = true;
    };
  }, []);

  const openCreateTask = (column) => {
    setCreateColumn(column);
    setIsCreateOpen(true);
  };

  const closeCreateTask = () => {
    setIsCreateOpen(false);
    setCreateColumn(null);
  };

  const handleCreateTask = async ({ topic, title, description }) => {
    if (!createColumn) return;

    try {
      const created = await tasksApi.create({
        topic,
        title,
        description,
        status: createColumn,
      });

      setTasks((prev) => [created, ...prev]);
      closeCreateTask();
    } catch (e) {
      console.error("Create task failed:", e);
      alert(e?.message || "Не удалось создать задачу");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await tasksApi.remove(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));

      setOpenMenuId((prev) => (prev === id ? null : prev));
      setEditTask((prev) => (prev?.id === id ? null : prev));
    } catch (e) {
      console.error("Delete task failed:", e);
      alert(e?.message || "Не удалось удалить задачу");
    }
  };

  const handleUpdateTask = async (id, patch) => {
    try {
      const updated = await tasksApi.update(id, patch);

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? (updated ?? { ...t, ...patch }) : t))
      );
    } catch (e) {
      console.error("Update task failed:", e);
      alert(e?.message || "Не удалось обновить задачу");
    }
  };

  const renderTaskCard = (t) => {
    return (
      <li
        key={t.id}
        className={styles.card}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.cardTop}>
          <div className={styles.cardTopic}>{t.topic}</div>

          <div className={styles.cardActions}>
            <IconButton
              ariaLabel="Task actions"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId((prev) => (prev === t.id ? null : t.id));
              }}
            >
              ⋯
            </IconButton>

            {openMenuId === t.id && (
              <div
                className={styles.cardMenu}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.cardMenuItem}
                  onClick={() => {
                    setEditTask(t);
                    setOpenMenuId(null);
                  }}
                >
                  Edit
                </button>

                <button
                  className={styles.cardMenuItemDanger}
                  onClick={() => {
                    setOpenMenuId(null);
                    handleDeleteTask(t.id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.cardTitle}>{t.title}</div>
        <div className={styles.cardDesc}>{t.description}</div>
      </li>
    );
  };

  return (
    <div className={styles.page} onClick={() => setOpenMenuId(null)}>
      <div className={styles.boardHeader}>
        <h2 className={styles.boardTitle}>Board</h2>
        <DateRangeFilter value={range} onChange={setRange} />
      </div>

      {loading && <div>Loading tasks...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={closeCreateTask}
        column={createColumn}
        onCreate={handleCreateTask}
      />

      <EditTaskModal
        isOpen={!!editTask}
        task={editTask}
        onClose={() => setEditTask(null)}
        onSave={handleUpdateTask}
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
            {tasks.filter((t) => t.status === "todo").map(renderTaskCard)}
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
              .map(renderTaskCard)}
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
            {tasks.filter((t) => t.status === "done").map(renderTaskCard)}
          </ul>
        </section>
      </div>
    </div>
  );
};