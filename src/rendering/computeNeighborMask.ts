// Ported from SpaceLab. Y increases downward (screen coords), matching map convention.
// Bit layout: bit0=N, bit1=NE, bit2=E, bit3=SE, bit4=S, bit5=SW, bit6=W, bit7=NW
// N = y-1, S = y+1 (screen coords where Y=0 is top)
export function computeNeighborMask(occupied: Set<string>, x: number, y: number): number {
  const has = (dx: number, dy: number) => (occupied.has(`${x + dx},${y + dy}`) ? 1 : 0)
  return (
    (has(0, -1) << 0) |
    (has(1, -1) << 1) |
    (has(1, 0) << 2) |
    (has(1, 1) << 3) |
    (has(0, 1) << 4) |
    (has(-1, 1) << 5) |
    (has(-1, 0) << 6) |
    (has(-1, -1) << 7)
  )
}
