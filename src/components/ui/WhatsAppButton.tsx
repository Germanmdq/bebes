import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
  className?: string;
  label?: string;
}

export function WhatsAppButton({ 
  phone, 
  message = 'Hola, te contacto desde Ropero Consignado.', 
  className, 
  label 
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const cleanPhone = phone.replace(/\D/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-sm shadow-green-200",
        className
      )}
    >
      <MessageCircle className="w-4 h-4" />
      {label || 'WhatsApp'}
    </button>
  );
}
