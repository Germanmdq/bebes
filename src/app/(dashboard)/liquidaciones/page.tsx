'use client';

import { useState } from 'react';
import { 
  Calculator, 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { MOCK_LIQUIDACIONES, MOCK_CONSIGNANTES } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Link from 'next/link';

export default function LiquidacionesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLiqs = MOCK_LIQUIDACIONES.filter(l => {
    const c = MOCK_CONSIGNANTES.find(con => con.id === l.consignante_id);
    const nombre = `${c?.nombre} ${c?.apellido}`.toLowerCase();
    return nombre.includes(searchTerm.toLowerCase()) || l.numero_liquidacion.includes(searchTerm);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Liquidaciones</h2>
          <p className="text-slate-500">Gestión de pagos y balances con consignantes.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10">
          <Calculator className="w-5 h-5" />
          NUEVA LIQUIDACIÓN
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 rounded-2xl">
              <Wallet className="w-6 h-6 text-amber-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pendiente de Pago</p>
          <h3 className="text-2xl font-black text-slate-800 mt-1">{formatCurrency(45800)}</h3>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-2xl">
              <Calculator className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Liquidado (Mes)</p>
          <h3 className="text-2xl font-black text-slate-800 mt-1">{formatCurrency(125400)}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Próxima Liquidación</p>
          <h3 className="text-2xl font-black text-slate-800 mt-1">31 May, 2026</h3>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por consignante o número..." 
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Liquidación</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Consignante</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Monto</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLiqs.map((l) => {
                const c = MOCK_CONSIGNANTES.find(con => con.id === l.consignante_id);
                return (
                  <tr key={l.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{l.numero_liquidacion}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">{c?.nombre} {c?.apellido}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-black text-slate-800">{formatCurrency(l.total_a_pagar)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={l.estado} variant="liquidacion" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/liquidaciones/${l.id}`} className="p-2 text-slate-400 hover:text-primary transition-colors">
                          <Eye className="w-5 h-5" />
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
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
