import { useState } from "react";
import styles from "../createTaskModal/style/index.module.css";
import { Modals } from "../../ui/modals/index.jsx";

export const CreateTaskModal = ({ isOpen, onClose, column, onCreate }) => {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setTopic("");
    setTitle("");
    setDescription("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ждём создание, и только если оно прошло успешно — закрываем
    await onCreate({ topic, title, description });
    handleClose();
  };

  return (
    <Modals isOpen={isOpen} onClose={handleClose}>
      <h3 className={styles.title}>Create Task</h3>
      <p className={styles.meta}>Column: {column}</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>
            Topic
            <input
              className={styles.input}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Work"
            />
          </label>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Title
            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="create title"
            />
          </label>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Description
            <textarea
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="task description"
              rows={4}
            />
          </label>
        </div>

        <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">
          Create
        </button>
      </form>
    </Modals>
  );
};