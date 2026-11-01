import { useEffect, useId, useRef } from 'react';

export interface Connection { id: string; from: string; to: string; path: string; stage: number }

// Native SVG motion follows the rendered path without per-frame React updates.
function Particle({ pathId, destination, onArrival }: {
  pathId: string; destination: string; onArrival: (id: string) => void;
}) {
  const motion = useRef<SVGAnimationElement>(null);
  const circle = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const animation = motion.current;
    if (!animation) return;
    const finish = () => {
      circle.current?.setAttribute('visibility', 'hidden');
      onArrival(destination);
    };
    animation.addEventListener('endEvent', finish);
    animation.beginElement();
    return () => animation.removeEventListener('endEvent', finish);
  }, [destination, onArrival]);

  return <circle ref={circle} r="3" className="workflow-particle">
    <animateMotion ref={motion} begin="indefinite" dur="1.5s" fill="freeze" calcMode="paced">
      <mpath href={`#${pathId}`} />
    </animateMotion>
  </circle>;
}

export default function WorkflowConnections({ connections, stage, running, onArrival }: {
  connections: Connection[]; stage: number; running: boolean; onArrival: (id: string) => void;
}) {
  const prefix = useId();
  return <svg className="workflow-connections" aria-hidden="true" focusable="false">
    {connections.map(connection => {
      const pathId = `${prefix}-${connection.id}`;
      return <g key={connection.id}>
        <path id={pathId} d={connection.path} className={connection.stage === stage ? 'is-traversed' : ''} />
        {running && connection.stage === stage
          ? <Particle key={`${stage}-${connection.path}`} pathId={pathId} destination={connection.to} onArrival={onArrival} />
          : null}
      </g>;
    })}
  </svg>;
}
