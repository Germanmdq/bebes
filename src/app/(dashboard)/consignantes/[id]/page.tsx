'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Wallet, 
  TrendingUp, 
  Package,
  History,
  Edit2,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { MOCK_CONSIGNANTES, MOCK_PRENDAS, MOCK_LIQUIDACIONES } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import Link from 'next/link';

export default function ConsignanteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const c = MOCK_CONSIGNANTES.find(con => con.id === id);
  const prendas = MOCK_PRENDAS.filter(p => p.consignante_id === id);
  const liquidaciones = MOCK_LIQUIDACIONES.filter(l => l.consignante_id === id);

  if (!c) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-slate-500 font-medium">Consignante no encontrado.</p>
        <button onClick={() => router.back()} className="mt-4 text-primary font-bold">Volver</button>
      </div>
    );
  }

  const saldoPendiente = liquidaciones.filter(l => l.estado === 'pendiente').reduce((acc, l) => acc + l.total_a_pagar, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al listado
        </button>
        
        <div className="flex items-center gap-3">
          <WhatsAppButton phone={c.telefono} />
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Edit2 className="w-4 h-4" />
            Editar Perfil
          </button>
          <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <MoreHorizontal className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-3xl font-black text-primary mb-4">
                {c.nombre.charAt(0)}{c.apellido.charAt(0)}
              </div>
              <h1 className="text-2xl font-black text-slate-800">{c.nombre} {c.apellido}</h1>
              <div className="mt-2">
                <StatusBadge status={c.estado} />
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-50">
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">{c.telefono}</span>
              </div>
              {c.email && (
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">{c.email}</span>
                </div>
              )}
              {c.direccion && (
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">{c.direccion}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-[10px] font-bold text-primary uppercase mb-1">CBU / ALIAS</p>
              <p className="text-sm font-bold text-slate-700 break-all">{c.alias_pago || c.cbu || 'No registrado'}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4">Estadísticas</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Prendas Totales</p>
                <p className="text-lg font-black text-slate-700">{prendas.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Vendidas</p>
                <p className="text-lg font-black text-green-600">{prendas.filter(p => p.estado === 'vendida').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Tabs/Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Summary KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Saldo a Liquidar</p>
                <h3 className="text-2xl font-black text-green-600">{formatCurrency(saldoPendiente)}</h3>
              </div>
              <Wallet className="w-10 h-10 text-green-100" />
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Generado</p>
                <h3 className="text-2xl font-black text-slate-800">{formatCurrency(125000)}</h3>
              </div>
              <TrendingUp className="w-10 h-10 text-slate-100" />
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Inventario de Prendas
              </h3>
              <button className="text-sm font-bold text-primary flex items-center gap-1">
                <Plus className="w-4 h-4" />
                Agregar Ropa
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
                    <th className="px-6 py-3">Cód / Prenda</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Precio</th>
                    <th className="px-6 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {prendas.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-xs font-mono font-bold text-slate-400">#{p.codigo.split('-')[1]}</p>
                        <p className="text-sm font-bold text-slate-800">{p.nombre}</p>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={p.estado} />
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-700">{formatCurrency(p.precio_actual)}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/prendas/${p.id}`} className="text-slate-300 hover:text-primary transition-colors">
                          <Eye className="w-5 h-5 inline" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Liquidations History */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Historial de Liquidaciones
            </h3>
            {liquidaciones.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No hay liquidaciones registradas.</p>
            ) : (
              <div className="space-y-4">
                {liquidaciones.map((l) => (
                  <div key={l.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="text-sm font-bold text-slate-800">#{l.numero_liquidacion}</p>
                      <p className="text-xs text-slate-500">{formatDate(l.created_at)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-800">{formatCurrency(l.total_a_pagar)}</p>
                      <StatusBadge status={l.estado} variant="liquidacion" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
