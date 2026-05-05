'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal
} from 'lucide-react';
import { MOCK_CONSIGNANTES } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Link from 'next/link';

// Mock Recepciones
const MOCK_RECEPCIONES = [
  {
    id: 'r1',
    codigo: 'REC-000001',
    consignante_id: 'c1',
    fecha_recepcion: '2026-05-01T10:00:00Z',
    cantidad_recibida: 15,
    cantidad_aceptada: 12,
    cantidad_rechazada: 3,
    estado: 'revisada',
  },
  {
    id: 'r2',
    codigo: 'REC-000002',
    consignante_id: 'c2',
    fecha_recepcion: '2026-05-04T15:30:00Z',
    cantidad_recibida: 20,
    cantidad_aceptada: 0,
    cantidad_rechazada: 0,
    estado: 'abierta',
  }
];

export default function RecepcionesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Recepciones de Ropa</h2>
          <p className="text-slate-500">Registra y revisa los lotes de ropa que traen los consignantes.</p>
        </div>
        <Link 
          href="/recepciones/nueva"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
        >
          <Plus className="w-5 h-5" />
          Nueva Recepción
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por código o consignante..." 
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Recepción</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Consignante</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Cantidades</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_RECEPCIONES.map((r) => {
                const consignante = MOCK_CONSIGNANTES.find(c => c.id === r.consignante_id);
                return (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{r.codigo}</p>
                      <p className="text-xs text-slate-400">{formatDate(r.fecha_recepcion)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">{consignante?.nombre} {consignante?.apellido}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="text-xs text-slate-400 font-bold uppercase">Rec.</p>
                          <p className="text-sm font-bold text-slate-700">{r.cantidad_recibida}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-green-400 font-bold uppercase">Acept.</p>
                          <p className="text-sm font-bold text-green-600">{r.cantidad_aceptada}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-red-400 font-bold uppercase">Rech.</p>
                          <p className="text-sm font-bold text-red-600">{r.cantidad_rechazada}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={r.estado} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/recepciones/${r.id}`} className="p-2 text-slate-400 hover:text-primary transition-colors">
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
