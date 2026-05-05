'use client';

import { 
  Package, 
  Shirt, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingDown,
  Archive,
  Ban
} from 'lucide-react';
import { MOCK_PRENDAS } from '@/lib/mock-data';
import { StatCard } from '@/components/dashboard/StatCard';

export default function InventarioPage() {
  const stats = {
    total: MOCK_PRENDAS.length,
    disponibles: MOCK_PRENDAS.filter(p => p.estado === 'disponible').length,
    vendidas: MOCK_PRENDAS.filter(p => p.estado === 'vendida' || p.estado === 'pendiente_liquidacion' || p.estado === 'liquidada' || p.estado === 'pagada').length,
    reservadas: MOCK_PRENDAS.filter(p => p.estado === 'reservada').length,
    vencidas: MOCK_PRENDAS.filter(p => p.estado === 'disponible' && new Date(p.fecha_ingreso) < new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)).length,
    noAceptadas: MOCK_PRENDAS.filter(p => p.estado === 'no_aceptada').length,
    donadas: MOCK_PRENDAS.filter(p => p.estado === 'donada').length,
  };

  const categorias = Array.from(new Set(MOCK_PRENDAS.map(p => p.categoria)));
  const stockPorCategoria = categorias.map(cat => ({
    nombre: cat,
    cantidad: MOCK_PRENDAS.filter(p => p.categoria === cat && p.estado === 'disponible').length
  })).sort((a, b) => b.cantidad - a.cantidad);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Inventario</h2>
        <p className="text-slate-500">Resumen general del estado de las prendas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Ingresos" value={stats.total} icon={Archive} color="primary" />
        <StatCard title="Stock Disponible" value={stats.disponibles} icon={Shirt} color="success" />
        <StatCard title="Reservas Activas" value={stats.reservadas} icon={Clock} color="warning" />
        <StatCard title="Prendas Vencidas" value={stats.vencidas} icon={AlertCircle} color="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Stock Disponible por Categoría</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {stockPorCategoria.map((cat) => (
                <div key={cat.nombre} className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-700">{cat.nombre}</span>
                    <span className="text-slate-500">{cat.cantidad} unidades</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-500" 
                      style={{ width: `${(cat.cantidad / stats.disponibles) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Otros Estados</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Ban className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-medium text-slate-600">No Aceptadas</span>
                </div>
                <span className="font-bold text-slate-800">{stats.noAceptadas}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Archive className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-slate-600">Donadas</span>
                </div>
                <span className="font-bold text-slate-800">{stats.donadas}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600">Devueltas</span>
                </div>
                <span className="font-bold text-slate-800">4</span>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 p-6 rounded-2xl border border-accent/20">
            <h4 className="font-bold text-primary mb-2">Tip de Inventario</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Las prendas con más de 60 días deberían pasar a liquidación o ser devueltas al consignante para mantener el stock fresco.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
