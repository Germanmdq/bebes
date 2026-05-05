'use client';

import { useState } from 'react';
import { 
  Search, 
  Trash2, 
  ShoppingCart, 
  CreditCard, 
  Banknote, 
  Smartphone,
  X,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { MOCK_PRENDAS } from '@/lib/mock-data';
import { Prenda } from '@/types';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function NuevaVentaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<Prenda[]>([]);
  const [metodoPago, setMetodoPago] = useState<string>('efectivo');
  const [isSuccess, setIsSuccess] = useState(false);

  const availablePrendas = MOCK_PRENDAS.filter(p => 
    p.estado === 'disponible' && 
    (p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.codigo.toLowerCase().includes(searchTerm.toLowerCase())) &&
    !cart.some(item => item.id === p.id)
  ).slice(0, 5);

  const addToCart = (prenda: Prenda) => {
    setCart([...cart, prenda]);
    setSearchTerm('');
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.precio_actual, 0);

  const handleFinalizar = () => {
    if (cart.length === 0) return;
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setCart([]);
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">¡Venta Completada!</h2>
        <p className="text-slate-500 max-w-md">La venta ha sido registrada exitosamente. Las prendas han sido marcadas como vendidas.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-8 px-6 py-2 bg-primary text-white font-bold rounded-xl"
        >
          Nueva Venta
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Selector de Prendas */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Nueva Venta</h2>
          <p className="text-slate-500">Busca y agrega prendas al carrito.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por código o nombre..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-lg focus:ring-2 focus:ring-accent outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchTerm && availablePrendas.length > 0 && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              {availablePrendas.map((p) => (
                <button 
                  key={p.id}
                  onClick={() => addToCart(p)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-accent/10 rounded-xl transition-colors border border-transparent hover:border-accent/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-primary text-xs">
                      {p.codigo.split('-')[1]}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-800">{p.nombre}</p>
                      <p className="text-xs text-slate-500">{p.categoria} • Talle {p.talle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-900">{formatCurrency(p.precio_actual)}</span>
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {searchTerm && availablePrendas.length === 0 && (
            <div className="p-8 text-center text-slate-400 italic">
              No se encontraron prendas disponibles con ese criterio.
            </div>
          )}

          <div className="pt-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Carrito ({cart.length})</h4>
            {cart.length === 0 ? (
              <div className="border-2 border-dashed border-slate-100 rounded-2xl p-12 text-center">
                <ShoppingCart className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400">El carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-xs font-bold">
                        {item.codigo.split('-')[1]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.nombre}</p>
                        <p className="text-xs text-slate-500">{item.talle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-bold text-slate-900">{formatCurrency(item.precio_actual)}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resumen y Pago */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 sticky top-24">
          <h3 className="text-xl font-bold text-slate-800">Resumen de Venta</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Descuento</span>
              <span>$ 0</span>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-lg font-bold text-slate-800">Total</span>
              <span className="text-2xl font-black text-primary">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Método de Pago</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'efectivo', icon: Banknote, label: 'Efectivo' },
                { id: 'mercado_pago', icon: Smartphone, label: 'Mercado Pago' },
                { id: 'transferencia', icon: CreditCard, label: 'Transf.' },
                { id: 'tarjeta', icon: CreditCard, label: 'Tarjeta' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMetodoPago(m.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                    metodoPago === m.id 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200"
                  )}
                >
                  <m.icon className="w-6 h-6" />
                  <span className="text-xs font-bold">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            disabled={cart.length === 0}
            onClick={handleFinalizar}
            className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
          >
            FINALIZAR VENTA
          </button>
        </div>
      </div>
    </div>
  );
}
