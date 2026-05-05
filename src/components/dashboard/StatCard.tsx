import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'info';
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  color = 'primary'
}: StatCardProps) {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent-foreground',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
          
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-semibold mt-2",
              trend.positive ? "text-green-600" : "text-red-600"
            )}>
              {trend.positive ? '↑' : '↓'} {trend.value}
              <span className="text-slate-400 font-normal"> vs mes ant.</span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-slate-400 mt-2">{description}</p>
          )}
        </div>
        
        <div className={cn("p-3 rounded-xl", colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
