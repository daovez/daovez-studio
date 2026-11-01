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
  symbol: string;
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
    { id: 'web', label: 'Formulario', subtitle: 'Solicitud web', symbol: '↗', stage: 0, operation: 'Recibir solicitud', result: demoLead.request },
    { id: 'whatsapp', label: 'WhatsApp', subtitle: 'Conversaciones', symbol: '◉', stage: 0, operation: 'Recibir conversación', result: 'Canal disponible en el ejemplo; sin mensaje real', secondary: true },
    { id: 'email', label: 'Correo', subtitle: 'Consultas por email', symbol: '@', stage: 0, operation: 'Recibir correo', result: 'Canal disponible en el ejemplo; sin correo real', secondary: true },
    { id: 'validate', label: 'Validación', subtitle: 'Revisa los datos', symbol: '✓', stage: 1, operation: 'Validar datos', result: `${demoLead.company} · ${demoLead.sector}` },
    { id: 'ai', label: 'Agente IA', subtitle: 'Clasifica y prioriza', symbol: '✧', stage: 2, operation: 'Clasificar solicitud y cualificar cliente', result: `${demoLead.category} · Prioridad ${demoLead.priority.toLowerCase()}` },
    { id: 'crm', label: 'CRM', subtitle: 'Prepara el contacto', symbol: '▤', stage: 3, operation: 'Crear contacto', result: 'Datos preparados' },
    { id: 'calendar', label: 'Calendario', subtitle: 'Propone una cita', symbol: '▦', stage: 4, operation: 'Proponer cita', result: 'Propuesta preparada, pendiente de confirmación' },
    { id: 'documents', label: 'Comercial', subtitle: 'Ofertas y facturas', symbol: '≡', stage: 4, operation: 'Preparar presupuesto y borrador de factura', result: 'Borradores simulados, sin emisión ni envío', secondary: true },
    { id: 'notify', label: 'Notificaciones', subtitle: 'Avisos e informes', symbol: '↗', stage: 5, operation: 'Generar notificación e informe', result: 'Aviso y resumen del registro preparados, sin envío' },
  ] satisfies WorkflowNodeData[],
  edges: [
    ['web', 'validate'], ['whatsapp', 'validate'], ['email', 'validate'],
    ['validate', 'ai'], ['ai', 'crm'], ['crm', 'calendar'],
    ['crm', 'documents'], ['calendar', 'notify'], ['documents', 'notify'],
  ] as readonly (readonly [string, string])[],
} as const;
