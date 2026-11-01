import type { CSSProperties } from 'react';

export interface Connection { id: string; from: string; to: string; path: string; stage: number }
export default function WorkflowConnections({ connections, stage, running, selected, onArrival }: {
  connections: Connection[]; stage: number; running: boolean; selected: string | null; onArrival: () => void;
}) {
  return <svg className="workflow-connections" aria-hidden="true">
    {connections.map(connection => <g key={connection.id}>
      <path d={connection.path} className={`${connection.stage === stage ? 'is-traversed' : ''}${selected === connection.from || selected === connection.to ? ' is-related' : ''}`} />
      {running && connection.stage === stage ? <circle key={`${connection.id}-${stage}`} r="3" className="workflow-particle"
        style={{ offsetPath: `path('${connection.path}')` } as CSSProperties} onAnimationEnd={onArrival} /> : null}
    </g>)}
  </svg>;
}
