// SVG path data for F1 circuits. Each path is a simplified outline of the track layout.
// Coordinates are normalized to a 400x300 viewBox.

export interface CircuitMap {
  circuitId: string
  path: string
  startLine?: { x: number; y: number }
  turns?: { label: string; x: number; y: number }[]
}

const circuitMaps: Record<string, CircuitMap> = {
  albert_park: {
    circuitId: "albert_park",
    path: "M60,220 L80,200 L100,200 L120,180 L140,180 L160,160 L180,160 L200,140 L220,140 L240,120 L260,120 L280,100 L300,80 L320,80 L340,60 L340,100 L320,120 L300,140 L280,160 L260,180 L240,200 L220,220 L200,240 L180,240 L160,220 L140,200 L120,200 L100,220 L80,220 L60,220",
    startLine: { x: 50, y: 220 },
  },
  bahrain: {
    circuitId: "bahrain",
    path: "M200,40 L240,40 L280,60 L300,80 L300,120 L280,140 L260,140 L240,120 L220,120 L200,140 L180,160 L160,180 L140,200 L120,220 L100,240 L80,260 L100,260 L120,240 L140,220 L160,200 L180,200 L200,220 L220,240 L240,260 L260,260 L280,240 L300,220 L320,200 L320,160 L300,140 L280,140",
    startLine: { x: 180, y: 40 },
  },
  jeddah: {
    circuitId: "jeddah",
    path: "M120,30 L140,30 L160,50 L160,70 L140,90 L120,110 L100,130 L80,150 L60,170 L40,190 L40,210 L60,230 L80,250 L100,270 L120,270 L140,250 L160,230 L180,210 L200,190 L220,170 L240,150 L260,130 L280,110 L300,90 L320,70 L340,50 L340,30 L320,30 L300,50 L280,70 L260,90 L240,110",
    startLine: { x: 100, y: 30 },
  },
  shanghai: {
    circuitId: "shanghai",
    path: "M160,40 L180,40 L200,60 L220,60 L240,80 L240,100 L220,120 L200,120 L180,100 L160,100 L140,120 L120,140 L100,160 L80,180 L60,200 L40,220 L40,240 L60,260 L80,260 L100,240 L120,220 L140,200 L160,180 L180,160 L200,140 L220,120 L240,120 L260,140 L280,160 L300,180 L300,200 L280,220 L260,240 L240,260 L220,260 L200,240 L180,220 L160,200",
    startLine: { x: 140, y: 40 },
  },
  suzuka: {
    circuitId: "suzuka",
    path: "M80,40 L100,60 L120,80 L140,100 L160,120 L180,140 L200,160 L220,180 L240,200 L260,220 L280,240 L300,260 L280,260 L260,240 L240,220 L220,200 L200,180 L180,160 L160,140 L140,120 L120,100 L100,80 L80,60 L60,40 L80,40",
    startLine: { x: 60, y: 40 },
  },
  silverstone: {
    circuitId: "silverstone",
    path: "M200,40 L240,40 L260,60 L280,80 L280,100 L260,120 L240,140 L220,160 L200,180 L180,200 L160,220 L140,240 L120,260 L100,260 L80,240 L60,220 L60,200 L80,180 L100,160 L120,140 L140,120 L160,100 L180,80 L200,60 L200,40",
    startLine: { x: 180, y: 40 },
  },
  "red_bull_ring": {
    circuitId: "red_bull_ring",
    path: "M200,50 L240,50 L260,70 L280,90 L280,120 L260,140 L240,160 L220,180 L200,200 L180,220 L160,240 L140,240 L120,220 L100,200 L100,180 L120,160 L140,140 L160,120 L180,100 L200,80 L200,50",
    startLine: { x: 180, y: 50 },
  },
  monza: {
    circuitId: "monza",
    path: "M200,40 L260,40 L280,60 L300,80 L300,120 L280,140 L260,160 L240,180 L220,200 L200,220 L180,240 L160,260 L140,260 L120,240 L100,220 L80,200 L60,180 L60,140 L80,120 L100,100 L120,80 L140,60 L160,40 L200,40",
    startLine: { x: 180, y: 40 },
  },
  singapore: {
    circuitId: "singapore",
    path: "M100,60 L120,60 L140,80 L160,100 L180,120 L200,140 L220,160 L240,180 L260,200 L280,220 L300,240 L280,260 L260,260 L240,240 L220,220 L200,200 L180,180 L160,160 L140,140 L120,120 L100,100 L80,80 L60,60 L80,60 L100,60",
    startLine: { x: 80, y: 60 },
  },
  monaco: {
    circuitId: "monaco",
    path: "M120,40 L140,40 L160,60 L180,80 L200,100 L220,120 L240,140 L260,160 L280,180 L300,200 L280,220 L260,240 L240,260 L220,260 L200,240 L180,220 L160,200 L140,180 L120,160 L100,140 L80,120 L60,100 L60,80 L80,60 L100,40 L120,40",
    startLine: { x: 100, y: 40 },
  },
  americas: {
    circuitId: "americas",
    path: "M80,40 L100,60 L120,80 L140,100 L160,120 L180,140 L200,160 L220,180 L240,200 L260,220 L280,240 L260,260 L240,260 L220,240 L200,220 L180,200 L160,180 L140,160 L120,140 L100,120 L80,100 L60,80 L60,60 L80,40",
    startLine: { x: 60, y: 40 },
  },
  "interlagos": {
    circuitId: "interlagos",
    path: "M120,40 L160,40 L180,60 L200,80 L220,100 L240,120 L260,140 L280,160 L300,180 L280,200 L260,220 L240,240 L220,260 L200,260 L180,240 L160,220 L140,200 L120,180 L100,160 L80,140 L60,120 L60,100 L80,80 L100,60 L120,40",
    startLine: { x: 100, y: 40 },
  },
  yas_marina: {
    circuitId: "yas_marina",
    path: "M80,50 L120,50 L140,70 L160,90 L180,110 L200,130 L220,150 L240,170 L260,190 L280,210 L300,230 L280,250 L260,250 L240,230 L220,210 L200,190 L180,170 L160,150 L140,130 L120,110 L100,90 L80,70 L60,50 L80,50",
    startLine: { x: 60, y: 50 },
  },
  marina_bay: {
    circuitId: "marina_bay",
    path: "M100,60 L140,60 L160,80 L180,100 L200,120 L220,140 L240,160 L260,180 L280,200 L300,220 L280,240 L260,240 L240,220 L220,200 L200,180 L180,160 L160,140 L140,120 L120,100 L100,80 L80,60 L100,60",
    startLine: { x: 80, y: 60 },
  },
  "losail": {
    circuitId: "losail",
    path: "M160,40 L200,40 L220,60 L240,80 L240,120 L220,140 L200,160 L180,180 L160,200 L140,220 L120,240 L100,260 L80,260 L60,240 L60,220 L80,200 L100,180 L120,160 L140,140 L160,120 L180,100 L200,80 L200,60 L180,40 L160,40",
    startLine: { x: 140, y: 40 },
  },
  "miami": {
    circuitId: "miami",
    path: "M100,40 L140,40 L160,60 L180,80 L200,100 L220,120 L240,140 L260,160 L280,180 L260,200 L240,220 L220,240 L200,260 L180,260 L160,240 L140,220 L120,200 L100,180 L80,160 L60,140 L60,120 L80,100 L100,80 L100,40",
    startLine: { x: 80, y: 40 },
  },
  imola: {
    circuitId: "imola",
    path: "M120,40 L160,40 L180,60 L200,80 L220,100 L240,120 L260,140 L280,160 L260,180 L240,200 L220,220 L200,240 L180,260 L160,260 L140,240 L120,220 L100,200 L80,180 L60,160 L60,140 L80,120 L100,100 L120,80 L120,40",
    startLine: { x: 100, y: 40 },
  },
  "spa": {
    circuitId: "spa",
    path: "M140,40 L180,40 L200,60 L220,80 L240,100 L260,120 L280,140 L300,160 L280,180 L260,200 L240,220 L220,240 L200,260 L180,260 L160,240 L140,220 L120,200 L100,180 L80,160 L60,140 L60,120 L80,100 L100,80 L120,60 L140,40",
    startLine: { x: 120, y: 40 },
  },
  "zandvoort": {
    circuitId: "zandvoort",
    path: "M160,40 L200,40 L220,60 L240,80 L220,100 L200,120 L180,140 L160,160 L140,180 L120,200 L100,220 L80,240 L60,260 L80,260 L100,240 L120,220 L140,200 L160,180 L180,160 L200,140 L220,120 L240,100 L260,80 L260,60 L240,40 L200,40",
    startLine: { x: 140, y: 40 },
  },
  "hungaroring": {
    circuitId: "hungaroring",
    path: "M160,40 L200,40 L220,60 L240,80 L240,120 L220,140 L200,160 L180,180 L160,200 L140,220 L120,240 L100,260 L80,260 L60,240 L60,220 L80,200 L100,180 L120,160 L140,140 L160,120 L180,100 L200,80 L200,60 L180,40 L160,40",
    startLine: { x: 140, y: 40 },
  },
  "villeneuve": {
    circuitId: "villeneuve",
    path: "M120,40 L160,40 L180,60 L200,80 L220,100 L240,120 L260,140 L280,160 L300,180 L280,200 L260,220 L240,240 L220,260 L200,260 L180,240 L160,220 L140,200 L120,180 L100,160 L80,140 L60,120 L60,100 L80,80 L100,60 L120,40",
    startLine: { x: 100, y: 40 },
  },
  "baku": {
    circuitId: "baku",
    path: "M80,40 L120,40 L140,60 L160,80 L180,100 L200,120 L220,140 L240,160 L260,180 L280,200 L300,220 L280,240 L260,260 L240,260 L220,240 L200,220 L180,200 L160,180 L140,160 L120,140 L100,120 L80,100 L60,80 L60,60 L80,40",
    startLine: { x: 60, y: 40 },
  },
}

export function getCircuitMap(circuitId: string): CircuitMap | undefined {
  return circuitMaps[circuitId]
}

export function getCircuitMapForName(circuitName: string): CircuitMap | undefined {
  const id = circuitName.toLowerCase().replace(/[^a-z0-9]/g, "_")
  // Try direct match
  const map = circuitMaps[id] ?? circuitMaps[id.replace(/grand_prix/, "").trim()]
  if (map) return map
  
  // Try partial match
  for (const [key, value] of Object.entries(circuitMaps)) {
    if (circuitName.toLowerCase().includes(key.replace(/_/g, " "))) return value
  }
  
  // Return a default oval
  return {
    circuitId: id,
    path: "M100,100 C200,40 300,100 300,200 C300,260 200,260 100,200 C40,160 40,100 100,100",
    startLine: { x: 100, y: 100 },
  }
}
