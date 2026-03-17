import { useState } from "react";
import styles from "./style/index.module.css";

import { DateRangeFilter } from "../../ui/dataRangeFilter/index.jsx";
import { CreateTaskModal } from "../../components/createTaskModal/index.jsx";
import { EditTaskModal } from "../../components/editTaskModal/index.jsx";

import { useTasks } from "../../hooks/useTasks.js";
import { BOARD_COLUMNS } from "../../constants/boardColumns.js";
import { tasksByStatus } from "../../utils/tasks.js";

import { BoardColumn } from "../BoardPage/components/BoardColumn.jsx";
import { TaskCard } from "../BoardPage/components/TaskCard.jsx";

export const BoardPage = () => {
  const [range, setRange] = useState("day");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createColumn, setCreateColumn] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();

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
      await createTask({ topic, title, description, status: createColumn });
      closeCreateTask();
    } catch (e) {
      console.error("Create task failed:", e);
      alert(e?.message || "Не удалось создать задачу");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setOpenMenuId((prev) => (prev === id ? null : prev));
      setEditTask((prev) => (prev?.id === id ? null : prev));
    } catch (e) {
      console.error("Delete task failed:", e);
      alert(e?.message || "Не удалось удалить задачу");
    }
  };

  const handleUpdateTask = async (id, patch) => {
    try {
      await updateTask(id, patch);
    } catch (e) {
      console.error("Update task failed:", e);
      alert(e?.message || "Не удалось обновить задачу");
    }
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
        {BOARD_COLUMNS.map((col) => (
          <BoardColumn
            key={col.status}
            title={col.title}
            status={col.status}
            onAdd={openCreateTask}
          >
            {tasksByStatus(tasks, col.status).map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
                onEdit={(task) => {
                  setEditTask(task);
                  setOpenMenuId(null);
                }}
                onDelete={(id) => {
                  setOpenMenuId(null);
                  handleDeleteTask(id);
                }}
              />
            ))}
          </BoardColumn>
        ))}
      </div>
    </div>
  );
};