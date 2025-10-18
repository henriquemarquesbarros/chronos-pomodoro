export function getNextCycle(currentCycle: number): number {
  return currentCycle === 8 ? 1 : currentCycle + 1;
}
