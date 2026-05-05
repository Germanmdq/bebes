'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Tag, 
  Calendar, 
  ShieldCheck,
  History,
  TrendingDown,
  Printer,
  Edit2,
  Trash2,
  Package,
  Baby,
  Shirt,
  Plus
} from 'lucide-react';
import { MOCK_PRENDAS, MOCK_CONSIGNANTES } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Image from 'next/image';

export default function PrendaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const p = MOCK_PRENDAS.find(pre => pre.id === id);
  const c = MOCK_CONSIGNANTES.find(con => con.id === p?.consignante_id);

  if (!p) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-slate-500 font-medium">Prenda no encontrada.</p>
        <button onClick={() => router.back()} className="mt-4 text-primary font-bold underline">Volver</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inventario
        </button>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Printer className="w-4 h-4" />
            Imprimir Etiqueta
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Edit2 className="w-4 h-4" />
            Editar
          </button>
          <button className="p-2 border border-slate-200 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Visual Section */}
        <div className="space-y-6">
          <div className="aspect-square bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-100 relative group shadow-2xl shadow-slate-200">
            {p.foto_principal_url ? (
              <Image 
                src={p.foto_principal_url} 
                alt={p.nombre} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Shirt className="w-24 h-24 text-slate-200" />
              </div>
            )}
            <div className="absolute top-6 left-6">
              <StatusBadge status={p.estado} />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center cursor-pointer hover:border-primary/30 transition-colors">
                <Shirt className="w-6 h-6 text-slate-200" />
              </div>
            ))}
            <div className="aspect-square bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
              <Plus className="w-6 h-6 text-slate-300" />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-accent/30 text-primary text-[10px] font-black uppercase rounded-full tracking-widest">
                {p.categoria}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-bold text-slate-400 font-mono tracking-tighter">
                ID: {p.codigo}
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-800 leading-tight mb-4">{p.nombre}</h1>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-black text-primary">{formatCurrency(p.precio_actual)}</span>
              {p.precio_original > p.precio_actual && (
                <span className="text-lg text-slate-400 line-through mb-1 font-bold">{formatCurrency(p.precio_original)}</span>
              )}
            </div>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              {p.descripcion || "Sin descripción disponible para esta prenda."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Talle</p>
                <p className="text-lg font-black text-slate-700">{p.talle}</p>
              </div>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center">
                <Baby className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Género</p>
                <p className="text-lg font-black text-slate-700 capitalize">{p.genero}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[2rem] space-y-6">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Trazabilidad y Consigna
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center font-bold text-primary">
                    {c?.nombre?.charAt(0) ?? ''}{c?.apellido?.charAt(0) ?? ''}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Consignante</p>
                    <p className="text-sm font-bold text-slate-800">{c?.nombre} {c?.apellido}</p>
                  </div>
                </div>
                <button className="text-xs font-black text-primary px-3 py-1 bg-accent/10 rounded-full">VER PERFIL</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Fecha de Ingreso</p>
                  <p className="text-sm font-bold text-slate-700 mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-300" />
                    {formatDate(p.fecha_ingreso)}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Días en Local</p>
                  <p className="text-sm font-bold text-slate-700 mt-1 flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-300" />
                    12 días
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-primary rounded-3xl text-white flex items-center justify-between shadow-xl shadow-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/70 uppercase">Ganancia Local (50%)</p>
                <p className="text-2xl font-black">{formatCurrency(p.precio_actual * 0.5)}</p>
              </div>
            </div>
            <Package className="w-8 h-8 opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
