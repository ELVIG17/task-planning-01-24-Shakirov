export function tasksByStatus(tasks, status) {
  return tasks.filter((t) => t.status === status);
}