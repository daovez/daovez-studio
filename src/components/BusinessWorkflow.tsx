import { useEffect, useId, useRef, useState } from 'react';
import { demoLead, demoWorkflow } from '../data/demoWorkflow';
import WorkflowNode from './WorkflowNode';
import WorkflowConnections, { type Connection } from './WorkflowConnections';
import WorkflowDetails from './WorkflowDetails';
import '../styles/business-workflow.css';

export default function BusinessWorkflow() {
  const root = useRef<HTMLDivElement>(null);
  const graph = useRef<HTMLDivElement>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [stage, setStage] = useState(0);
  const [arrived, setArrived] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const detailsId = useId();
  const running = !reduced && !paused && visible;
  const node = demoWorkflow.nodes.find(item => item.id === selected);
  const displayedStage = arrived || stage === 0 || !running ? stage : stage - 1;

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
    }, 2200);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    const element = graph.current;
    if (!element) return;
    const measure = () => {
      const buttons = new Map(Array.from(element.querySelectorAll<HTMLButtonElement>('[data-workflow-node]')).map(button => [button.dataset.workflowNode, button]));
      const vertical = window.matchMedia('(max-width: 767px)').matches;
      setConnections(demoWorkflow.edges.flatMap(([from, to]) => {
        const a = buttons.get(from); const b = buttons.get(to);
        if (!a || !b || !a.offsetWidth || !b.offsetWidth) return [];
        const sameColumn = a.offsetLeft === b.offsetLeft;
        const adjacent = b.offsetTop - (a.offsetTop + a.offsetHeight) < 70;
        const straightDown = vertical || (sameColumn && (adjacent || from === 'validate'));
        const x1 = a.offsetLeft + (straightDown ? a.offsetWidth / 2 : a.offsetWidth);
        const y1 = a.offsetTop + (straightDown ? a.offsetHeight : a.offsetHeight / 2);
        const x2 = b.offsetLeft + (straightDown ? b.offsetWidth / 2 : sameColumn ? b.offsetWidth : 0);
        const y2 = b.offsetTop + (straightDown ? 0 : b.offsetHeight / 2);
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
    const observer = new ResizeObserver(measure); observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, []);

  function inspect(id: string) { setSelected(id); }
  function close() { setSelected(null); }

  return <div ref={root} className="business-workflow" role="region" aria-label="Demostración de una empresa automatizada"
    onKeyDown={event => { if (event.key === 'Escape') close(); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }}
    onPointerLeave={() => { if (!root.current?.contains(document.activeElement)) close(); }}>
    <div className="workflow-topline"><span className="workflow-demo-tag"><span aria-hidden="true">◌</span> {demoWorkflow.label}</span>
      <div className="workflow-controls">
        {!running ? <button type="button" className="workflow-play" aria-label="Ver siguiente paso de la simulación" onClick={() => { setStage(value => (value + 1) % demoWorkflow.stages.length); setArrived(true); }}>Siguiente paso</button> : null}
        <button type="button" className="workflow-play" disabled={reduced} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{reduced ? 'Sin animación' : paused ? 'Reanudar' : 'Pausar'}</button>
      </div>
    </div>
    <div className="workflow-columns" aria-hidden="true"><span>01 / ENTRADAS</span><span>02 / INTELIGENCIA</span><span>03 / OPERACIONES</span></div>
    <div className="workflow-graph" ref={graph}>
      <WorkflowConnections connections={connections} stage={stage} running={running} selected={selected} onArrival={() => setArrived(true)} />
      {demoWorkflow.nodes.map(item => <WorkflowNode key={item.id} node={item} active={item.stage === stage && (arrived || stage === 0)} done={item.stage < stage}
        expanded={selected === item.id} detailsId={detailsId} onInspect={inspect}
        onToggle={inspect} />)}
    </div>
    <div className="workflow-summary"><span className="mono">{demoLead.id}</span><span>{demoWorkflow.stages[displayedStage]} <span aria-hidden="true">↗</span></span><small>{demoWorkflow.disclaimer}</small></div>
    <p className="workflow-hint">Explora los nodos con el cursor, el teclado o un toque.</p>
    <div className="workflow-details-slot">{node ? <WorkflowDetails node={node} id={detailsId} onClose={close} /> : null}</div>
  </div>;
}
