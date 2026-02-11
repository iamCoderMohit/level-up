export const calculateStreak = (streak: number) => {
  if (streak >= 30) return "🔥 30 Day Beast";
  if (streak >= 14) return "⚡ 2 Week Warrior";
  if (streak >= 7) return "🌟 7 Day Streak";
  return null;
};
