import type { WorkflowNodeData } from '../data/demoWorkflow';

interface Props {
  node: WorkflowNodeData;
  active: boolean;
  done: boolean;
  expanded: boolean;
  detailsId: string;
  onInspect: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function WorkflowNode({ node, active, done, expanded, detailsId, onInspect, onToggle }: Props) {
  return <button type="button" data-workflow-node={node.id}
    className={`workflow-node wf-${node.id}${node.secondary ? ' workflow-secondary' : ''}${active ? ' is-active' : ''}${done ? ' is-done' : ''}`}
    aria-expanded={expanded} aria-controls={expanded ? detailsId : undefined}
    onPointerEnter={event => { if (event.pointerType === 'mouse') onInspect(node.id); }}
    onFocus={() => onInspect(node.id)} onClick={() => onToggle(node.id)}>
    <span className="workflow-node-icon" aria-hidden="true">{node.symbol}</span>
    <span className="workflow-node-copy"><strong>{node.label}</strong><small>{node.subtitle}</small></span>
    {node.stage > 0 ? <><span className="workflow-port workflow-port-top" aria-hidden="true" /><span className="workflow-port workflow-port-bottom" aria-hidden="true" /></> : null}
  </button>;
}
