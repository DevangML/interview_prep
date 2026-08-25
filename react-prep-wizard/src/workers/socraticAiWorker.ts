import { WebWorkerMLCEngineHandler } from '@mlc-ai/web-llm';

// Hook up WebLLM engine handler inside the Web Worker
const handler = new WebWorkerMLCEngineHandler();

self.onmessage = (msg: MessageEvent) => {
  handler.onmessage(msg);
};
