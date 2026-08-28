const NODES: [number, number][] = [
  [40, 60], [140, 30], [230, 90], [320, 40], [410, 110], [500, 50], [590, 100], [680, 40], [760, 90],
  [80, 180], [190, 150], [280, 210], [370, 170], [460, 230], [550, 180], [640, 220], [730, 170],
  [50, 300], [150, 340], [250, 290], [350, 350], [450, 300], [540, 360], [630, 310], [720, 350],
  [90, 430], [200, 460], [300, 420], [400, 470], [500, 430], [600, 460], [700, 420],
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [1, 10], [2, 11], [3, 12], [4, 13], [5, 14], [6, 15], [7, 16],
  [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16],
  [9, 17], [10, 18], [11, 19], [12, 20], [13, 21], [14, 22], [15, 23], [16, 24],
  [17, 18], [18, 19], [19, 20], [20, 21], [21, 22], [22, 23], [23, 24],
  [17, 25], [18, 26], [19, 27], [20, 28], [21, 29], [22, 30],
  [25, 26], [26, 27], [27, 28], [28, 29], [29, 30],
];

export function MalhaDeDados({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <g className="motion-safe:animate-[mesh-drift_90s_ease-in-out_infinite_alternate]">
        {EDGES.map(([a, b], index) => {
          const [x1, y1] = NODES[a];
          const [x2, y2] = NODES[b];
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          );
        })}
        {NODES.map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r="2.5" fill="currentColor" />
        ))}
      </g>
    </svg>
  );
}
