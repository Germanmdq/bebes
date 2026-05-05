'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Printer, 
  CheckCircle2, 
  MessageCircle, 
  Download,
  Calendar,
  User,
  Package,
  Calculator
} from 'lucide-react';
import { MOCK_LIQUIDACIONES, MOCK_CONSIGNANTES, MOCK_PRENDAS } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatMonthYear } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function LiquidacionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const liq = MOCK_LIQUIDACIONES.find(l => l.id === id);
  const consignante = MOCK_CONSIGNANTES.find(c => c.id === liq?.consignante_id);
  const prendasLiquidadas = MOCK_PRENDAS.filter(p => p.consignante_id === liq?.consignante_id && (p.estado === 'liquidada' || p.estado === 'pagada')).slice(0, 5);

  if (!liq) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-slate-500 font-medium">Liquidación no encontrada.</p>
        <button onClick={() => router.back()} className="mt-4 text-primary font-bold">Volver</button>
      </div>
    );
  }

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
          <WhatsAppButton 
            phone={consignante?.telefono || ''} 
            message={`Hola ${consignante?.nombre}! Te envío el resumen de ventas de tu ropita.`}
          />
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Descargar Resumen
          </button>
          {liq.estado === 'pendiente' && (
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all">
              <CheckCircle2 className="w-4 h-4" />
              Marcar como Pagada
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <StatusBadge status={liq.estado} variant="liquidacion" />
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">#{liq.numero_liquidacion}</span>
                </div>
                <h1 className="text-3xl font-black text-slate-800">Resumen de Liquidación</h1>
                <p className="text-slate-500 mt-1">Período: {formatMonthYear(liq.fecha_desde)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-400 uppercase">Total a Pagar</p>
                <p className="text-4xl font-black text-primary">{formatCurrency(liq.total_a_pagar)}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <Package className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-500 uppercase">Prendas</p>
                <p className="text-xl font-black text-slate-800">{liq.cantidad_prendas}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <Calculator className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-500 uppercase">Total Vendido</p>
                <p className="text-xl font-black text-slate-800">{formatCurrency(liq.total_vendido)}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <CheckCircle2 className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-500 uppercase">Ganancia Local</p>
                <p className="text-xl font-black text-slate-800">{formatCurrency(liq.total_local)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800">Detalle de Prendas</h3>
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                      <th className="px-6 py-3">Prenda</th>
                      <th className="px-6 py-3">Precio Venta</th>
                      <th className="px-6 py-3 text-right">Tu Parte</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {prendasLiquidadas.map((p) => (
                      <tr key={p.id}>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{p.nombre}</p>
                          <p className="text-xs text-slate-500">{p.codigo}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{formatCurrency(p.precio_actual)}</td>
                        <td className="px-6 py-4 text-right font-bold text-slate-800">{formatCurrency(p.precio_actual * 0.5)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800">Consignante</h3>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-primary font-bold">
                {consignante?.nombre.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800">{consignante?.nombre} {consignante?.apellido}</p>
                <p className="text-xs text-slate-500">{consignante?.telefono}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-[10px] font-bold text-primary uppercase mb-1">CBU / ALIAS</p>
                <p className="text-sm font-bold text-slate-700 break-all">{consignante?.alias_pago || consignante?.cbu || 'No cargado'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
