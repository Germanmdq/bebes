'use client';

import { 
  Settings, 
  Store, 
  Percent, 
  Clock, 
  MessageSquare,
  Globe,
  Save,
  Palette
} from 'lucide-react';

export default function ConfiguracionPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Configuración</h2>
        <p className="text-slate-500">Ajusta los parámetros generales del negocio.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 space-y-10">
          {/* Negocio */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Store className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Información del Negocio</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Nombre del Local</label>
                <input 
                  type="text" 
                  defaultValue="Ropero Consignado" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Moneda</label>
                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-accent">
                  <option>Pesos Argentinos (ARS)</option>
                  <option>Dólares (USD)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Comisiones */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Percent className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Comisiones Default</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">% Consignante</label>
                <input 
                  type="number" 
                  defaultValue="50" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">% Local</label>
                <input 
                  type="number" 
                  defaultValue="50" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Permanencia (Días)</label>
                <input 
                  type="number" 
                  defaultValue="60" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </section>

          {/* WhatsApp */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Mensaje de WhatsApp</h3>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">Plantilla de Liquidación</label>
              <textarea 
                rows={4}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-accent resize-none text-sm leading-relaxed"
                defaultValue={"Hola {nombre} 😊\n\nTe enviamos el resumen de ventas de {mes} {año}.\n\nTotal a transferir: {total_a_pagar}\n\nMuchas gracias por confiar en nosotras 💛"}
              />
              <p className="text-xs text-slate-400">Puedes usar variables como {'{nombre}'}, {'{mes}'}, {'{total_a_pagar}'}.</p>
            </div>
          </section>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Save className="w-5 h-5" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
