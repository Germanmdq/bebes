'use client';

import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle
} from 'lucide-react';

export default function ConfiguracionPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Configuración</h2>
        <p className="text-slate-500">Administra las preferencias de tu local y cuenta.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <User className="text-primary w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Perfil del Local</h3>
            <p className="text-sm text-slate-500">Nombre, dirección, teléfono y redes sociales.</p>
          </div>
          <button className="w-full py-2.5 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">
            Gestionar
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
            <Bell className="text-primary w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Notificaciones</h3>
            <p className="text-sm text-slate-500">Alertas de stock, recordatorios de liquidación.</p>
          </div>
          <button className="w-full py-2.5 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">
            Gestionar
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
            <Shield className="text-green-600 w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Seguridad</h3>
            <p className="text-sm text-slate-500">Cambiar contraseña y permisos de acceso.</p>
          </div>
          <button className="w-full py-2.5 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">
            Gestionar
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <HelpCircle className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Ayuda y Soporte</h3>
            <p className="text-sm text-slate-500">Preguntas frecuentes y contacto técnico.</p>
          </div>
          <button className="w-full py-2.5 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">
            Gestionar
          </button>
        </div>
      </div>
    </div>
  );
}
