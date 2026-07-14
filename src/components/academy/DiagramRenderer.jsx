"use client";

import { motion } from "framer-motion";

export default function DiagramRenderer({ diagram }) {
  if (!diagram) return null;

  const { layout = "vertical", nodes = [], connections = [] } = diagram;
  if (!nodes.length) return null;

  const nodeWidth = 210;
  const nodeHeight = 82;
  const gapY = 130;
  const gapX = 250;

  const isHorizontal = layout === "horizontal";

  const width = isHorizontal
    ? Math.max(640, nodes.length * gapX + 120)
    : 760;

  const height = isHorizontal
    ? 260
    : Math.max(420, nodes.length * gapY + 80);

  const positions = {};

  nodes.forEach((node, i) => {
    if (isHorizontal) {
      positions[node.id] = { x: 120 + i * gapX, y: height / 2 };
    } else {
      positions[node.id] = { x: width / 2, y: 80 + i * gapY };
    }
  });

  const curvedPath = (from, to) => {
    if (isHorizontal) {
      const midX = (from.x + to.x) / 2;
      return `M ${from.x + nodeWidth / 2} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x - nodeWidth / 2} ${to.y}`;
    }
    const midY = (from.y + to.y) / 2;
    return `M ${from.x} ${from.y + nodeHeight / 2} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y - nodeHeight / 2}`;
  };

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="mx-auto h-auto w-full max-w-5xl"
      >
        <defs>
          <linearGradient id="edgeGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#075A01" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#0A8F01" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="nodeGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FAFAF7" />
          </linearGradient>

          <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0B1220" floodOpacity="0.08" />
          </filter>

          <marker
            id="arrowLight"
            viewBox="0 0 12 12"
            refX="6"
            refY="6"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 12 6 L 0 12 z" fill="#0A8F01" />
          </marker>
        </defs>

        {/* Connections */}
        {connections.map((edge, i) => {
          const from = positions[edge.from];
          const to = positions[edge.to];
          if (!from || !to) return null;

          return (
            <motion.path
              key={`edge-${i}`}
              d={curvedPath(from, to)}
              stroke="url(#edgeGradientLight)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              markerEnd="url(#arrowLight)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: "easeInOut" }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const p = positions[node.id];

          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Card */}
              <rect
                x={p.x - nodeWidth / 2}
                y={p.y - nodeHeight / 2}
                rx="18"
                ry="18"
                width={nodeWidth}
                height={nodeHeight}
                fill="url(#nodeGradientLight)"
                stroke="#0A8F01"
                strokeOpacity="0.18"
                strokeWidth="1.5"
                filter="url(#nodeShadow)"
              />

              {/* Left accent bar */}
              <rect
                x={p.x - nodeWidth / 2}
                y={p.y - nodeHeight / 2}
                width="4"
                height={nodeHeight}
                fill="#0A8F01"
                rx="2"
              />

              {/* Title */}
              <text
                x={p.x + 4}
                y={p.y - 4}
                fill="#0B1220"
                textAnchor="middle"
                fontWeight="800"
                fontSize="15"
                fontFamily="Inter, system-ui, -apple-system, sans-serif"
                letterSpacing="-0.01em"
              >
                {truncate(node.title, 28)}
              </text>

              {/* Subtitle */}
              {node.subtitle && (
                <text
                  x={p.x + 4}
                  y={p.y + 18}
                  fill="#4A5468"
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="Inter, system-ui, -apple-system, sans-serif"
                >
                  {truncate(node.subtitle, 40)}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>

      {/* Mobile hint */}
      <p className="mt-4 text-center text-[11px] font-semibold text-[#8892A0] sm:hidden">
        Swipe to explore →
      </p>
    </div>
  );
}

function truncate(text, max) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}