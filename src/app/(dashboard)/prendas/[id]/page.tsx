'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Printer, 
  Edit2, 
  Trash2, 
  Calendar, 
  User, 
  Tag, 
  History,
  Clock
} from 'lucide-react';
import { MOCK_PRENDAS, MOCK_CONSIGNANTES } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { subDays } from 'date-fns';
import Link from 'next/link';

export default function PrendaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const prenda = MOCK_PRENDAS.find(p => p.id === id);
  const consignante = MOCK_CONSIGNANTES.find(c => c.id === prenda?.consignante_id);

  if (!prenda) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-slate-500 font-medium">Prenda no encontrada.</p>
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
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Printer className="w-4 h-4" />
            Imprimir Etiqueta
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all">
            <Edit2 className="w-4 h-4" />
            Editar Prenda
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 h-80 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
              {prenda.foto_principal_url ? (
                <img src={prenda.foto_principal_url} alt={prenda.nombre} className="w-full h-full object-cover" />
              ) : (
                <Tag className="w-16 h-16 text-slate-300" />
              )}
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <StatusBadge status={prenda.estado} />
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">#{prenda.codigo}</span>
                </div>
                <h1 className="text-3xl font-black text-slate-800">{prenda.nombre}</h1>
                <p className="text-slate-500 mt-2 leading-relaxed">{prenda.descripcion}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Categoría</p>
                  <p className="font-bold text-slate-700">{prenda.categoria}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Talle</p>
                  <p className="font-bold text-slate-700">{prenda.talle}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Marca</p>
                  <p className="font-bold text-slate-700">{prenda.marca}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Género</p>
                  <p className="font-bold text-slate-700">{prenda.genero}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Temporada</p>
                  <p className="font-bold text-slate-700">{prenda.temporada}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estado Físico</p>
                  <p className="font-bold text-slate-700 capitalize">{prenda.estado_prenda.replace(/_/g, ' ')}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Precio Actual</p>
                  <p className="text-3xl font-black text-primary">{formatCurrency(prenda.precio_actual)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Comisión Consignante ({prenda.porcentaje_consignante}%)</p>
                  <p className="text-xl font-bold text-slate-700">{formatCurrency(prenda.precio_actual * (prenda.porcentaje_consignante / 100))}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Historial de la Prenda
            </h3>
            
            <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-green-100 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                </div>
                <p className="text-sm font-bold text-slate-800">Ingreso al local</p>
                <p className="text-xs text-slate-500">{formatDateTime(prenda.fecha_ingreso)}</p>
              </div>
              
              {prenda.estado === 'vendida' && (
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-blue-100 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">Vendida</p>
                  <p className="text-xs text-slate-500">{formatDateTime(subDays(new Date(), 1).toISOString())}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800">Consignante</h3>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-primary font-bold">
                {consignante?.nombre.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800">{consignante?.nombre} {consignante?.apellido}</p>
                <Link href={`/consignantes/${consignante?.id}`} className="text-xs text-primary font-semibold hover:underline">Ver ficha completa</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Teléfono</span>
                <span className="font-medium text-slate-800">{consignante?.telefono}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Saldo Pendiente</span>
                <span className="font-bold text-green-600">{formatCurrency(15000)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800">Fechas Clave</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Ingreso</p>
                  <p className="text-sm font-bold text-slate-700">{formatDate(prenda.fecha_ingreso)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Límite Permanencia</p>
                  <p className="text-sm font-bold text-slate-700">{formatDate(prenda.fecha_limite || '')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border border-red-100 bg-red-50/50 rounded-2xl">
            <button className="w-full flex items-center justify-center gap-2 text-red-600 font-bold text-sm hover:text-red-700 transition-colors">
              <Trash2 className="w-4 h-4" />
              Eliminar Registro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
