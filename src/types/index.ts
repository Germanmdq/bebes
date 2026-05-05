// Database Types for Ropero Consignado

export type UserRole = 'admin' | 'vendedor' | 'solo_lectura';

export interface Consignante {
  id: string;
  nombre: string;
  apellido?: string;
  telefono: string;
  whatsapp?: string;
  email?: string;
  dni?: string;
  alias_pago?: string;
  cbu?: string;
  direccion?: string;
  observaciones?: string;
  porcentaje_default_consignante: number;
  porcentaje_default_local: number;
  estado: 'activo' | 'pausado' | 'bloqueado' | 'archivado';
  created_at: string;
  updated_at: string;
}

export type PrendaEstado = 
  | 'ingresada' 
  | 'disponible' 
  | 'reservada' 
  | 'vendida' 
  | 'pendiente_liquidacion' 
  | 'liquidada' 
  | 'pagada' 
  | 'devuelta' 
  | 'donada' 
  | 'liquidacion' 
  | 'no_aceptada';

export type PrendaCondicionFisica = 
  | 'nuevo_con_etiqueta' 
  | 'nuevo_sin_etiqueta' 
  | 'usado_excelente' 
  | 'usado_muy_bueno' 
  | 'usado_bueno' 
  | 'usado_regular' 
  | 'no_aceptado';

export type CondicionComercial = 
  | 'consignacion_50_50' 
  | 'compra_directa' 
  | 'prenda_propia' 
  | 'donacion' 
  | 'liquidacion';

export interface Prenda {
  id: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
  categoria: string;
  subcategoria?: string;
  marca?: string;
  talle: string;
  genero?: 'Nena' | 'Nene' | 'Unisex';
  temporada?: 'Verano' | 'Invierno' | 'Media estación' | 'Todo el año';
  estado_prenda: PrendaCondicionFisica;
  condicion: CondicionComercial;
  precio_original: number;
  precio_actual: number;
  porcentaje_consignante: number;
  porcentaje_local: number;
  consignante_id: string;
  recepcion_id?: string;
  fecha_ingreso: string;
  fecha_limite?: string;
  estado: PrendaEstado;
  foto_principal_url?: string;
  observaciones?: string;
  motivo_rechazo?: string;
  created_at: string;
  updated_at: string;
}

export interface Recepcion {
  id: string;
  codigo: string;
  consignante_id: string;
  fecha_recepcion: string;
  cantidad_recibida: number;
  cantidad_aceptada: number;
  cantidad_rechazada: number;
  estado: 'abierta' | 'revisada' | 'cerrada' | 'cancelada';
  observaciones?: string;
  created_at: string;
  updated_at: string;
}

export interface Venta {
  id: string;
  numero_venta: string;
  fecha: string;
  total_bruto: number;
  descuento: number;
  total_final: number;
  metodo_pago: 'efectivo' | 'mercado_pago' | 'transferencia' | 'tarjeta' | 'mixto';
  cliente_nombre?: string;
  cliente_telefono?: string;
  observaciones?: string;
  estado: 'completada' | 'anulada' | 'devuelta_parcial' | 'devuelta_total';
  created_at: string;
  updated_at: string;
}

export interface VentaItem {
  id: string;
  venta_id: string;
  prenda_id: string;
  consignante_id: string;
  precio_original: number;
  precio_vendido: number;
  porcentaje_consignante: number;
  porcentaje_local: number;
  monto_consignante: number;
  monto_local: number;
  estado_liquidacion: 'pendiente' | 'liquidada' | 'pagada' | 'anulada';
  liquidacion_id?: string;
  created_at: string;
}

export interface Liquidacion {
  id: string;
  numero_liquidacion: string;
  consignante_id: string;
  periodo_mes: number;
  periodo_anio: number;
  fecha_desde: string;
  fecha_hasta: string;
  total_vendido: number;
  total_a_pagar: number;
  total_local: number;
  cantidad_prendas: number;
  estado: 'pendiente' | 'pagada' | 'cancelada';
  fecha_pago?: string;
  metodo_pago?: string;
  comprobante_url?: string;
  observaciones?: string;
  prendas_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface Reserva {
  id: string;
  prenda_id: string;
  cliente_nombre: string;
  cliente_telefono?: string;
  fecha_reserva: string;
  fecha_vencimiento: string;
  sena: number;
  canal?: 'local' | 'instagram' | 'whatsapp' | 'facebook' | 'otro';
  estado: 'activa' | 'vencida' | 'convertida_en_venta' | 'cancelada';
  observaciones?: string;
  created_at: string;
  updated_at: string;
}

export interface ConfiguracionNegocio {
  id: string;
  nombre_negocio: string;
  porcentaje_default_consignante: number;
  porcentaje_default_local: number;
  dias_permanencia_default: number;
  descuento_maximo_sin_autorizacion: number;
  moneda: string;
  mensaje_whatsapp_liquidacion: string;
  created_at: string;
  updated_at: string;
}
