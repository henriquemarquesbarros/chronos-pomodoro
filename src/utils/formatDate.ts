import { format } from 'date-fns';

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return format(date, 'dd/MM/yyyy HH:mm');
}
