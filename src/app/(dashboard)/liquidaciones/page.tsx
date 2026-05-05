'use client';

import { useState } from 'react';
import { 
  Calculator, 
  Search, 
  Eye, 
  CheckCircle,
  Clock,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { MOCK_LIQUIDACIONES, MOCK_CONSIGNANTES } from '@/lib/mock-data';
import { formatCurrency, formatMonthYear, formatDate } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import Link from 'next/link';

export default function LiquidacionesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLiq = MOCK_LIQUIDACIONES.filter(l => {
    const consignante = MOCK_CONSIGNANTES.find(c => c.id === l.consignante_id);
    return (
      consignante?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consignante?.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.numero_liquidacion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Liquidaciones</h2>
          <p className="text-slate-500">Gestión de pagos mensuales a consignantes.</p>
        </div>
        <button 
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
        >
          <Calculator className="w-5 h-5" />
          Generar Liquidaciones del Mes
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
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
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
              <Calendar className="w-4 h-4 text-slate-400" />
              <select className="bg-transparent text-sm font-semibold text-slate-600 outline-none">
                <option>Mayo 2026</option>
                <option>Abril 2026</option>
                <option>Marzo 2026</option>
              </select>
            </div>
            <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Liquidación</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Consignante</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Prendas</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Total a Pagar</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLiq.map((l) => {
                const consignante = MOCK_CONSIGNANTES.find(c => c.id === l.consignante_id);
                return (
                  <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{l.numero_liquidacion}</p>
                      <p className="text-xs text-slate-400">{formatMonthYear(l.fecha_desde)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">{consignante?.nombre} {consignante?.apellido}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-600">{l.cantidad_prendas} prendas</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-primary">{formatCurrency(l.total_a_pagar)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={l.estado} variant="liquidacion" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {l.estado === 'pendiente' ? (
                          <WhatsAppButton 
                            phone={consignante?.telefono || ''} 
                            message={`Hola ${consignante?.nombre}! Te envío el resumen de ventas de tu ropita. Total a cobrar: ${formatCurrency(l.total_a_pagar)}`}
                            label="Avisar"
                            className="bg-green-500/10 text-green-600 hover:bg-green-500/20 shadow-none py-1.5"
                          />
                        ) : (
                          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-lg">
                            <Download className="w-3.5 h-3.5" />
                            Recibo
                          </button>
                        )}
                        <Link href={`/liquidaciones/${l.id}`} className="p-2 text-slate-400 hover:text-primary transition-colors">
                          <Eye className="w-5 h-5" />
                        </Link>
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
