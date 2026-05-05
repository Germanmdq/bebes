'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Printer, 
  Eye, 
  Plus,
  ArrowUpDown
} from 'lucide-react';
import { MOCK_PRENDAS, MOCK_CONSIGNANTES } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Link from 'next/link';
import Image from 'next/image';

export default function PrendasPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrendas = MOCK_PRENDAS.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.marca?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventario de Prendas</h2>
          <p className="text-slate-500">Administra todas las prendas en stock, vendidas y procesadas.</p>
        </div>
        <Link 
          href="/prendas/nueva"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
        >
          <Plus className="w-5 h-5" />
          Nueva Prenda
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por código, nombre, marca..." 
              className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              <ArrowUpDown className="w-4 h-4" />
              Ordenar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Prenda</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Detalles</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Consignante</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPrendas.map((p) => {
                const consignante = MOCK_CONSIGNANTES.find(c => c.id === p.consignante_id);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                          {p.foto_principal_url ? (
                            <Image src={p.foto_principal_url} alt={p.nombre} fill className="object-cover" />
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{p.categoria.substring(0, 3)}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{p.nombre}</p>
                          <p className="text-xs font-mono text-slate-500">{p.codigo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-600">{p.categoria} • Talle {p.talle}</span>
                        <span className="text-xs text-slate-400">{p.marca} • {p.genero}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">{consignante?.nombre} {consignante?.apellido}</p>
                      <p className="text-xs text-slate-400">Ingreso: {formatDate(p.fecha_ingreso)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">{formatCurrency(p.precio_actual)}</p>
                      {p.precio_actual < p.precio_original && (
                        <p className="text-xs text-slate-400 line-through">{formatCurrency(p.precio_original)}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={p.estado} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="Imprimir Etiqueta">
                          <Printer className="w-5 h-5" />
                        </button>
                        <Link href={`/prendas/${p.id}`} className="p-2 text-slate-400 hover:text-primary transition-colors" title="Ver detalle">
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
