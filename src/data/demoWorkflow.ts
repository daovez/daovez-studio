export interface WorkflowLead {
  id: string;
  company: string;
  sector: string;
  channel: string;
  request: string;
  category: string;
  priority: string;
  status: string;
}

export interface WorkflowNodeData {
  id: string;
  label: string;
  subtitle: string;
  icon: 'file-text' | 'message-circle' | 'mail' | 'shield-check' | 'bot' | 'users' | 'calendar' | 'receipt' | 'bell' | 'chart';
  stage: number;
  operation: string;
  result: string;
  secondary?: boolean;
}

// A future real adapter must be provided explicitly, outside this visual demo.
// No adapter is invoked by the Hero; no credentials or network requests are used.
export interface WorkflowService {
  mode: 'demo' | 'live';
  prepare(lead: Readonly<WorkflowLead>): Promise<Readonly<WorkflowLead>>;
}

export const demoLead: Readonly<WorkflowLead> = {
  id: 'LEAD-001', company: 'Empresa Demo S.L.', sector: 'Clínica dental',
  channel: 'Formulario web', request: 'Automatizar la gestión de citas',
  category: 'Automatización comercial', priority: 'Media', status: 'Pendiente de revisión',
};

export const demoWorkflow = {
  label: 'Simulación interactiva',
  disclaimer: 'Datos ficticios · Sin servicios externos',
  stages: ['Entrada recibida', 'Datos validados', 'Solicitud clasificada', 'Registro CRM preparado', 'Cita propuesta', 'Notificación generada'],
  nodes: [
    { id: 'web', label: 'Formulario web', subtitle: 'Entrada', icon: 'file-text', stage: 0, operation: 'Recibir solicitud', result: demoLead.request },
    { id: 'whatsapp', label: 'WhatsApp', subtitle: 'Entrada', icon: 'message-circle', stage: 0, operation: 'Recibir conversación', result: 'Canal disponible en el ejemplo; sin mensaje real', secondary: true },
    { id: 'email', label: 'Correo', subtitle: 'Entrada', icon: 'mail', stage: 0, operation: 'Recibir correo', result: 'Canal disponible en el ejemplo; sin correo real', secondary: true },
    { id: 'validate', label: 'Validación', subtitle: 'Datos', icon: 'shield-check', stage: 1, operation: 'Validar datos', result: `${demoLead.company} · ${demoLead.sector}` },
    { id: 'ai', label: 'Agente IA', subtitle: 'Cualificación', icon: 'bot', stage: 2, operation: 'Clasificar solicitud y cualificar cliente', result: `${demoLead.category} · Prioridad ${demoLead.priority.toLowerCase()}` },
    { id: 'crm', label: 'CRM', subtitle: 'Contacto', icon: 'users', stage: 3, operation: 'Crear contacto', result: 'Datos preparados' },
    { id: 'calendar', label: 'Calendario', subtitle: 'Citas', icon: 'calendar', stage: 4, operation: 'Proponer cita', result: 'Propuesta preparada, pendiente de confirmación' },
    { id: 'documents', label: 'Presupuestos', subtitle: 'Facturación', icon: 'receipt', stage: 4, operation: 'Preparar presupuesto y borrador de factura', result: 'Borradores simulados, sin emisión ni envío', secondary: true },
    { id: 'notify', label: 'Notificaciones', subtitle: 'Avisos', icon: 'bell', stage: 5, operation: 'Generar notificación', result: 'Aviso preparado, sin envío', secondary: true },
    { id: 'reports', label: 'Informes', subtitle: 'Automáticos', icon: 'chart', stage: 5, operation: 'Generar informe automático', result: 'Resumen del registro preparado, sin envío', secondary: true },
  ] satisfies WorkflowNodeData[],
  edges: [
    ['web', 'validate'], ['whatsapp', 'validate'], ['email', 'validate'],
    ['validate', 'ai'], ['ai', 'crm'], ['crm', 'calendar'],
    ['crm', 'documents'], ['crm', 'notify'], ['crm', 'reports'],
  ] as readonly (readonly [string, string])[],
} as const;
