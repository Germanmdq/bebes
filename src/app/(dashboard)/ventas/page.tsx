'use client';

import { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal,
  Calendar,
  CreditCard,
  Banknote,
  Smartphone
} from 'lucide-react';
import { MOCK_VENTAS } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Link from 'next/link';

export default function VentasPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVentas = MOCK_VENTAS.filter(v => 
    v.numero_venta.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.cliente_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'efectivo': return Banknote;
      case 'mercado_pago': return Smartphone;
      default: return CreditCard;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Ventas</h2>
          <p className="text-slate-500">Historial de ventas realizadas en el local.</p>
        </div>
        <Link 
          href="/ventas/nueva"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
        >
          <Plus className="w-5 h-5" />
          Nueva Venta
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por número de venta o cliente..." 
              className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" />
            Este Mes
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Venta</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Fecha</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Método</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredVentas.map((v) => {
                const MethodIcon = getMethodIcon(v.metodo_pago);
                return (
                  <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{v.numero_venta}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{formatDate(v.fecha)}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{v.cliente_nombre || 'Consumidor Final'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MethodIcon className="w-4 h-4" />
                        <span className="text-xs font-medium capitalize">{v.metodo_pago.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">{formatCurrency(v.total_final)}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={v.estado} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/ventas/${v.id}`} className="p-2 text-slate-400 hover:text-primary transition-colors">
                          <Eye className="w-5 h-5" />
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
