import { getProgress } from "./getProgress";

export function isTaskCompleted(
  totalXp: number,
  levelIndex: number,
  taskIndex: number
) {
  const {tasksCompleted} = getProgress(totalXp, levelIndex);

  return taskIndex < tasksCompleted;
}
