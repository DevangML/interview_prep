import type { ConceptNode } from '../store/types';

export interface HardwarePrimitive {
  id: string;
  title: string;
  category: string;
  tagline: string;
  mechanism: string;
  hardwareInvariant: string;
  downwardImpact: string;
}

export interface AnchoredConcept {
  conceptId: string;
  label: string;
  stageName: string;
  anchorDetail: string;
}

export const HARDWARE_PRIMITIVES: Record<string, HardwarePrimitive[]> = {
  layer_silicon: [
    {
      id: 'cmos_inverter',
      title: 'CMOS Complementary Inverter',
      category: 'Digital Logic',
      tagline: 'Pull-up pMOS and pull-down nMOS complementary pairs.',
      mechanism:
        'When input is 0V, pMOS conducts and nMOS cuts off, charging the output gate capacitance to Vdd with zero steady-state static power.',
      hardwareInvariant: 'Static current draw is near-zero; energy is consumed primarily during capacitive switching.',
      downwardImpact: 'Voltage drops directly cap maximum clock frequency (Fmax) across chip thermal envelopes.',
    },
    {
      id: 'clock_tree',
      title: 'Clock Distribution H-Tree',
      category: 'Timing & Bedrock',
      tagline: 'Equidistant balanced clock propagation lines across the die.',
      mechanism:
        'Symmetric fractal wiring ensures clock pulses reach billions of flip-flops within picosecond phase alignment.',
      hardwareInvariant: 'Clock skew must never exceed the register hold-time window (T_hold < T_prop + T_skew).',
      downwardImpact: 'Defines the single global time quantum bounding sequential machine instruction execution.',
    },
    {
      id: 'dram_1t1c',
      title: '1T-1C Dynamic Storage Cell',
      category: 'Physical Storage',
      tagline: 'A single access transistor gating a microscopic trench capacitor.',
      mechanism:
        'Binary 1 is stored as ~30 femtofarads of electrical charge. Reading is destructive and requires immediate rewrite amplification.',
      hardwareInvariant: 'Charge leaks naturally; cells must be refreshed every 64ms across memory rows.',
      downwardImpact: 'Refresh pauses introduce non-deterministic micro-stutters into real-time memory access.',
    },
  ],
  layer_isa: [
    {
      id: 'cache_line_anatomy',
      title: '64-Byte Cache Line Hierarchy',
      category: 'Memory Hierarchy',
      tagline: 'The atomic quantum of CPU data transport across L1/L2/L3 caches.',
      mechanism:
        'Addresses are split into Tag, Set Index, and 6-bit Offset. Cache fills fetch contiguous 64-byte chunks regardless of requested type size.',
      hardwareInvariant: 'Accessing adjacent struct fields is free; accessing strided non-contiguous memory stalls execution.',
      downwardImpact: 'Determines struct field packing, false sharing in threads, and array-of-structures vs structure-of-arrays.',
    },
    {
      id: 'branch_predictor',
      title: 'Branch Target Buffer & TAGE Predictor',
      category: 'Processor Pipelines',
      tagline: 'Speculative instruction pre-fetching across conditional jumps.',
      mechanism:
        'Tagged geometric history tables predict branch directions before ALU evaluation, maintaining continuous pipeline saturation.',
      hardwareInvariant: 'A mispredicted branch dumps 15-20 cycles of in-flight speculative instructions from the pipeline.',
      downwardImpact: 'Branchless code, sorting before filtering, and loop unrolling directly optimize for this predictor.',
    },
    {
      id: 'tlb_mmu_page_walk',
      title: 'Hardware MMU & Translation Lookaside Buffer',
      category: 'Virtual Addressing',
      tagline: 'Hardware cache of virtual-to-physical address mappings.',
      mechanism:
        'CPU instructions use virtual addresses. The MMU consults the multi-level page table, caching recent translations in L1/L2 TLBs.',
      hardwareInvariant: 'A TLB miss triggers a 4-level DRAM memory walk, costing up to 100ns of CPU stall time.',
      downwardImpact: 'Large pages (HugePages) and tight working sets maximize TLB coverage for high-throughput runtimes.',
    },
  ],
};

export function getAnchoredConcepts(
  nodes: ConceptNode[],
  stageId: string
): AnchoredConcept[] {
  const isSilicon = stageId === 'layer_silicon';
  const isIsa = stageId === 'layer_isa';
  if (!isSilicon && !isIsa) return [];

  const keywords = isSilicon
    ? ['silicon', 'gate', 'transistor', 'clock', 'voltage', 'power', 'dram', 'hardware', 'physical']
    : ['register', 'cache', 'instruction', 'isa', 'tlb', 'pipeline', 'branch', 'alu', 'assembly', 'mmu'];

  const results: AnchoredConcept[] = [];

  for (const node of nodes) {
    if (node.isLayer || !node.details) continue;
    const trace = node.details.traceDown || [];
    const deps = node.details.empowered_by || [];

    let matchedAnchor = '';

    for (const step of trace) {
      const lower = step.toLowerCase();
      if (keywords.some((kw) => lower.includes(kw))) {
        matchedAnchor = step;
        break;
      }
    }

    if (!matchedAnchor) {
      for (const dep of deps) {
        const text = `${dep.uses} ${dep.how}`.toLowerCase();
        if (keywords.some((kw) => text.includes(kw))) {
          matchedAnchor = `${dep.uses}: ${dep.how}`;
          break;
        }
      }
    }

    if (matchedAnchor) {
      results.push({
        conceptId: node.id,
        label: node.label,
        stageName: node.layerId || 'Core Architecture',
        anchorDetail: matchedAnchor,
      });
    }
  }

  return results.slice(0, 12);
}
