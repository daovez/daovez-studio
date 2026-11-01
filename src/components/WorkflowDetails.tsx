import { demoLead, type WorkflowNodeData } from '../data/demoWorkflow';

export default function WorkflowDetails({ node, id, onClose }: { node: WorkflowNodeData; id: string; onClose: () => void }) {
  return <aside className="workflow-details" id={id} aria-label={`Detalles de ${node.label}`}>
    <div className="workflow-details-heading"><strong>{node.label}</strong><button type="button" onClick={onClose} aria-label="Cerrar información">×</button></div>
    <p className="workflow-demo-tag">Ejemplo ficticio</p>
    <dl>
      <div><dt>Operación</dt><dd>{node.operation}</dd></div>
      <div><dt>Registro</dt><dd>{demoLead.id} · {demoLead.company}</dd></div>
      <div><dt>Resultado simulado</dt><dd>{node.result}</dd></div>
      <div><dt>Estado del ejemplo</dt><dd>{demoLead.status}</dd></div>
    </dl>
  </aside>;
}
