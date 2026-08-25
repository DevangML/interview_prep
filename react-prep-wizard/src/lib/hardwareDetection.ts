export interface HardwareProfile {
  isAppleSilicon: boolean;
  chipModel: string;
  isM4Series: boolean;
  isHighPerformance: boolean;
  gpuRenderer: string;
  logicalCores: number;
  memoryEstimateGB: number;
  webGpuSupported: boolean;
  recommendedModelId: string;
  maxContextTokens: number;
}

/**
 * Probes browser WebGPU, WebGL, and hardware APIs to fingerprint
 * Apple Silicon (M1/M2/M3/M4) and configure the optimal inference profile.
 */
export async function detectHardwareProfile(): Promise<HardwareProfile> {
  let isAppleSilicon = false;
  let chipModel = 'Standard Hardware';
  let isM4Series = false;
  let isHighPerformance = false;
  let gpuRenderer = 'Generic GPU';
  const logicalCores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
  const memoryEstimateGB = typeof (navigator as any) !== 'undefined' && 'deviceMemory' in navigator ? (navigator as any).deviceMemory || 8 : 8;
  let webGpuSupported = false;

  // 1. Probe WebGL unmasked renderer for Apple M-series string
  if (typeof document !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          gpuRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
          
          if (/Apple/i.test(gpuRenderer)) {
            isAppleSilicon = true;
            if (/M4/i.test(gpuRenderer)) {
              isM4Series = true;
              chipModel = gpuRenderer.includes('Pro') ? 'Apple M4 Pro' : gpuRenderer.includes('Max') ? 'Apple M4 Max' : 'Apple M4';
            } else if (/M3/i.test(gpuRenderer)) {
              chipModel = gpuRenderer.includes('Max') ? 'Apple M3 Max' : gpuRenderer.includes('Pro') ? 'Apple M3 Pro' : 'Apple M3';
            } else if (/M2/i.test(gpuRenderer)) {
              chipModel = gpuRenderer.includes('Max') ? 'Apple M2 Max' : gpuRenderer.includes('Pro') ? 'Apple M2 Pro' : 'Apple M2';
            } else if (/M1/i.test(gpuRenderer)) {
              chipModel = 'Apple M1 Series';
            } else {
              chipModel = 'Apple Silicon (Metal)';
            }
          }
        }
      }
    } catch {
      // Ignore canvas probe errors
    }
  }

  // 2. Probe WebGPU adapter architecture & limits
  if (typeof navigator !== 'undefined' && 'gpu' in navigator && (navigator as any).gpu) {
    try {
      const adapter = await (navigator as any).gpu.requestAdapter();
      if (adapter) {
        webGpuSupported = true;
        const info = (adapter as any).info;
        if (info) {
          const arch = (info.architecture || '').toLowerCase();
          const vendor = (info.vendor || '').toLowerCase();
          const desc = (info.description || '').toLowerCase();

          if (vendor.includes('apple') || arch.includes('metal') || desc.includes('apple')) {
            isAppleSilicon = true;
            if (arch.includes('m4') || desc.includes('m4') || isM4Series) {
              isM4Series = true;
              chipModel = chipModel === 'Standard Hardware' ? 'Apple M4 Pro' : chipModel;
            }
          }
        }
      }
    } catch {
      // Fallback
    }
  }

  // Detect high-concurrency Apple Mac (e.g. M4 Pro with >=12 cores or M-series with WebGPU)
  if (isAppleSilicon || (typeof navigator !== 'undefined' && /Mac/i.test(navigator.userAgent) && logicalCores >= 8)) {
    isAppleSilicon = true;
    if (logicalCores >= 12 || isM4Series) {
      isM4Series = true;
      chipModel = chipModel === 'Standard Hardware' || chipModel === 'Apple Silicon (Metal)' ? 'Apple M4 Pro' : chipModel;
    }
    isHighPerformance = true;
  }

  // Select optimal model & context limits
  const recommendedModelId = isHighPerformance
    ? 'Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC' // Ultra-low latency 75 tok/sec on M4 Pro
    : 'Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC';

  const maxContextTokens = isHighPerformance ? 4096 : 2048;

  return {
    isAppleSilicon,
    chipModel,
    isM4Series,
    isHighPerformance,
    gpuRenderer,
    logicalCores,
    memoryEstimateGB,
    webGpuSupported,
    recommendedModelId,
    maxContextTokens
  };
}
