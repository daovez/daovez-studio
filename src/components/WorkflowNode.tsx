import type { WorkflowNodeData } from '../data/demoWorkflow';

interface Props {
  node: WorkflowNodeData;
  active: boolean;
  done: boolean;
}

export default function WorkflowNode({ node, active, done }: Props) {
  return <div data-workflow-node={node.id}
    className={`workflow-node wf-${node.id}${node.secondary ? ' workflow-secondary' : ''}${active ? ' is-active' : ''}${done ? ' is-done' : ''}`}>
    <span className="workflow-node-square">
      <WorkflowIcon name={node.icon} />
      <span className="workflow-port workflow-port-in" aria-hidden="true" />
      <span className="workflow-port workflow-port-out" aria-hidden="true" />
    </span>
    <span className="workflow-node-copy"><strong>{node.label}</strong><small>{node.subtitle}</small></span>
  </div>;
}

function WorkflowIcon({ name }: { name: WorkflowNodeData['icon'] }) {
  const paths = {
    'file-text': <><path d="M5 3.5h8l4 4V20.5H5z" /><path d="M13 3.5v4h4M8 12h6M8 15.5h6" /></>,
    'message-circle': <><path d="M18.5 11.5a6.8 6.8 0 0 1-7 6.8 7.7 7.7 0 0 1-3.1-.7L4 19l1.2-3.2a6.8 6.8 0 1 1 13.3-4.3Z" /><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" /></>,
    mail: <><rect x="3.5" y="5" width="17" height="14" rx="1.5" /><path d="m4.5 7 7.5 6 7.5-6" /></>,
    'shield-check': <><path d="M12 3.5 19 6v5.5c0 4.2-2.8 7.4-7 9-4.2-1.6-7-4.8-7-9V6z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></>,
    bot: <><rect x="4" y="7" width="16" height="13" rx="2" /><path d="M12 3v4M8 12h.01M16 12h.01M8 16h8" /></>,
    users: <><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM16 4.5a3.5 3.5 0 0 1 0 6.8M17 15h1a3 3 0 0 1 3 3v2" /></>,
    calendar: <><rect x="4" y="5" width="16" height="15" rx="1.5" /><path d="M8 3v4M16 3v4M4 9h16M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" /></>,
    receipt: <><path d="M6 3.5h12v17l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z" /><path d="M9 8h6M9 11.5h6M9 15h3" /></>,
    bell: <><path d="M18 10a6 6 0 0 0-12 0c0 7-3 7-3 8.5h18C21 17 18 17 18 10ZM10 21h4" /></>,
    chart: <><path d="M4 19.5V11M9.3 19.5V6M14.7 19.5v-4M20 19.5V3.5" /></>,
  }[name];
  return <svg aria-hidden="true" className="workflow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>;
}
