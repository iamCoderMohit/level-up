const XP_PER_TASK = 100;
const TASKS_PER_LEVEL = 5;
const XP_PER_LEVEL = XP_PER_TASK * TASKS_PER_LEVEL; // 500

export function getProgress(totalXp: number, levelIndex: number) {
  const levelStartXp = levelIndex * XP_PER_LEVEL;
  const levelEndXp = levelStartXp + XP_PER_LEVEL;

  if (totalXp <= levelStartXp) {
    return {
      tasksCompleted: 0,
      progress: 0,
    };
  }

  const xpInsideLevel =
    Math.min(totalXp, levelEndXp) - levelStartXp;

  const tasksCompleted = Math.floor(
    xpInsideLevel / XP_PER_TASK
  );

  const progress = Math.floor(
    (tasksCompleted / TASKS_PER_LEVEL) * 100
  );

  return {
    tasksCompleted,
    progress,
  };

}
