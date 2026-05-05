import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'prenda' | 'consignante' | 'venta' | 'liquidacion';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case 'disponible':
      case 'activo':
      case 'completada':
      case 'pagada':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'reservada':
      case 'pausado':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'vendida':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pendiente':
      case 'pendiente_liquidacion':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'devuelta':
      case 'archivado':
      case 'cancelada':
      case 'anulada':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'donada':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'no_aceptada':
      case 'rechazada':
      case 'bloqueado':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const label = status.replace(/_/g, ' ').charAt(0).toUpperCase() + status.replace(/_/g, ' ').slice(1);

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border",
      getStyles(),
      className
    )}>
      {label}
    </span>
  );
}
