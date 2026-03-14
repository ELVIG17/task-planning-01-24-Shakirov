import {  useState } from "react";
import styles from "../createTaskModal/style/index.module.css";
import { Modals } from "../../ui/modals/index.jsx";
export const EditTaskModal = ({ isOpen, task, onClose, onSave }) => {
  // ✅ Инициализируем состоянием из пропсов ПРЯМО в useState
  const [topic, setTopic] = useState(task?.topic ?? "");
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");

  // ❌ useEffect УДАЛЯЕМ полностью!

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task?.id) return;
    await onSave(task.id, { topic, title, description });
    onClose();
  };

   return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <h3 className={styles.title}>Edit Task</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>
            Topic
            <input className={styles.input} value={topic} onChange={(e) => setTopic(e.target.value)} />
          </label>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Title
            <input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Description
            <textarea
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </label>
        </div>

        <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">
          Save
        </button>
      </form>
    </Modals>
  );
};

  // Остальной JSX без изменений.

