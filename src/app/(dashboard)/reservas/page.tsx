'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal,
  Clock,
  User,
  Package,
  CheckCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { MOCK_RESERVAS, MOCK_PRENDAS } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Link from 'next/link';

export default function ReservasPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReservas = MOCK_RESERVAS.filter(r => 
    r.cliente_nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reservas</h2>
          <p className="text-slate-500">Gestiona las prendas reservadas por clientes.</p>
        </div>
        <button 
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
        >
          <Plus className="w-5 h-5" />
          Nueva Reserva
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por cliente..." 
              className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Prenda</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Vencimiento</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Seña</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredReservas.map((r) => {
                const prenda = MOCK_PRENDAS.find(p => p.id === r.prenda_id);
                return (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{r.cliente_nombre}</p>
                      <p className="text-xs text-slate-500">{r.cliente_telefono || 'Sin teléfono'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">{prenda?.nombre}</p>
                      <p className="text-xs text-slate-400">{prenda?.codigo}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm text-slate-600">{formatDate(r.fecha_vencimiento)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">
                      {formatCurrency(r.sena)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={r.estado} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Convertir en Venta">
                          <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Cancelar">
                          <XCircle className="w-5 h-5" />
                        </button>
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
