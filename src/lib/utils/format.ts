import { format } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea un número como moneda argentina (ARS)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formatea una fecha en formato argentino (DD/MM/YYYY)
 */
export const formatDate = (date: string | Date | null): string => {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'dd/MM/yyyy', { locale: es });
};

/**
 * Formatea una fecha con hora
 */
export const formatDateTime = (date: string | Date | null): string => {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'dd/MM/yyyy HH:mm', { locale: es });
};

/**
 * Formatea un mes y año (Mayo 2026)
 */
export const formatMonthYear = (date: string | Date | null): string => {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  const capitalized = format(d, 'MMMM yyyy', { locale: es });
  return capitalized.charAt(0).toUpperCase() + capitalized.slice(1);
};
