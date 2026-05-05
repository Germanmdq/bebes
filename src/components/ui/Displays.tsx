import { formatCurrency, formatDate } from '@/lib/utils/format';
import { cn } from '@/lib/utils';

interface MoneyDisplayProps {
  amount: number;
  className?: string;
}

export function MoneyDisplay({ amount, className }: MoneyDisplayProps) {
  return (
    <span className={cn("font-bold tabular-nums", className)}>
      {formatCurrency(amount)}
    </span>
  );
}

interface DateDisplayProps {
  date: string | Date | null;
  className?: string;
  withTime?: boolean;
}

export function DateDisplay({ date, className, withTime }: DateDisplayProps) {
  return (
    <span className={cn("text-slate-600", className)}>
      {formatDate(date)}
    </span>
  );
}
