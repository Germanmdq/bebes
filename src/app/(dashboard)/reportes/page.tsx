'use client';

import { 
  TrendingUp, 
  PieChart, 
  Download, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { formatCurrency } from '@/lib/utils/format';

const dataVentas = [
  { name: 'Ene', ventas: 450000 },
  { name: 'Feb', ventas: 520000 },
  { name: 'Mar', ventas: 480000 },
  { name: 'Abr', ventas: 610000 },
  { name: 'May', ventas: 590000 },
];

const dataCategorias = [
  { name: 'Bodies', value: 400, color: '#FFB6C1' },
  { name: 'Pantalones', value: 300, color: '#B0E0E6' },
  { name: 'Vestidos', value: 200, color: '#FFD700' },
  { name: 'Enteritos', value: 100, color: '#98FB98' },
];

export default function ReportesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reportes y Estadísticas</h2>
          <p className="text-slate-500">Analiza el rendimiento de tu negocio de consignación.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" />
          Exportar PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Ventas Totales</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-slate-800">{formatCurrency(2650000)}</h3>
            <span className="text-green-500 font-bold text-sm flex items-center mb-1">
              <ArrowUpRight className="w-4 h-4" />
              +12%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Margen Local (50%)</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-slate-800">{formatCurrency(1325000)}</h3>
            <span className="text-green-500 font-bold text-sm flex items-center mb-1">
              <ArrowUpRight className="w-4 h-4" />
              +10%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Prendas Vendidas</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-slate-800">142</h3>
            <span className="text-red-500 font-bold text-sm flex items-center mb-1">
              <ArrowDownRight className="w-4 h-4" />
              -3%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Evolución de Ventas (6 meses)
          </h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataVentas}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="ventas" fill="#E8B4B8" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            Ventas por Categoría
          </h4>
          <div className="h-80 w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCategorias} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={100} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={30}>
                  {dataCategorias.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
