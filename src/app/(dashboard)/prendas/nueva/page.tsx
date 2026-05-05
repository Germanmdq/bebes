'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Camera, 
  Tag, 
  User, 
  Shirt, 
  Calendar
} from 'lucide-react';
import { MOCK_CONSIGNANTES } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function NuevaPrendaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular guardado
    setTimeout(() => {
      setLoading(false);
      router.push('/prendas');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Cargar Nueva Prenda</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
          {/* Sección Consignante */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <User className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Consignante</h3>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">Seleccionar Dueña/o *</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent appearance-none">
                <option value="">Seleccione un consignante...</option>
                {MOCK_CONSIGNANTES.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre} {c.apellido} ({c.telefono})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Datos de la Prenda */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Shirt className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Detalles de la Prenda</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Nombre de la prenda *</label>
                <input 
                  type="text" 
                  placeholder="Ej: Body rayado manga larga" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Marca</label>
                <input 
                  type="text" 
                  placeholder="Ej: Cheeky" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Categoría *</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent" required>
                    <option value="">Seleccionar...</option>
                    <option>Bodies</option>
                    <option>Pantalones</option>
                    <option>Remeras</option>
                    <option>Enteritos</option>
                    <option>Vestidos</option>
                    <option>Abrigos</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Talle *</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent" required>
                    <option value="">Seleccionar...</option>
                    <option>0 a 3 meses</option>
                    <option>3 a 6 meses</option>
                    <option>6 a 9 meses</option>
                    <option>9 a 12 meses</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Género</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent">
                    <option>Unisex</option>
                    <option>Nena</option>
                    <option>Nene</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Temporada</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent">
                    <option>Todo el año</option>
                    <option>Verano</option>
                    <option>Invierno</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">Estado físico de la prenda *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'nuevo_con_etiqueta', label: 'Nuevo c/ etiqueta' },
                  { id: 'nuevo_sin_etiqueta', label: 'Nuevo s/ etiqueta' },
                  { id: 'usado_excelente', label: 'Excelente' },
                  { id: 'usado_muy_bueno', label: 'Muy Bueno' },
                ].map((s) => (
                  <label key={s.id} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-accent cursor-pointer transition-all has-[:checked]:bg-accent/10 has-[:checked]:border-accent">
                    <input type="radio" name="estado_fisico" value={s.id} className="sr-only" defaultChecked={s.id === 'usado_excelente'} />
                    <span className="text-xs font-bold text-slate-700">{s.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Comercial */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Tag className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Condiciones Comerciales</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Precio de Venta *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-8 py-3 outline-none focus:ring-2 focus:ring-accent font-bold"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">% Consignante</label>
                <input 
                  type="number" 
                  defaultValue="50" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Fecha de Ingreso</label>
                <div className="relative">
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="date" 
                    defaultValue={new Date().toISOString().split('T')[0]} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Foto */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Camera className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Foto</h3>
            </div>
            
            <div className="flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl p-12 hover:border-accent hover:bg-accent/5 transition-all cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-sm font-bold text-slate-600">Subir foto de la prenda</p>
                <p className="text-xs text-slate-400 mt-1">Formatos JPG, PNG hasta 5MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="px-8 py-4 font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={cn(
              "flex items-center gap-2 px-12 py-4 bg-primary text-white font-bold rounded-2xl transition-all shadow-xl shadow-primary/20",
              loading && "opacity-50 cursor-not-allowed"
            )}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {loading ? 'Guardando...' : 'GUARDAR PRENDA'}
          </button>
        </div>
      </form>
    </div>
  );
}
