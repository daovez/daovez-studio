import { useCallback, useEffect, useRef, useState } from 'react';
import { demoLead, demoWorkflow } from '../data/demoWorkflow';
import WorkflowNode from './WorkflowNode';
import WorkflowConnections, { type Connection } from './WorkflowConnections';
import '../styles/business-workflow.css';

export default function BusinessWorkflow() {
  const graph = useRef<HTMLDivElement>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [stage, setStage] = useState(0);
  const [arrived, setArrived] = useState(true);
  const [arrivedNodes, setArrivedNodes] = useState<string[]>([]);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  const running = !reduced && visible;
  const displayedStage = arrived || stage === 0 || !running ? stage : stage - 1;
  const describedNode = demoWorkflow.nodes.find(item => item.stage === displayedStage)!;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { media.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setStage(previous => (previous + 1) % demoWorkflow.stages.length);
      setArrived(false);
      setArrivedNodes([]);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    const element = graph.current;
    if (!element) return;
    const measure = () => {
      const buttons = new Map(Array.from(element.querySelectorAll<HTMLDivElement>('[data-workflow-node]')).map(button => [button.dataset.workflowNode, button]));
      const bounds = element.getBoundingClientRect();
      const vertical = window.matchMedia('(max-width: 767px)').matches;
      setConnections(demoWorkflow.edges.flatMap(([from, to]) => {
        const a = buttons.get(from); const b = buttons.get(to);
        if (!a || !b || !a.offsetWidth || !b.offsetWidth) return [];
        // Measure the actual port centers, shared by every SVG route.
        const first = a.querySelector('.workflow-port-out')!.getBoundingClientRect();
        const second = b.querySelector('.workflow-port-in')!.getBoundingClientRect();
        const sameColumn = Math.abs(a.offsetLeft - b.offsetLeft) < 1;
        const straightDown = vertical;
        const x1 = first.left - bounds.left + first.width / 2;
        const y1 = first.top - bounds.top + first.height / 2;
        const x2 = second.left - bounds.left + second.width / 2;
        const y2 = second.top - bounds.top + second.height / 2;
        const middle = (x1 + x2) / 2;
        const lane = x1 + (from === 'crm' ? 16 : 28);
        const midY = (y1 + y2) / 2;
        const path = straightDown
          ? `M${x1} ${y1} C${x1} ${midY} ${x2} ${midY} ${x2} ${y2}`
          : sameColumn
            ? `M${x1} ${y1} C${lane} ${y1} ${lane} ${y1} ${lane} ${y1 + 16} L${lane} ${y2 - 16} C${lane} ${y2} ${lane} ${y2} ${x2} ${y2}`
            : `M${x1} ${y1} C${middle} ${y1} ${middle} ${y2} ${x2} ${y2}`;
        return [{ id: `${from}-${to}`, from, to, stage: demoWorkflow.nodes.find(item => item.id === to)!.stage, path }];
      }));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element.querySelectorAll('.workflow-node-square').forEach(square => observer.observe(square));
    window.addEventListener('resize', measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const receive = useCallback((id: string) => {
    setArrivedNodes(previous => previous.includes(id) ? previous : [...previous, id]);
    setArrived(true);
  }, []);

  return <div className={`business-workflow${running ? ' is-running' : ''}`} role="region" aria-label="Demostraci?n de una empresa automatizada">
    <div className="workflow-topline"><span className="workflow-demo-tag">Simulaci?n autom?tica</span></div>
    <div className="workflow-columns" aria-hidden="true"><span>01 / ENTRADAS</span><span>02 / INTELIGENCIA</span><span>03 / OPERACIONES</span></div>
    <div className="workflow-graph" ref={graph}>
      <WorkflowConnections connections={connections} stage={stage} running={running} onArrival={receive} />
      {demoWorkflow.nodes.map(item => <WorkflowNode key={item.id} node={item} active={item.stage === stage && (!running || stage === 0 || arrivedNodes.includes(item.id))} done={item.stage < stage} />)}
    </div>
    <div className="workflow-summary"><span className="mono">{demoLead.id}</span><span role="status" aria-live={running ? 'off' : 'polite'}>{demoWorkflow.stages[displayedStage]} <span aria-hidden="true">↗</span></span><small>{demoWorkflow.disclaimer}</small></div>
    <p className="workflow-description" aria-live="off">
      <strong>{describedNode.label}</strong><span> ? {describedNode.operation}. {describedNode.result}.</span>
    </p>
  </div>;
}
