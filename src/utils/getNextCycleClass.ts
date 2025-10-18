export function getNextCycleClass(currentCycleType: string): string {
  return (
    {
      workTime: 'yellow',
      shortBreakTime: 'green',
      longBreakTime: 'blue',
    }[currentCycleType] || 'yellow'
  );
}
