'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MOCK_LIQUIDACIONES, MOCK_CONSIGNANTES, MOCK_PRENDAS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function LiquidacionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const liq = MOCK_LIQUIDACIONES.find(l => l.id === id);
  const c = MOCK_CONSIGNANTES.find(con => con.id === liq?.consignante_id);
  const prendas = MOCK_PRENDAS.filter(p => liq?.prendas_ids.includes(p.id));

  if (!liq || !c) {
    return <div>Liquidación no encontrada</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>
        
        <div className="flex items-center gap-3">
          <WhatsAppButton phone={c.telefono} message={`Hola ${c.nombre}, tu liquidación #${liq.numero_liquidacion} está lista.`} />
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Comprobante de Pago</p>
            <h2 className="text-2xl font-black text-slate-800">Liquidación #{liq.numero_liquidacion}</h2>
            <div className="mt-2">
              <StatusBadge status={liq.estado} variant="liquidacion" />
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm font-bold text-slate-800">{c.nombre} {c.apellido}</p>
            <p className="text-xs text-slate-500">{c.email}</p>
            <p className="text-xs font-mono mt-2 p-2 bg-white rounded-lg border border-slate-100 inline-block">
              {c.alias_pago || c.cbu || 'Sin datos de pago'}
            </p>
          </div>
        </div>

        <div className="p-8">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                <th className="text-left py-4">Prenda / Código</th>
                <th className="text-right py-4">Precio Venta</th>
                <th className="text-right py-4">Comisión (50%)</th>
                <th className="text-right py-4">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {prendas.map((p) => (
                <tr key={p.id} className="text-sm">
                  <td className="py-4">
                    <p className="font-bold text-slate-700">{p.nombre}</p>
                    <p className="text-xs text-slate-400 font-mono">{p.codigo}</p>
                  </td>
                  <td className="py-4 text-right text-slate-600">{formatCurrency(p.precio_actual)}</td>
                  <td className="py-4 text-right text-slate-600">{formatCurrency(p.precio_actual * 0.5)}</td>
                  <td className="py-4 text-right font-bold text-slate-700">{formatCurrency(p.precio_actual * 0.5)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="pt-8 text-right font-bold text-slate-500 uppercase text-[10px]">Total a Pagar</td>
                <td className="pt-8 text-right text-3xl font-black text-primary">{formatCurrency(liq.total_a_pagar)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="p-8 bg-primary/5 flex items-center gap-4">
          {liq.estado === 'liquidada' ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <p className="text-sm font-medium text-slate-700">Esta liquidación ya fue procesada y enviada.</p>
            </>
          ) : (
            <>
              <AlertCircle className="w-6 h-6 text-amber-500" />
              <p className="text-sm font-medium text-slate-700">Esta liquidación está pendiente de pago por transferencia.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
