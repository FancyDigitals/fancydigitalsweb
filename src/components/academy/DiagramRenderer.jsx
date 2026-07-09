"use client";

export default function DiagramRenderer({ diagram }) {
  if (!diagram) return null;

  const {
    layout = "vertical",
    nodes = [],
    connections = [],
  } = diagram;

  if (!nodes.length) return null;

  const width = 800;
  const gap = 120;
  const startY = 70;

  const positions = {};

  if (layout === "horizontal") {
    nodes.forEach((node, i) => {
      positions[node.id] = {
        x: 100 + i * 220,
        y: 150,
      };
    });
  } else {
    nodes.forEach((node, i) => {
      positions[node.id] = {
        x: width / 2,
        y: startY + i * gap,
      };
    });
  }

  return (
    <div className="overflow-x-auto">

      <svg
        width={width}
        height={Math.max(420, nodes.length * gap)}
        className="mx-auto"
      >

        <defs>

          <linearGradient
            id="line"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#075a01" />
            <stop offset="100%" stopColor="#0a8f01" />
          </linearGradient>

        </defs>

        {connections.map((edge, index) => {

          const from = positions[edge.from];
          const to = positions[edge.to];

          if (!from || !to) return null;

          return (
            <line
              key={index}
              x1={from.x}
              y1={from.y + 35}
              x2={to.x}
              y2={to.y - 35}
              stroke="url(#line)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}

        {nodes.map((node) => {

          const p = positions[node.id];

          return (
            <g
              key={node.id}
            >

              <rect
                x={p.x - 90}
                y={p.y - 35}
                rx="22"
                width="180"
                height="70"
                fill="#14181f"
                stroke="#075a01"
                strokeWidth="2"
              />

              <text
                x={p.x}
                y={p.y - 6}
                fill="white"
                textAnchor="middle"
                fontWeight="700"
                fontSize="17"
              >
                {node.title}
              </text>

              <text
                x={p.x}
                y={p.y + 18}
                fill="#9ca3af"
                textAnchor="middle"
                fontSize="12"
              >
                {node.subtitle}
              </text>

            </g>
          );

        })}

      </svg>

    </div>
  );
}