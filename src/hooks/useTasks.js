import { useCallback, useEffect, useState } from "react";
import { tasksApi } from "../api/tasksApi.js";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksApi.list();
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const createTask = useCallback(async (data) => {
    const created = await tasksApi.create(data);
    setTasks((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateTask = useCallback(async (id, patch) => {
    const updated = await tasksApi.update(id, patch);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? (updated ?? { ...t, ...patch }) : t))
    );
    return updated;
  }, []);

  const deleteTask = useCallback(async (id) => {
    await tasksApi.remove(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks, loading, error, reload, createTask, updateTask, deleteTask };
}