'use client';

import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  ShoppingCart, 
  User, 
  CreditCard, 
  Banknote, 
  Smartphone,
  ChevronLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MOCK_PRENDAS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils/format';
import { Prenda } from '@/types';
import { cn } from '@/lib/utils';

export default function NuevaVentaPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<Prenda[]>([]);
  const [metodoPago, setMetodoPago] = useState<'efectivo' | 'debito' | 'credito' | 'mercado_pago'>('efectivo');

  const filteredPrendas = searchTerm.length > 2 
    ? MOCK_PRENDAS.filter(p => 
        (p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
         p.codigo.toLowerCase().includes(searchTerm.toLowerCase())) &&
        p.estado === 'disponible'
      )
    : [];

  const addToCart = (prenda: Prenda) => {
    if (!cart.find(item => item.id === prenda.id)) {
      setCart([...cart, prenda]);
    }
    setSearchTerm('');
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.precio_actual, 0);
  const total = subtotal; // Aquí se podrían sumar recargos por tarjeta

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Nueva Venta</h2>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        {/* Selector de Prendas */}
        <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar por código o nombre de prenda..." 
              className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-lg focus:border-primary outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            
            {filteredPrendas.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 max-h-96 overflow-y-auto">
                {filteredPrendas.map(p => (
                  <button
                    key={p.id}
                    onClick={() => addToCart(p)}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{p.nombre}</p>
                        <p className="text-xs text-slate-400 font-mono">{p.codigo} • Talle {p.talle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-primary">{formatCurrency(p.precio_actual)}</p>
                      <Plus className="w-4 h-4 text-primary ml-auto mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col min-h-0">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Carrito de Venta</h3>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                {cart.length} prendas
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <ShoppingCart className="w-16 h-16 opacity-20" />
                  <p className="font-medium">El carrito está vacío.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-100">
                        <ShoppingCart className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{item.nombre}</p>
                        <p className="text-xs text-slate-500 font-mono">{item.codigo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <p className="font-black text-slate-800">{formatCurrency(item.precio_actual)}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Resumen y Pago */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Datos del Cliente
            </h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Nombre del cliente (opcional)" 
                className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <input 
                type="text" 
                placeholder="Teléfono" 
                className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 flex flex-col">
            <h3 className="font-bold text-slate-800 mb-6">Método de Pago</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { id: 'efectivo', icon: Banknote, label: 'Efectivo' },
                { id: 'mercado_pago', icon: Smartphone, label: 'M. Pago' },
                { id: 'debito', icon: CreditCard, label: 'Débito' },
                { id: 'credito', icon: CreditCard, label: 'Crédito' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMetodoPago(m.id as any)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                    metodoPago === m.id 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-slate-100 text-slate-500 hover:border-slate-200"
                  )}
                >
                  <m.icon className="w-6 h-6" />
                  <span className="text-xs font-bold">{m.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-6 mb-8">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-slate-800">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <button 
              disabled={cart.length === 0}
              className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              FINALIZAR VENTA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
