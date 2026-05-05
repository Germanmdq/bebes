'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Shirt, 
  PlusCircle, 
  Users, 
  PackageSearch, 
  ShoppingBag, 
  PlusSquare, 
  Calculator, 
  Calendar, 
  Package, 
  BarChart3, 
  Settings,
  Baby,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Inicio', href: '/dashboard', icon: Home },
  { name: 'Prendas', href: '/prendas', icon: Shirt },
  { name: 'Nueva prenda', href: '/prendas/nueva', icon: PlusCircle },
  { name: 'Consignantes', href: '/consignantes', icon: Users },
  { name: 'Recepciones', href: '/recepciones', icon: PackageSearch },
  { name: 'Ventas', href: '/ventas', icon: ShoppingBag },
  { name: 'Nueva venta', href: '/ventas/nueva', icon: PlusSquare },
  { name: 'Liquidaciones', href: '/liquidaciones', icon: Calculator },
  { name: 'Reservas', href: '/reservas', icon: Calendar },
  { name: 'Inventario', href: '/inventario', icon: Package },
  { name: 'Reportes', href: '/reportes', icon: BarChart3 },
  { name: 'Configuración', href: '/configuracion', icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col h-full",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <Baby className="text-primary w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">Ropero</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Consignado</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-accent/10 text-primary" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 shrink-0">
          <div className="flex items-center gap-3 p-2">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 truncate">Admin Usuario</p>
              <p className="text-xs text-slate-500 truncate">admin@ropero.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
