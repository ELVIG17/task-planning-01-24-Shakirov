import { useState } from "react";
import styles from "../createTaskModal/style/index.module.css";
import { Modals } from "../../ui/modals/index.jsx";

export const CreateTaskModal = ({ isOpen, onClose, column, onCreate }) => {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({ topic, title, description });

    console.log({
      column,
      topic,
      title,
      description,
    });

    hundleClose();
  };

  const resetForm = () => {
    setTopic("");
    setTitle("");
    setDescription("");
  };

  const hundleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modals isOpen={isOpen} onClose={hundleClose}>
      <h3 className={styles.title}>Create Task</h3>
      <p className={styles.meta}>Column: {column}</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>
            Topic
            <input
              className={styles.input}
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
              placeholder="e.g.Work"
            ></input>
          </label>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Title
            <input
              className={styles.input}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="create title"
            ></input>
          </label>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Description
            <input
              className={styles.input}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="task description"
              rows={4}
            ></input>
          </label>
        </div>

        <button lassName={`${styles.btn} ${styles.btnPrimary}`} type="submit">
          Create
        </button>
      </form>
    </Modals>
  );
};
