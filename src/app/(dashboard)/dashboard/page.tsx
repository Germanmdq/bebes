'use client';

import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Plus,
  Calculator
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { formatCurrency } from '@/lib/utils/format';
import { MOCK_PRENDAS, MOCK_VENTAS } from '@/lib/mock-data';
import Link from 'next/link';

export default function DashboardPage() {
  const NOW_MS = 1778000000000; // Fixed date for demo consistency (approx May 2026)
  
  // Cálculos simples basados en mock data
  const totalVentasMes = MOCK_VENTAS.reduce((acc, v) => acc + v.total_final, 0);
  const totalLocal = totalVentasMes * 0.5; // Simplificado 50/50
  const totalConsignantes = totalVentasMes * 0.5;
  const prendasDisponibles = MOCK_PRENDAS.filter(p => p.estado === 'disponible').length;
  const prendasViejas = MOCK_PRENDAS.filter(p => p.estado === 'disponible' && new Date(p.fecha_ingreso).getTime() < (NOW_MS - 60 * 24 * 60 * 60 * 1000)).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">¡Buen día! 👋</h2>
          <p className="text-slate-500 mt-1">Hoy es martes 5 de mayo, 2026. Aquí tienes el resumen de hoy.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/prendas/nueva"
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary font-bold rounded-2xl hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            Nueva Prenda
          </Link>
          <Link 
            href="/liquidaciones"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-primary/20"
          >
            <Calculator className="w-5 h-5" />
            Liquidar Mes
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Ventas del Mes" 
          value={formatCurrency(totalVentasMes)} 
          icon={TrendingUp}
          trend={{ value: '12%', positive: true }}
          color="success"
        />
        <StatCard 
          title="Ganancia Local" 
          value={formatCurrency(totalLocal)} 
          icon={ShoppingBag}
          color="primary"
        />
        <StatCard 
          title="A Pagar Consignantes" 
          value={formatCurrency(totalConsignantes)} 
          icon={Users}
          color="accent"
        />
        <StatCard 
          title="Prendas Disponibles" 
          value={prendasDisponibles} 
          icon={Package}
          color="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alertas */}
        <div className="lg:col-span-1 space-y-6">
          <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Alertas y Pendientes
          </h4>
          
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-red-900">{prendasViejas} prendas vencidas</p>
                <p className="text-xs text-red-700">Tienen más de 60 días en stock.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-red-400" />
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-blue-900">12 Liquidaciones pendientes</p>
                <p className="text-xs text-blue-700">Corresponden al período Abril 2026.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </div>

            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-amber-900">3 Reservas por vencer</p>
                <p className="text-xs text-amber-700">Vencen en las próximas 48 horas.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Ventas Recientes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-slate-800">Ventas Recientes</h4>
            <Link href="/ventas" className="text-sm font-semibold text-primary hover:underline">Ver todas</Link>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Venta</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Cliente</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Método</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_VENTAS.map((venta) => (
                  <tr key={venta.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">{venta.numero_venta}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{venta.cliente_nombre || 'Consumidor Final'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 capitalize">
                        {venta.metodo_pago.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800">{formatCurrency(venta.total_final)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
