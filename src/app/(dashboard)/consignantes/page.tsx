'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  MessageCircle, 
  Eye, 
  Edit2,
  Filter
} from 'lucide-react';
import { MOCK_CONSIGNANTES, MOCK_PRENDAS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Link from 'next/link';

export default function ConsignantesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConsignantes = MOCK_CONSIGNANTES.filter(c => 
    `${c.nombre} ${c.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.telefono.includes(searchTerm)
  );

  const getStats = (id: string) => {
    const prendas = MOCK_PRENDAS.filter(p => p.consignante_id === id);
    const activas = prendas.filter(p => p.estado === 'disponible' || p.estado === 'reservada').length;
    const vendidas = prendas.filter(p => p.estado === 'vendida' || p.estado === 'pendiente_liquidacion' || p.estado === 'liquidada' || p.estado === 'pagada').length;
    return { activas, vendidas };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Consignantes</h2>
          <p className="text-slate-500">Gestiona a las personas que dejan ropa en el local.</p>
        </div>
        <Link 
          href="/consignantes/nuevo"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
        >
          <Plus className="w-5 h-5" />
          Nuevo Consignante
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, teléfono..." 
              className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Consignante</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Prendas</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredConsignantes.map((c) => {
                const { activas, vendidas } = getStats(c.id);
                return (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-primary font-bold">
                          {c.nombre.charAt(0)}{c.apellido?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{c.nombre} {c.apellido}</p>
                          <p className="text-xs text-slate-500">ID: {c.id.split('-')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">{c.telefono}</p>
                      <p className="text-xs text-slate-400">{c.email || 'Sin email'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-green-600">{activas} activas</span>
                        <span className="text-xs font-semibold text-blue-600">{vendidas} vendidas</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={c.estado} variant="consignante" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="WhatsApp">
                          <MessageCircle className="w-5 h-5" />
                        </button>
                        <Link href={`/consignantes/${c.id}`} className="p-2 text-slate-400 hover:text-primary transition-colors" title="Ver detalle">
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
        
        {filteredConsignantes.length === 0 && (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No se encontraron consignantes con ese nombre.</p>
          </div>
        )}
      </div>
    </div>
  );
}
