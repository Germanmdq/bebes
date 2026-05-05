'use client';

import { Search, Plus, ShoppingCart, Bell, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onOpenMenu?: () => void;
}

export function Header({ onOpenMenu }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onOpenMenu}
          className="p-2 text-slate-500 hover:text-slate-800 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:block flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar código, prenda, consignante..." 
              className="w-full bg-slate-100/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent/50 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 pr-2 md:pr-4 md:border-r border-slate-200">
          <button 
            onClick={() => router.push('/prendas/nueva')}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-accent text-primary font-semibold text-[10px] md:text-xs rounded-full hover:bg-accent/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">NUEVA PRENDA</span>
          </button>
          <button 
            onClick={() => router.push('/ventas/nueva')}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary text-white font-semibold text-[10px] md:text-xs rounded-full hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">NUEVA VENTA</span>
          </button>
        </div>

        <button className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </div>
    </header>
  );
}
